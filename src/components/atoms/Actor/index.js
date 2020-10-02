import React from "react";
import styled, { Box } from "@xstyled/styled-components";

const ActorContainer = styled.div`
  border: 1px solid;
  border-radius: 2px;
  margin: 1;
  padding: 2;
`;

const CharacterName = styled.div``;

const ActorName = styled.div`
  font-weight: bold;
`;

export default function Actor({ actor }) {
  return (
    <ActorContainer>
      <ActorName>{actor.name}</ActorName>
      <CharacterName>{actor.character}</CharacterName>
    </ActorContainer>
  );
}
