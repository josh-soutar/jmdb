import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResultsListItem = styled.li`
  border: 1px solid;
  margin: 1 0;
`;

export default function SearchResultList({ resultsList }) {
  /*
    Different result types e.g. movie/tv/person have different object structure. Need to take into 
    consideration which result type has been selected when outputting results
    */

  console.log("Data received in list ", resultsList);

  return (
    <Container>
      <ResultsList>
        {resultsList &&
          resultsList.results.map((result, index) => (
            <ResultsListItem key={index}>
              <div>{result.id}</div>
            </ResultsListItem>
          ))}
      </ResultsList>
    </Container>
  );
}
