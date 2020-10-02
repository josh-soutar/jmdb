import React from "react";
import styled from "@xstyled/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledActionButton = styled.div`
  background-color: #032541;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.color || "inherit"};
  font-size: 4;
`;

export default function ActionButton({ icon, color }) {
  return (
    <StyledActionButton>
      <StyledIcon icon={icon} color={color} />
    </StyledActionButton>
  );
}
