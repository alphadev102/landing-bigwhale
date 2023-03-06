import React from "react";
import styled from 'styled-components'

const Button = styled.button`
  background: linear-gradient(90deg, #2998c4 0%, #9c3197 52.08%, #f27735 100%);
  border-radius: 5px;
  padding: 20px 40px;
  color: white;
  outline: none;
  border: none;
  margin: 45px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  & : hover {
    background: linear-gradient(90deg, #2998c4 10%, #9c3197 42.08%, #f27735 90%);
  }
`

const PrimaryButton = ({ text, onClick }) => {
  
  return <Button onClick={onClick}>{text}</Button>;
};

export default PrimaryButton;
