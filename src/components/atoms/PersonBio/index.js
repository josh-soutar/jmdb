import React, { useState, useEffect} from "react";
import styled from "@xstyled/styled-components";

export default function PersonBio({ bioData }) {

    const [bio, setBio] = useState({
        btn_label: "",
        text: "",
      });
      const [bioCharacterLimit, setBioCharacterLimit] = useState(350); //Does this have to be state?
      const [fullBioOverCharacterLimit, setFullBioOverCharacterLimit] = useState(false);
    
      useEffect(() => {        
            limitBioLength(bioData);
        }, [bioData]);
    
    
      function limitBioLength(fullBioText) {        
        let bioText = fullBioText;
    
        if (bioText.length > bioCharacterLimit) {
          setFullBioOverCharacterLimit(true);
    
          bioText = bioText.substring(0, bioCharacterLimit);
          //Check if the last character is a space
          if (bioText.substring(bioText.length - 1) === " ") {
            //If so, remove the character so the "..." doesn't follow an empty space
            bioText = bioText.slice(0, -1);
          }
          bioText += "...";
        }
    
        setBio({
          btn_label: "Show more",
          text: bioText,
        });
      }
    
      function handleBioClick() {
        //If bio is already showing the full text, show less
        if (bio.btn_label === "Show less") {
          limitBioLength(bioData);
        } else {
          //If bio is currently showing the cut down text, show more
          setBio({
            btn_label: "Show less",
            text: bioData, //Reset to full text
          });
        }
      }


    return (
        <>                  
          <BioText>
              {bio.text}
              {fullBioOverCharacterLimit && (
            <BioShowMoreToggle
              onClick={() => {
                handleBioClick();
              }}
            >
              {bio.btn_label}
            </BioShowMoreToggle>
          )}  
              </BioText>
                
      </>
    )
}

const BioShowMoreToggle = styled.div`
  display: inline-block;
  padding-left: 5px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const BioText = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 1;
`;