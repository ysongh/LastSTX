import { useState } from 'react';

import ConnectWallet from "./components/ConnectWallet";
import Counter from './pages/Counter';
import DeployContract from './pages/DeployContract';

function App() {
  const [address, setAddress] = useState("");

  return (
    <>
      <h1>Last STX</h1>
      <ConnectWallet address={address} setAddress={setAddress}/>
      <p>{address}</p>
      <Counter address={address} />
      <DeployContract />
    </>
  )
}

export default App
