import React, { useState, useEffect } from "react"
import styled from "@xstyled/styled-components"
import Layout from "../layout"


const HeaderContainer = styled.div`
height: 30vh;
max-height: 800px;
display: flex;
background-color: white;
`

const SummaryInfo = styled.div`
display: flex;
flex-direction: column;
`
const Title = styled.h1`
`



const Genres = styled.div`
display: flex;
`

const Genre = styled.div`
padding-right: 5px;
`

const Poster = styled.div`
width: 200px;
height: 300px;
background-image: ${props => props.bgImageUrl};
background-size: contain;
background-repeat: no-repeat;
background-style: cover;

`

export default function ViewTitle() {


    //If the url is formatted as a query string (contains a '?' followed by query params), we can use URLSearchParams to extract value easily
    const URLparam = new URLSearchParams(document.location.search.substring(1))
    const id = URLparam.get('id')

    const [titleData, setTitleData] = useState({})
    let [genres, setGenres] = useState([])

    function updateGenres() {
        console.log("title data in new thing ", titleData);
        let tempGenreArr = genres.map((genre) => {
            return <Genre>{genre.name}</Genre>
        })
        setGenres(tempGenreArr)
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=674d2d5130dd9ac19dc844ac2be0895a&language=en-US`)
            .then(res => res.json())
            .then(
                (result) => {
                    setTitleData(result, updateGenres())
                }
            )
    }, [])

    console.log("title data on first load ", titleData);

    const poster_url = `url(${localStorage.getItem("poster_url")}${titleData.poster_path})`

    /* 
    Still not sure how to guarantee the order setState and useEffect will run.

    Pretty sure this is the reason why the header is broken. The state hasn't updated before the cursor hovers

    */

    return (
        <Layout>
            <HeaderContainer>
                <Poster bgImageUrl={poster_url} />
                <SummaryInfo>
                    <Title>{titleData.title}</Title>
                    <Genres>
                        {genres}
                    </Genres>
                </SummaryInfo>
            </HeaderContainer>
        </Layout>
    )
}
