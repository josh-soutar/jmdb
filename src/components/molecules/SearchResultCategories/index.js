import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  width: 200px;
  margin-right: 1;
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1;
  border-bottom: ${(props) => (props.last ? "0" : "1px solid")};
`;

export default function SearchResultCategories({ results }) {
  console.log("received results in category", results);

  return (
    <Container>
      {results.map((category, index) => {
        return (
          <Category key={index} last={results.length == index + 1}>
            <div>{category.label}</div>
            <div>{category.total_results}</div>
          </Category>
        );
      })}
    </Container>
  );
}
