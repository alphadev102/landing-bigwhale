import React from "react";
import styled from "styled-components"

const DashboardHr = styled.div`
    border-top: 1px solid #fff;
    margin-top: 10px;;
`

const DashboardGradientText = styled.h1`
    padding: 16px 0px;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.9;
    background-image: linear-gradient(
    90.53deg,
    #2899c5 0.3%,
    #9a3298 51.99%,
    #f37834 99.54%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    width: fit-content;
    -webkit-text-fill-color: transparent;
`
const DashboardText = () => {
  return (
      <DashboardHr>
        <DashboardGradientText>Dashboard</DashboardGradientText>
      </DashboardHr>
  );
};

export default DashboardText;
