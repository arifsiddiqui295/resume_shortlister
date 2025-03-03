import React, { useEffect, useState } from "react";
import request from "../api/request";
import { useNavigate } from "react-router-dom";
export default function Completedis({ job }) {
  const navigate = useNavigate();
  const [primaryKey, setPrimaryKey] = useState('');
  const [loading, setLoading] = useState(false);
  const applyToJob = async () => {
    setLoading(true);
    console.log("primaryKey: ", primaryKey);
    const res = await request('patch', `/jobs/apply_job/${primaryKey}/`, {
      "status": "Applied"
    });
    navigate('/application-status');
    console.log("res from applyToJob: ", res);
    setLoading(false);
  };

  useEffect(() => {
    setPrimaryKey(job.id);
  }, [job]);

  return (
    <div className="md:w-[60%] md:min-h-[80%] h-[70%] w-full sticky top-[15%] border border-gray-300 bg-white shadow-lg rounded-xl overflow-hidden p-6 transition-all">
      {/* JD Header */}
      <div className="w-full flex justify-between items-center border-b pb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-gray-900">{job.jobs?.title || "Role Not Specified"}</h3>
          <h2 className="text-3xl font-bold text-blue-700">{job.jobs?.company || "Company Not Specified"}</h2>
          <p className="text-gray-500">{job.jobs?.location || "Location Not Specified"}</p>
        </div>
        <button
          onClick={applyToJob}
          type="button"
          className="bg-[#4d6bfe] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#3b5edb] transition-all border-none"
        >
          {
            !loading ? (
              <p className="text-lg">Apply Now</p>
            ) : (
              <>
                <div className="flex space-x-2 justify-center items-center dark:invert">
                  <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </>
            )
          }
        </button>
      </div>

      {/* Job Description */}
      <div className="py-6 border-b">
        <p className="text-gray-700 leading-relaxed">{job.jobs?.description || "No description available."}</p>
        <details className="mt-4 cursor-pointer text-[#4d6bfe] font-medium">
          <summary>Read More</summary>
          <p className="mt-2 text-gray-600">
            Additional details about the job can go here.
          </p>
        </details>
      </div>

      {/* Salary Info */}
      <div className="pt-6">
        <h1 className="text-2xl font-semibold text-gray-900">Base Pay</h1>
        <div className="mt-2 border-2 border-[#91a0ed] p-4 rounded-lg bg-blue-50">
          <p className="text-xl font-semibold text-gray-700">
            ₹{job.jobs?.package || "0"} LPA <span className="text-sm text-gray-500"></span>
          </p>
          <p className="text-gray-600 mt-1">{job.jobs?.location || "Location Not Specified"}</p>
        </div>
      </div>
    </div>
  );
}