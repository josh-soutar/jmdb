import React from "react";
import styled from "@xstyled/styled-components";

const Container = styled.div`
  width: 75px;
  height: 75px;
`;

export default function RatingDial({ staticScore, animatedScore }) {
  let scoreOuterRingColor;
  let scoreInnerRingColor;

  animatedScore = animatedScore.toFixed(1);

  //Green
  if (staticScore > 7) {
    //If we use animatedScore here instead, the colour will change throughout the animation
    scoreOuterRingColor = "#204529";
    scoreInnerRingColor = "#21d07a";
  }
  //Yellow
  else if (staticScore > 5) {
    scoreOuterRingColor = "#423d0f";
    scoreInnerRingColor = "#d2d531";
  }
  //Red
  else {
    scoreOuterRingColor = "#571435";
    scoreInnerRingColor = "#db2360";
  }

  const innerCircleRadius = 43;
  const innerCircleCircumference = 2 * 3.14159265359 * innerCircleRadius;
  let scoreLine = (animatedScore / 10) * innerCircleCircumference;

  let strokeDashArrayValue = `${scoreLine} ${innerCircleCircumference}`;

  /* strokeDasharray(x y)
  x: score expressed as a percentage of the circle circumference e.g. 10% * innerCircleCircumference
  y: circle circumference (2 * pie * r)
  */

  return (
    <Container>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle r="50" cx="50" cy="50" fill="black" />
        <circle
          r={innerCircleRadius}
          cx="50"
          cy="50"
          fill="transparent"
          stroke={scoreOuterRingColor}
          strokeWidth="7"
        />
        <circle
          r={innerCircleRadius}
          cx="50"
          cy="50"
          fill="transparent"
          stroke={scoreInnerRingColor}
          strokeWidth="7"
          strokeDasharray={strokeDashArrayValue}
          transform="rotate(-90) translate(-100)"
          strokeLinecap="round"
        />
        <text
          x="50"
          y="50"
          style={{ transform: "translateY(10%)" }}
          fill="white"
          textAnchor="middle"
          fontSize="30px"
          fontWeight="bold"
        >
          {animatedScore}
        </text>
      </svg>
    </Container>
  );
}
