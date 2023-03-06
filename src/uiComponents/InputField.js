import React from "react";
import styled from "styled-components"

const StyledInput = styled.input`
    color: white;
    background-color: transparent;
    outline: none;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding: 15px;
    font-size: 14px;
    width: 100%;
    & :: placeholder {
        font-weight: 300;
        line-height: 1.1;
    }
`
const InputField = ({textField, value}) => {
  return (
    <div>
      <StyledInput className="inputfield" type="text" value={value} />
    </div>
  );
};

export default InputField;
