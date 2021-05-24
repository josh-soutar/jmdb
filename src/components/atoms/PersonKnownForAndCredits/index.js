import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Item from "../Item";
import { Link } from "gatsby";

export default function PersonKnownForAndCredits({ personId, knownFor }) {
  const [knownForList, setKnownForList] = useState([]);

  const [sortedCredits, setSortedCredits] = useState([]);
  const [creditsWithoutDate, setCreditsWithoutDate] = useState([]);

  useEffect(() => {
    const apiQuery = `https://api.themoviedb.org/3/person/${personId}}/combined_credits?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        getPopularCredits(result);
        sortByDateDesc(result);
      });
  }, [personId]);

  // Converts date format from YYYY-MM-DD to YYYYMMDD,
  // removes empty date values from credits array and
  // sorts in descending order
  function sortByDateDesc(credits) {
    let creditsWithoutDate = [];

    // First use a map function to iterate through all credits
    // and remove empty date values + standardise date key
    const filteredCredits = credits.cast.reduce(function (result, credit) {
      //Standardise keys
      let dateKey = "";
      let titleKey = "";
      if (credit.media_type === "tv") {
        dateKey = "first_air_date";
        titleKey = "name";
      } else if (credit.media_type === "movie") {
        dateKey = "release_date";
        titleKey = "title";
      }

      //Check for entries without a date value
      if (!credit[dateKey]) {
        //Add it to the array of entries without dates & skip adding it to the filteredCredits array
        creditsWithoutDate.push(credit);
      } else {
        let date = credit[dateKey].split("-").join(""); //Remove hyphen from date string
        credit.standardised_date = date;
        credit.standardised_title = credit[titleKey];
        result.push(credit);
      }
      return result;
    }, []);

    //Then sort filtredCredits date values in descending order
    var sortedCredits = filteredCredits.sort(function (a, b) {
      return b.standardised_date.localeCompare(a.standardised_date);
    });

    console.log("sorted date", sortedCredits);
    console.log("no date", creditsWithoutDate);
    setSortedCredits(sortedCredits);
    setCreditsWithoutDate(creditsWithoutDate);
  }

  //Find 5 most popular credits the person is known for based on their credits
  function getPopularCredits(credits) {
    if (knownFor === "Acting") {
      //Sort acting credits by popularity
      var mostPopularCredits = credits.cast.sort(function (a, b) {
        return b.popularity - a.popularity;
      });

      //Get 5 most popular credits
      mostPopularCredits = mostPopularCredits.slice(0, 5);

      //Generate URL key for items in mostPopularCredits
      let i = 0;
      while (i < mostPopularCredits.length) {
        let url = "/title?type=";
        let thisCredit = mostPopularCredits[i];

        if (thisCredit.media_type === "movie") {
          url += "movies&id=" + thisCredit.id;
        } else if (thisCredit.media_type === "tv") {
          url += "tv&id=" + thisCredit.id;
        }
        thisCredit.url = url;
        i++;
      }
      setKnownForList(mostPopularCredits);
    }
  }

  return (
    <Container>
      <Heading>Known For</Heading>
      <KnownFor>
        {knownForList &&
          knownForList.map((credit, index) => (
            <ListItem
              key={index}
              first={index === 0}
              last={index === knownForList.length + 1}
            >
              <StyledLink to={credit.url}>
                <Item type={credit.media_type} item={credit}></Item>
              </StyledLink>
            </ListItem>
          ))}
      </KnownFor>

      <Heading>Credits</Heading>

      <Credits>
        <ul>
          {sortedCredits &&
            sortedCredits.map((credit, index) => (
              <li key={index}>{credit.standardised_title}</li>
            ))}
        </ul>
      </Credits>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  font-weight: bold;
`;

const Subheading = styled.h3`
  font-weight: bold;
  font-size: 2;
`;

const KnownFor = styled.div`
  display: flex;
  overflow-x: auto;
`;

const ListItem = styled.div`
  margin: 1;
  ${({ first }) => first && `margin: 10px 10px 10px 0;`}
  ${({ last }) => last && `margin: 10px 0 10px 10px;`}
`;

const StyledLink = styled(Link)`
  height: 100%;
`;

const Credits = styled.div``;
