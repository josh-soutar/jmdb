import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

import Actor from "../../atoms/Actor";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
`;

const CastContainer = styled.div`
  display: flex;
  align-items: stretch;
  overflow-x: auto;
  margin-right: 1;
  padding-bottom: 1;
`;

const Heading = styled.h2`
  font-weight: bold;
`;

export default function Cast({ type, title_id }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    let apiQuery;
    switch (type) {
      default:
      case "movies":
        apiQuery = `https://api.themoviedb.org/3/movie/${title_id}/credits?api_key=674d2d5130dd9ac19dc844ac2be0895a`;
        break;
      case "tv":
        apiQuery = `https://api.themoviedb.org/3/tv/${title_id}/credits?api_key=674d2d5130dd9ac19dc844ac2be0895a&language`;
        break;
    }

    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCast(result.cast);
      });
  }, [title_id]);

  return (
    <Container>
      <Heading>Cast</Heading>
      <CastContainer className="castContainer">
        {cast &&
          cast.map((actor, index) => {
            return <Actor key={index} first={index == 0} actor={actor} />;
          })}
      </CastContainer>
    </Container>
  );
}
