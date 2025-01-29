import React from 'react'
import Career_Skills from './Career_Skills'
import RecruiterCareerSkills from './RecruiterCareerSkills'
import RecruiterQuickLinks from './RecruiterQuickLinks'

const RecruiterViewEdit = () => {
    return (
        <div className='px-32 py-10'>
            <h1 className='underline text-2xl text-[#121224] '>View & Edit</h1>
            <div className='flex gap-20 py-10'>
                <RecruiterQuickLinks />
                <div>
                    <RecruiterCareerSkills />
                </div>
            </div>
        </div>
    )
}

export default RecruiterViewEdit