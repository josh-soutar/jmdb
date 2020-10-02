import React, { useState } from "react";
import styled, { Box } from "@xstyled/styled-components";
import Layout from "../layout";
import PopularMovies from "../components/molecules/PopularMovies";
import HomepageSearch from "../components/molecules/HomepageSearch";

const MovieListOuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MovieListInnerContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SearchContainer = styled.div``;

export default function IndexPage() {
  return (
    <Layout>
      <SearchContainer>
        <HomepageSearch />
      </SearchContainer>

      <MovieListOuterContainer>
        <MovieListInnerContainer>
          <PopularMovies />
        </MovieListInnerContainer>
      </MovieListOuterContainer>
    </Layout>
  );
}
