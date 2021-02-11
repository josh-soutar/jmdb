import React from "react";
import styled from "@xstyled/styled-components";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderContainer = styled.div`
  max-width: 1300px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: calc(1.2vw + 1rem);
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0em;
  text-transform: none;
  line-height: 1.4em;
  border: 2px solid white;
  color: white;
  padding: 1;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 8px 0 5px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderText>
        <Link to="/">
          <StyledIcon icon="ticket-alt" />
          JMDB
        </Link>
      </HeaderText>
    </HeaderContainer>
  );
}
