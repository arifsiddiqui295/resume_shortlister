import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Student_Card from '../Components/Student_Card'
import View_Edit from '../Components/View_Edit'

const Users_Profile = () => {
    return (
        <>
            <div className='bg-[#F8F9FA] w-full'>
                <Navbar />
                <Student_Card />
                <View_Edit />
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default Users_Profile