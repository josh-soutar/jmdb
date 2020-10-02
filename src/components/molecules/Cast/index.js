import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

import Actor from "../../atoms/Actor";

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Cast({ title_id }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${title_id}/credits?api_key=674d2d5130dd9ac19dc844ac2be0895a`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCast(result.cast);
      });
  }, [title_id]);

  return (
    <CastContainer>
      {cast.map((actor, index) => {
        return <Actor key={index} actor={actor} />;
      })}
    </CastContainer>
  );
}
