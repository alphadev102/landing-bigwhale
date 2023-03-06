import React from "react";
import styled from "styled-components"

const GradientDiv = styled.div`
    display: block;
    height: 39px;
    width: 100%;
    background: linear-gradient(90deg, #9C3197 0%, #F27735 52.08%, #2998C4 100%);
    `
const StyledInput = styled.input`    
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: #181E27;
    transform: translate(1px, 1px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.1;
    margin: 0;
    color: #fff;
    text-align: center;
    border: none;
`

const StyledButton = styled.button`
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        background: #181E27;
        transform: translate(1px, 1px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.1;
        margin: 0;
        color: #fff;
        text-align: center;
        z-index: 3;
        position: relative;
        border: none;
        &:focus {
            outline: none;
        }
`

const  StyledBox = styled.div`
    display: block;
    height: 39px;
    width: 100%;
    background: linear-gradient(90deg, #9C3197 0%, #F27735 52.08%, #2998C4 100%);
    & > p {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        background: #181E27;
        transform: translate(1px, 1px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.1;
        margin: 0;
        color: #fff;
        text-align: center;
        &:focus {
            outline: none;
        }
    }
`

const GradientInput = (props) =>{
    return (
        <GradientDiv  >
            <StyledInput onChange={props.onChange} value={props.text} placeholder={props.placeholder}/>
        </GradientDiv>         
        
    );
}

export const GradientBox = (props) => {
    return (
        <StyledBox >
            <p > {props.text} </p>
        </StyledBox>         
        
    );
}

export const GradientButton = (props) => {
    return (
        <GradientDiv  >
            <StyledButton onClick={props.onClick}>
                {props.text}
            </StyledButton>
        </GradientDiv>         
        
    );
}

export default GradientInput;