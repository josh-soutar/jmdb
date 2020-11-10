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
  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;
    font-weight: bold;
  }
`;

function SearchResultCategories(props) {
  const handleClick = (chosen_category) => {
    props.selectSearchResultCategory(chosen_category);
  };

  //Not sure why this isn't rerendering when the 'selected' prop is changed via selectSearchResultCategory

  return (
    <Container>
      {props.parentProps &&
        props.parentProps.map((category, index) => {
          //console.log("category data ", category);
          return (
            <Category
              onClick={() => {
                handleClick(category.label);
              }}
              key={index}
              selected={category.selected}
              last={props.parentProps.length === index + 1}
            >
              <div>
                {category.label} <br />
                {JSON.stringify(category.selected)}
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
