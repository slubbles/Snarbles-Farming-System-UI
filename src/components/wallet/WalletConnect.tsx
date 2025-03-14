
import { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const WalletConnect = ({ onConnect, onDisconnect }: WalletConnectProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = () => {
    // Mock wallet connect - in a real app, this would use the WalletConnect or similar API
    const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setWalletAddress(mockAddress);
    setIsConnected(true);
    
    // Store in local storage to persist connection
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('walletAddress', mockAddress);
    
    if (onConnect) onConnect(mockAddress);
    
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected.",
    });
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    
    // Remove from local storage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    
    if (onDisconnect) onDisconnect();
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  // Check for existing connection on component mount
  useState(() => {
    const connected = localStorage.getItem('walletConnected') === 'true';
    const address = localStorage.getItem('walletAddress');
    
    if (connected && address) {
      setIsConnected(true);
      setWalletAddress(address);
      if (onConnect) onConnect(address);
    }
  });

  return (
    <div>
      {!isConnected ? (
        <Button 
          onClick={connectWallet}
          className="wallet-connect-btn"
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="wallet-address">
            {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={disconnectWallet}
            className="h-8 w-8 text-destructive hover:text-destructive/90"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
