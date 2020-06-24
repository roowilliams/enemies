import React from "react"
import styled from "styled-components"

const Container = styled.section`
  padding: 3rem 2rem 2rem;
`
const Content = styled.div`
  margin: 0 auto;
`

export const Section = ({ children, style }) => (
  <Container style={style}>
    <Content>{children}</Content>
  </Container>
)
