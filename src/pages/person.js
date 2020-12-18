import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";

export default function Person() {
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const id = URLparam.get("id");

  const [personData, setPersonData] = useState();

  const apiQuery = `https://api.themoviedb.org/3/person/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;

  useEffect(() => {
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        setPersonData(result);
      });
  });

  return (
    <Layout>
      <Container>
        <>{JSON.stringify(personData)}</>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
`;
