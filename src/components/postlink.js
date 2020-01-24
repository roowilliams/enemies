import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Title, Date, Summary } from "./typography"

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
`
const Container = styled.div`
  margin-bottom: 3rem;
  max-width: 34rem;
`

const Content = styled.div``

const PostLink = ({ post }) => (
  <Container>
    <StyledLink to={post.frontmatter.path}>
      <Title>{post.frontmatter.title}</Title>
      <Summary>{post.excerpt}</Summary>
      <Date>{post.frontmatter.date}</Date>
    </StyledLink>
  </Container>
)

export default PostLink
