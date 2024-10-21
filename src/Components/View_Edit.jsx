import React from 'react'
import Career_Skills from './Career_Skills'
import Quick_Links from './Quick_Links'

const View_Edit = () => {
    return (
        <div className='px-32 py-10'>
            <h1 className='underline text-2xl text-[#121224] '>View & Edit</h1>
            <div className='flex gap-20 py-10'>
                <Quick_Links />
                <div>
                    <Career_Skills />
                </div>
            </div>
        </div>
    )
}

export default View_Edit