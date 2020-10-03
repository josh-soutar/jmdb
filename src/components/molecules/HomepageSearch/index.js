import React, { useState } from "react";
import { navigate } from "gatsby";
import styled from "@xstyled/styled-components";

const HomepageSearchContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 4;
`;

const StyledButton = styled.input`
  padding: 20px;
  font-size: 4;
`;

export default function HomepageSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    //This isn't carrying the search value

    navigate(`/search?query=${searchTerm}`);
  }

  return (
    <HomepageSearchContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Search for Movies, TV Shows, People"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton type="submit" value="Search" />
      </StyledForm>
    </HomepageSearchContainer>
  );
}
