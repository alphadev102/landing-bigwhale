import {Container} from "./Container";
import {useState} from "react";
import styled from "styled-components";
import close from '../assets/svg/close.svg'
import logo from '../assets/img/logoWithText.png'
import menu from '../assets/svg/menu.svg'
import Youtube from "../assets/svg/Youtube.svg";
import Twitter from "../assets/svg/Twitter.svg";
import Telegram from "../assets/svg/Telegram.svg";
import {FAQ_LINK, LEARN_MORE, NOTION_LINK, SUPPORT_LINK, TELEGRAM_LINK, YOUTUBE_LINK} from "../config/constants";
import {LocalizationButton} from "./LocalizationButton";
import {GradientButton} from "./GradientButton";
import {useRefLink} from "../hooks/useRefLink";
import {useTranslation} from "react-i18next";
import { isApp } from "../routes.tsx";
import { Main } from "../sections/Main";

const StyledHeader = styled.header`
    background: transparent;
    display: block;
    background-size: cover;
    padding-top: 30px;
`
export const Header = () => {

    const [isOpen, setIsOpen] = useState(false)

    const [openPlatformWithRefLink] = useRefLink()
    const { t } = useTranslation()

    const openMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <StyledHeader>
            <Container>
                <div className={isOpen ? "menu menu_open" : "menu"}>
                    <div className="menu__header" onClick={openMenu}>
                        <a href="https://bigwhale.io">
                            <img src={logo} alt="logo" className="header_mobile__logo"/>
                        </a>
                        <img src={close} alt="close" className="menu__btn"/>
                    </div>
                    <div className="navbar">
                    
                    <a href="#how" className="nav__link" onClick={(e) => {
                                e.preventDefault()
                                openMenu()
                                document.getElementById('how').scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                })
                            }}>{t("Stake & Earn")}</a>
                        
                        <a href="https://forms.gle/3bL1CdaPWsQtUXkj6" className="nav__link" onClick={(e) => {
                            e.preventDefault()
                            openMenu()
                            document.getElementById('our-mission').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                            }}>{t("Borrow")}
                        </a>                               
                        <a href="#profit_calculator" className="nav__link" onClick={(e) => {
                            e.preventDefault()
                            
                            openMenu()
                            document.getElementById('profit_calculator').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                            }}>
                            {t("Profit Calculator")}
                        </a>
                        <a href="#faq" className="nav__link" onClick={(e) => {
                            e.preventDefault()
                            
                            openMenu()
                            document.getElementById('faq').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
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
                   
                        <a href={SUPPORT_LINK} target="_blank" className="nav__link"
                            onClick={openMenu}>{t("Support")}
                        </a>
                        {
                            <GradientButton
                                text={t("Launch App")}
                                onClick={openPlatformWithRefLink}
                                type="btn_f outlined w-fitContent"
                                
                                
                            /> 
                        }
                        
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
                <div className={isOpen ? "menu-bg menu-bg_open" : "menu-bg"}  onClick={openMenu}/>
                <div className="header_mobile">
                    <a href="https://bigwhale.io">
                        <img src={logo} alt="logo" className="header_mobile__logo"/>
                    </a>
                    <div className="header_mobile__row">
                        {/* <LocalizationButton/> */}
                        <img src={menu} alt="menu" className="menu__btn" onClick={openMenu}/>
                    </div>
                </div>
                <div className="header__wrapper">
                    <div className="header__row">
                        <button className="menu__btn">
                            <a href="/" className="">
                                <img src={logo} alt="logo" className="header__logo"/>
                            </a>
                        </button>
                    </div>
                    <div>
                        <div className="header__links">
                            <a href="#how" className="header__link" onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('how').scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                })
                            }}>{t("Stake & Earn")}</a>
                            
                            <a href="https://forms.gle/3bL1CdaPWsQtUXkj6" target="_blank" className="header__link">{t("Borrow")}</a>
                            <a href="#profit_calculator" target="_blank" className="header__link" onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('profit_calculator').scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                })
                            }}>{t("Profit Calculator")}</a>
                            <a href="#FAQ" className="header__link" onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('faq').scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                })
                            }}>{t("FAQ")}</a>
                            <a href="http://docs.bigwhale.io" className="header__link" onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('faq').scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                })
                            }}>{t("Docs")}</a>
                            <a href={SUPPORT_LINK} target="_blank" className="header__link">{t("Support")}</a>
                        </div>
                    </div>
                    <div className="header__row">
                        <div className="header__btn__container">
                        {
                            <GradientButton
                                text={t("Launch App")}
                                onClick={openPlatformWithRefLink}
                            /> 
                        }
                        </div>
                    </div>
                </div>
            </Container>
        </StyledHeader>
    );
}