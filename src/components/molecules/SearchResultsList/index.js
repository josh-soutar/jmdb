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
  display: flex;
  padding: 1;
`;

const Title = styled.div`
  font-weight: bold;
  padding-bottom: 1;
`;

const Overview = styled.div``;

const Poster = styled.div`
  min-width: 94px;
  min-height: 141px;
  background-image: ${(props) => props.imageUrl};
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1;
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
            <ResultsListItem className="searchResult" key={index}>
              <Poster
                imageUrl={
                  result.poster_path
                    ? "url('https://image.tmdb.org/t/p/w94_and_h141_bestv2" +
                      result.poster_path +
                      "')"
                    : "url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg')"
                }
              ></Poster>
              <TextSection>
                <Title>{result.original_name}</Title>
                <Overview>{result.overview}</Overview>
              </TextSection>
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
    search_results: selected_list[0],
  };
};

export default connect(mapStateToProps)(SearchResultList);
