import React from 'react'
import Button from './Button'
import Company_logos from './Company_logos'
import Line from './Line'

const Home_companies = () => {

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col justify-center gap-5 items-center py-16'>
        <h1 className='text-2xl text-center md:py-3 font-[Poppins]'>Showcase Your Talent, Secure a Future: <br />
          Where Top Talent Meet Top Employers</h1>
        <div className='flex gap-4 md:gap-10 md:py-8'>
          <Button text="Find your next hire" className="md:w-72  h-20 border md:text-xl p-3 border-[#AAB1CE] rounded-xl" />
          <Button text="Find your next job" className="md:w-72  w-7h-20 md:text-xl p-3  text-white bg-[#2B308B] rounded-xl" />
        </div>
      </div>
      <div className="company_information bg-[#2B308B] h-fit w-full py-32">
        <div className='flex md:gap-40 gap-5 flex-wrap items-center justify-center'>
          <div className="hearders1 flex flex-col items-center gap-3  md:gap-5">
            <h1 className='text-white md:text-8xl text-2xl'>400+</h1>
            <p className='text-white text-xl'> Recruiters</p>
          </div>
          <div className="hearders1 flex flex-col items-center gap-3  md:gap-5">
            <h1 className='text-white md:text-8xl text-2xl '>6 LPA</h1>
            <p className='text-white text-xl'> Average CTC</p>
          </div>
          <div className="hearders1 flex flex-col items-center gap-3  md:gap-5">
            <h1 className='text-white md:text-8xl text-2xl'>32 LPA</h1>
            <p className='text-white text-xl'> Highest Package</p>
          </div>
        </div>
        <div className='flex items-center justify-center py-20'>
          <Line className='border w-3/5 border-[#AAB1CE] ' />
        </div>
        <div className='flex flex-col  justify-center items-center'>
          <div className='flex items-center md:flex-wrap scrollbar-hide overflow-scroll scroll- justify-center gap-10'>
            <Company_logos
              className='h-28'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/768px-Tata_Consultancy_Services_Logo.svg.png?20210617123944' />
            <Company_logos
              className='h-8'
              src="https://companieslogo.com/img/orig/CTSH_BIG.D-6e2ffe6b.png?t=1720244491" />
            <Company_logos
              className='h-16
            ' src="https://cdn.freebiesupply.com/images/large/2x/cisco-logo-transparent.png" />
            <Company_logos
              className='h-32
            ' src="https://download.logo.wine/logo/Hexaware_Technologies/Hexaware_Technologies-Logo.wine.png" />
            <Company_logos
              className='h-40'
              src="https://download.logo.wine/logo/Capgemini/Capgemini-Logo.wine.png" />
            <Company_logos
              className='h-40'
              src="https://cdn.freebiesupply.com/logos/thumbs/2x/ibm-logo.png" />
          </div>
          <h1 className='text-[#FFFFFF] text-lg'>Companies who use Our platform</h1>
        </div>
      </div>
    </div>
  )
}

export default Home_companies