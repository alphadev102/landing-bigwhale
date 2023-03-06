import React from "react";
import styled from "styled-components";
import info_icon from "../assets/svg/info_icon.svg";
import Icon from "../uiComponents/Icon";

const Card = styled.div`
    display: flex;
    gap: 12px;
    align-items: start;
`

const CardInfo = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
     & > * {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        width: 150px;
     }
     & h2 {
        font-size: 18px;
        line-height: 1.1;
        font-weight: 700;
        margin: 0;
     }
     & span {
        color: white;
        argin: 0;
     }
     & p {
        background-image: linear-gradient( 90.53deg, #2899c5 0.3%, #9a3298 51.99%, #f37834 99.54% );
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        width: -moz-fit-content;
        width: fit-content;
        -webkit-text-fill-color: transparent;
        margin: 0;
     }
`
const WalletSingleCard = (props) => {
    return (
        <Card>
            <Icon img={props.icon} width="53px" height="51px" />
            <CardInfo>
                <div>
                    <h2>{props.WalletTitle} </h2>
                </div>
                <div>
                    <span>{!props.value? "_" : props.value}</span>
                    <p>{props.label}</p>
                </div>
            </CardInfo>
        </Card>
    );
}

export default WalletSingleCard