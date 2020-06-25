import React from "react"
import styled from "styled-components"
import { Section } from "../components/common"
import { SectionHeader, Statement, Details } from "../components/typography"
import img from "../images/intro.jpg"

const Container = styled.div`
  display: flex;
  margin-bottom: 16rem;
  padding: 2rem;
  position: relative;
`
const Small = styled.div`
  text-align: justify;
  max-width: 300px;
  min-width: 200px;
`
const Aside = styled.div`
  padding-top: 10rem;
  width: 300px;
  margin-right: 2rem;
`
const Main = styled.div`
  flex-basis: 80%;
`
const Large = styled.div`
  margin-bottom: 3rem;
  color: rgba(215, 20, 6, 1);
  mix-blend-mode: darken;
`
const ImageContainer = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: 100%;
  height: 40rem;
  width: 24rem;
  position: absolute;
  right: 10rem;
  top: -2rem;
  z-index: -1;
  opacity: 0.8;
`
const Intro = () => (
  <Section>
    <Container>
      <Aside>
        <Small>
          <Details>
            There are things in this world that we want to punch. They are the
            injustices, the carelessness, the systemic actions that cause pain
            and suffering to all forms of life. These are our Enemies. The only
            way to defeat an enemy is to see them clearly. Start by defining our
            enemy, visualizing them. Sometimes we can barely make out their
            form, but know they are there, so we keep looking, edging closed and
            observing curiously from other perspectives until they begin to
            materialize. When we see them completely, for all their flaws, we
            know how to act.
          </Details>
        </Small>
      </Aside>
      <Main>
        <Large>
          <Statement>
            By starting with the enemy, we ensure that the work we do is always
            purposeful.
          </Statement>
        </Large>
        <Small>
          <Details>
            An enemy can be too big to defeat alone, so we collaborate. And
            often an Enemy will be too big to defeat with one project alone (eg.
            climate change), but we can weaken it, or inspire others to see and
            attack it. At least by trying, we can sleep better at night.
          </Details>
        </Small>
      </Main>
      <ImageContainer />
    </Container>
  </Section>
)

export default Intro
