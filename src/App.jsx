import { useState } from 'react';
import { fetchCallReadOnlyFunction } from '@stacks/transactions';

import ConnectWallet from "./components/ConnectWallet";

function App() {
  const [address, setAddress] = useState("");

  const getCounter = async () => {
    const response = await fetchCallReadOnlyFunction({
      contractAddress: "ST38AP4ZGETE6ETWWZ3FP2F2HSN1ER2QSX7QNXF1T",
      contractName: "test2",
      functionName: "get-counter",
      functionArgs: [],
      senderAddress: address,
      network: 'testnet',
    });

    console.log(response);

  }

  return (
    <>
      <h1>Last STX</h1>
      <ConnectWallet address={address} setAddress={setAddress}/>
      <p>{address}</p>
      <button onClick={getCounter}>
        Get Counter
      </button>
    </>
  )
}

export default App
