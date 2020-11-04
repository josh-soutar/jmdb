import React from "react";
import styled from "@xstyled/styled-components";
import { connect } from "react-redux";

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

function SearchResultList(props) {
  /*
    Different result types e.g. movie/tv/person have different object structure. Need to take into 
    consideration which result type has been selected when outputting results
    */
  const resultsList = props.search_results;

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

const mapStateToProps = (state) => {
  const selected_list = state.search_results.filter(
    (result_category) => result_category.selected === true
  );
  return {
    ...state,
    search_results: selected_list[0],
  };
};

export default connect(mapStateToProps)(SearchResultList);
