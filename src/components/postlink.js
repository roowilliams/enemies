import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import media from "styled-media-query"
import { Title, Date, Summary } from "./typography"

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
`
const StyledExternalLink = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6rem;
`

const Content = styled.div`
  display: flex;
`

const TextContainer = styled.div`
  position: relative;
`

const DateContainer = styled.div`
  position: absolute;
  width: 10rem;
  top: 11rem;
  left: -444px;
  transform-origin: 0 0;
  transform: rotate(270deg);
  text-align: right;
`
const Motivator = styled.div`
  position: absolute;
  width: 10rem;
  top: 18rem;
  left: -444px;
  transform-origin: 0 0;
  transform: rotate(270deg);
  text-align: right;
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
`

const ImageContainer = styled.div`
  margin-left: 2rem;
  width: 400px;
  position: relative;

  ${media.lessThan("medium")`
        display: none;
    `}

  &::after {
    content: "";
    transition: opacity 0.5s;
    mix-blend-mode: saturation;
    position: absolute;
    background-color: rgb(250, 250, 250);
    top: 0px;
    left: 0px;
    width: 100%;
    bottom: 0;
    opacity: 1;
  }

  &:hover {
    &::after {
      opacity: 0;
    }
  }
`

const StyledImg = styled(Img)`
  opacity: 0.8;
`

const LinkHandler = ({ frontmatter, children }) =>
  frontmatter.externalUrl ? (
    <StyledExternalLink href={frontmatter.externalUrl} target="_blank">
      {children}
    </StyledExternalLink>
  ) : (
    <StyledLink to={frontmatter.path}>{children}</StyledLink>
  )

const getFeaturedImage = post => {
  if (post.frontmatter.featuredImage)
    return post.frontmatter.featuredImage.childImageSharp.fluid

  if (post.featuredImage) return post.featuredImage.childImageSharp.fluid
  else return false
}
const PostLink = ({ post }) => {
  const featuredImgFluid = getFeaturedImage(post)
  return (
    <Container>
      <Content>
        {featuredImgFluid && (
          <LinkHandler {...post}>
            <ImageContainer>
              <StyledImg fluid={featuredImgFluid} />
            </ImageContainer>
          </LinkHandler>
        )}

        <TextContainer>
          <DateContainer>
            <Date>{post.frontmatter.date}</Date>
          </DateContainer>
          {post.frontmatter.motivator && (
            <Motivator>{post.frontmatter.motivator}</Motivator>
          )}
          <LinkHandler {...post}>
            <Title
              style={{
                position: "relative",
                left: "-10rem",
                top: "4rem",
                color: "rgba(215, 20, 6, 1)",
                mixBlendMode: "darken",
              }}
            >
              {post.frontmatter.title}
            </Title>
          </LinkHandler>

          <LinkHandler {...post}>
            <Summary
              style={{
                maxWidth: "30rem",
                position: "relative",
                marginLeft: "1rem",
                marginTop: "5rem",
              }}
            >
              {post.excerpt || post.content.subtitle}
            </Summary>
          </LinkHandler>
        </TextContainer>
      </Content>
    </Container>
  )
}

export default PostLink
