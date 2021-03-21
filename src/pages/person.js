import React, { useState, useEffect, useRef } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";

export default function Person() {
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const id = URLparam.get("id");
  const apiQuery = `https://api.themoviedb.org/3/person/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;

  const [personData, setPersonData] = useState();
  const [posterUrl, setPosterUrl] = useState();
  const [bio, setBio] = useState({
    btn_label: "",
    text: "",
  });
  const [bioCharacterLimit, setBioCharacterLimit] = useState(500);
  const [fullBioOverCharacterLimit, setFullBioOverCharacterLimit] = useState(false);

  useEffect(() => {
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        setPersonData(result);
        setPosterUrl("url(" + localStorage.getItem("poster_url") + result.profile_path + ")");
        console.log("person data is ", result);

        let bioText = result.biography;
        if (bioText.length > bioCharacterLimit) {
          setFullBioOverCharacterLimit(true);
          bioText = bioText.substring(0, bioCharacterLimit) + "...";
        }
        setBio({
          btn_label: "Show more",
          text: bioText,
        });
      });
  }, [id]);

  function handleBioClick() {
    //If bio is already showing the full text, show less
    if (bio.btn_label === "Show less") {
      setBio({
        btn_label: "Show more",
        text: personData.biography.substring(0, bioCharacterLimit) + "...",
      });
    } else {
      //If bio is currently showing the cut down text, show more
      setBio({
        btn_label: "Show less",
        text: personData.biography, //Reset to full text
      });
    }
  }

  return (
    <Layout>
      <OuterContainer>
        <Container>
          {personData && (
            <>
              <HeadShot bgImageUrl={posterUrl} />
              <PersonalInfo>
                <AreaHeading>Personal Info</AreaHeading>
                <PIHeading>Known For</PIHeading>
                <PIData>{personData.known_for_department}</PIData>
                <PIHeading>Gender </PIHeading>
                <PIData>{personData.gender}</PIData>
                <PIHeading>Birthday</PIHeading>
                <PIData>{personData.birthday}</PIData>
                <PIHeading>Origin</PIHeading>
                <PIData>{personData.place_of_birth}</PIData>
              </PersonalInfo>

              <Name>{personData.name}</Name>

              <Bio>
                <AreaHeading>Biography</AreaHeading>
                <>
                  <BioText>{bio.text}</BioText>

                  {fullBioOverCharacterLimit && (
                    <BioShowMoreToggle
                      onClick={() => {
                        handleBioClick();
                      }}
                    >
                      {bio.btn_label}
                    </BioShowMoreToggle>
                  )}
                </>
              </Bio>
              <KnownFor>
                <AreaHeading>Known For</AreaHeading>
              </KnownFor>
              <Credits>
                <AreaHeading>Credits</AreaHeading>
              </Credits>
            </>
          )}
        </Container>
      </OuterContainer>
    </Layout>
  );
}

const OuterContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 50px auto;
`;

const Container = styled.div`
  display: grid;
  gap: 15px 30px;
  grid-template-columns: 200px 1fr;
  grid-auto-rows: auto;
  grid-template-areas:
    "headshot name"
    "headshot bio"
    "headshot known_for"
    "personal_info credits";
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

const Name = styled.h2`
  font-weight: bold;
  grid-area: name;
`;
const Bio = styled.div`
  grid-area: bio;
`;

const BioShowMoreToggle = styled.div`
  display: inline-block;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const BioText = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 1;
`;
const KnownFor = styled.div`
  grid-area: known_for;
  display: flex;
`;
const Credits = styled.div`
  grid-area: credits;
`;

const AreaHeading = styled.h3`
  font-weight: bold;
`;
