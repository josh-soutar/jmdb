import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import { DateTime, Duration } from "luxon";

const FactsContainer = styled.div`
  display: flex;
  padding: 1 0;
`;

const FactsSeparator = styled.div`
  :before {
    content: "•";
    padding: 0 5px;
    font-weight: bold;
  }
`;

const RunTime = styled.div``;

const ReleaseDate = styled.div``;

const Genres = styled.div`
  display: flex;
`;

const Genre = styled.div`
  ${({ last }) =>
    !last &&
    `
    padding-right: 5px;
    :after {
      content: ",";
    }
`}
`;

export default function TitleFacts({ genres, releaseDate, runTime }) {
  const runtime = Duration.fromObject({
    minutes: runTime,
  }).toFormat("h'h' m'm'");
  const release_date = DateTime.fromISO(releaseDate).toLocaleString(
    DateTime.DATE_FULL
  );

  return (
    <FactsContainer>
      <ReleaseDate>{release_date}</ReleaseDate>
      <FactsSeparator />
      <Genres>
        {genres.map((genre, index) => {
          return (
            <Genre key={index} last={index + 1 === genres.length}>
              {genre.name}
            </Genre>
          );
        })}
      </Genres>
      <FactsSeparator />
      <RunTime>{runtime}</RunTime>
    </FactsContainer>
  );
}
