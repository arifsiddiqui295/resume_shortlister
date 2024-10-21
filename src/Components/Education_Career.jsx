import React from 'react'

const Education_Career = () => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]"        >
            <div className="flex justify-between items-center  ">
                <h2 className="text-lg font-semibold">Your career preferences</h2>
                <button className="text-[#275DF5] text-md font-semibold">Add</button>
            </div>
            <div className="flex flex-col gap-6 mt-4">
                {/* Preferred Job Type */}
                <div className='flex gap-52'>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Preferred job type</h3>
                        <a href="#" className="text-[#275DF5] text-sm font-semibold">Add desired job type</a>
                    </div>

                    {/* Work Availability */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Availability to work</h3>
                        <a href="#" className="text-[#275DF5] text-sm font-semibold">Add work availability</a>
                    </div>
                </div>

                {/* Preferred Location */}
                <div>
                    <h3 className="text-sm font-medium text-gray-600">Preferred location</h3>
                    <a href="#" className="text-[#275DF5] text-sm font-semibold">Add preferred work location</a>
                </div>
            </div>
        </div>
    )
}

export default Education_Career