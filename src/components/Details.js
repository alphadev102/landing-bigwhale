import {useState} from "react";

export const Details = ({summary, text}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className="details">
                <div className="details__header" onClick={toggleIsOpen}>
                    <p className="summary gradient-text">{summary}</p>
                    <img src={isOpen ? require("../assets/svg/minus.svg").default : require("../assets/svg/plus.svg").default} alt="show details" className="details__img"/>
                </div>
                    <p className={isOpen ? "details__text details__text_open" : "details__text"}>
                        {text}
                    </p>
            </div>
        </>
    )
}
