import { connect, getLocalStorage, request, isConnected, disconnect } from '@stacks/connect';

function ConnectWallet({ address, setAddress }) {
  const authenticated = isConnected();

  async function handleWalletConnection() {
    // Connect to wallet
    const response = await connect();
    
    // Get stored addresses
    const data = getLocalStorage();
    const stxAddresses = data.addresses.stx;
    
    if (stxAddresses && stxAddresses.length > 0) {
      const address = stxAddresses[0].address;
      console.log('STX Address:', address);
      setAddress(address);
    }
    
    // Get detailed account info if needed
    const accounts = await request('stx_getAccounts');
    console.log('Account details:', accounts.addresses[0]);
  }

  async function handleGetAddress() {
    const data = getLocalStorage();
    const stxAddresses = data.addresses.stx;
    
    if (stxAddresses && stxAddresses.length > 0) {
      const address = stxAddresses[0].address;
      console.log('STX Address:', address);
      setAddress(address);
    }
  }

  async function handleLogout() {
    disconnect();
  }

  return (
    <div>
      {!authenticated ? <button onClick={handleWalletConnection}>
        Connect Wallet
      </button> : ! address ? <button onClick={handleGetAddress}>
        Get Address
      </button> : <button onClick={handleLogout}>
        Disconnect
      </button>}
    </div>
  )
}

export default ConnectWallet