import React from "react";
import styled from "@xstyled/styled-components";

const StyledButton = styled.input`
  padding: 20px;
  font-size: 4;
`;

export default function Input({ btnLabel }) {
  return <StyledButton type="submit" value={btnLabel} />;
}
