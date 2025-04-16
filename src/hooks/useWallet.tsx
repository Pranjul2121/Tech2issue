
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export type WalletState = {
  address: string | null;
  isConnected: boolean;
  chainId: string | null;
  connecting: boolean;
};

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
    connecting: false,
  });

  const updateWalletState = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        
        if (accounts.length > 0) {
          setWalletState({
            address: accounts[0],
            isConnected: true,
            chainId,
            connecting: false
          });
        } else {
          setWalletState({
            address: null,
            isConnected: false,
            chainId: null,
            connecting: false
          });
        }
      } catch (error) {
        console.error("Failed to get accounts or chainId:", error);
      }
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask browser extension to connect",
        variant: "destructive",
      });
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, connecting: true }));
      
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      
      const chainId = await window.ethereum.request({ 
        method: "eth_chainId" 
      });
      
      setWalletState({
        address: accounts[0],
        isConnected: true,
        chainId,
        connecting: false
      });
      
      toast({
        title: "Wallet connected",
        description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
      });
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setWalletState(prev => ({ ...prev, connecting: false }));
      
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
      connecting: false
    });
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  }, []);

  useEffect(() => {
    // Initial check for connected accounts
    updateWalletState();

    // Setup event listeners for wallet state changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", updateWalletState);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    // Cleanup event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", updateWalletState);
        window.ethereum.removeListener("chainChanged", () => {
          window.location.reload();
        });
      }
    };
  }, [updateWalletState]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet
  };
}

