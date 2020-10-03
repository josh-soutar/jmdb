import React, { useState, useEffect } from "react";
import styled from "@xstyled/styled-components";
import Layout from "../layout";
import PopularMovies from "../components/molecules/PopularMovies";
import HomepageSearch from "../components/molecules/HomepageSearch";

const MovieListOuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MovieListInnerContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2;
`;

const SearchText = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const SearchTextHeading = styled.h1`
  font-weight: bold;
`;

const SearchTextSubheading = styled.h3``;

const SearchOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-image: ${(props) => props.bgImage};
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;
  height: calc(100vh / 2.5);
  max-height: 360px;
`;

const SearchInnerContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function IndexPage() {
  const [searchBannerImg, setSearchBannerImg] = useState("");

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=674d2d5130dd9ac19dc844ac2be0895a"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const randomIndex = _getRandomInt(result.results.length);
        const trendingMovie = result.results[randomIndex];
        setSearchBannerImg(
          `linear-gradient(to right, rgba(51,51,51,1) 0%, rgba(51,51,51, 0.75) 50%, rgba(51,51,51, 1) 100%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${trendingMovie.backdrop_path})`
        );
      });
  }, []);

  return (
    <Layout>
      <SearchOuterContainer bgImage={searchBannerImg}>
        <SearchInnerContainer>
          <SearchText>
            <SearchTextHeading>Josh's Movie Database</SearchTextHeading>
            <SearchTextSubheading>
              The #2 source for Movie, TV and celebrity content
            </SearchTextSubheading>
          </SearchText>
          <HomepageSearch />
        </SearchInnerContainer>
      </SearchOuterContainer>

      <MovieListOuterContainer>
        <MovieListInnerContainer>
          <PopularMovies />
        </MovieListInnerContainer>
      </MovieListOuterContainer>
    </Layout>
  );

  function _getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
