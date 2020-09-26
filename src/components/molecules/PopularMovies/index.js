import React, { useState, useEffect } from "react"
import styled from "@xstyled/styled-components"

import Movie from "../../atoms/Movie"


const MovieList = styled.ul`
display: flex;
list-style: none;
flex-wrap: wrap;
`

export default function PopularMovies() {

    const [movies, setMovies] = useState([])
    const poster_url = localStorage.getItem("poster_url");

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
            .then(res => res.json())
            .then(
                (result) => {
                    let tempMovieData = result.results.map((thisMovie, index) => {
                        return (
                            <li key={index}>
                                <Movie movie={thisMovie} posterUrl={poster_url} />
                            </li>
                        )
                    })

                    setMovies(tempMovieData)

                }
            )

    }, [])


    return (
        <>
            <MovieList>
                {movies}
            </MovieList>
        </>
    )

}