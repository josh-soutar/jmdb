import React from "react";
import styled from "@xstyled/styled-components";
import { Link } from "gatsby";

const ActorContainer = styled.div`
  border-radius: 2px;
  margin: 1;
  margin-left: ${(props) => (props.first ? "0" : "10px")};
  background-color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const TextContainer = styled.div`
  padding: 1;
`;

const CharacterName = styled.div``;

const ActorName = styled.div`
  font-weight: bold;
`;

const Headshot = styled.div`
  background-image: ${(props) => props.bgImageUrl};
  width: 140px;
  height: 175px;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Actor({ actor, first }) {
  let headshotURL;
  if (actor.profile_path) {
    headshotURL = `https://image.tmdb.org/t/p/w138_and_h175_face${actor.profile_path}`;
  } else {
    headshotURL =
      "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
  }

  return (
    <ActorContainer first={first}>
      <Link to={`/person?id=${actor.id}`}>
        <Headshot bgImageUrl={"url(" + headshotURL + ")"}></Headshot>
        <TextContainer>
          <ActorName>{actor.name}</ActorName>
          <CharacterName>{actor.character}</CharacterName>
        </TextContainer>
      </Link>
    </ActorContainer>
  );
}
