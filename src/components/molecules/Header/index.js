import React, { useState, useEffect } from "react";
import styled, { Box } from "@xstyled/styled-components";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderContainer = styled.div`
  max-width: 1300px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderMenuContainer = styled.box`
  position: relative;
`;
const HeaderText = styled.div`
  font-size: calc(1.2vw + 1rem);
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0em;
  text-transform: none;
  line-height: 1.4em;
  border: 2px solid white;
  color: white;
  padding: 1;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 8px 0 5px;
`;

const MenuItem = styled.div`
  padding: 1;
  z-index: 10;
  color: white;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
  }
`;
const MenuItemOutline = styled.div`
  z-index: 5;
  position: absolute;
  border: 2px solid white;
  width: 50px;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
`;
const activeLinkStyle = {
  color: "red",
};

export default function Header() {
  let [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: "Movies",
      page_id: "placeholder",
      fade_text: false,
    },
    {
      id: 2,
      title: "TV Shows",
      page_id: "placeholder",
      fade_text: false,
    },
    {
      id: 3,
      title: "People",
      page_id: "placeholder",
      fade_text: false,
    },
  ]);
  const [displayHoverBox, setDisplayHoverBox] = useState(false);
  const [menuOutlineOffset, setMenuOutlineOffset] = useState(0);
  const [menuOutlineWidth, setMenuOutlineWidth] = useState(0);

  function handleMouseEnter(event) {
    setMenuOutlineWidth(event.target.offsetWidth);
    setMenuOutlineOffset(event.target.offsetLeft);

    console.log(
      `${event.target.id}  width: ${event.target.offsetWidth} offset: ${event.target.offsetLeft}`
    ); //Sometimes the ID isn't getting passed. This causes width and offset values to be incorrect

    let tempMenuItems = menuItems;
    for (let i = 0; i < tempMenuItems.length; i++) {
      if (tempMenuItems[i].id != event.target.id) {
        tempMenuItems[i].fade_text = true;
      }
    }
    setMenuItems(tempMenuItems);
  }

  function handleMouseLeave() {
    let tempMenuItems = menuItems;
    for (let i = 0; i < tempMenuItems.length; i++) {
      tempMenuItems[i].fade_text = false;
    }
    setMenuItems(tempMenuItems);
  }

  //Maybe we need to use useEffect somewhere here to fix the state value being fucked??

  /* 
    Still not sure how to guarantee the order setState and useEffect will run.    
    Pretty sure this is broken because setState is asynchronous 
    */

  let menuElements = menuItems.map((item) => (
    <MenuItem
      key={item.id}
      id={item.id}
      forwardedAs="div"
      pr="10px"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: item.fade_text ? 0.5 : 1 }}
    >
      <Link to={"/" + item.page_id} activeStyle={activeLinkStyle}>
        {item.title}
      </Link>
    </MenuItem>
  ));

  return (
    <HeaderContainer>
      <HeaderText>
        <Link to="/">
          <StyledIcon icon="ticket-alt" />
          JMDB
        </Link>
      </HeaderText>

      <HeaderMenuContainer
        className="HeaderMenuContainer"
        display="flex"
        onMouseEnter={() => {
          setDisplayHoverBox(true);
        }}
        onMouseLeave={() => {
          setDisplayHoverBox(false);
        }}
      >
        <MenuItemOutline
          className="MenuItemOutline"
          style={{
            opacity: displayHoverBox && "1",
            left: menuOutlineOffset,
            width: menuOutlineWidth,
          }}
        />
        {menuElements}
      </HeaderMenuContainer>
    </HeaderContainer>
  );
}
