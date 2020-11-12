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
  border-top: ${(props) => (props.first ? "0" : "1px solid")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;
    font-weight: bold;
  }
`;

function SearchResultCategories(props) {
  //Sort the categories based on 'order' key value
  function compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }

  if (props && props.search_results) {
    props.search_results.sort(compare);
  }

  const handleClick = (chosen_category) => {
    props.selectSearchResultCategory(chosen_category);
  };

  return (
    <Container>
      {props.search_results &&
        props.search_results.map((category, index) => {
          if (category.total_results > 0) {
            return (
              <Category
                onClick={() => {
                  handleClick(category.label);
                }}
                key={category.label}
                selected={category.selected}
                first={index === 0}
              >
                <div>{category.label}</div>
                <div>{category.total_results}</div>
              </Category>
            );
          }
        })}
    </Container>
  );
}

const mapStateToProps = (state) => {
  const newState = { ...state };
  return {
    search_results: newState.search_results,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCategories);
