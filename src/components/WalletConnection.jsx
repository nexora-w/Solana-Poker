import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

const WalletConnection = () => {
  const { publicKey, connected } = useWallet();

  return (
    <div className="wallet-connection">
      <div className="wallet-info">
        {connected ? (
          <div className="wallet-connected">
            <div className="wallet-address">
              <span className="connection-status">🟢 Connected</span>
              <span className="address-text">
                {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
              </span>
            </div>
            <WalletDisconnectButton className="wallet-disconnect-btn" />
          </div>
        ) : (
          <div className="wallet-disconnected">
            <div className="connection-prompt">
              <span className="prompt-text">Connect your wallet to play</span>
            </div>
            <WalletMultiButton className="wallet-connect-btn" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnection;
