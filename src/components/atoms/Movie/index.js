import React from "react";
import styled, { Box } from "@xstyled/styled-components";

const MovieContainer = styled.div`
  margin: 1;
  ${({ first }) => first && `margin: 10px 10px 10px 0;`}
  ${({ last }) => last && `margin: 10px 0 10px 10px;`}
  background-color: white;
  padding: 2 2 0 2;
  text-align: center;
  border-radius: 3px;
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
  font-weight: 800;
`;

export default function Movie({ movie, posterUrl, first, last }) {
  const bgImageUrl = `url(${posterUrl}${movie.poster_path})`;

  return (
    <MovieContainer first={first} last={last}>
      <Poster bgImageUrl={bgImageUrl} />
      <Title>{movie.title}</Title>
    </MovieContainer>
  );
}
