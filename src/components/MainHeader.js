import React, { useState } from "react";
import {FAQ_LINK, LEARN_MORE, NOTION_LINK, SUPPORT_LINK, TELEGRAM_LINK, YOUTUBE_LINK} from "../config/constants";
import logo from "../assets/svg/logo.svg";
import Youtube from "../assets/svg/Youtube.svg";
import Twitter from "../assets/svg/Twitter.svg";
import Telegram from "../assets/svg/Telegram.svg";
import close from '../assets/svg/close.svg'
import list from "../assets/svg/List.svg";
import {GradientButton} from "./GradientButton";
import SecondaryButton from "./SecondaryButton";
import { useConnectWallet } from "@web3-onboard/react";
import { useRefLink } from "../hooks/useRefLink";
import { useTranslation } from "react-i18next";
import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Button, Web3Modal } from "@web3modal/react";

import { configureChains, createClient, useBalance, useAccount, useDisconnect, WagmiConfig } from "wagmi";

import { bsc } from "wagmi/chains";


const MainHeader = () => {

  const [loading, setLoading] = useState(false) 
  const { open } = useWeb3Modal()
  const { address, isConnecting,isConnected, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  const label = isConnected ? 'Disconnect' : 'Connect Custom'
 
  async function onOpen() {
    setLoading(true)
    await open()
    setLoading(false)
  }

  const walletChange = () => {
    if (isConnected) {
      disconnect()
    } else {
      onOpen()
    }
  }

  const getDispalyText = (text) => {
    const preText = text.substring(0,6)
    
    const lastText = text.substring(text.length-6,text.length)
    return preText + "..." + lastText
  }

  const [isOpen, setIsOpen] = useState(false)

  const [openPlatformWithRefLink] = useRefLink()
  const { t } = useTranslation()

  const openMenu = () => {
      setIsOpen(!isOpen)
  }


  return (
    <div className=" container">
      <div className={isOpen ? "menu menu_open" : "menu"}>
                    <div className="menu__header" onClick={openMenu}>
                        <a href="/">
                            <img src={logo} alt="logo" className="header_mobile__logo"/>
                        </a>
                        <img src={close} alt="close" className="menu__btn"/>
                    </div>
                    <div className="navbar">
                    <a href={SUPPORT_LINK} target="_blank" className="nav__link"
                            onClick={openMenu}>{t("Contact Support")}
                        </a>

                        <a href="https://bigwhale.io#how" className="nav__link" onClick={(e) => {
                           
                            
                            openMenu()
                     
                            }}>{t("Stake & Earn")}</a>
                        
                        <a href="https://forms.gle/3bL1CdaPWsQtUXkj6n" target={"_blank"} className="nav__link" onClick={(e) => {
                            openMenu()
                            
                            }}>{t("Borrow")}
                        </a>                               
                        <a href="https://app.bigwhale.io/#profit_calculator" className="nav__link" onClick={(e) => {
                            e.preventDefault()
                            // openMenu()
                            document.getElementById('profit_calculator').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                        }}>
                            {t("Profit Calculator")}
                        </a>
                        <a href="https://bigwhale.io#faq" className="nav__link" onClick={(e) => {
                            openMenu()                            
                        }}>{t("FAQ")}
                        </a>
                        <a href="https://docs.bigwhale.io" className="nav__link" onClick={(e) => {
                            e.preventDefault()
                            openMenu()
                            document.getElementById('faq').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                        }}>{t("Docs")}
                        </a>
                   
                        <a href={TELEGRAM_LINK} target="_blank" className="nav__link"
                            onClick={openMenu}>{t("Telegram Announcement Channel")}
                        </a>

                        <a href="https://t.me/bigwhalechat" target="_blank" className="nav__link"
                            onClick={openMenu}>{t("Join Telegram Discussion Group")}
                        </a>
                            {/* {
                               <SecondaryButton text={address ? getDispalyText(address) : "Connect Wallet"} onClick={walletChange} className="hide" />
                            } */}
                        
                    </div>
                    <div className="menu__social-links__container">
                        <div className="social-links">
                        <a href="https://t.me/bigwhaleofficial" target="_blank"><img src={Telegram} alt="logo" /></a>
                            <a href="https://www.youtube.com/@bigwhaleofficial" target="_blank"><img src={Youtube} alt="logo" /></a>
                            <a href="https://twitter.com/bigwhaleio" target="_blank"><img src={Twitter} alt="logo" /></a>
                            {/* <a href="#" className="social-links__item ">
                                <img src={require("../assets/img/discord.svg").default}
                                        className="social-links__item__img"
                                        alt="discord"/>
                            </a>
                            <a href={TELEGRAM_LINK} target="_blank" className="social-links__item">
                                <img src={require("../assets/img/telegram.svg").default}
                                        className="social-links__item__img" alt="telegram"/>
                            </a> */}
                        </div>
                    </div>
                </div>
      <div className="main_navbar">
        <div className="navbar__logo">
          <a href="https://bigwhale.io">
            <img src={logo} alt="logo"></img>
          </a>
        </div>
        <div className="navbar__links">
        
          <SecondaryButton text={address ? getDispalyText(address) : "Connect Wallet"} onClick={walletChange} className="hide" />
          <div className="list" onClick={openMenu}>
            <img src={list} alt="list"  />
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainHeader;
