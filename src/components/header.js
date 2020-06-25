import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { siteMetadata } from "../../gatsby-config"
const Container = styled.header`
  padding: 1rem 0;
  display: flex;
`

const Name = styled.h1`
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0 2rem;
  padding-top: 0.1rem;
`

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`
const NavItem = styled.li`
  margin: 0 1rem;

  a {
    color: black;
    text-decoration: none;
    padding: 0.2rem 0.5rem;

    &:hover {
      border-bottom: 2px solid black;
    }
  }
`

const Nav = ({ links }) => (
  <NavList>
    {links.map(link => (
      <NavItem key={link.name}>
        <Link to={link.link}>{link.name}</Link>
      </NavItem>
    ))}
  </NavList>
)

const Header = ({ siteTitle }) => (
  <Container>
    <Name>
      <Link
        to="/"
        style={{
          color: `black`,
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </Link>
    </Name>
    <Nav links={siteMetadata.navLinks}></Nav>
  </Container>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
