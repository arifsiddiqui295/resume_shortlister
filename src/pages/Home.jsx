import React from 'react'
import Design from '../Components/Design'
import Footer from '../Components/Footer'
import HeroSection from '../Components/HeroSection'
import Home_companies from '../Components/Home_companies'
import Home_Name from '../Components/Home_Name'
import Home_talent from '../Components/Home_talent'
import Job_Collection from '../Components/Job_Collection'
import Line from '../Components/Line'
import Navbar from '../Components/Navbar'
import Quotes from '../Components/Quotes'

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            {/* <Line className='border border-[#AAB1CE] ' /> */}
            <Home_companies />
            <Home_talent />
            <Line className='border border-[#D8D8D8] w-full' />
            <Home_Name />
            <Quotes />
            <Job_Collection />
            <Footer />
        </>
    )
}

export default Home