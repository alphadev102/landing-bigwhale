import React, { useEffect, useState } from "react";
import styled from "styled-components"
import InputField from "../uiComponents/InputField";
import SmallButton from "../uiComponents/SmallButton";
import GradientInput, {GradientBox, GradientButton} from "../uiComponents/GradientInput";
import Modal from "../components/Modal";
import { useRefLink } from "../hooks/useRefLink";
import { useTranslation } from "react-i18next";
import { useConnectWallet } from "@web3-onboard/react";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { fetchReferralData } from "../hooks/getData";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";

const Referral = () => {
  
  const StyledDiv = styled.div`
    background-color: #0b111b;
    border-radius: 20px;
    padding: 24px 38px;
    text-align: center;
    width: 590px;
    animation: dVay5Ujr .35s ease-in-out;
    animation-fill-mode: forwards;
  `
  const StyledH2 = styled.h2`
    background: linear-gradient(90deg,#2998c4 10%,#9c3197 42.08%,#f27735 90%);
    filter: drop-shadow(0 20px 30px #28d8ff33);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-box-decoration-break: clone;
    margin: 0;
    text-transform: uppercase;
    font-weight: 800;
  `
  const StyledModalP = styled.p`
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    max-width: 600px;
    margin: 18px 0 20px 0;
  `
  const StyledModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `

  const StyledModalFooterDiv = styled.div`
    background-image: linear-gradient(132.55deg,#28ade5 -11.17%,#8d77da 48.6%,#fe3dce 114.93%);
    padding: 2px;
    border-radius: 10px;
    box-sizing: border-box;
  `
  const StyledModalButton = styled.button`
    cursor: pointer;
    border: none;
    padding: 0;
    border-radius: 8px;
    width: 100%;
    margin: 0;
    background-image: linear-gradient(132.55deg,#28ade5 -11.17%,#8d77da 48.6%,#fe3dce 114.93%);
  `
  const StyledButtonText = styled.p`
    padding: 4px 15px;
    font-size: 18px;
    line-height: 24px;
    margin: 0;
    color: #fff;
    font-weight: 600;
  `
  const [openPlatformWithRefLink] = useRefLink()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  // const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] = useConnectWallet()
  const { address, isConnecting,isConnected, isDisconnected } = useAccount()
  const [connectedAddress, setConnectedAddress] = useState(null)    
  const [ReferralLists, setReferralLists] = useState([])
  const [totalProfit, setTotalProfit] = useState(0)
  const [isOpen, setIsOpen] = useState()
  useEffect(() => {
      const initialize = async () => {
          if(address) {
              setConnectedAddress(address);

              const referralData = await fetchReferralData(address)
              
              makeList(referralData)
          }
      }

      initialize()
  }, [address])
  
  const makeList = (referralData) => {
      const lists = []
      let _totalProfit = 0;
      if(referralData?.stakeData_1) {
          let volumn_1 = 0;
          let profit_1 = 0;
          let network = 0;
          referralData?.stakeData_1.map((stakeInfo, index) => {
              volumn_1 += Number(ethers.utils.formatEther(stakeInfo.stake));
              profit_1 += ethers.utils.formatEther(stakeInfo.stake) * stakeInfo.percentage / 100 * 10 / 1000;
              network = index+1;
          })
          _totalProfit += profit_1;
          if(network > 0)
          lists.push({
              level: 1,
              network: network,
              volume: volumn_1.toFixed(3),
              profit: profit_1.toFixed(5)
          })
      }
      if(referralData?.stakeData_2) {
          let volumn_2 = 0;
          let profit_2 = 0;
          let network = 0;
          referralData?.stakeData_2.map((stakeInfo, index) => {
              volumn_2 += Number(ethers.utils.formatEther(stakeInfo.stake));
              profit_2 += ethers.utils.formatEther(stakeInfo.stake) * stakeInfo.percentage / 100 * 10 / 1000;
              network = index+1;
          })
          _totalProfit += profit_2;
          if(network > 0)
          lists.push({
              level: 2,
              network: network,
              volume: volumn_2.toFixed(5),
              profit: profit_2.toFixed(5)
          })
          
      }
      if(referralData?.stakeData_3) {
          let volumn_3 = 0;
          let profit_3 = 0;
          let network = 0;
          referralData?.stakeData_3.map((stakeInfo, index) => {
              volumn_3 += Number(ethers.utils.formatEther(stakeInfo.stake));
              profit_3 += ethers.utils.formatEther(stakeInfo.stake) * stakeInfo.percentage / 100 * 10 / 1000;
              network = index+1;
          })
          _totalProfit += profit_3;
          if(network > 0)
          lists.push({
              level: 3,
              network: network,
              volume: volumn_3.toFixed(5),
              profit: profit_3.toFixed(5)
          })
      }
      
      setTotalProfit(_totalProfit)
      setReferralLists(lists)
      console.log("errrrr")
      dispatch({type:"userInfo", action: {type: "reward", value:_totalProfit}})
  }
  
  const copyAddress = () => {
      navigator.clipboard.writeText("https://bigwhale.io/?ref="+connectedAddress).then(() => {
          toast(`${t("Copied Referral link")}`, {icon: '💾'})
      })
      setIsOpen(true)
  }
  return (
      
      <div className="bouns">
        <div className="ctabouns">
          <h6>Referral Rewards</h6>
          <p>
            Invite someone with your referral link and earn a part of their
            profits as your referral rewards. 10%, 5% and 2% up to three levels.
          </p>
          <a>
            <div style={{ width: "120px", marginBottom:"40px", marginLeft:"40px" }}>
               <a href="https://docs.bigwhale.io" target="_blank"><SmallButton text="Know More" /></a>
            </div>
          </a>
          <div className="table-overview">
            <table>
              <tr>
                <th>Level</th>
                <th>Network</th>
                <th>Volume</th>
                <th>Profit</th>
              </tr>
             
              <tbody>
                {ReferralLists?.map((item) => {
                      return (
                          <tr class="referral-table-row">
                              <td class="referral-table-row__lvl__td">
                              <div class={`referral-table-row__lvl referral-table-row__lvl_${item.level}`}>{item.level}</div></td>
                              <td class="referral-table-row__network">{item.network}</td>
                              <td class="referral-table-row__amount">{item.volume}</td>
                              <td class="referral-table-row__amount">{item.profit}</td>
                          </tr>
                      )
                  })}
                    
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="totalbouns">
          <h6>Total Referral Rewards</h6>
          <p className="gradient">{totalProfit == 0 ? "":totalProfit} BNB</p>
          <div style={{ width: "120px" }}>
          <a href="https://docs.bigwhale.io" target="_blank"><SmallButton text="Learn More" /></a>
          </div>
          <hr />
          <InputField value={connectedAddress ? "https://bigwhale.io/?ref="+connectedAddress:""} textField={"Connect your wallet first"} />
          <div style={{ marginTop: "16px", width: "120px" }}>
            <GradientButton onClick={copyAddress} text="Copy Link" />
          </div>
        </div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div id="overlay-refConditionsModal">
                <StyledDiv>
                    <StyledH2>BigWhale Referrals</StyledH2>
                    <StyledModalP class="SeUMF9Sc">
                        Skyrocket your daily earnings by helping us grow the BigWhale Protocol.
                        <br/><br />
                        Whenever someone joins BigWhale.io with your referral link, you are rewarded with a certain percent of your referral's daily
                        interest, as well as the people your referrals refer, up to three levels deep - up to 10%, 5%, and 2%.
                        <br /><br />
                        Thank you for helping us grow together with you.
                        <br/>
                        </StyledModalP>
                    <StyledModalFooter class="ZJVMfUyw">
                        <StyledModalFooterDiv class="kPGecBCs">
                            <StyledModalButton onClick={() => setIsOpen(false)}>
                                <StyledButtonText class="ipKF5z7V gc3hfRdZ">Close</StyledButtonText>
                            </StyledModalButton>
                        </StyledModalFooterDiv>
                    </StyledModalFooter>
                </StyledDiv>
                
            </div>
        </Modal>
      </div>
  );
};

export default Referral;
