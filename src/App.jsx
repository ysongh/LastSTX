import { useState } from 'react';

import ConnectWallet from "./components/ConnectWallet";
import Counter from './pages/Counter';

function App() {
  const [address, setAddress] = useState("");

  return (
    <>
      <h1>Last STX</h1>
      <ConnectWallet address={address} setAddress={setAddress}/>
      <p>{address}</p>
      <Counter address={address} />
    </>
  )
}

export default App
