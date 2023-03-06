import React from "react";
import styled from "styled-components"


const Button = styled.button`
    display: block;
    height: 39px;
    width: 100%;
    background: #21262F;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.1;
    border: 0;
    color: #fff;
    z-index: 3;
`

const GreyButton = ({ text, onClick, disabled }) => {
  return <Button onClick={onClick} disabled={disabled}>{text}</Button>;
};

export default GreyButton;
