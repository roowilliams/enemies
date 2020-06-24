import React from "react"
import styled from "styled-components"
import { Section } from "../components/common"
import { SectionHeader, Statement, Details } from "../components/typography"

const Container = styled.div`
  display: flex;
`
const Small = styled.div`
  flex-basis: 20%;
  margin-right: 3rem;
`

const Large = styled.div`
  flex-basis: 80%;
`
const Intro = () => (
  <Section>
    <Container>
      <Small>
        <Details>
          There are things in this world that we want to punch. They are the
          injustices, the carelessness, the systemic actions that cause pain and
          suffering to all forms of life. These are our Enemies. The only way to
          defeat an enemy is to see them clearly. Start by defining our enemy,
          visualizing them. Sometimes we can barely make out their form, but
          know they are there, so we keep looking, edging closed and observing
          curiously from other perspectives until they begin to materialize.
          When we see them completely, for all their flaws, we know how to act.
          An enemy can be too big to defeat alone, so we collaborate. And often
          an Enemy will be too big to defeat with one project alone (eg. climate
          change), but we can weaken it, or inspire others to see and attack it.
          At least by trying, we can sleep better at night.
        </Details>
      </Small>
      <Large>
        <Statement>
          By starting with the enemy, we ensure that the work we do is always
          purposeful.
        </Statement>
      </Large>
    </Container>
  </Section>
)

export default Intro
