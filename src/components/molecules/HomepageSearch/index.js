import React from "react";
import styled from "@xstyled/styled-components";
import CustomButton from "../../atoms/InputButton";
import CustomInput from "../../atoms/InputText";

const StyledForm = styled.form`
  display: flex;
  padding: 20px;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
`;

export default function HomepageSearch() {
  const placeholder = "test";
  function handleSubmit(event) {
    event.preventDefault();
    alert("submit entered with " + event.target.value);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <CustomInput placeholder={placeholder} />
      <CustomButton btnLabel="Search" />
    </StyledForm>
  );
}
