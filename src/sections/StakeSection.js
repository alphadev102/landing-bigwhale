import React from "react";
import SmallButton from "../uiComponents/SmallButton";
import GradientInput from "../uiComponents/GradientInput";
import Rewards from "../components/Reward";
import Referral from "../components/Referral";
import heroImage from "../assets/svg/HeroImage.svg";
import Icon from "../uiComponents/Icon";
import PrimaryButton from "../uiComponents/PrimaryButton";
import ProfitCalculator from "../components/ProfitCalculator";
import { useState, useEffect } from "react"
import styled from 'styled-components'
import { Container } from "../components/Container"
import { FAQ_LINK, LEARN_MORE, SUPPORT_LINK } from "../config/constants"
import { useTranslation } from "react-i18next";
import { GradientButton } from "../components/GradientButton";
import { stakingContract } from "../config";
import { fetchAllData, invest, leaveWhale, reinvest, withdraw } from "../hooks/getData";
import { ethers } from "ethers";
import ProgressCountdown from "../components/ProgressCountdown.tsx";
import Modal from "../components/Modal";
import { toast } from "react-hot-toast";
import Icons from "../components/Icons";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";



const StakeSection = () => {

    // useEffect(() => {
    //     // if (!wallet) {
    //     //     walletConenct()
    //     // }
    //     fetchData();
    // }, [wallet])
    
    // const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] = useConnectWallet()
    const { open } = useWeb3Modal()
    const { address} = useAccount()
    async function onOpen() {
        await open()
      }
    
      const walletChange = () => {
          onOpen()
      }
    const HeroSection = () => {
        return (
            <div className="herosection">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Icon img={heroImage} width="250px" height="242px" />
                </div>

                <h2>Please, Connect your wallet</h2>
                <h3>
                    Please connect your wallet to see your staking balance, daily interest,
                    re-staking, referral rewards & more.
                </h3>
                <PrimaryButton onClick={walletChange} text="Connect Wallet"/>
                <p>
                    <span className="gradient">New Users: </span>Here for the first time?
                    Welcome! Check out our <a>Quick Start Guide </a> to get started
                    within minutes. Its short & easy !
                </p>
                <p>
                    The Bigwhale DeFi protocol is powered by 14+ web3 wallets used by
                    millions of people around the world
                </p>
                <Icons />
            </div>
        );
    };

    return (
        !address ? HeroSection() :
            <>
                <Rewards />
                <Referral />
                <ProfitCalculator />

                
            </>

    );
};

export default StakeSection;
