import React from "react";
import styled from "@xstyled/styled-components";

export default function PopularItemsTypeSelector() {
  const titleRef = React.createRef();
  const containerRef = React.createRef();

  function handleHover(direction) {
    console.log("Testing access to ref", titleRef.current.getBoundingClientRect());

    /* get the position of the rightmost point of Title. Calculate how mant pixels away this Type is from the end of Title
    Update state so the underline's position is moved to this position
    Also can get the width of the type this way
    */
  }

  return (
    <PopularItemsTypeSelectorContainer ref={containerRef}>
      <Title ref={titleRef}>Popular </Title>
      <TypesContainer>
        <TypesSlidingUnderline />
        <Type value="movies" onMouseEnter={() => handleHover("enter")} onMouseLeave={() => handleHover("leave")}>
          Movies
        </Type>
        <Type value="tv" onMouseEnter={() => handleHover("enter")} onMouseLeave={() => handleHover("leave")}>
          TV Shows
        </Type>
        <Type value="people" onMouseEnter={() => handleHover("enter")} onMouseLeave={() => handleHover("leave")}>
          People
        </Type>
      </TypesContainer>
    </PopularItemsTypeSelectorContainer>
  );
}

const PopularItemsTypeSelectorContainer = styled.div`
  border: 2px solid;
  display: flex;
  position: relative;
`;

const Title = styled.h1``;

const TypesContainer = styled.div`
  display: flex;
`;

const Type = styled.div`
  padding: 1;
  color: ${(props) => (props.active ? "black" : "gray")};
`;

const TypesSlidingUnderline = styled.div`
  height: 2px;
  width: 100px;
  background-color: orange;
  position: absolute;
  top: 50%;
  bottom: 10%;
`;
