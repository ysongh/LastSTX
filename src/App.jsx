import { useState } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";

import ConnectWallet from "./components/ConnectWallet";
import Counter from './pages/Counter';
import DeployContract from './pages/DeployContract';

function App() {
  const [address, setAddress] = useState("");

  return (
    <HashRouter>
      <ConnectWallet address={address} setAddress={setAddress}/>
      <Routes>
        <Route
          path="/counter"
          element={<Counter address={address} />} />
        <Route
          path="/"
          element={<DeployContract />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
