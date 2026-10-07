import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import AboutSection from '../../components/AboutSection/AboutSection'
import ServicesSection from '../../components/ServicesSection/ServicesSection'
import AppointmentSection from '../../components/AppointmentSection/AppointmentSection'
import TeamSection from '../../components/TeamSection/TeamSection'
import Testimonials from '../../components/Testimonials/Testimonials'

const Home = () => {
  return (
    <>
        <HeroSection/>
        <AboutSection/>
        <ServicesSection/>
        <AppointmentSection/>
        <TeamSection/>
        <Testimonials/>
    </>
  )
}

export default Home