import React from "react"
import styled, { Box } from "@xstyled/styled-components"

const MovieContainer = styled.div`
margin: 1;
`

const Poster = styled.div`
width: 200px;
height: 300px;
background-image: ${props => props.bgImageUrl};
background-size: contain;
background-repeat: no-repeat;
background-style: cover;
`

const Title = styled.div`
font-size: 3;
`

export default function Movie({ movie, posterUrl }) {
    const bgImageUrl = `url(${posterUrl}${movie.poster_path})`

    return (
        <MovieContainer>
            <Poster bgImageUrl={bgImageUrl} />
            <Title>{movie.title}</Title>
        </MovieContainer>

    )
}