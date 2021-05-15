import React, { useState, useEffect, useRef } from "react";
import styled from "@xstyled/styled-components";
import { connect } from "react-redux";

function PopularItemsTypeSelector(props) {
  const containerRef = useRef(null);
  const ref1 = useRef(null); //Movies
  const ref2 = useRef(null); //TV Shows
  const ref3 = useRef(null); //People
  const [isHoveringInContainer, setIsHoveringInContainer] = useState(false);
  const [underlineX, setUnderlineX] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  //Set initial underline position
  useEffect(() => {
    switch (props.homepage_category) {
      default:
      case "movies":
        handleHover(ref1);
        break;
      case "tv":
        handleHover(ref2);
        break;
      case "people":
        handleHover(ref3);
        break;
    }
  }, []);

  //Update position of underline on hover
  function handleHover(e) {
    const containerX = containerRef.current.getBoundingClientRect().left;
    const elementX = e.current.getBoundingClientRect().left;
    setUnderlineX(calculateUnderlinePosition(containerX, elementX));
    setUnderlineWidth(Math.ceil(e.current.offsetWidth));
  }

  function calculateUnderlinePosition(containerX, elementX) {
    var result = Math.ceil(elementX - containerX);
    //console.log("elementX " + elementX + " containerX " + containerX + " result " + result);
    return result;
  }

  //Slide back to active category
  function handleContainerExit() {
    setIsHoveringInContainer(false);
    switch (props.homepage_category) {
      default:
      case "movies":
        handleHover(ref1);
        break;
      case "tv":
        handleHover(ref2);
        break;
      case "people":
        handleHover(ref3);
        break;
    }
  }

  function handleContainerEnter() {
    setIsHoveringInContainer(true);
  }

  return (
    <>
      <TitleContainer>
        <Title>Explore what's popular</Title>
      </TitleContainer>
      <PopularItemsTypeSelectorContainer
        ref={containerRef}
        onMouseEnter={() => handleContainerEnter()}
        onMouseLeave={() => handleContainerExit()}
      >
        <TypesSlidingUnderline
          underlineX={underlineX + "px"}
          underlineWidth={underlineWidth + "px"}
          isHovering={isHoveringInContainer}
        ></TypesSlidingUnderline>
        <TypesContainer>
          <Type
            value="movies"
            noLeftPadding={true}
            ref={ref1}
            onMouseEnter={() => handleHover(ref1, "enter")}
            onClick={() => props.updateHomepageCategory("movies")}
            selected={props.homepage_category == "movies"}
          >
            Movies
          </Type>
          <Type
            value="tv"
            ref={ref2}
            onMouseEnter={() => handleHover(ref2, "enter")}
            onClick={() => props.updateHomepageCategory("tv")}
            selected={props.homepage_category == "tv"}
          >
            TV Shows
          </Type>
          <Type
            value="people"
            ref={ref3}
            onMouseEnter={() => handleHover(ref3, "enter")}
            onClick={() => props.updateHomepageCategory("people")}
            selected={props.homepage_category == "people"}
          >
            People
          </Type>
        </TypesContainer>
      </PopularItemsTypeSelectorContainer>
    </>
  );
}

const PopularItemsTypeSelectorContainer = styled.div`
  display: inline-flex;
  position: relative;
`;

const TitleContainer = styled.div``;

const Title = styled.h1`
  font-weight: 500;
`;

const TypesContainer = styled.div`
  display: flex;
  position: relative;
`;

const Type = styled.div`
  padding: 1;
  padding-left: ${(props) => (props.noLeftPadding ? "0" : "10px")};
  font-size: 5;
  color: ${(props) => (props.selected ? "black" : "gray")};
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const TypesSlidingUnderline = styled.div`
  height: ${(props) => (props.isHovering ? "3px" : "2px")};
  width: ${(props) => props.underlineWidth};
  background-color: black;
  position: absolute;
  bottom: 10%;
  left: ${(props) => props.underlineX};
  transition: all 0.3s;
`;

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateHomepageCategory: (category) => {
      localStorage.setItem("homepage_category", category);
      dispatch({
        type: "SELECTED_HOMEPAGE_CATEGORY",
        homepage_category: category,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularItemsTypeSelector);
