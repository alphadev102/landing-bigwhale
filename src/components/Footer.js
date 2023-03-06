import React, { useState } from "react";
import styled from 'styled-components'
import logo from "../assets/svg/logo.svg";
import Youtube from "../assets/svg/Youtube.svg";
import Twitter from "../assets/svg/Twitter.svg";
import Telegram from "../assets/svg/Telegram.svg";
import Binance from "../assets/svg/Binance.svg";
import { Container } from "./Container";
import Modal from "./Modal";




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
export const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <footer >
      <Container >
        <div>
          <div className="footer">
            <div className="footer__logo">
              <a href="https://bigwhale.io"><img src={logo} alt="logo" /></a>
              <div className="social__links">
                <a href="https://t.me/bigwhaleofficial" target="_blank"><img src={Telegram} alt="BigWhale Telegram Channel" /></a>
                <a href="https://www.youtube.com/@bigwhaleofficial" target="_blank"><img src={Youtube} alt="BigWhale Youtube Channel" /></a>
                <a href="https://twitter.com/bigwhaleio" target="_blank"><img src={Twitter} alt="BigWhale Twitter" /></a>

              </div>
            </div>
            <div className="footer__nav">
              <ul>
                <li>
                  <a href="https://www.bigwhale.io">Home</a>
                </li>
                <li>
                  <a href="https://docs.bigwhale.io/support">Support & Tickets</a>
                </li>
                <li>
                  <a href="https://docs.bigwhale.io">Docs & Whitepaper</a>
                </li>
                <li>
                  <a href="https://bscscan.com/address/0x217538d6229c6ca6ea665a7637a502dee9994570" target="_blank">View Smart Contract</a>
                </li>
                <li>
                  <a href="https://t.me/bigwhalechat">BigWhale Telegram Discussion Group</a>
                </li>
              </ul>
            </div>
            <div className="footer__guide">
              <ul>
                <li>
                  <a href="https://docs.bigwhale.io">Getting Started</a>
                </li>
                <li>
                  <a href="#calculator">Earnings Calculator</a>
                </li>
                <li>
                  <a href="https://docs.bigwhale.io">Refer & Earn </a>
                </li>
                <li>
                  <a href="https://forms.gle/3bL1CdaPWsQtUXkj6" target="_blank">Borrow with BigWhale</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="footer__socaillink">
              <ul>
                <li>
                  <a href="https://twitter.com/bigwhaleio" target="_blank">Twitter</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@bigwhaleofficial" target="_blank">Youtube</a>
                </li>
                <li>
                  <a href="https://t.me/bigwhaleofficial">Official Telegram for Announcements</a>
                </li>
                <li>
                  <a href="https://docs.bigwhale.io/support">Urgent Customer Support</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="copyright">
            <p>©2023 BigWhale Fintech Co, Ltd. 🇨🇭 All Rights Reserved</p>
          </div>
          <div className="company__logos">
            <a href="https://bscscan.com/address/0x217538d6229c6ca6ea665a7637a502dee9994570#code" target="_blank"><img src={Binance} alt="biance_logo" /></a>
          </div>
          <div className="footer__end">
            <p style={{ textAlign: "center" }}>
              Powered by the Binance Smart Chain. <a href="https://bscscan.com/address/0x217538d6229c6ca6ea665a7637a502dee9994570#code" target="_blank">View our Smart Contract on BSCScan.</a><br /><br />
              The "Binance Smart Chain" name, logo & all associated trademarks belong to their respective trademark owners.
              <br /> <b>INVEST RESPONSIBLY. WE CARE ABOUT OUR INVESTORS.</b>
              <br /> BigWhale.io suggests you to invest responsibly, and do your own
              due diligence before investing in any DeFi projects. We suggest you to
              not stake more than 5% of your savings into our protocol or any
              other DeFi project in general. If you require urgent assistance
              regarding your investment with us, please contact support for
              expedited refunds.
            </p>
          </div>
        </div>
      </Container>
     
    </footer>
  );
};


