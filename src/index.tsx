import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';
import { createStore } from 'redux';
import rootReducer from './store/rootReducer'
import { Provider } from 'react-redux'
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { bsc, polygon, mainnet } from "wagmi/chains";
import { Web3Modal } from '@web3modal/react';

const store = createStore(
  rootReducer,
  {
    byUrl: {},
    activeListUrls: undefined,
  }
)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const chains = [bsc];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "d28fde41313bda1172e3e906a74a3dcc" }),
]);


const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "d28fde41313bda1172e3e906a74a3dcc",
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});


const ethereumClient = new EthereumClient(wagmiClient, chains);

root.render(
  <>
    <WagmiConfig client={wagmiClient}>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </WagmiConfig>
    <Web3Modal
      projectId="d28fde41313bda1172e3e906a74a3dcc"
      ethereumClient={ethereumClient}
    />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
