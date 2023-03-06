import React from "react";
import styled from "styled-components";
import WalletSingleCard from "./WalletSingleCard";
import walletIcon from "../assets/svg/Wallet.svg";
import Deposit from "../assets/svg/Deposit.svg";
import Interests from "../assets/svg/Interests.svg";
import Rewards from "../assets/svg/Rewards.svg";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";

const Walletcards = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
    padding-bottom: 50px;
    position: relative;

    @media (max-width: 576px) {
          display: flex;
          justify-content: center;
      }
`

const WalletCard = () => {
  const userdata = useSelector(state => state.userInfo)
    console.log(userdata)
    return (
      <Walletcards>   
        <WalletSingleCard WalletTitle="Wallet Balance" label={"BNB"} icon={walletIcon} value={(userdata?.userInfo) ? userdata?.userInfo?.walletBalance : ""}/>
        <WalletSingleCard WalletTitle="Daily Interest" label={"BNB"} icon={Interests} value={(userdata?.userInfo) ? ethers.utils.formatEther(userdata.userInfo.stake) * userdata.userInfo.percentage / 1000 : "-"}/>
        <WalletSingleCard WalletTitle="Your Deposit" label={"BNB"} icon={Deposit} value={(userdata?.userInfo) ? (ethers.utils.formatEther(userdata.userInfo.stake) > 0 ? ethers.utils.formatEther(userdata.userInfo.stake): "0"):""}/>
        <WalletSingleCard WalletTitle="Daily ROI %" label={"%"} icon={Interests} value={(userdata?.userInfo) ? userdata.userInfo.percentage/10:''}/>
        <WalletSingleCard WalletTitle="Refer Awards" label={"BNB"} icon={Rewards} value={((userdata?.referralReward))? userdata.referralReward:""}/>
      </Walletcards>
    );
  };
  
  export default WalletCard;
  