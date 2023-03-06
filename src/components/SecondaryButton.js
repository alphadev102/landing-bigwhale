import React from "react";
import styled from "styled-components"

const StyledButton = styled.button`
    background: linear-gradient(135deg, #fff, #1e1e1e);
    border-radius: 5px;
    padding: 12px 40px;
    position: relative;
    outline: none;
    overflow: hidden;
    border: none;
    :: before {
        content: "";
        display: block;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        background: #0b111b;
        top: 1px;
        left: 1px;
        position: absolute;
        z-index: 0;
        border-radius: 5px;
    }   
    & > div {
        position: relative;
        z-index: 1;
        background: #0b111b;
        color: #fff;
        border-radius: 5px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    @media (max-width: 576px) {
        display: none;
    }
`

const SecondaryButton = ({ text, onClick }) => {
  
 
  return (
    <StyledButton onClick={onClick} >
      <div>{text}</div>
    </StyledButton>
  );
};

export default SecondaryButton;
