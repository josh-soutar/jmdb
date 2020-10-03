import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";

const SearchResultsOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1 0;
`;

const SearchResultsInnerContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SearchResultsCategories = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid;
  margin-right: 1;
`;

const SearchResultsList = styled.div`
  width: 100%;
  border: 1px solid;
`;

export default function SearchPage() {
  return (
    <Layout>
      <SearchResultsOuterContainer>
        <SearchResultsInnerContainer>
          <SearchResultsCategories>results categories</SearchResultsCategories>

          <SearchResultsList>results list</SearchResultsList>
        </SearchResultsInnerContainer>
      </SearchResultsOuterContainer>
    </Layout>
  );
}
