import React from "react";
import styled from "@xstyled/styled-components";

const Container = styled.div`
  display: flex;
`;

const CircleSeparator = styled.div`
  :before {
    content: "•";
    padding: 0 5px;
    font-weight: bold;
  }
`;

const Credits = styled.div`
  display: flex;
`;

const Credit = styled.div`
  ${({ last }) =>
    !last &&
    `
    padding-right: 5px;
    :after {
      content: ",";
    }
`}
`;

export default function PersonCredits({ department, known_for }) {
  return (
    <Container>
      <div>{department}</div>
      <CircleSeparator />
      <Credits>
        {known_for &&
          known_for.map((credit, index) => (
            <Credit key={index} last={index + 1 === known_for.length}>
              {credit.media_type == "tv" ? credit.name : credit.title}
            </Credit>
          ))}
      </Credits>
    </Container>
  );
}
