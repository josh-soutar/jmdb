import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Item from "../../atoms/Item";
import PersonCreditsList from "../../atoms/PersonCreditsList";
import { Link } from "gatsby";

export default function PersonKnownForAndCredits({ personId, knownFor }) {
  const [knownForList, setKnownForList] = useState(undefined);
  const [groupedCredits, setGroupedCredits] = useState(undefined);
  //const [sortedCredits, setSortedCredits] = useState(undefined);
  const [creditsWithoutDate, setCreditsWithoutDate] = useState([]);

  useEffect(() => {
    const apiQuery = `https://api.themoviedb.org/3/person/${personId}}/combined_credits?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        getPopularCredits(result);
        groupCreditsByDate(result);
      });
  }, [personId]);

  // Converts date format from YYYY-MM-DD to YYYYMMDD,
  // removes empty date values from credits array and
  // sorts in descending order, grouped by year
  function groupCreditsByDate(credits) {
    const creditsWithoutDate = [];

    // Use reduce to iterate through all credits
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

    //Group credits by year
    const groupedCreditsObj = {};
    for (let i = 0; i < filteredCredits.length; i++) {
      let this_credit = filteredCredits[i];
      let release_year = this_credit.standardised_date.substring(0, 4);
      let title_id = this_credit.id;

      //If the keys don't exist yet, create them
      if (!groupedCreditsObj.hasOwnProperty(release_year)) {
        //Create an object for the year key
        groupedCreditsObj[release_year] = {
          year: release_year,
          credits: {}, //Credit object will contain a key for each title_id. key value is an array. This allows for users with multiple roles in the same title
        };
      }
      if (!groupedCreditsObj[release_year].credits.hasOwnProperty(title_id)) {
        //Create an array to store credits for this title.
        groupedCreditsObj[release_year].credits[title_id] = [this_credit];
      }
      //If there are multiple credits for the same title, add each credit to the title array
      else {
        groupedCreditsObj[release_year].credits[title_id].push(this_credit);
      }
    }

    const groupedCreditsArr = [];
    //convert groupedCreditsObj to an array where each element is an object for each year
    for (const year in groupedCreditsObj) {
      groupedCreditsArr.push(groupedCreditsObj[year]);
    }

    setGroupedCredits(groupedCreditsArr);
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
        let this_credit = mostPopularCredits[i];

        if (this_credit.media_type === "movie") {
          url += "movies&id=" + this_credit.id;
        } else if (this_credit.media_type === "tv") {
          url += "tv&id=" + this_credit.id;
        }
        this_credit.url = url;
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

      {groupedCredits && creditsWithoutDate && (
        <PersonCreditsList
          credits={groupedCredits}
          creditsWithoutDate={creditsWithoutDate}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  font-weight: bold;
  font-size: 5;
  padding: 2 0;
`;

const Subheading = styled.h3`
  font-weight: bold;
  font-size: 2;
`;

const KnownFor = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 0 1 0;
`;

const ListItem = styled.div`
  margin: 0 10px 0 10px;
  ${({ first }) => first && `margin: 0 10px 0 0;`}
  ${({ last }) => last && `margin: 0 0 10px 0;`}
`;

const StyledLink = styled(Link)`
  height: 100%;
`;
