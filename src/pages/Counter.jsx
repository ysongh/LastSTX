import { useState } from 'react'
import { fetchCallReadOnlyFunction } from '@stacks/transactions';

function Counter({ address }) {
  const [num, setNum] = useState();

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

    if (response.type === "ok") {
      setNum(response.value.value);
    }
  }

  return (
    <div>
      <button onClick={getCounter}>
        Get Counter
      </button>
      <p>{num}</p>
    </div>
  )
}

export default Counter;
