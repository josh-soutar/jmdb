import React from "react";
import styled from "@xstyled/styled-components";

export default function PersonDetails({
  knownFor,
  gender,
  birthday,
  placeOfBirth,
}) {
  return (
    <PersonalInfo>
      <PersonalInfoTitle>Personal Info</PersonalInfoTitle>
      <PIHeading>Known For</PIHeading>
      <PIData>{knownFor}</PIData>
      <PIHeading>Gender </PIHeading>
      <PIData>{gender === "1" ? <>Female</> : <>Male</>}</PIData>
      <PIHeading>Birthday</PIHeading>
      <PIData>{birthday}</PIData>
      <PIHeading>Origin</PIHeading>
      <PIData>{placeOfBirth}</PIData>
    </PersonalInfo>
  );
}

const PersonalInfo = styled.div`
  grid-area: personal_info;
`;

const PersonalInfoTitle = styled.h3`
  font-weight: bold;
  padding: 2 0;
`;

const PIHeading = styled.div`
  font-weight: bold;
`;

const PIData = styled.div``;
