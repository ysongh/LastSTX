import { connect, getLocalStorage, request, disconnect, isConnected } from '@stacks/connect';

function ConnectWallet() {
  const authenticated = isConnected();
  const userData = getLocalStorage();

  async function handleWalletConnection() {
    // Connect to wallet
    const response = await connect();
    
    // Get stored addresses
    const data = getLocalStorage();
    const stxAddresses = data.addresses.stx;
    
    if (stxAddresses && stxAddresses.length > 0) {
      const address = stxAddresses[0].address;
      console.log('STX Address:', address);
    }
    
    // Get detailed account info if needed
    const accounts = await request('stx_getAccounts');
    console.log('Account details:', accounts.addresses[0]);
  }

  async function handleLogout() {
    disconnect();
  }

  return (
    <div>
      {!authenticated ? <button onClick={handleWalletConnection}>
        Connect Wallet
      </button> : <button onClick={handleLogout}>
        Disconnect
      </button>}
      <p>{userData.addresses.stx[0].address}</p>
    </div>
  )
}

export default ConnectWallet