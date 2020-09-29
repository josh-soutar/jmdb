import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";
import { DateTime, Duration } from "luxon";

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
  display: flex;
  justify-content: center;
  padding: 30px;
  display: flex;
  background-color: white;
`;

const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px;
  display: flex;
  background-color: red;
`;

const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
`;
const Title = styled.h1`
  font-weight: bold;
`;

const LoadingContainer = styled.div``;

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
  height: 400px;
  background-image: ${(props) => props.bgImageUrl};
  background-size: contain;
  background-repeat: no-repeat;
  background-style: cover;
`;

export default function ViewTitle() {
  //If the url is formatted as a query string (contains a '?' followed by query params), we can use URLSearchParams to extract value easily
  const URLparam = new URLSearchParams(document.location.search.substring(1));
  const id = URLparam.get("id");

  const [titleData, setTitleData] = useState({ genres: [] }); //initialises with genres key so we don't get a js error in the map function on initial load
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        result.runtime = Duration.fromObject({
          minutes: result.runtime,
        }).toFormat("h'h' m'm'");
        result.release_date = DateTime.fromISO(
          result.release_date
        ).toLocaleString(DateTime.DATE_FULL);
        setTitleData(result);
        setIsLoading(false);
      });
  }, [id]);

  const poster_url = `url(${localStorage.getItem("poster_url")}${
    titleData.poster_path
  })`;

  return (
    <Layout>
      <HeaderContainer>
        {isLoading ? (
          <LoadingContainer>
            <> it's LOADING </>
          </LoadingContainer>
        ) : (
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
                    /*
                    if (index + 1 != titleData.genres.length) {
                      return <Genre key={index}>{genre.name},</Genre>;
                    } else {
                      return <Genre key={index}>{genre.name}</Genre>;
                    }
                    */
                  })}
                </Genres>
                <FactsSeparator />
                <RunTime>{titleData.runtime}</RunTime>
              </FactsContainer>

              <OverviewContainer>
                <Tagline>{titleData.tagline}</Tagline>
                <OverviewTitle>Overview</OverviewTitle>
                <OverviewContent>{titleData.overview}</OverviewContent>
              </OverviewContainer>
            </SummaryInfo>
          </HeadingContent>
        )}
      </HeaderContainer>
      <BodyContainer>
        <BodyContent>this is the body</BodyContent>
      </BodyContainer>
    </Layout>
  );
}
