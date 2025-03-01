import React from "react";

export default function Smalldis({ jobs, handleCurrent }) {
    const handleClick = (idx) => {
        handleCurrent(idx);
        console.log(idx);
    };

    return (
        <div className="md:w-[35%] w-full flex flex-col gap-4 p-4 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-[#4d6bfe] text-center mb-4">
                Job Listings
            </h2>

            <div className="w-full flex flex-col gap-4 ">
                {jobs.map((job, idx) => (
                    <div
                        key={idx}
                        className="w-full cursor-pointer hover:scale-105 transition-transform duration-300 "
                        onClick={() => handleClick(idx)}
                    >
                        <div className="border hover:bg-blue-100 border-[#4d6bfe] bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <p className="text-sm font-semibold text-gray-700">
                                {job.role} 
                            </p>
                            <h3 className="text-lg font-bold text-[#4d6bfe]">{job.company_name}</h3>

                            <p className="text-gray-600">{job.location}</p>

                            <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
                                <p className="font-medium">
                                    ₹{job.salary} <span className="text-gray-500">[Est]</span>
                                </p>
                                <p className="text-gray-500">{job.dateOfPublish}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
