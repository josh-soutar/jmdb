import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Item from "../../atoms/Item";
import { Link } from "gatsby";

export default function PopularItemsList({ item_category }) {
  const [items, setItems] = useState([]);
  const poster_url = localStorage.getItem("poster_url"); //TO DO: Update to use redux?
  let apiQuery;
  let link;

  useEffect(() => {
    switch (item_category) {
      default:
      case "movies":
        apiQuery = "https://api.themoviedb.org/3/discover/movie?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&sort_by=popularity.desc&page=1";
        break;
      case "tv":
        apiQuery = "https://api.themoviedb.org/3/discover/tv?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&sort_by=popularity.desc&page=1";
        break;
      case "people":
        apiQuery = "https://api.themoviedb.org/3/person/popular?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&page=1";
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
                <Item type={item_category} item={thisItem} first={index === 0} last={index + 1 === result.results.length} posterUrl={poster_url} />
              </Link>
            </li>
          );
        });
        setItems(tempItemData);
      });
  }, [item_category]);

  return <Container>{items}</Container>;
}

const Container = styled.div`
  display: flex;
  list-style: none;
`;
