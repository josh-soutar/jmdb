import React from "react";
import styled from "@xstyled/styled-components";
import PersonCredits from "../../atoms/PersonCredits";

const ResultsListItem = styled.li`
  border: 1px solid;
  margin: 1 0;
  display: flex;
  padding: 1;
`;

const Title = styled.div`
  font-weight: bold;
  padding-bottom: 1;
`;

const Overview = styled.div``;

const Poster = styled.div`
  min-width: 94px;
  min-height: 141px;
  background-image: ${(props) => props.imageUrl};
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1;
`;

export default function SearchResultItem({ type, data }) {
  /* Movies/TV SHows/People have different key names for their data
  resultKeyMaps standardises key names across all result types*/
  const keyMap = {
    name: "", // Could be 'title' or 'name'
  };

  if (type == "Movies" || (type === "All" && data.media_type === "movie")) {
    keyMap.name = "title";
    data.imagePath = data.poster_path
      ? `url('https://image.tmdb.org/t/p/w94_and_h141_bestv2${data.poster_path}')`
      : "url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg')";
  } else if (type === "TV Shows" || (type === "All" && data.media_type === "tv")) {
    keyMap.name = "name";
    data.imagePath = data.poster_path
      ? `url('https://image.tmdb.org/t/p/w94_and_h141_bestv2${data.poster_path}')`
      : "url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg')";
  } else if (type === "People" || (type === "All" && data.media_type === "person")) {
    keyMap.name = "name";
    data.imagePath = data.profile_path
      ? `url('https://image.tmdb.org/t/p/w94_and_h141_bestv2${data.profile_path}')`
      : "url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg')";
  }

  return (
    <ResultsListItem className="searchResult">
      <Poster imageUrl={data.imagePath}></Poster>

      <TextSection>
        <Title>{data[keyMap.name]}</Title>
        {type !== "People" && <Overview>{data.overview}</Overview>}
        {type === "People" && (
          <Overview>
            <PersonCredits department={data.known_for_department} known_for={data.known_for}></PersonCredits>
          </Overview>
        )}
      </TextSection>
    </ResultsListItem>
  );
}
