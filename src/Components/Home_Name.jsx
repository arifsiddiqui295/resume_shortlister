import React from 'react'
import Button from './Button'
import Job_apply from './Job_apply'

const Home_Name = () => {
    return (
        <div className='py-8 px-20'>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-xl'>Companies</h1>
                <Button
                    text="More Posts"
                    className="w-40 h-10  border border-[#AAB1CE] rounded-xl text-lg"
                />
            </div>
            <div className='flex flex-col gap-5 py-10'>
                <Job_apply />
                <Job_apply />
                <Job_apply />
                <Job_apply />   
                <Job_apply />   
                <Job_apply />   
            </div>
        </div>
    )
}

export default Home_Name