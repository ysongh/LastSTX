import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, getLocalStorage, isConnected, disconnect } from '@stacks/connect';

function ConnectWallet({ address, setAddress }) {
  const authenticated = isConnected();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleWalletConnection() {
    const response = await connect();
    const data = getLocalStorage();
    const stxAddresses = data.addresses?.stx;
    
    if (stxAddresses && stxAddresses.length > 0) {
      const address = stxAddresses[0].address;
      console.log('STX Address:', address);
      setAddress(address);
    }
  }

  async function handleGetAddress() {
    const data = getLocalStorage();
    const stxAddresses = data.addresses?.stx;
    
    if (stxAddresses && stxAddresses.length > 0) {
      const address = stxAddresses[0].address;
      console.log('STX Address:', address);
      setAddress(address);
    }
  }

  async function handleLogout() {
    disconnect();
    setAddress(null); // Optional: clear address on disconnect
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Last STX
            </Link>
          </div>

          {/* Center: Nav Links (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/counter" className="text-gray-700 hover:text-indigo-600 transition">
              Counter
            </Link>
          </div>

          {/* Right: Wallet Button */}
          <div className="flex items-center">
            {!authenticated ? (
              <button
                onClick={handleWalletConnection}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Connect Wallet
              </button>
            ) : !address ? (
              <button
                onClick={handleGetAddress}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Get Address
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (visible when open) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Home
            </Link>
            <Link to="/counter" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Counter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default ConnectWallet;
