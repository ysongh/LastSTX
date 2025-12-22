import { useState } from 'react';
import { request } from '@stacks/connect';
import { fetchCallReadOnlyFunction } from '@stacks/transactions';

function Counter({ address }) {
  const [num, setNum] = useState();
  const [lastTime, setLastTime] = useState();
  const [tx, settx] = useState();

  const getCounter = async () => {
    const response = await fetchCallReadOnlyFunction({
      contractAddress: "ST38AP4ZGETE6ETWWZ3FP2F2HSN1ER2QSX7QNXF1T",
      contractName: "test5",
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

  const getLastIncrementTime = async () => {
    const response = await fetchCallReadOnlyFunction({
      contractAddress: "ST38AP4ZGETE6ETWWZ3FP2F2HSN1ER2QSX7QNXF1T",
      contractName: "test5",
      functionName: "get-last-increment-time",
      functionArgs: [],
      senderAddress: address,
      network: 'testnet',
    });

    console.log(response);

    if (response.type === "ok") {
      setLastTime(response?.value?.value?.value);
    }
  }

  const increment = async () => {
    const response = await request('stx_callContract', {
      contract: "ST38AP4ZGETE6ETWWZ3FP2F2HSN1ER2QSX7QNXF1T.test5",
      functionName: "increment",
      functionArgs: [],
      network: 'testnet',
    });

    console.log(response);
    console.log('Transaction ID:', response.txid);
    settx(response.txid);
  }

  return (
    <div className="my-50">
      <button onClick={getCounter}>
        Get Counter
      </button>
      <button onClick={getLastIncrementTime}>
        Get Last Increment Time
      </button>
      <button onClick={increment}>
        Increment
      </button>
      <p>{num}</p>
      <p>{lastTime}</p>
      <p>{tx}</p>
    </div>
  )
}

export default Counter;
