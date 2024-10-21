import Button from './Button'
import React from 'react'

const Quick_Links = () => {
    return (
        <div className='bg-[#ffffff] shadow-lg px-5 rounded-lg py-16 w-80 flex flex-col gap-10 h-fit'>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Preferences</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Education</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Key Skills</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Languages</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Internships</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Projects</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Profile Summary</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Accomplishments</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Competitive Exams</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Employment</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Academic achievements</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
            <div className='flex justify-between'>
                <p className='text-lg font-medium'>Resume</p>
                <Button className='text-[#275DF5] text-xl font-bold' text="Add" />
            </div>
        </div>
    )
}

export default Quick_Links