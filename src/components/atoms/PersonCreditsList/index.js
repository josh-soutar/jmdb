import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import { Link } from "gatsby";

export default function PersonCreditsList({ credits, creditsWithoutDate }) {
  console.log("credits", credits);
  console.log("creditsWithoutDate", creditsWithoutDate);

  return (
    <Container>
      {/* 
      TO DO: display results in a nested table. this will help with nesting credits under year
      TO DO: Add sort & filter functionality to list of credits
      */}
      {credits.map((year, index) => (
        <ReleaseYear key={index}>
          {year.year}

          {Object.keys(year.credits).map((creditId) =>
            year.credits[creditId].map((credit, index) => (
              <Credit key={index}>
                <CreditTitle>{credit.standardised_title}</CreditTitle>

                {credit.media_type === "tv" && credit.episode_count === 1 && (
                  <EpisodeCount>({credit.episode_count} episode)</EpisodeCount>
                )}
                {credit.media_type === "tv" && credit.episode_count > 1 && (
                  <EpisodeCount>({credit.episode_count} episodes)</EpisodeCount>
                )}

                {credit.character && (
                  <CreditCharacter> as {credit.character}</CreditCharacter>
                )}
              </Credit>
            ))
          )}
        </ReleaseYear>
      ))}
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border: 1px solid #dedede;
  background-color: #fff;
`;

const ReleaseYear = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1;
  border-bottom: 1px solid #dedede;
`;

const Credit = styled.div`
  display: flex;
  padding: 5px 10px;
`;

const CreditYear = styled.div`
  font-weight: bold;
`;

const CreditTitle = styled.div`
  padding: 0 5px;
`;

const CreditCharacter = styled.div`
  padding: 0 5px;
`;

const EpisodeCount = styled.div`
  opacity: 0.8;
`;
