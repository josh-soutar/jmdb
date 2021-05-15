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
            <ListItem
              key={index}
              first={index === 0}
              last={index + 1 === result.results.length}
              className="ListItem"
            >
              <StyledLink to={url} className="StyledLink">
                <Item type={item_category} item={thisItem} />
              </StyledLink>
            </ListItem>
          );
        });
        setItems(tempItemData);
      });
  }, [item_category]);

  return <ListContainer className="ListContainer">{items}</ListContainer>;
}

const ListContainer = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  list-style: none;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const ListItem = styled.div`
  margin: 1;
  ${({ first }) => first && `margin: 10px 10px 10px 0;`}
  ${({ last }) => last && `margin: 10px 0 10px 10px;`}
`;

const StyledLink = styled(Link)`
  height: 100%;
`;
