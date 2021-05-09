import React, { useState, useEffect } from "react";
import styled, { css } from "@xstyled/styled-components";
import Layout from "../layout";
import PersonBio from "../components/atoms/PersonBio";
import PersonKnownForAndCredits from "../components/atoms/PersonKnownForAndCredits";

export default function Person() {
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const id = URLparam.get("id");

  const [personData, setPersonData] = useState();
  const [posterUrl, setPosterUrl] = useState();
  const [bioData, setBioData] = useState();

  useEffect(() => {
    const apiQuery = `https://api.themoviedb.org/3/person/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        //console.log("Person data", result);
        setPersonData(result);
        setPosterUrl(
          "url(" +
            localStorage.getItem("poster_url") +
            result.profile_path +
            ")"
        );
        setBioData(result.biography);
      });
  }, [id]);

  return (
    <Layout>
      <OuterContainer>
        {personData && (
          <>
            <LeftContainer>
              <HeadShot bgImageUrl={posterUrl} />
              <PersonalInfo>
                <PersonalInfoTitle>Personal Info</PersonalInfoTitle>
                <PIHeading>Known For</PIHeading>
                <PIData>{personData.known_for_department}</PIData>
                <PIHeading>Gender </PIHeading>
                <PIData>
                  {personData.gender && personData.gender === "1" ? (
                    <>Female</>
                  ) : (
                    <>Male</>
                  )}
                </PIData>
                <PIHeading>Birthday</PIHeading>
                <PIData>{personData.birthday}</PIData>
                <PIHeading>Origin</PIHeading>
                <PIData>{personData.place_of_birth}</PIData>
              </PersonalInfo>
            </LeftContainer>

            <RightContainer>
              <Name>
                <h2>{personData.name}</h2>
              </Name>
              {bioData && <PersonBio bioData={bioData} />}
              <PersonKnownForAndCredits
                personId={personData.id}
                knownFor={personData.known_for_department}
              />
            </RightContainer>
          </>
        )}
      </OuterContainer>
    </Layout>
  );
}

const OuterContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 50px auto;
  display: flex;
`;

const sharedGridCss = css`
  display: grid;
  grid-gap: 20px;
  align-items: start;
  grid-auto-rows: min-content;
`;

const LeftContainer = styled.div`
  ${sharedGridCss}
  grid-template-columns: 200px;
  grid-template-areas:
    "headshot"
    "personal_info";
`;

const RightContainer = styled.div`
  ${sharedGridCss}
  margin-left: 20px;
  grid-template-columns: auto;
`;

const HeadShot = styled.div`
  width: 200px;
  height: 300px;
  background-image: ${(props) => props.bgImageUrl};
  background-size: contain;
  background-repeat: no-repeat;
  background-style: cover;
  border-radius: 4px;
  grid-area: headshot;
`;

const PersonalInfo = styled.div`
  grid-area: personal_info;
`;

const PIHeading = styled.div`
  font-weight: bold;
`;
const PIData = styled.div``;

const Name = styled.div`
  font-weight: bold;
  font-size: 8;
`;

const PersonalInfoTitle = styled.h3`
  font-weight: bold;
  padding-bottom: 2;
`;
