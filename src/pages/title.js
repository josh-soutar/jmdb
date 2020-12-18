import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";
import ColorThief from "colorthief";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ActionButton from "../components/atoms/ActionButton";
import TitleFacts from "../components/atoms/TitleFacts";
import Cast from "../components/molecules/Cast";
import RatingDial from "../components/atoms/RatingDial";
import ReleaseInfo from "../components/atoms/ReleaseInfo";
import { Spring } from "react-spring/renderprops";

export default function ViewTitle() {
  //If the url is formatted as a query string (contains a '?' followed by query params), we can use URLSearchParams to extract value easily
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const id = URLparam.get("id");
  const type = URLparam.get("type");

  const colorThief = new ColorThief();
  const img = new Image();

  const [titleData, setTitleData] = useState({ genres: [] }); //initialises with genres key so we don't get a js error in the map function on initial load
  const [isLoading, setIsLoading] = useState(true);
  const [headerBgImage, setHeaderBgImage] = useState();
  const [headerBgGradient, setHeaderBgGradient] = useState();
  const [headerIsDark, setHeaderIsDark] = useState(false);

  img.addEventListener("load", function () {
    const RGB = colorThief.getColor(img, 100);
    setHeaderIsDark(_isDark(RGB));
    const backgroundGradient = `radial-gradient(rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]}, 0.8) 50%, rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]}, 0.5))`;
    setHeaderBgGradient(backgroundGradient);
    setIsLoading(false);
  });

  useEffect(() => {
    let apiQuery;
    switch (type) {
      default:
      case "movies":
        apiQuery = `https://api.themoviedb.org/3/movie/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;
        break;
      case "tv":
        apiQuery = `https://api.themoviedb.org/3/tv/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`;
        break;
    }
    fetch(apiQuery)
      .then((res) => res.json())
      .then((result) => {
        const titleBackdrop = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${result.backdrop_path}`;
        img.crossOrigin = "Anonymous"; //Cross origin needs to come before src!!
        img.src = titleBackdrop;
        setTitleData(result);
        setHeaderBgImage(`url('${titleBackdrop}')`);
      });
  }, [id]);

  const poster_url = `url(${localStorage.getItem("poster_url")}${titleData.poster_path})`;

  return (
    <Layout>
      {isLoading ? (
        <LoadingContainer>
          <StyledIcon icon="spinner" pulse />
        </LoadingContainer>
      ) : (
        <>
          <HeaderContainer bgImage={headerBgImage} isDark={headerIsDark}>
            <HeaderInnerContainer bgGradient={headerBgGradient}>
              <HeadingContent>
                <Poster bgImageUrl={poster_url} />
                <SummaryInfo>
                  <Title>{titleData.title}</Title>

                  <TitleFacts genres={titleData.genres} releaseDate={titleData.release_date} runTime={titleData.runtime} />

                  <ScoreAndActions>
                    <UserScoreContainer>
                      <Spring config={{ delay: 300 }} from={{ value: 0 }} to={{ value: titleData.vote_average }}>
                        {(props) => <RatingDial staticScore={titleData.vote_average} animatedScore={props.value}></RatingDial>}
                      </Spring>
                    </UserScoreContainer>

                    <ActionButtons>
                      <ActionButton icon={["far", "list-alt"]} color="white" />
                      <ActionButton icon="heart" color="white" />
                      <ActionButton icon="bookmark" color="white" />
                    </ActionButtons>
                  </ScoreAndActions>

                  <OverviewContainer>
                    <Tagline>{titleData.tagline}</Tagline>
                    <OverviewTitle>Overview</OverviewTitle>
                    <OverviewContent>{titleData.overview}</OverviewContent>
                  </OverviewContainer>
                </SummaryInfo>
              </HeadingContent>
            </HeaderInnerContainer>
          </HeaderContainer>

          <BodyContainer>
            <BodyContent>
              <Cast title_id={titleData.id} />
              <ReleaseInfo titleData={titleData} />
            </BodyContent>
          </BodyContainer>
        </>
      )}
    </Layout>
  );

  function _isDark(rgbArr) {
    const result = (rgbArr[0] * 299 + rgbArr[1] * 587 + rgbArr[2] * 114) / 1000;
    return result < 200; // (0 to 255) Measure of how bright the image's primary colour is.
  }
}

const HeadingContent = styled.div`
  max-width: 1300px;
  width: 100vw;
  display: flex;
`;
const BodyContent = styled.div`
  max-width: 1300px;
  width: 100vw;
  display: flex;
  align-items: flex-start;
`;
const HeaderContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  display: flex;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => props.bgImage};
  color: ${(props) => (props.isDark ? "white" : "black")};
`;
const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3 4;
  width: 100%;
  background-image: ${(props) => props.bgGradient};
`;
const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px;
  display: flex;
`;
const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  justify-content: center;
`;
const Title = styled.h1`
  font-weight: bold;
  padding-bottom: 5px;
`;
const LoadingContainer = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 500px;
  justify-content: center;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1;
`;
const ScoreAndActions = styled.div`
  display: flex;
  align-items: center;
  padding: 2 0;
`;
const UserScoreContainer = styled.div`
  display: flex;
`;
const ActionButtons = styled.div`
  display: flex;
`;
const OverviewContainer = styled.div``;
const Tagline = styled.div`
  font-style: italic;
`;
const OverviewTitle = styled.div`
  font-weight: bold;
  padding: 1 0;
`;
const OverviewContent = styled.div``;
const Poster = styled.div`
  width: 300px;
  min-width: 300px;
  height: 450px;
  background-image: ${(props) => props.bgImageUrl};
  background-size: contain;
  background-repeat: no-repeat;
`;
