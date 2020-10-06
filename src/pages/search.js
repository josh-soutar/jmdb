import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";

import SearchResultCategories from "../components/molecules/SearchResultCategories";
import SearchResultsList from "../components/molecules/SearchResultsList";

const SearchResultsOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1;
`;

const SearchResultsInnerContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function SearchPage() {
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const searchTerm = URLparam.get("query");

  const [allResults, setAllResults] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await _getAllSearchResults();
      console.log("after response", response);
      setAllResults(response);
      // ...
    }
    fetchData();
  });

  return (
    <Layout>
      <SearchResultsOuterContainer>
        <SearchResultsInnerContainer>
          {allResults && (
            <>
              <SearchResultCategories results={allResults} />
              {
                //<SearchResultsList query={searchTerm} results={allResults} />
              }
            </>
          )}
        </SearchResultsInnerContainer>
      </SearchResultsOuterContainer>
    </Layout>
  );

  function _getAllSearchResults() {
    let results = [];

    const queries = [
      {
        label: "All",
        api_call: `https://api.themoviedb.org/3/search/multi?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
      },
      {
        label: "Movies",
        api_call: `https://api.themoviedb.org/3/search/movie?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
      },
      {
        label: "TV Shows",
        api_call: `https://api.themoviedb.org/3/search/tv?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
      },
      {
        label: "People",
        api_call: `https://api.themoviedb.org/3/search/person?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
      },
    ];

    //Trigger each API call and save result to results array
    queries.forEach((query) => {
      fetch(query.api_call)
        .then((res) => res.json())
        .then((r) => {
          r.label = query.label;
          results.push(r);
        });
    });

    return results;
  }
}
