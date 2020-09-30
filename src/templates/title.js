import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";
import { DateTime, Duration } from "luxon";
import ColorThief from "colorthief";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ActionButton from "../components/atoms/ActionButton";

const HeadingContent = styled.div`
  max-width: 1300px;
  width: 100vw;
  display: flex;
`;

const BodyContent = styled.div`
  max-width: 1300px;
  width: 100vw;
  display: flex;
`;

const HeaderContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  display: flex;
  background-position: right -200px top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => props.bgImage};
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
`;
const Title = styled.h1`
  font-weight: bold;
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
`;

const UserScoreContainer = styled.div`
  display: flex;
`;

const UserScoreRating = styled.div``;

const UserScoreText = styled.div``;

const ActionButtons = styled.div`
  display: flex;
`;

const FactsContainer = styled.div`
  display: flex;
  padding: 1 0;
`;

const FactsSeparator = styled.div`
  :before {
    content: "•";
    padding: 0 5px;
    font-weight: bold;
  }
`;

const RunTime = styled.div``;

const ReleaseDate = styled.div``;

const Genres = styled.div`
  display: flex;
`;

const Genre = styled.div`
  ${({ last }) =>
    !last &&
    `
    padding-right: 5px;
    :after {
      content: ",";
    }
`}
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

const PosterContainer = styled.div``;

const Poster = styled.div`
  width: 300px;
  min-width: 300px;
  height: 450px;
  background-image: ${(props) => props.bgImageUrl};
  background-size: contain;
  background-repeat: no-repeat;
`;

export default function ViewTitle() {
  //If the url is formatted as a query string (contains a '?' followed by query params), we can use URLSearchParams to extract value easily
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const id = URLparam.get("id");

  const colorThief = new ColorThief();
  const img = new Image();

  const [titleData, setTitleData] = useState({ genres: [] }); //initialises with genres key so we don't get a js error in the map function on initial load
  const [isLoading, setIsLoading] = useState(false);
  const [headerBgImage, setHeaderBgImage] = useState();
  const [headerBgGradient, setHeaderBgGradient] = useState();

  img.addEventListener("load", function () {
    const RGB = colorThief.getColor(img, 100);
    const backgroundGradient = `linear-gradient(to right, rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]}, 1) 150px, rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]}, 0.5) 100%)`;
    setHeaderBgGradient(backgroundGradient);

    setIsLoading(false);
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        const titleBackdrop = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${result.backdrop_path}`;
        img.crossOrigin = "Anonymous"; //Cross origin needs to come before src!!
        img.src = titleBackdrop;

        result.runtime = Duration.fromObject({
          minutes: result.runtime,
        }).toFormat("h'h' m'm'");
        result.release_date = DateTime.fromISO(
          result.release_date
        ).toLocaleString(DateTime.DATE_FULL);
        setTitleData(result);
        setHeaderBgImage(`url('${titleBackdrop}')`);
      });
  }, [id]);

  const poster_url = `url(${localStorage.getItem("poster_url")}${
    titleData.poster_path
  })`;

  return (
    <Layout>
      {isLoading ? (
        <LoadingContainer>
          <StyledIcon icon="spinner" pulse />
          <> it's LOADING, ok? </>
        </LoadingContainer>
      ) : (
        <>
          <HeaderContainer bgImage={headerBgImage}>
            <HeaderInnerContainer bgGradient={headerBgGradient}>
              <HeadingContent>
                <Poster bgImageUrl={poster_url} />
                <SummaryInfo>
                  <Title>{titleData.title}</Title>

                  <FactsContainer>
                    <ReleaseDate>{titleData.release_date}</ReleaseDate>
                    <FactsSeparator />
                    <Genres>
                      {titleData.genres.map((genre, index) => {
                        return (
                          <Genre
                            key={index}
                            last={index + 1 === titleData.genres.length}
                          >
                            {genre.name}
                          </Genre>
                        );
                      })}
                    </Genres>
                    <FactsSeparator />
                    <RunTime>{titleData.runtime}</RunTime>
                  </FactsContainer>

                  <ScoreAndActions>
                    <UserScoreContainer>
                      <UserScoreRating>
                        {titleData.vote_average}
                      </UserScoreRating>
                      <UserScoreText>User Score</UserScoreText>
                    </UserScoreContainer>

                    <ActionButtons>
                      <ActionButton icon={["far", "list-alt"]} />
                      <ActionButton icon="heart" />
                      <ActionButton icon="bookmark" />
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
            <BodyContent>this is the body</BodyContent>
          </BodyContainer>
        </>
      )}
    </Layout>
  );
}
