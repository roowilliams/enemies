import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import RightArrow from "../../static/right-arrow.svg"

// doesn't apply to markdown pages since only html tags are generated
export const Title = styled.h1`
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 0.6rem;
`

export const Date = styled.time`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.4);
`

export const Summary = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);
`

export const Statement = styled.p`
  font-size: 4.8rem;
  font-weight: 900;
  margin-bottom: 0.2rem;
  line-height: 0.9;
  color: rgba(0, 0, 0, 0.8);
`

export const Details = styled.p`
  font-size: 0.8rem;
  line-height: 1.2;
`

export const SectionHeader = styled.h2`
  margin: 1rem 0;
  font-size: 1.2rem;
  font-weight: 300;
  color: rgba(50, 50, 50, 0.7);
`

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StyledLink = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`

export const SectionLink = ({ to, children }) => (
  <LinkContainer>
    <StyledLink to={to}>
      {children}
      <img
        src={RightArrow}
        alt="Right arrow"
        style={{
          width: "20px",
          margin: 0,
          marginLeft: "6px",
          marginBottom: "-1px",
        }}
      />
    </StyledLink>
  </LinkContainer>
)
