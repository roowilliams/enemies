import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import media from "styled-media-query";
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
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Content = styled.div`
max-width: 26rem;
margin: 2rem 0;
`

const ImageContainer = styled.div`
margin-left: 1rem;
padding: 1rem;
width: 200px;
    ${media.lessThan("medium")`
        display: none;
    `}
    `

const StyledImg = styled(Img)`
    `

const LinkHandler = ({ fields, frontmatter, children }) => fields && fields.externalUrl ? <StyledExternalLink href={fields.externalUrl} target="_blank">{children}</StyledExternalLink> : <StyledLink to={frontmatter.path}>{children}</StyledLink>

const getFeaturedImage = (post) => {
  if (post.frontmatter.featuredImage) return post.frontmatter.featuredImage.childImageSharp.fluid

  if (post.featuredImage) return post.featuredImage.childImageSharp.fluid
  else return false
}
const PostLink = ({ post }) => {
  const featuredImgFluid = getFeaturedImage(post)
  return (
    <Container>
      <Content>
        <LinkHandler {...post}>
          <Title>{post.frontmatter.title}</Title>
        </LinkHandler>
        <Date>{post.frontmatter.date}</Date>

        <LinkHandler {...post}>
          <Summary>{post.excerpt}</Summary>
        </LinkHandler>
      </Content>
      {featuredImgFluid && <LinkHandler {...post}><ImageContainer><StyledImg fluid={featuredImgFluid} /></ImageContainer></LinkHandler>}
    </Container>
  )
}


export default PostLink

