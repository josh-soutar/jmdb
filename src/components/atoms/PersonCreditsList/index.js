import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import { Link } from "gatsby";

export default function PersonCreditsList({ credits, creditsWithoutDate }) {
  function sortCredits(credits, sortByKey, sortByOrder) {
    credits.sort(function (a, b) {
      if (sortByOrder === "ascending") {
        if (a[sortByKey] < b[sortByKey]) {
          return -1;
        }
        if (a[sortByKey] > b[sortByKey]) {
          return 1;
        }
        return 0;
      } else {
        if (a[sortByKey] < b[sortByKey]) {
          return 1;
        }
        if (a[sortByKey] > b[sortByKey]) {
          return -1;
        }
        return 0;
      }
    });
  }

  useEffect(() => sortCredits(credits, "year", "descending"));

  return (
    <Container>
      {/*       
      TO DO: Add sort & filter functionality to list of credits
      */}
      {credits.map((year) => (
        <YearlyCredits key={year.year}>
          <ReleaseYear>{year.year}</ReleaseYear>
          <Credits>
            {Object.keys(year.credits).map((creditId) =>
              year.credits[creditId].map((credit, index) => (
                <Credit key={index}>
                  <CreditTitle>{credit.standardised_title}</CreditTitle>

                  {credit.media_type === "tv" && credit.episode_count === 1 && (
                    <EpisodeCount>
                      ({credit.episode_count} episode)
                    </EpisodeCount>
                  )}
                  {credit.media_type === "tv" && credit.episode_count > 1 && (
                    <EpisodeCount>
                      ({credit.episode_count} episodes)
                    </EpisodeCount>
                  )}

                  {credit.character && (
                    <CreditCharacter> as {credit.character}</CreditCharacter>
                  )}
                </Credit>
              ))
            )}
          </Credits>
        </YearlyCredits>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 2;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border: 1px solid #dedede;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const YearlyCredits = styled.div`
  display: flex;
  border-bottom: 1px solid #dedede;
`;

const ReleaseYear = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1;
  font-weight: bold;
`;

const Credits = styled.div`
  flex-direction: column;
  display: flex;
`;

const Credit = styled.div`
  padding: 1;
  display: flex;
  flex-wrap: wrap;
`;

const CreditTitle = styled.div``;

const CreditCharacter = styled.div`
  padding-left: 5px;
  opacity: 0.6;
`;

const EpisodeCount = styled.div`
  opacity: 0.6;
  padding-left: 5px;
`;
