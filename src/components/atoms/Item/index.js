import React from "react";
import styled from "@xstyled/styled-components";

export default function Item({ type, item, first, last }) {
  const poster_url = localStorage.getItem("poster_url");

  //Standardise object keys
  const keyMap = {
    title: "",
    poster_path: "",
  };

  switch (type) {
    case "movies":
    case "movie":
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

  const bgImageUrl = `url(${poster_url}${item[keyMap.poster_path]})`;

  return (
    <ItemContainer first={first} last={last} className="ItemContainer">
      <Poster bgImageUrl={bgImageUrl} />
      <Title>{item[keyMap.title]}</Title>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  background-color: white;
  height: 100%;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.3s;
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
  font-weight: 600;
`;
