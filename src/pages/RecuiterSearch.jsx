import React from 'react'
import Navbar from '../Components/Navbar'
import RecruiterCard from '../Components/RecruiterCard'
import RecruiterViewEdit from '../Components/RecruiterViewEdit'

const RecuiterSearch = () => {
    return (
        <>
            <div className='bg-[#F8F9FA]'>
                <Navbar />
                <RecruiterCard />
                <RecruiterViewEdit />
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default RecuiterSearch