import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import { Title, Date } from "../components/typography"
import SEO from "../components/seo"

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
`
const Post = styled.div``
const Content = styled.div`
  margin: 3rem 0;
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} image={frontmatter.featuredImage ? frontmatter.featuredImage.childImageSharp.fluid.src : false} />
      <Container>
        <Post>
          <Title>{frontmatter.title}</Title>
          <Date>{frontmatter.date}</Date>
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
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
