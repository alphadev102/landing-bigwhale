import {useRoutes} from "./routes.tsx";
import {Route, BrowserRouter as Router} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import React from "react";
function App() {
  const routes = useRoutes()
  return (
    <>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
            <Router>
                <div>
                    {routes}
                </div>
            </Router>
            
    </>
);
}

export default App;
// import React, { useState, useEffect } from 'react'
// import { Connector, useWalletModal } from '@rainbow-me/kit-modal'
// import { withWeb3React } from '@rainbow-me/kit-util'
// import { useWeb3React } from '@web3-react/core'

// const App = () => {
//   const { disconnect, isConnected, connect, Modal, isConnecting, address } = useWalletModal({
//     wallets: ['coinbase', 'metamask'],
//     chains: ['mainnet', 'polygon']
//   })

//   return (
//     <>
//       <button onClick={() => (isConnected ? disconnect() : connect())}>
//         {isConnected ? 'Disconnect' : 'Connect Wallet'}
//       </button>
//       {isConnecting && <Modal />}
//     </>
//   )
// }

// export default App;