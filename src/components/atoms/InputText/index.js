import React from "react";
import styled from "@xstyled/styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 4;
`;

export default function Input({ placeholder }) {
  return <StyledInput type="text" placeholder={placeholder} />;
}
