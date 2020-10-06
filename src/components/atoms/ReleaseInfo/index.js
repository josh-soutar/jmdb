import React from "react";
import styled from "@xstyled/styled-components";
import NumberFormat from "react-number-format";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  padding: 1;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1;
`;

const Heading = styled.h3`
  font-weight: bold;
  font-size: 3;
`;

const Text = styled.div``;

export default function ReleaseInfo({ titleData }) {
  return (
    <Container>
      <InfoContainer>
        <Heading>Status</Heading>
        <Text>{titleData.status}</Text>
      </InfoContainer>

      {titleData.budget != 0 && (
        <InfoContainer>
          <Heading>Budget</Heading>
          <NumberFormat
            value={titleData.budget}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </InfoContainer>
      )}

      {titleData.revenue != 0 && (
        <InfoContainer>
          <Heading>Box office</Heading>
          <NumberFormat
            value={titleData.revenue}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </InfoContainer>
      )}

      {titleData.production_countries && (
        <InfoContainer>
          <Heading>Production countries</Heading>
          {titleData.production_countries.map((country, index) => (
            <Text key={index}>{country.name}</Text>
          ))}
        </InfoContainer>
      )}

      {titleData.production_companies && (
        <InfoContainer>
          <Heading>Production companies</Heading>
          {titleData.production_companies.map((company, index) => (
            <Text key={index}>{company.name}</Text>
          ))}
        </InfoContainer>
      )}
    </Container>
  );
}
