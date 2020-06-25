import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"

import Layout from "../components/layout"
import PostLink from "../components/postlink"
import { Section } from "../components/common"
import { SectionHeader, SectionLink } from "../components/typography"
import Intro from "../components/intro"
import moment from "moment"

// const mediumCDNUrl = `https://cdn-images-1.medium.com/max/150/`
// src={`${mediumCDNUrl}/${post.node.virtuals.previewImage.imageId}`}

const getPosts = (edges, postType) =>
  edges.filter(
    edge =>
      // eslint-disable-next-line
      edge.node.frontmatter.path.match(/^\/([^\/]*).*$/, "$1")[1] ===
        postType &&
      !!edge.node.frontmatter.date &&
      edge.node.frontmatter.publish
  )

const renderPosts = posts =>
  posts.map(post => <PostLink key={post.node.id} post={post.node} />)

const normalizeMediumPosts = edges =>
  edges.map(edge => ({
    node: {
      ...edge.node,
      frontmatter: {
        title: edge.node.title,
        date: moment(edge.node.createdAt, "YYYY-MM-DD").format("MMM DD YYYY"),
        externalUrl: edge.node.fields.externalUrl,
      },
    },
  }))

const IndexPage = ({ data: { allMarkdownRemark, allMediumPost } }) => {
  const blogPosts = normalizeMediumPosts(allMediumPost.edges)
  const projects = getPosts(allMarkdownRemark.edges, "project")

  return (
    <Layout>
      <SEO />
      <Intro />
      {!!projects.length && (
        <Section>
          <SectionHeader>Projects</SectionHeader>
          {renderPosts(projects)}
        </Section>
      )}
      {!!blogPosts.length && (
        <Section>
          <SectionHeader>Recent Blog Posts</SectionHeader>
          {renderPosts(blogPosts)}
          <SectionLink to="/blog/">View blog</SectionLink>
        </Section>
      )}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMM DD YYYY")
            path
            title
            publish
            motivator
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
    }
    allMediumPost(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          createdAt
          content {
            subtitle
          }
          fields {
            externalUrl
          }
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          virtuals {
            subtitle
            metaDescription
          }
          author {
            name
          }
        }
      }
    }
  }
`
