import React from "react";
import styled from 'styled-components'
import SmallButton from "../uiComponents/SmallButton";
import GreyButton from "../uiComponents/GreyButton";
import GradientInput, { GradientBox } from "../uiComponents/GradientInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { fetchAllData, invest, leaveWhale, reinvest, withdraw } from "../hooks/getData";
import ProgressCountdown from "../components/ProgressCountdown.tsx";
import { ethers, getDefaultProvider } from "ethers";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useNetwork, useConnect, useSigner, useProvider, useContract  } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import close from '../assets/svg/close.svg';
import Web3 from "web3";

const StyledDiv = styled.div`
    background: yellow;
    color: red;
    display: block;
    margin: auto;
    width: 100%;
    text-align: center;
    padding: 10px 0px;
    margin-bottom: -50px;
    @media (max-width: 800px) {
        margin-bottom: -10px;
    }
`
const StyledModalDiv = styled.div`
        position: relative;
        background-color: #0b111b;
        color: #fff;
        border-radius: 20px;
        padding: 24px 38px;
        text-align: center;
        width: 590px;
        animation: dVay5Ujr .35s ease-in-out;
        animation-fill-mode: forwards;
    `
const StyledH2 = styled.h2`
        background: linear-gradient(90deg,#2998c4 10%,#9c3197 42.08%,#f27735 90%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        text-transform: uppercase;
        font-weight: 800;
    `
const StyledModalP = styled.p`
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
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
        background-image: linear-gradient(90deg,#2998c4 10%,#9c3197 42.08%,#f27735 90%);
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
        background-image: linear-gradient(90deg,#2998c4 10%,#9c3197 42.08%,#f27735 90%);
    `
const StyledButtonText = styled.p`
        padding: 4px 15px;
        font-size: 18px;
        line-height: 24px;
        margin: 0;
        color: #fff;
        font-weight: 600;
    `

    
const StyledInvesting = styled.div`
background: rgba(24, 30, 39, 0.7);
border-radius: 10px;
padding: 45px 50px;
& h6 {
    font-weight: 700;
    font-size: 22px;
    line-height: 1.4;
    margin: 0;
}
& p {
    font-weight: 400;
    font-size: 17px;
    line-height: 1.2;
}
& hr {
    background-color: #272727;
    margin: 20px 0px;
}
@media (max-width: 976px) {
    padding: 45px 35px;
}
@media (max-width: 576px) {
    padding: 45px 16px;
}


`

const Button = styled.div`
display: flex;
gap: 25px;
margin-bottom: 20px;
`

const RemainingBalance = styled.div`
display: flex;
gap: 25px;
justify-content: space-between;
align-items: center;
`



const Rewards = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { chain, chains } = useNetwork()
  // const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] = useConnectWallet()
  const { open } = useWeb3Modal()
  const { connect} =
    useConnect({
      chainId: 56,
    })
  const { address, connector: activeConnector, isConnecting,isConnected, isDisconnected } = useAccount()
  const [pendingReward, setPendingReward] = useState()
  const [reinvestAmount, setReinvestAmount] = useState(0)
  const [withdrwaAmount, setWithdrawAmount] = useState(0)
  const [userInfo, setUserInfo] = useState()
  const [depositAmount, setDepositAmount] = useState()
  const [deadline, setDeadline] = useState(0)
  const [profit, setProfit] = useState(0)
  const [isLeft, setIsLeft] = useState(false)
  const [interestRate, setInterestRate] = useState(0)
  const [withdrawCapital, setWithdrawCapital] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)


  // const { write: mint } = useContractWrite({
  //   ...contractConfig,
  //   functionName: 'mint'
  // })
  const StakingAddress = "0x217538D6229c6cA6ea665A7637A502dEE9994570";
  const StakingABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "partner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "StakeChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "INIT_AMOUNTS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "INIT_PERCENTAGES", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PERCENTAGES", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "borrowerTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "deinitialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "partner", "type": "address" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getLevel1Data", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getLevel2Data", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getLevel3Data", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "leaveAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "leaveBigWhale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "left", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "level1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "level2", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "level3", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "pendingReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "reinvest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "_index", "type": "uint8" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "setInitAmount", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "_index", "type": "uint8" }, { "internalType": "uint8", "name": "_value", "type": "uint8" }], "name": "setInitPercentage", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "_index", "type": "uint8" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "setReferralPercentage", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "stake", "outputs": [{ "internalType": "uint256", "name": "stake", "type": "uint256" }, { "internalType": "uint256", "name": "notWithdrawn", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "address", "name": "partner", "type": "address" }, { "internalType": "uint8", "name": "percentage", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "start", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "started", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawCapital", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
  // const provider = useProvider();
  // const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/")
  const signer = useSigner()
  const _stakingContract = new ethers.Contract(
      StakingAddress,
      StakingABI,
      signer.data
  )

  let provider;
  const ConnectToInjected = async () => {
    let provider = new Web3('https://bsc-dataseed1.binance.org/');
    // if (typeof window.ethereum !== 'undefined') {
    //   provider = window.ethereum;
    //   try {
    //     await provider.request({ method: 'eth_requestAccounts' })
    //   } catch (error) {
    //     throw new Error("User Rejected");
    //   }
    // } else if (window.web3) {
    //   provider = window.web3.currentProvider;
    // } else if (window.celo) {
    //   provider = window.celo;
    // } else {
    //   throw new Error("No Web3 Provider found");
    // }
    return provider;
  };


  let web3static;

  let stakingContract;

  // const _stakingContract = useContract({
  //   address: StakingAddress,
  //   abi: StakingABI,
  //   signerOrProvider: signer.data
  // })

  // const { config, error } = usePrepareContractWrite({
  //   address: '0x217538D6229c6cA6ea665A7637A502dEE9994570',
  //   abi: [
  //     {
  //       "inputs": [
  //           {
  //               "internalType": "address",
  //               "name": "partner",
  //               "type": "address"
  //           }
  //       ],
  //       "name": "deposit",
  //       "outputs": [],
  //       "stateMutability": "payable",
  //       "type": "function"
  //   }
  //   ],
  //   functionName: 'deposit',
  //   args: ['0x0000000000000000000000000000000000000000'],
  //   signerOrProvider: provider,
  //   overrides: {
  //     value: ethers.utils.parseEther("0.01")
  //   }
  // })
  
  // const { write } = useContractWrite(config)

  useEffect(() => {
   

    initialize();
    if (!address) {
      onOpen()

    }
    
    fetchData();
  }, [address])

  const initialize = async () => {
    console.log("initialize")
    const provider = await ConnectToInjected();
    // await provider.request({ method: 'eth_requestAccounts' });
    web3static = new Web3(signer.data);
    stakingContract = new web3static.eth.Contract(StakingABI, StakingAddress);
    console.log("initialize", stakingContract)
    return stakingContract
  }

  async function onOpen() {
    await open()
  }

  const getWalletBalance = async () => {
    if(address) {
      const balance =   await fetchBalance({address: address})
      setWalletBalance(balance.formatted)
      return balance.formatted
    } else {
      return 0;
    }
  }

  const getDeadline = (timestamp, _isLeft) => {
    if (!_isLeft) {
        const currentTime = Date.now();
        const depositedTime = timestamp * 1000;
        const remainingTime = currentTime + (86400000 - (currentTime - depositedTime) % 86400000)
        setDeadline(depositedTime ? remainingTime : 0)
    } else {
        const leftTime = timestamp * 1000;
        if (Date.now() > leftTime + 86400000 * 22) {
            setWithdrawCapital(true)
        }
        setDeadline(leftTime + 86400000 * 22)
    }
}

const calculate = (_depositAmount, rate) => {
    let tempProfit = 0.0
    const term = 1;
    if (term > 0 && _depositAmount > 0) {
        for (let day = 1; day <= term; ++day) {
            tempProfit += parseFloat(_depositAmount) * rate
        }
    }
    tempProfit = parseFloat(tempProfit).toFixed(4)
    setProfit(tempProfit)
}

const calculateInterestRate = (value) => {
  if (value >= 80) {
    return 0.02
  } else if (value >= 30) {
        return 0.018
    } else if (value >= 10) {
        return 0.015
    } else if (value >= 1) {
        return 0.012
    } else return 0.008
}


const fetchData = async () => {
  
  if (address) {
      const balance = await getWalletBalance()

        const data = await fetchAllData(address)
        if (data) {
            setPendingReward(ethers.utils.formatEther(data.pendingReward))
            setReinvestAmount(ethers.utils.formatEther(data.pendingReward))
            setUserInfo(data.stakeInfo)
            getDeadline(data.stakeInfo.timestamp, data.isLeftAddress)
            setIsLeft(data.isLeftAddress)
            dispatch({type:"userInfo", action: {type:"userInfo", value:  makeAllData(data, Number(balance.toString()).toFixed(4)) }})
        }
    }
}


const makeAllData = (data, balance) => {
  return {
    stake: data.stakeInfo.stake,
    timestamp: data.stakeInfo.timestamp,
    partner: data.stakeInfo.partner,
    pendingReward: data.pendingReward,
    percentage: data.stakeInfo.percentage,
    walletBalance: balance
  }
}
const onLeaveWhale = async () => {
  
  setIsOpen(false);
    await leaveWhale(address);
  fetchData()

}
  const onWithdraw = async () => {
      if (pendingReward < 0.1 || withdrwaAmount < 0.1) {
          toast.error(`${t("The minimum amount is 0.1 BNB")}`)
      } else {
          await withdraw(ethers.utils.parseEther(withdrwaAmount), address)
          fetchData()
      }
  }

  const onReinvest = async () => {
    // if (pendingReward < 0.1 || reinvestAmount < 0.1) {
    //   toast.error(`${t("The minimum amount is 0.1 BNB")}`)
    // } else {
    //     await reinvest(ethers.utils.parseEther(reinvestAmount), address)
    //     fetchData()
    // }
    const contract = await initialize()
    await contract.methods.deposit("0x0000000000000000000000000000000000000000").send({from: address,value: ethers.utils.parseEther("0.01")})
  }

  const onWithdrawCapital = async () => {
      await reinvest(ethers.utils.parseEther(reinvestAmount), address)
      fetchData()
  }

  const startInvest = async () => {

    //  write()
    const contract = await initialize()
    console.log(_stakingContract)
    await _stakingContract.deposit("0x0000000000000000000000000000000000000000", {value: ethers.utils.parseEther(depositAmount)})
  //   if(chain.id != 56)  toast.error(`${t("Wrong network")}`)
  //  if(!depositAmount) toast.error(`${t("Please Enter Deposit Amount")}`)
  //  else if(depositAmount < 0.1) toast.error(`${t("Minimum deposit amount is 0.1 BNB")}`)
  //  else if(depositAmount > walletBalance) toast.error(`${t("Please check your wallet has sufficient funds.")}`)
  //  else {
  //    await invest(ethers.utils.parseEther(depositAmount), address)
  //    fetchData()
  //  }
}   

  const onChangeDepositAmount = (e) => {
      const rate = calculateInterestRate(e.target.value)
      calculate(e.target.value, rate)
      setDepositAmount(e.target.value)
  }

  return (
    <div className="two-sec">
      <div className="reward">
        <div className="rewards">
          <div>
            <h6>Earnings</h6>
            <p>{!isLeft ? "Crediting Daily Interest in" : "Remaining Withdrawal Time"}</p>
          </div>
          <ProgressCountdown deadline={deadline} />
          
        </div>
        <hr />
        <div className="your__rewards">
          <div>
            <p>Your Earnings</p>
            {(isLeft) ?
            <GreyButton disabled={true} text="Reinvest" />
            : 
            <SmallButton text="Restake"  onClick={onReinvest}/>
            }
          </div>
          <div>
            <p>{pendingReward} BNB</p>
            {/* value={reinvestAmount?reinvestAmount:"0"} onChange={(val) => setReinvestAmount(val.target.value)} */}
            <GradientInput text={reinvestAmount} onChange={(val) => setReinvestAmount(val.target.value)} />
          </div>
        </div>
        <hr />
        <div>
          <p>
            You can withdraw your daily earnings by clicking the "Withdraw Earnings" button, or you can compound your earnings
            by clicking on the "Restake" button and enter the amount you wish to restake.
          </p>
          <div className="your__rewards">
            <div>

            {(isLeft) ?
            <GreyButton disabled={true} text="Withdraw Rewards" />
            : 
            <SmallButton  text="Withdraw Earnings" style={{width:"50%"}} onClick={onWithdraw}/>
            }
            </div>
            <GradientInput text={withdrwaAmount} onChange={(val) => setWithdrawAmount(val.target.value)} />
          </div>
          <div className="buttons" style={{marginTop:"30px"}}>
          {!isLeft ?           
            <GreyButton text="Exit Protocol" onClick={() => setIsOpen(true)} />
           : 
          <>
            <GreyButton disabled={!withdrawCapital} text="Withdraw All Capital" onClick={onWithdrawCapital} />
          </>
          }
          </div>
        </div>
          
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div id="overlay-refConditionsModal">
                <StyledModalDiv>
                      <StyledH2>CONFIRMATION!</StyledH2>
                      <img src={close} onClick={() => {setIsOpen(false)}} alt="close" style={{position:"absolute", right: "14px", top: "14px"}} className="menu__btn"/>
                    <StyledModalP class="SeUMF9Sc">
                        Once you EXIT the BigWhale Protocol, your daily interest and referral rewards will be paused.
                        <br /><br />
                        All of your wallet balance (deposits & any un-withdrawn interest or rewards) will be available for withdrawal
                        22 days after you click confirm exiting the protocol button below.
                        <br /><br />
                        This is to ensure our protocol remains balanced, for more info, please read our <a href="https://docs.bigwhale.io" target="_blank">documentation</a>. </StyledModalP>
                    <StyledModalFooter class="ZJVMfUyw">
                        <StyledModalFooterDiv class="kPGecBCs">
                            <StyledModalButton onClick={onLeaveWhale}>
                                <StyledButtonText class="ipKF5z7V gc3hfRdZ">CONFIRM EXITING PROTOCOL</StyledButtonText>
                            </StyledModalButton>
                        </StyledModalFooterDiv>
                    </StyledModalFooter>
                </StyledModalDiv>

            </div>
        </Modal>
      </div>
      <StyledInvesting>
      <h6>Staking</h6>
      <RemainingBalance>
        <div style={{ width: "50%" }}>
          <p>Wallet Balance</p>
          <GradientBox text={walletBalance}  />
        </div>
        <div style={{ width: "50%" }}>
          <p>Your Deposit</p>
          <GradientBox disabled={true} text={userInfo ? (ethers.utils.formatEther(userInfo.stake) > 0 ? ethers.utils.formatEther(userInfo.stake): "0 BNB"):""}  />
        </div>
      </RemainingBalance>
      <hr />
      <div>
        <p>Daily Interest</p>
        <div>
          <GradientBox text={userInfo ? ethers.utils.formatEther(userInfo.stake) * userInfo.percentage / 1000 : "- BNB"} />
        </div>
      </div>
      <hr />
      <div>
        <p>Current Daily ROI: {userInfo?userInfo.percentage/10:'-'}%</p>
        <Button>
          <div className="w-100">
            <GradientInput text={depositAmount} onChange={onChangeDepositAmount} placeholder="Enter Deposit Amount" />
            <p style={{fontSize:"12px", color:"#aaa", marginTop:"10px"}}>*Minimum Deposit is 0.1 BNB | <a href="https://docs.bigwhale.io">Need Help?</a></p>
          </div>
          <GradientBox text={depositAmount >= 0.1 ? "~ " + profit + " BNB" : "Estimated Daily Interest"} />
        </Button>
        <div>
        {(isLeft) ?
            <GreyButton disabled={true} text="Make a Deposit" />
            : 
            <SmallButton text="Make a Deposit" onClick={startInvest}/>
            }
        </div>
      </div>
    </StyledInvesting>
  </div>
  );
};

export default Rewards;