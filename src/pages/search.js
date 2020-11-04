import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";
import { connect } from "react-redux";

import SearchResultCategories from "../components/molecules/SearchResultCategories";
import SearchResultList from "../components/molecules/SearchResultsList";

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
  align-items: flex-start;
`;

function SearchPage(props) {
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const searchTerm = URLparam.get("query");

  const [resultsCategories, setResultsCategories] = useState();
  const [resultsList, setResultsList] = useState();

  useEffect(() => {
    getAllSearchResults();
  }, [searchTerm]);

  return (
    <Layout>
      <SearchResultsOuterContainer>
        <SearchResultsInnerContainer>
          <SearchResultCategories />
          <SearchResultList />
        </SearchResultsInnerContainer>
      </SearchResultsOuterContainer>
    </Layout>
  );

  function getAllSearchResults() {
    let results = [];

    const queries = [
      {
        label: "All",
        api_call: `https://api.themoviedb.org/3/search/multi?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
        order: 1,
        selected: true,
      },
      {
        label: "Movies",
        api_call: `https://api.themoviedb.org/3/search/movie?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
        order: 2,
        selected: false,
      },
      {
        label: "TV Shows",
        api_call: `https://api.themoviedb.org/3/search/tv?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
        order: 3,
        selected: false,
      },
      {
        label: "People",
        api_call: `https://api.themoviedb.org/3/search/person?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&query=${searchTerm}`,
        order: 4,
        selected: false,
      },
    ];

    for (let i = 0; i < queries.length; i++) {
      let query = queries[i];
      fetch(query.api_call)
        .then((res) => res.json())
        .then((r) => {
          r.label = query.label;
          r.order = query.order;
          r.selected = query.selected;
          r.api_call = query.api_call; //Used to get additional pages of results
          results.push(r);
        })
        .then(() => {
          if (results.length == queries.length) {
            //If we've finished calling each API endpoint
            setResultsCategories(results); //set state. This will cause child components to update
            setResultsList(results[0]);
            props.updateSearchResutls(results);
          }
        });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearchResutls: (search_results) => {
      dispatch({
        type: "UPDATED_SEARCH_RESULTS",
        search_results: search_results,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
