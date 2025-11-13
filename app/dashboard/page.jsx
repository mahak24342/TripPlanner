import React from 'react'
import Nav from '../components/Nav'
import Navi from '../components/Navi'
import Hero from '../components/Hero'
import Input from '../components/Input'
import Recs from '../components/Recs'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
      <Navi/>
      <Input/>
      <Recs/>
      <Footer/>
    </div>
  )
}

export default page
