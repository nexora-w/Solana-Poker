import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

const WalletBalance = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (publicKey) {
      setLoading(true);
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / 1e9); // Convert lamports to SOL
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching balance:', error);
        setLoading(false);
      });
    } else {
      setBalance(0);
    }
  }, [publicKey, connection]);

  if (!publicKey) {
    return null;
  }

  return (
    <div className="wallet-balance">
      <div className="balance-info">
        <span className="balance-label">💰 Balance</span>
        <span className="balance-amount">
          {loading ? (
            <span className="loading-spinner">⏳ Loading...</span>
          ) : (
            <span className="balance-value">
              {balance.toFixed(4)} <span className="sol-unit">SOL</span>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default WalletBalance;
