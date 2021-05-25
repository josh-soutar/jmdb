import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import { Link } from "gatsby";

export default function PersonCreditsList({ personCredits }) {
  console.log("groupedCredits", personCredits);

  function getYearCredits(yearObj) {}

  return (
    <Container>
      <Credit>
        <CreditYear></CreditYear>
        <CreditTitle></CreditTitle>
      </Credit>
    </Container>
  );
}

const Container = styled.div``;

const Credit = styled.div``;

const CreditYear = styled.div``;

const CreditTitle = styled.div``;
