import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ResultsList = styled.ul``;

const ResultsListItem = styled.li``;

export default function SearchResultList({ query, results }) {
  /*
    Different result types e.g. movie/tv/person have different object structure. Need to take into 
    consideration which result typoe has been selected when outputting results
    */

  return (
    <Container>
      <ResultsList>
        {/*
        results.map((result, index) => (
          <ResultsListItem key={index}>
            <div>{result.id}</div>
          </ResultsListItem>
        ))
        */}
      </ResultsList>
    </Container>
  );
}
