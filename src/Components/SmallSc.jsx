import React from "react";

export default function SmallSc({ jobs }) {
    return (
        <div className="w-full p-4 flex flex-col gap-6">
            {jobs.map((job, idx) => (
                <div
                    key={job.id || idx} // Use job.id if available, otherwise fallback to idx
                    className="w-full border border-gray-300 bg-white shadow-md rounded-xl overflow-hidden p-4 transition duration-300 hover:scale-105"
                >
                    {/* Job Header */}
                    <div className="w-full flex flex-col gap-2 border-b pb-3">
                        <h3 className="text-lg font-bold text-gray-900">{job.jobs?.title || "Role Not Specified"}</h3>
                        <h2 className="text-xl font-bold text-blue-700">{job.jobs?.company || "Company Not Specified"}</h2>
                        <p className="text-gray-500 text-sm">{job.jobs?.location || "Location Not Specified"}</p>
                    </div>

                    {/* Job Description */}
                    <div className="py-3 border-b">
                        <p className="text-gray-700 text-sm leading-relaxed">{job.jobs?.description || "No description available."}</p>
                        <details className="mt-2 cursor-pointer text-[#4d6bfe] font-medium">
                            <summary>Read More</summary>
                            <p className="mt-2 text-gray-600 text-sm">
                                Additional details about the job can go here.
                            </p>
                        </details>
                    </div>

                    {/* Salary Info */}
                    <div className="pt-3">
                        <h1 className="text-lg font-semibold text-gray-900">Base Pay</h1>
                        <div className="mt-2 border border-[#91a0ed] p-3 rounded-lg bg-blue-50">
                            <p className="text-lg font-semibold text-gray-700">
                                ₹{job.jobs?.package || "0"} <span className="text-sm text-gray-500">/mo (Employer est.)</span>
                            </p>
                            <p className="text-gray-600 text-sm mt-1">{job.jobs?.location || "Location Not Specified"}</p>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-4 flex justify-center">
                        <button className="bg-[#4d6bfe] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#3b5edb] transition-all">
                            Apply Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}