import { useState } from 'react';
import { openContractDeploy } from '@stacks/connect';
import { AnchorMode } from '@stacks/transactions';

export default function DeployContract() {
  const [txId, setTxId] = useState('');
  const [status, setStatus] = useState('');

  const contractCode = `
;; Last Counter Contract (Clarity 4)
(define-constant contract-owner tx-sender)
(define-data-var counter uint u0)
(define-data-var last-caller (optional principal) none)
(define-data-var last-increment-time (optional uint) none)

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (var-set last-caller (some tx-sender))
    (var-set last-increment-time (some stacks-block-time))
    (ok (var-get counter))))

(define-read-only (get-counter)
  (ok (var-get counter)))

(define-read-only (get-last-caller)
  (ok (var-get last-caller)))

(define-read-only (get-last-increment-time)
  (ok (var-get last-increment-time)))

(define-public (reset)
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (var-set counter u0)
    (ok true)))
`;

  const deployContract = async () => {
    try {
      setStatus('Opening wallet...');
      
      await openContractDeploy({
        contractName: 'counter-clarity4',
        codeBody: contractCode,
        network: "testnet",
        anchorMode: AnchorMode.Any,
        appDetails: {
          name: 'Contract Deployer',
          icon: window.location.origin + '/logo.png',
        },
        onFinish: (data) => {
          setTxId(data.txId);
          setStatus('✓ Contract deployed! Check the explorer below.');
          console.log('Transaction:', data);
        },
        onCancel: () => {
          setStatus('Deployment cancelled by user');
        },
      });

    } catch (error) {
      setStatus('Error: ' + error.message);
      console.error('Deployment error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-2">
            Deploy Clarity Contract
          </h1>
          <p className="text-white/70 mb-8">
            Deploy your counter contract to Stacks testnet
          </p>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Contract: counter-clarity4</h3>
              <p className="text-white/60 text-sm">
                A simple counter that tracks increments, caller addresses, and timestamps
              </p>
            </div>

            <button
              onClick={deployContract}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              🚀 Deploy Contract with Leather
            </button>

            {status && (
              <div className={`rounded-lg p-4 ${
                status.includes('Error') || status.includes('cancelled')
                  ? 'bg-red-500/20 border border-red-500/50 text-red-100'
                  : status.includes('✓')
                  ? 'bg-green-500/20 border border-green-500/50 text-green-100'
                  : 'bg-blue-500/20 border border-blue-500/50 text-blue-100'
              }`}>
                <p className="font-mono text-sm">{status}</p>
              </div>
            )}

            {txId && (
              <a
                href={`https://explorer.hiro.so/txid/${txId}?chain=testnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                <span>View Transaction on Explorer</span>
                <span>→</span>
              </a>
            )}

            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-yellow-200 font-semibold mb-2">📝 Requirements:</h3>
              <ul className="text-yellow-100 text-sm space-y-1">
                <li>• Leather wallet extension installed</li>
                <li>• Connected to Stacks testnet</li>
                <li>• Some testnet STX for gas fees</li>
                <li>• npm install @stacks/connect @stacks/transactions @stacks/network</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-purple-200 font-semibold mb-2">ℹ️ Note on Clarity Version:</h3>
              <p className="text-purple-100 text-sm">
                The Clarity version (3 or 4) depends on the current Stacks network epoch. 
                If stacks-block-time is not available, the contract will use block-height instead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
