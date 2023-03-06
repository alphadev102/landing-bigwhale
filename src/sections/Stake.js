import { useState, useEffect } from "react"
import styled from 'styled-components'
import {Container} from "../components/Container"
import {FAQ_LINK, LEARN_MORE, SUPPORT_LINK} from "../config/constants"
import {useTranslation} from "react-i18next";
import { GradientButton } from "../components/GradientButton";
import { stakingContract } from "../config";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { getAllData, invest, leaveWhale, reinvest, withdraw } from "../hooks/getData";
import { ethers } from "ethers";
import ProgressCountdown from "../components/ProgressCountdown.tsx";
import Modal from "../components/Modal";
import { toast } from "react-hot-toast";

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
        background-color: #fff;
        border-radius: 20px;
        padding: 24px 38px;
        text-align: center;
        width: 590px;
        animation: dVay5Ujr .35s ease-in-out;
        animation-fill-mode: forwards;
    `
    const StyledH2 = styled.h2`
        background: linear-gradient(132.55deg,#28ade5 -11.17%,#8d77da 48.6%,#fe3dce 114.93%);
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
        color: #000;
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
export const Stake = () => {

    const { t } = useTranslation()
    const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] = useConnectWallet()
    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
    const [pendingRewward, setPendingReward] = useState()
    const [reinvestAmount, setReinvestAmount] = useState()
    const [userInfo, setUserInfo] = useState()
    const [depositAmount, setDepositAmount] = useState(0)
    const [deadline, setDeadline] = useState(0)
    const [profit, setProfit] = useState(0)
    const [isLeft, setIsLeft] = useState(false)
    const [interestRate, setInterestRate] = useState(0)
    const [withdrawCapital, setWithdrawCapital] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {          
       
        if(!wallet) {
            walletConenct() 
        }
        fetchData();
    }, [wallet])

    const walletConenct = async () => {
        await connect("metamask");
    }

    const getDeadline = (timestamp, _isLeft) => {
        if(!_isLeft) {
            const currentTime = Date.now();
            const depositedTime = timestamp * 1000;
            const remainingTime = currentTime + (86400000 - (currentTime - depositedTime)%86400000)
            setDeadline(depositedTime ? remainingTime : 0)
        } else {
            const leftTime = timestamp * 1000;
            if(Date.now() > leftTime + 86400000 * 20) {
                setWithdrawCapital(true)
            }
            setDeadline(leftTime + 86400000 * 20)
        }
    }

    const calculate = (_depositAmount) => {
        let tempProfit = 0.0
        const term = 1;
        if (term > 0 && _depositAmount > 0) {
            for (let day = 1; day <= term; ++day) {
                tempProfit += parseFloat(_depositAmount) * interestRate
            }           
        }
        tempProfit = parseFloat(tempProfit).toFixed(4)
        setProfit(tempProfit)
    }

    const calculateInterestRate = () => {
        if (depositAmount >= 80) {
            setInterestRate(0.05)
        } else if (depositAmount >= 30) {
            setInterestRate(0.04)
        }else if (depositAmount >= 2) {
            setInterestRate(0.03)
        } else setInterestRate(0.02)
    }


    const fetchData = async () => {
        if (wallet?.provider) {
            if(connectedChain != 56) {setChain({chainId: 56})}
            const data = await getAllData(wallet?.accounts[0].address)
            if(data){                    
                setPendingReward(ethers.utils.formatEther(data.pendingReward))
                setReinvestAmount(ethers.utils.formatEther(data.pendingReward))
                setUserInfo(data.stakeInfo)
                getDeadline(data.stakeInfo.timestamp, data.isLeftAddress)
                setIsLeft(data.isLeftAddress)
            }
        }
    }

    const startInvest = async () => {
        await invest(ethers.utils.parseEther(depositAmount), wallet?.accounts[0].address)
        fetchData()
    }   

    const onLeaveWhale = async () => {
        setIsOpen(true);
        //  await leaveWhale(wallet?.accounts[0].address);
        // fetchData()
    }

    const onWithdraw = async () => {
        if(pendingRewward < 0.1 || reinvestAmount < 0.1)
        {
            toast.error(`${t("The minimum amount is 0.1 BNB")}`)
        } else {
            await withdraw(ethers.utils.parseEther(reinvestAmount), wallet?.accounts[0].address)
            fetchData()
        }
    }

    const onReinvest = async () => {
         await reinvest(ethers.utils.parseEther(reinvestAmount), wallet?.accounts[0].address)
        fetchData()
    }

    const onWithdrawCapital = async () => {
         await reinvest(ethers.utils.parseEther(reinvestAmount), wallet?.accounts[0].address)
        fetchData()
    }

    const onChangeDepositAmount = (e) => {
        calculateInterestRate()
        calculate(e.target.value)
        setDepositAmount(e.target.value)
    }
    
    return (
        <section className="staking">
            <div className="staking__header">
                <Container>
                    <div class="staking__header__row">
                        <div class="staking__header__row__column">
                            <h2 class="title_white">Provide liquidity</h2>.
                        </div>
                    </div>
                </Container>
            </div>
            <button onClick={connect}>wallet Connect</button>
            <Container>
                {isLeft ? 
                <StyledDiv>You have already exited the BigWhale Protocol. You can withdraw all of your balance in 22 days from the date of you leaving the Protocol. <br/> Please note if you wish to re-join BigWhale, you'll need to use a new wallet address.</StyledDiv>
                : <></>
                }
                <div class="cards__row">
                    <div class="staking__header__column">
                        <div class="card">
                            <div>
                                <div class="card__title__container">
                                    <p class="card__title">Rewards</p>
                                </div>
                                <table class="staking__table">
                                    <tr>
                                        <td><p class="table__row__name">{!isLeft ? "Time until daily interest" : "You can withdraw your capital in"}</p></td>
                                        <td>
                                            {wallet ? 
                                            <div class="timer">
                                                <p class="time">
                                                    <ProgressCountdown deadline={deadline} />
                                                </p>
                                            </div>
                                            : <></> }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><p class="table__row__name">Your rewards</p></td>
                                        <td>
                                            <div class="kPGecBCs eaZyXO0z">
                                                <GradientButton
                                                    style={{width: "100%"}}
                                                    text={t("Reinvest")}
                                                    type={(!wallet || isLeft) ? "w-100" : "outlined w-100"}
                                                    disabled={!wallet || isLeft}
                                                    onClick={onReinvest}
                                                />
                                                {/* <button class="KLPvgdZe _5QpzNtRt" disabled=""><p class="ipKF5z7V gc3hfRdZ">Reinvest</p></button> */}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="table__row_blue">
                                        <td><p class="table__row__value">{pendingRewward?pendingRewward:"0"} BNB</p></td>
                                        <td><input type="text" class="input" value={reinvestAmount?reinvestAmount:"0"} onChange={(val) => setReinvestAmount(val.target.value)} /></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="table__info__container">
                                <div class="table__info">
                                    <p class="table__info__text">To withdraw or reinvest your income, specify the desired value and press "Withdraw reward" or "Reinvest" buttons.</p>
                                </div>
                                <div class="table__info">
                                    <img src="data:image/svg+xml,%3csvg width='14' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.998 10.226a.5.5 0 0 1-.5-.5v-3.95a.5.5 0 0 1 1 0v3.95a.5.5 0 0 1-.5.5ZM6.998 4.777a.492.492 0 0 1-.352-.147.492.492 0 0 1 0-.705.515.515 0 0 1 .705-.003.502.502 0 0 1-.353.855Z' fill='black'/%3e%3cpath d='M6.981 13.499a6.45 6.45 0 0 1-1.676-.22 6.547 6.547 0 0 1-4.67-4.941 6.549 6.549 0 0 1 2.377-6.471 6.543 6.543 0 0 1 4-1.358c1.007 0 2.006.234 2.89.676a6.554 6.554 0 0 1 3.596 5.817c0 1.991-.94 3.91-2.514 5.134a6.548 6.548 0 0 1-4.003 1.363Zm.032-11.99a5.537 5.537 0 0 0-3.387 1.148 5.543 5.543 0 0 0-2.011 5.476 5.539 5.539 0 0 0 3.95 4.18 5.544 5.544 0 0 0 4.805-.966 5.541 5.541 0 0 0 2.128-4.345A5.546 5.546 0 0 0 9.455 2.08a5.487 5.487 0 0 0-2.442-.571Z' fill='black'/%3e%3c/svg%3e" alt="" class="table__info__img"/>
                                    <p class="table__info__text">Withdrawals as well as reinvestments instantaneous. The minimum withdrawal amount is 0.1 BNB.</p>
                                </div>
                                <div class="table__info">
                                    <img src="data:image/svg+xml,%3csvg width='14' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.998 10.226a.5.5 0 0 1-.5-.5v-3.95a.5.5 0 0 1 1 0v3.95a.5.5 0 0 1-.5.5ZM6.998 4.777a.492.492 0 0 1-.352-.147.492.492 0 0 1 0-.705.515.515 0 0 1 .705-.003.502.502 0 0 1-.353.855Z' fill='black'/%3e%3cpath d='M6.981 13.499a6.45 6.45 0 0 1-1.676-.22 6.547 6.547 0 0 1-4.67-4.941 6.549 6.549 0 0 1 2.377-6.471 6.543 6.543 0 0 1 4-1.358c1.007 0 2.006.234 2.89.676a6.554 6.554 0 0 1 3.596 5.817c0 1.991-.94 3.91-2.514 5.134a6.548 6.548 0 0 1-4.003 1.363Zm.032-11.99a5.537 5.537 0 0 0-3.387 1.148 5.543 5.543 0 0 0-2.011 5.476 5.539 5.539 0 0 0 3.95 4.18 5.544 5.544 0 0 0 4.805-.966 5.541 5.541 0 0 0 2.128-4.345A5.546 5.546 0 0 0 9.455 2.08a5.487 5.487 0 0 0-2.442-.571Z' fill='black'/%3e%3c/svg%3e" alt="" class="table__info__img" />
                                    <p class="table__info__text">The maximum withdrawal is unlimited. Withdrawals are available each day.</p>
                                </div>
                            </div>
                            <div class="card__btn__column">
                                <div class="kPGecBCs eaZyXO0z">
                                    <GradientButton
                                        style={{width: "100%"}}
                                        text={t("Withdraw reward")}
                                        type={(!wallet || isLeft) ? "w-100" : "outlined w-100"}
                                        disabled={!wallet || isLeft}
                                        onClick={onWithdraw}
                                    />
                                </div>
                                <div class="separator"></div>
                                <div class="kPGecBCs eaZyXO0z">
                                    {!isLeft ?
                                        <GradientButton
                                            style={{width: "100%"}}
                                            text={t("Leave Big Whale")}
                                            type={(!wallet || isLeft) ? "w-100" : "outlined w-100"}
                                            onClick={onLeaveWhale}
                                            disabled={!wallet}
                                        />
                                        :
                                        <GradientButton
                                            style={{width: "100%"}}
                                            text={t("Withdraw Capital")}
                                            type={(!wallet || isLeft) ? "w-100" : "outlined w-100"}
                                            onClick={onWithdrawCapital}
                                            disabled={!withdrawCapital}
                                        />
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="staking__header__column">
                        <div class="card">
                            <p class="card__title">Investing</p>
                            <table class="staking__table">
                                <tr class="table__row_blue">
                                    <td><p class="table__row__name">Wallet balance</p></td>
                                    <td><p class="table__row__value">{wallet?.accounts[0]?.balance?.BNB ? Number(wallet?.accounts[0]?.balance?.BNB).toFixed(4) : ""} BNB</p></td>
                                </tr>
                                <tr><td><p class="table__row__name">Your investment</p></td>
                                    <td><p class="table__row__value">{userInfo ? (ethers.utils.formatEther(userInfo.stake) > 0 ? ethers.utils.formatEther(userInfo.stake) : ""):""} BNB</p></td>
                                </tr>
                                <tr class="table__row_blue">
                                    <td><p class="table__row__name">Daily rewards</p></td>
                                    <td><p class="table__row__value">{userInfo ? ethers.utils.formatEther(userInfo.stake) * userInfo.percentage / 100 : "-"}</p></td>
                                </tr>
                                <tr>
                                    <td><p class="table__row__name">Percentage rewards</p></td>
                                    <td><p class="table__row__value">{userInfo?userInfo.percentage:0} %</p></td>
                                </tr>
                                <tr class="table__row_blue">
                                    <td><input type="text" class="input" value={depositAmount} onChange={onChangeDepositAmount} /></td>
                                    <td><p class="table__row__value">{depositAmount >= 0.1 ? "~ " + profit + " BNB" : "Min value is 0.1"}</p></td>
                                </tr>
                            </table>
                            <div class="kPGecBCs eaZyXO0z">
                                <GradientButton
                                    style={{width: "100%"}}
                                    text={t("Start investing")}
                                    onClick={startInvest}
                                    type="w-100"
                                    disabled={depositAmount < 0.1 || isLeft || !wallet || depositAmount > wallet?.accounts[0]?.balance?.BNB}
                                />
                                {/* <button class="KLPvgdZe sM6NbBt2" disabled="">
                                    <p class="ipKF5z7V gc3hfRdZ">Start investing</p>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main__links">
                    <a href="https://iced-bee-860.notion.site/Let-s-get-started-3adecc83edb34f139d86bb6a6f4b6242" target="_blank" class="main__links__item" rel="noreferrer">How to start?</a>
                    <a href="#calculator" class="main__links__item">Profit calculator</a><a href="https://drive.google.com/drive/folders/1hIdyjLq843iB49SnVcBI8Ub5KjLn5Jc1?usp=sharing" target="_blank" class="main__links__item" rel="noreferrer">Marketing</a>
                    <a href="https://medium.com/@mycatteam/frequently-asked-questions-faq-7dc8b01f5a6a" target="_blank" class="main__links__item" rel="noreferrer">FAQ</a>
                </div>
            
            </Container>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div id="overlay-refConditionsModal">
                    <StyledModalDiv>
                        <StyledH2>Warning!</StyledH2>
                        <StyledModalP class="SeUMF9Sc">
                            You can withdraw your entire balance 22 days after exiting the BigWhale Protocol.
                            <br/>
                            </StyledModalP>
                        <StyledModalFooter class="ZJVMfUyw">
                            <StyledModalFooterDiv class="kPGecBCs">
                                <StyledModalButton onClick={() => setIsOpen(false)}>
                                    <StyledButtonText class="ipKF5z7V gc3hfRdZ">Got it</StyledButtonText>
                                </StyledModalButton>
                            </StyledModalFooterDiv>
                        </StyledModalFooter>
                    </StyledModalDiv>
                    
                </div>
            </Modal>
        </section>
    )
}
