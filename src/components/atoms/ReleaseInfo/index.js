import React from "react";
import styled from "@xstyled/styled-components";
import NumberFormat from "react-number-format";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1;
  margin-top: 35px;
  border: 1px solid lightgrey;
  background-color: white;
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

export default function ReleaseInfo({ type, titleData }) {
  return (
    <Container>
      <InfoContainer>
        <Heading>Status</Heading>
        <Text>{titleData.status}</Text>
      </InfoContainer>

      {titleData.hasOwnProperty("networks") && titleData.networks && (
        <InfoContainer>
          {titleData.networks.length === 1 ? (
            <Heading>Network</Heading>
          ) : (
            <Heading>Networks</Heading>
          )}
          {titleData.networks.map((network, index) => (
            <Text key={index}>{network.name}</Text>
          ))}
        </InfoContainer>
      )}

      {titleData.hasOwnProperty("budget") && titleData.budget != "" && (
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

      {titleData.hasOwnProperty("revenue") && titleData.revenue != "" && (
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

      {titleData.hasOwnProperty("production_countries") &&
        titleData.production_countries && (
          <InfoContainer>
            <Heading>Production countries</Heading>
            {titleData.production_countries.map((country, index) => (
              <Text key={index}>{country.name}</Text>
            ))}
          </InfoContainer>
        )}

      {titleData.hasOwnProperty("production_companies") &&
        titleData.production_companies && (
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
