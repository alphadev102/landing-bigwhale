import { useState, useEffect } from "react"
import { ethers } from 'ethers'
import { GradientButton } from "./GradientButton"
import {
  initWeb3Onboard,
  ethMainnetGasBlockPrices,
  infuraRPC
} from '../services'
import {
  useAccountCenter,
  useConnectWallet,
  useNotifications,
  useSetChain,
  useWallets,
  useSetLocale
} from '@web3-onboard/react'
import { resetCookieConsentValue } from "react-cookie-consent"

let provider

const getDispalyText = (text) => {
  const preText = text.substring(0,6)
  
  const lastText = text.substring(text.length-6,text.length)
  return preText + "..." + lastText
}



export const ConnectWallet = () => {
  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
  useConnectWallet()
  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);
  
  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };
  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };
  
  useEffect(() => {
    if (!wallet?.provider) {
      provider = null
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    }
  }, [wallet])


  return (
        <>
            <div class="connect_wallet">
                <button class="btn_f" 
                    onClick={async () => {
                      if(wallet) {
                        await disconnect(wallet)
                      } else {
                         await connect()
                      }
                    }} data-text={wallet? getDispalyText(wallet.accounts[0].address) : "Connect Wallet" }>
                  
                </button>
            </div>        
           
        </>
    )
}


export const MainConnectWallet = () => {
  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
  useConnectWallet()
  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);
  
  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };
  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };
  
  useEffect(() => {
    if (!wallet?.provider) {
      provider = null
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    }
  }, [wallet])

  return (
    <>
        
            <button  class="main_connect_wallet"
                onClick={async () => {
                  if(wallet) {
                    await disconnect(wallet)
                  } else {
                     await connect()
                  }
                }} >
              {wallet? getDispalyText(wallet.accounts[0].address) : "Connect Wallet" }
            </button>
        
    </>
  )
}