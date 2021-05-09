import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Item from "../Item";

export default function PersonKnownForAndCredits({ personId, knownFor }) {
  const [knownForList, setKnownForList] = useState([]);

  useEffect(() => {
    const apiQuery = `https://api.themoviedb.org/3/person/${personId}}/combined_credits?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        getPopularCredits(result);
      });
  }, [personId]);

  //Find 5 most popular credits the person is known for based on their credits
  function getPopularCredits(credits) {
    if (knownFor === "Acting") {
      //Sort acting credits by popularity
      var mostPopularCredits = credits.cast.sort(function (x, y) {
        return y.popularity - x.popularity;
      });

      ////Get 5 most popular credits
      mostPopularCredits = mostPopularCredits.slice(0, 5);

      setKnownForList(mostPopularCredits);

      console.log("original ", credits);
      console.log("state one ", knownForList);
    }
  }

  return (
    <Container>
      <Heading>Known For</Heading>
      <KnownFor>
        {knownForList &&
          knownForList.map((credit, index) => (
            <Item
              key={index}
              type={credit.media_type}
              item={credit}
              first={index === 0}
              last={index === knownForList.length + 1}
            ></Item>
          ))}
      </KnownFor>

      <Heading>Credits</Heading>

      <Credits>
        <Subheading>Acting</Subheading>

        <Subheading>Production</Subheading>
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
  max-width: 500px;
`;

const Credits = styled.div``;
