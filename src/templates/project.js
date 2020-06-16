import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import { Title, Date } from "../components/typography"
import SEO from "../components/seo"

import BackgroundImage from 'gatsby-background-image'
import media from "styled-media-query";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 4rem 2rem;
  position: relative;
  ${props => props.useCover && `top: -100px;`}
  background-color: rgba(255, 255, 255, 0.9);
${
  media.lessThan("medium")`
    padding: 2rem;
  `}
${
  media.lessThan("small")`
    padding: 1rem;
  `}
`
const Post = styled.div``

const Content = styled.div`
margin: 0;
`

const Cover = ({ className, image, children }) => (
  <BackgroundImage
    Tag="div"
    fluid={image}
    className={className}
  >
    {children}
  </BackgroundImage>
)

const StyledCover = styled(Cover)`
width: 100 %;
height: 800px;
background-position: bottom center;
background-repeat: repeat - y;
background-size: cover;
padding: 3rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const BoldTitle = styled.h1`
font-size: 8rem;
font-weight: 700;
font-family: 'Montserrat';
font-weight: 800;
line-height: 0.8;
text-align: center;
color: rgba(0, 0, 0, 1);
${
  media.lessThan("large")`
    font-size: 5rem;
  `}
${
  media.lessThan("medium")`
  font-size: 3.4rem;
  line-height: 0.9;
`}
${
  media.between("small", "medium")`
  font-size: 3rem;
  line-height: 0.9;
`}
${
  media.lessThan("small")`
  font-size: 3rem;
  line-height: 0.9;
`}
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} image={frontmatter.featuredImage ? frontmatter.featuredImage.childImageSharp.fluid.src : false} />
      {frontmatter.coverImage && <StyledCover image={frontmatter.coverImage.childImageSharp.fluid}><BoldTitle>{frontmatter.title}</BoldTitle></StyledCover>}
      <Container useCover={!!frontmatter.coverImage}>
        <Post>
          {!frontmatter.coverImage && <Title>{frontmatter.title}</Title>}
          {!frontmatter.coverImage && <Date>{frontmatter.date}</Date>}
          <Content dangerouslySetInnerHTML={{ __html: html }} />
        </Post>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  markdownRemark(frontmatter: { path: { eq: $path } }) {
    html
    excerpt
    frontmatter {
      date(formatString: "MMM DD YYYY")
      path
      title
      comments
      featuredImage {
        childImageSharp {
          fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
          }
        }
      }
      coverImage {
        childImageSharp {
          fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`
