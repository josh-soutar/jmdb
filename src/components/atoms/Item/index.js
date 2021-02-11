import React from "react";
import styled from "@xstyled/styled-components";

const ItemContainer = styled.div`
  margin: 1;
  ${({ first }) => first && `margin: 10px 10px 10px 0;`}
  ${({ last }) => last && `margin: 10px 0 10px 10px;`}
  background-color: white;
  padding: 2 2 0 2;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    border: 1px solid #d3d9dd;
  }
`;

const Poster = styled.div`
  width: 200px;
  height: 300px;
  background-image: ${(props) => props.bgImageUrl};
  background-size: contain;
  background-repeat: no-repeat;
  background-style: cover;
`;

const Title = styled.div`
  font-size: 3;
  padding: 1;
  font-weight: 500;
`;

export default function Item({ type, item, posterUrl, first, last }) {
  //Standardise object keys
  const keyMap = {
    title: "",
    poster_path: "",
  };

  switch (type) {
    case "movies":
      keyMap.title = "title";
      keyMap.poster_path = "poster_path";
      break;
    case "tv":
      keyMap.title = "name";
      keyMap.poster_path = "poster_path";
      break;
    case "people":
      keyMap.title = "name";
      keyMap.poster_path = "profile_path";
      break;
  }

  const bgImageUrl = `url(${posterUrl}${item[keyMap.poster_path]})`;

  return (
    <ItemContainer first={first} last={last}>
      <Poster bgImageUrl={bgImageUrl} />
      <Title>{item[keyMap.title]}</Title>
    </ItemContainer>
  );
}
