import React from "react";
import styled from "styled-components"

const Button = styled.button`
    background: linear-gradient(90deg, #2998c4 0%, #9c3197 52.08%, #f27735 100%);
    border-radius: 5px;
    padding: 10px 10px;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    margin: 0;
    position: relative;
    z-index: 3;
    : hover {
        background: linear-gradient(90deg, #2998c4 10%, #9c3197 42.08%, #f27735 90%);
    }
`
const SmallButton = ({ text, onClick, disabled=false }) => {
  return <Button onClick={onClick} disabled={disabled}>{text}</Button>;
};

export default SmallButton;
