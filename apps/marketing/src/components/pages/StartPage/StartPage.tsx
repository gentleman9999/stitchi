import { Container } from '@components/ui'
import React from 'react'
// import ExperienceSelector from './ExperienceSelector'
import NewOrderForm from './NewOrderForm'
import StartPageSeo from './StartPageSeo'

const StartPage = () => {
  // const [experience, setExperience] = React.useState('')

  return (
    <Container>
      <StartPageSeo />
      {/* {!experience && <ExperienceSelector />} */}
      <NewOrderForm />
    </Container>
  )
}

export default StartPage
