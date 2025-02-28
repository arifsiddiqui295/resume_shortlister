import React from "react";

export default function Completedis({ job }) {
  return (
    <div className="md:w-[60%] md:h-[80%] h-[70%] w-full sticky top-[15%] border border-gray-300 bg-white shadow-lg rounded-xl overflow-hidden p-6">
      {/* JD Header */}
      <div className="w-full flex justify-between items-center border-b pb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-gray-900">{job.role}</h3>
          <h2 className="text-3xl font-bold text-blue-700">{job.company_name}</h2>
          <p className="text-gray-500">{job.location}</p>
        </div>
        <button className="bg-[#4d6bfe] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#3b5edb] transition-all border-none">
          Apply Now
        </button>
      </div>

      {/* Job Description */}
      <div className="py-6 border-b">
        <p className="text-gray-700 leading-relaxed">{job.discrip}</p>
        <details className="mt-4 cursor-pointer text-[#4d6bfe] font-medium ">
          <summary>Read More</summary>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores totam accusamus magnam cupiditate facilis soluta voluptate hic libero.
          </p>
        </details>
      </div>

      {/* Salary Info */}
      <div className="pt-6 ">
        <h1 className="text-2xl font-semibold text-gray-900">Base Pay</h1>
        <div className="mt-2 border-2 border-[#91a0ed] p-4 rounded-lg bg-blue-50">
          <p className="text-xl font-semibold text-gray-700">
            ₹{job.salary} <span className="text-sm text-gray-500">/mo (Employer est.)</span>
          </p>
          <p className="text-gray-600 mt-1">{job.location}</p>
        </div>
      </div>
    </div>
  );
}
