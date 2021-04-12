import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

export default function PersonKnownForAndCredits({ personId }) {
  useEffect(() => {
    const apiQuery = `https://api.themoviedb.org/3/person/${personId}}/combined_credits?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        console.log("credits data", result);

        getPopularCredits(result);
      });
  }, [personId]);

  //Find 5 most popular credits the person is known for based on their credits
  function getPopularCredits(credits) {}

  return (
    <Container>
      <Heading>Known For</Heading>
      <KnownFor></KnownFor>
      <Heading>Credits</Heading>

      <Credits>
        <Subheading>Acting</Subheading>

        <Subheading>Production</Subheading>
      </Credits>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  font-weight: bold;
`;

const Subheading = styled.h3`
  font-weight: bold;
  font-size: 2;
`;

const KnownFor = styled.div`
  display: flex;
`;

const Credits = styled.div``;
