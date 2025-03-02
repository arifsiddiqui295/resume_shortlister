import React from 'react'
import Career_Skills from './Career_Skills'
import Quick_Links from './Quick_Links'

const View_Edit = () => {
    return (
        <div className='lg:px-32  lg:py-10 md:px-16'>
            <h1 className='underline text-2xl text-[#121224] hidden md:block '>View & Edit</h1>
            <div className='flex  lg:gap-20 md:gap-6 py-10'>
                <div className='hidden sticky top-5 md:block'><Quick_Links /></div>
                <div className=''>
                    <Career_Skills />
                </div>
            </div>
        </div>
    )
}

export default View_Edit