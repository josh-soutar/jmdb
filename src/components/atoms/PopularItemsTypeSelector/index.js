import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

export default function PopularItemsTypeSelector() {
  const titleRef = React.createRef();
  const containerRef = React.createRef();
  const ref1 = React.createRef(); //Movies
  const ref2 = React.createRef(); //TV Shows
  const ref3 = React.createRef(); //People
  const [underlineX, setUnderlineX] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [xStart, setXStart] = useState(0);

  useEffect(() => {
    setXStart(titleRef.current.getBoundingClientRect().right);
    setUnderlineWidth(Math.ceil(ref1.current.getBoundingClientRect().width));
  }, []);

  function handleHover(e, direction) {
    let eLeft = e.current.getBoundingClientRect().left;
    setUnderlineX(eLeft - xStart);
    setUnderlineWidth(Math.ceil(e.current.getBoundingClientRect().width));
  }

  return (
    <PopularItemsTypeSelectorContainer ref={containerRef}>
      <Title ref={titleRef}>Popular </Title>
      <TypesContainer>
        <TypesSlidingUnderline underlineX={underlineX + "px"} underlineWidth={underlineWidth + "px"}></TypesSlidingUnderline>
        <Type value="movies" ref={ref1} onMouseEnter={() => handleHover(ref1, "enter")} onMouseLeave={() => handleHover(ref1, "leave")}>
          Movies
        </Type>
        <Type value="tv" ref={ref2} onMouseEnter={() => handleHover(ref2, "enter")} onMouseLeave={() => handleHover(ref2, "leave")}>
          TV Shows
        </Type>
        <Type value="people" ref={ref3} onMouseEnter={() => handleHover(ref3, "enter")} onMouseLeave={() => handleHover(ref3, "leave")}>
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
  position: relative;
`;

const Type = styled.div`
  padding: 1;
  color: ${(props) => (props.active ? "black" : "gray")};
`;

const TypesSlidingUnderline = styled.div`
  height: 2px;
  width: ${(props) => props.underlineWidth};
  background-color: orange;
  position: absolute;
  bottom: 10%;
  left: ${(props) => props.underlineX};
  transition: all 0.3s;
`;
