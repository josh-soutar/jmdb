import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import { DateTime, Interval } from "luxon";

export default function PersonDetails({ knownFor, birthday, placeOfBirth }) {
  const [age, setAge] = useState("");

  useEffect(() => {
    //Calculate age
    if (birthday) {
      let fullBirthdayString = "";
      const today = DateTime.now();
      const isoBday = DateTime.fromISO(birthday);
      const localBday = DateTime.fromISO(birthday).toLocaleString(
        DateTime.DATE_MED
      );

      let ageInYears = Math.floor(
        Interval.fromDateTimes(isoBday, today).length("years")
      );

      if (ageInYears === 1) {
        fullBirthdayString =
          localBday + " (" + ageInYears.toString() + " year old)";
      } else {
        fullBirthdayString =
          localBday + " (" + ageInYears.toString() + " years old)";
      }
      setAge(fullBirthdayString);
    }
  }, birthday);

  return (
    <PersonalInfo>
      <PersonalInfoTitle>Personal Info</PersonalInfoTitle>
      <PIHeading>Known For</PIHeading>
      <PIData>{knownFor}</PIData>

      {birthday && (
        <>
          <PIHeading>Birthday</PIHeading>
          <PIData>{age}</PIData>
        </>
      )}

      {placeOfBirth && (
        <>
          <PIHeading>Origin</PIHeading>
          <PIData>{placeOfBirth}</PIData>
        </>
      )}
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
