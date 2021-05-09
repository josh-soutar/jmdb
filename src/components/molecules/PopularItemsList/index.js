import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Item from "../../atoms/Item";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PopularItemsList({ item_category }) {
  const [items, setItems] = useState([]);
  //const poster_url = localStorage.getItem("poster_url"); //TO DO: Update to use redux?
  let apiQuery;

  useEffect(() => {
    switch (item_category) {
      default:
      case "movies":
        apiQuery =
          "https://api.themoviedb.org/3/discover/movie?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&sort_by=popularity.desc&page=1";
        break;
      case "tv":
        apiQuery =
          "https://api.themoviedb.org/3/discover/tv?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&sort_by=popularity.desc&page=1";
        break;
      case "people":
        apiQuery =
          "https://api.themoviedb.org/3/person/popular?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&page=1";
        break;
    }
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        let tempItemData = result.results.map((thisItem, index) => {
          let url;
          if (item_category == "movies" || item_category == "tv") {
            url = `/title?type=${item_category}&id=${thisItem.id}`;
          } else {
            url = `/person?id=${thisItem.id}`;
          }
          return (
            <li key={index}>
              <Link to={url}>
                {/*<Item type={item_category} item={thisItem} first={index === 0} last={index + 1 === result.results.length} posterUrl={poster_url} /> */}
                <Item
                  type={item_category}
                  item={thisItem}
                  first={index === 0}
                  last={index + 1 === result.results.length}
                />
              </Link>
            </li>
          );
        });
        setItems(tempItemData);
      });
  }, [item_category]);

  return (
    <ListContainer>
      {items}
      {/*
    <ButtonContainer>
      <ListButton position="left">
        <StyledIconReversed icon="caret-square-right" />
      </ListButton>
      <ListButton position="right">
        <FontAwesomeIcon icon="caret-square-right" />
      </ListButton>
    </ButtonContainer>    
    */}
    </ListContainer>
  );
}

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListButton = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid black;
  color: black;
  font-size: 100px;
  display: grid;
  place-content: center;

  ${({ position }) => position === "left" && `//margin-left: -50px;`}

  ${({ position }) => position === "right" && `//margin-right: -50px;`}
`;

const StyledIconReversed = styled(FontAwesomeIcon)`
  transform: rotate(180deg);
`;

const ListContainer = styled.div`
  position: relative;
  display: flex;
  list-style: none;
  overflow-x: hidden;
`;
