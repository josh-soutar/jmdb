
import React, { useState, useEffect } from "react"
import styled, { ThemeProvider } from "@xstyled/styled-components"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'

import Header from "./components/molecules/Header"

import "./global.css"

import theme from "./theme.js"


const PageWrapper = styled.div`
height: 100%;
display: flex;
flex-flow: column;
width: 100vw;
`

const HeaderContainer = styled.header`
width: 100vw;
background-color: #333333;
display: flex;
justify-content: center;
padding: 1 4;
`

const ContentWrapper = styled.div`
width: 100vw;
display: flex;
justify-content: center;
flex-direction: column;
`


export default function Layout({ children }) {



  if (!localStorage.getItem("tmdb_config")) {
    getConfigData()
  }

  async function getConfigData() {
    const data = await fetch("https://api.themoviedb.org/3/configuration?api_key=674d2d5130dd9ac19dc844ac2be0895a").then(r => r.json());
    localStorage.setItem("tmdb_config", JSON.stringify(data));
    localStorage.setItem("poster_url", data.images.base_url + data.images.poster_sizes[4])
  }


  library.add(faTicketAlt)

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper className="pageWrapper">
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <ContentWrapper className="contentWrapper">
          {children}
        </ContentWrapper>
      </PageWrapper>
    </ThemeProvider>
  )
}