import React from "react";
import styled from "@xstyled/styled-components";
import PopularItemsTypeSelector from "../../atoms/PopularItemsTypeSelector";
import PopularItemsList from "../../molecules/PopularItemsList";
import { connect } from "react-redux";

const MovieListContainer = styled.div`
  padding: 20px;
  overflow-x: auto;
`;

function PopularMovies(props) {
  return (
    <>
      <MovieListContainer>
        <PopularItemsTypeSelector />
        <PopularItemsList item_category={props.homepage_category} />
      </MovieListContainer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(PopularMovies);
