import {useEffect, useRef, useState} from "react";
import {useRefLink} from "../hooks/useRefLink";
import {useTranslation} from "react-i18next";
import React from "react";
import SmallButton from "../uiComponents/SmallButton";
import GradientInput from "../uiComponents/GradientInput";
import Slider from "../uiComponents/Slider";

const ProfitCalculator = () => {
  const [amount, setAmount] = useState(0.1)
    const [term, setTerm] = useState(7)
    const [amountInputStep, setAmountInputStep] = useState(0.01)
    const [profit, setProfit] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [total, setTotal] = useState(0)
    const [interestRate, setInterestRate] = useState(0)
    const [reinvest, setReinvest] = useState(false)

    const [openPlatformWithRefLink] = useRefLink()
    const { t } = useTranslation()

    const amountInputRef = useRef()
    const termInputRef = useRef()

    const amountChangeHandler = (e) => {
        const value = e.target.value
        if (parseFloat(value) < 50) {
            setAmount(value)
        } else {
            setAmount(parseFloat(value).toFixed(0))
        }
    }

    const termChangeHandler = (e) => {
        setTerm(e.target.value)
    }

    const amountInputChangeHandler = (e) => {
        setAmount(e.target.value)
    }

    const termInputChangeHandler = (e) => {
        setTerm(e.target.value)
    }

    const changeAmountInputStep = () => {
        const value = parseFloat(amount)
        if (value >= 100) {
            setAmountInputStep(10)
        } else if (value >= 50) {
            setAmountInputStep(1)
        } else if (value >= 10) {
            setAmountInputStep(0.1)
        } else setAmountInputStep(0.01)
    }

    const reinvestToggleHandler = () => {
        setReinvest(!reinvest)
    }

    const calculateInterestRate = () => {
      if (amount >= 80) {
        setInterestRate(0.02)
      } else if (amount >= 30) {
            setInterestRate(0.018)
        } else if (amount >= 10) {
            setInterestRate(0.015)
        } else if (amount >= 1) {
            setInterestRate(0.012)
        } else return setInterestRate(0.008)


    }

   const calculate = () => {
        let tempProfit = 0.0
        let tempTotal = 0.0
        let tempPercentage = 0.0

        if (term > 0 && amount > 0) {

            if (reinvest) {
                for (let day = 1; day <= term; ++day) {
                    tempProfit += (parseFloat(amount) + tempProfit) * interestRate
                }
            } else {
                for (let day = 1; day <= term; ++day) {
                    tempProfit += parseFloat(amount) * interestRate
                }
            }

            tempTotal = parseFloat(amount) + parseFloat(tempProfit)
            tempPercentage = ((tempTotal / parseFloat(amount)) * 100) - 100
        }



        tempProfit = parseFloat(tempProfit).toFixed(2)
        setProfit(tempProfit)
        tempTotal = parseFloat(tempTotal).toFixed(2)
        setTotal(tempTotal)
        tempPercentage = parseFloat(tempPercentage).toFixed(2)
        setPercentage(tempPercentage)

    }

    useEffect(() => {
        changeAmountInputStep()
    }, [amount, amountInputStep])

    useEffect(() => {
        calculateInterestRate()
    }, [amount])

    useEffect(() => {
        calculate()
    }, [amount, term, reinvest, interestRate])


  return (
    <div id="profit_calculator">
      <div className="profit_main">
        <h6>Profit Calculator</h6>
        <p>Calculate your total estimated earnings by staking into our protocol</p>
        <div className="inputslide">
          <Slider title="Staking Amount" onChange={amountChangeHandler} subtitle={amount} unit={"BNB"} max="1000" min="1" />
          <Slider title="Staking Period" onChange={termChangeHandler} subtitle={term} unit={"Days"} max="365" min="1" />
        </div>
      </div>
      <div className="second">
        <div className="">
          <div>
            <p>Profit</p>
            <GradientInput text={"+"+profit+" BNB"}  />
          </div>
          <div>
            <p>Period</p>
            <GradientInput text={term +" Days"} />
          </div>
        </div>
        <div className="">
          <div>
            <p>Profit Percentage</p>
            <GradientInput text={percentage+"%"} />
          </div>
          <div>
            <p>Total Balance</p>
            <GradientInput text={total + " BNB"} />
          </div>
        </div>
        <div className="">
        <div className="reinvest">
            <p className="reinvest__label">
                {t("Reinvest")}
            </p>
            <label className="switch">
                <input type="checkbox" checked={reinvest} onChange={reinvestToggleHandler} style={{zIndex:"3"}}/>
                <span className="slider round"/>
            </label>
        </div>
        {/* <div>
            <SmallButton text="Reinvest" />
          </div> */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
