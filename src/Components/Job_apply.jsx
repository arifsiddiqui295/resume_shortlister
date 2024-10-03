import React from 'react'
import Button from './Button'

const Job_apply = () => {
    return (
        <div className='flex justify-between bg-[#CEDEFF] p-4 rounded-lg items-center hover:border-white hover:bg-[#6d96e8] hover:text-white transition-all ease-in-out duration-300 hover:scale-105
        '>
            <div className='flex gap-5'>
                <img
                    className='h-20 rounded-lg'
                    src="https://images.unsplash.com/photo-1714464703034-f74ec8163fc2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <div className='flex flex-col'>
                    <h1 className='text-lg font-bold'>Senior Recruiter, Nursing | Hybrid NY</h1>
                    <p className='text-md font-medium'><a className='underline' href="">At Healthfirst</a> - Remote</p>
                    <p>Posted on 17 sep</p>
                </div>
            </div>
            <div className='flex gap-5'>
                <Button
                    text="Apply on Company Site"
                    className="w-36 text-lg h-16 text-[#53565F] text-md bg-[#EBF8FD] rounded-xl"
                />
                <Button
                    text="View Job"
                    className="w-36 h-16 text-lg border border-[#2B308B] rounded-xl"
                />
            </div>
        </div>
    )
}

export default Job_apply