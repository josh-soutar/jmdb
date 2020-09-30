import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";

const CastContainer = styled.div`
  display: flex;
`;

export default function Cast({ cast }) {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=674d2d5130dd9ac19dc844ac2be0895a`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }, [id]);

  return <CastContainer></CastContainer>;
}
