import React from "react";
import styled from "@xstyled/styled-components";
import { connect } from "react-redux";

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
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

function SearchResultCategories(props) {
  const resultsCategories = props.search_results;

  const handleClick = (chosen_category) => {
    props.selectSearchResultCategory(chosen_category);
  };

  return (
    <Container>
      {resultsCategories &&
        resultsCategories.map((category, index) => {
          console.log("category data ", category);
          return (
            <Category
              onClick={() => {
                handleClick(category.label);
              }}
              key={index}
              selected={category.selected}
              last={resultsCategories.length == index + 1}
            >
              <div>
                {category.label} <br />
                selected: {JSON.stringify(category.selected)}
              </div>
              <div>{category.total_results}</div>
            </Category>
          );
        })}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSearchResultCategory: (category_label) => {
      dispatch({
        type: "SELECTED_SEARCH_CATEGORY",
        chosen_category: category_label,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultCategories);
