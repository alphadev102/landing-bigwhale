import React from "react";
import styled from 'styled-components'
import {SmallIcon} from "../uiComponents/Icon";
import MetaMask from "../assets/svg/icons/MetaMask_Fox 1.svg";
import Coinbase from "../assets/svg/icons/Coinbase.svg";
import Binance from "../assets/svg/icons/binance.svg";
import Blocto from "../assets/svg/icons/Blocto.svg";
import coin from "../assets/svg/icons/coin.svg";
import Iconblack from "../assets/svg/icons/lconblack.svg";
import opera from "../assets/svg/icons/opera.svg";
import solona from "../assets/svg/icons/solona.svg";
import TPicon from "../assets/svg/icons/TPicon.svg";
import trust from "../assets/svg/icons/trust.svg";
import Wicon from "../assets/svg/icons/Wicon.svg";
import brave from "../assets/svg/icons/brave.svg";

const StyledIcons = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 540px;
  margin: auto;
`

const Icons = () => {
  return (
    <StyledIcons>
      <SmallIcon img={MetaMask} width="64px" height="64px" />
      <SmallIcon img={Coinbase} width="64px" height="64px" />
      <SmallIcon img={Binance} width="64px" height="64px" />
      <SmallIcon img={Wicon} width="64px" height="64px" />
      <SmallIcon img={TPicon} width="64px" height="64px" />
      <SmallIcon img={coin} width="64px" height="64px" />
      <SmallIcon img={solona} width="64px" height="64px" />
      <SmallIcon img={opera} width="64px" height="64px" />
      <SmallIcon img={brave} width="64px" height="64px" />
      <SmallIcon img={Iconblack} width="64px" height="64px" />
      <SmallIcon img={Blocto} width="64px" height="64px" />
      <SmallIcon img={trust} width="64px" height="64px" />
    </StyledIcons>
  );
};

export default Icons;
