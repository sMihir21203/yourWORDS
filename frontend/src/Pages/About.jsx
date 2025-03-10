import React from 'react'
import { Container, Button, Loader } from "../Components/CompsIndex.js"

const About = () => {
  return (
    <Container>
     <Button className='w-70' style='imp' text={<Loader  />} />
    </Container>

  )
}

export default About