import {useEffect, useState} from "react";
import { useTranslation } from "react-i18next"
import en from '../assets/svg/greatbritan.svg'
import ru from '../assets/svg/russia.svg'
import pt from '../assets/svg/portugal.svg'
import hi from '../assets/svg/india.svg'
import zh from '../assets/svg/china.svg'
import kz from '../assets/svg/kazahstan.svg'

export const LocalizationButton = () => {

    const [actualLocale, setActualLocale] = useState('En')
    const [actualLocaleFlag, setActualLocaleFlag] = useState(en)
    const [isOpen, setIsOpen] = useState(false)

    const { i18n } = useTranslation()

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const openHandler = () => {
        setIsOpen(true)
    }

    const closeHandler = () => {
        setIsOpen(false)
    }

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
        closeHandler()
    }

    const changeDisplayedActualLocale = () => {
        const [language, locale] = i18n.language.split("-")
        switch (language) {
            case "en":
                setActualLocale("En")
                setActualLocaleFlag(en)
                break
            case "ru":
                setActualLocale("Ru")
                setActualLocaleFlag(ru)
                break
        }
    }

    useEffect(() => {
        changeDisplayedActualLocale()
    }, [i18n.language])


    return (
        // <div className="localization" onMouseLeave={closeHandler}>
        <div className="localization">
            <button className="localization-btn" onClick={toggleIsOpen}>
                <img src={actualLocaleFlag} className="img localization-menu__item__flag"/>
                <p className="btn__gradient-text">
                    {actualLocale}
                </p>
            </button>
            {
                isOpen &&
                <div className="localization-menu" onMouseLeave={closeHandler}>
                    <div className="localization-menu__item" onClick={() => changeLanguage("en-US")}>
                        <div className="localization-menu__item__name__wrapper">
                            <img src={en} className="img localization-menu__item__flag"/>
                            <p className="localization-menu__item__name">
                                En
                            </p>
                        </div>
                    </div>
                    <div className="localization-menu__item" onClick={() => changeLanguage("ru-RU")}>
                        <div className="localization-menu__item__name__wrapper">
                            <img src={ru} className="img localization-menu__item__flag"/>
                            <p className="localization-menu__item__name">
                                Ru
                            </p>
                        </div>
                    </div>
                    <div className="localization-menu__item">
                        <div className="localization-menu__item__name__wrapper">
                            <img src={hi} className="img localization-menu__item__flag"/>
                            <p className="localization-menu__item__name">
                                Hi
                            </p>
                        </div>
                        <p className="localization-menu__item__soon">soon</p>
                    </div>
                    <div className="localization-menu__item">
                        <div className="localization-menu__item__name__wrapper">
                            <img src={pt} className="img localization-menu__item__flag"/>
                            <p className="localization-menu__item__name">
                                Pt
                            </p>
                        </div>
                        <p className="localization-menu__item__soon">soon</p>
                    </div>
                    <div className="localization-menu__item">
                        <div className="localization-menu__item__name__wrapper">
                            <img src={zh} className="img localization-menu__item__flag"/>
                            <p className="localization-menu__item__name">
                                Ch
                            </p>
                        </div>
                        <p className="localization-menu__item__soon">soon</p>
                    </div>
                    <div className="localization-menu__item">
                        <div className="localization-menu__item__name__wrapper">
                            <img src={kz} className="img localization-menu__item__flag"/>
                            <p className="localization-menu__item__name">
                                Kz
                            </p>
                        </div>
                        <p className="localization-menu__item__soon">soon</p>
                    </div>
                </div>
            }
        </div>

    )
}
