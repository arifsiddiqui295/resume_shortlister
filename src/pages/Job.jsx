import React, { useEffect, useState } from "react";
import SmallSc from "../Components/SmallSc";
import Completedis from "../Components/Completedis";
import Smalldis from "../Components/Smalldiss";
import Navbar from "../Components/Navbar";
import request from '../api/request';

export default function Job() {
    const [jobs, setJobs] = useState([]);
    const [currentJobIdx, setCurrentJobIdx] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch job data from the API
    useEffect(() => {
        const getJobDetails = async () => {
            try {
                const res = await request('get', '/jobs/job_list/');
                console.log("Response from getJobDetails: ", res);
                setJobs(res); // Assuming the API returns an array of jobs
            } catch (error) {
                console.error("Error fetching job details: ", error);
            }
        };
        getJobDetails();
    }, []);

    // Handle job selection
    const handleCurrent = (idx) => {
        setLoading(true); // Show loading state
        setTimeout(() => {
            setCurrentJobIdx(idx);
            setLoading(false); // Hide loading state after a short delay
        }, 100); // Simulate a delay for smoother UI transition
    };

    return (
        <>
            <Navbar />
            {jobs.length > 0 ? (
                <>
                    {/* Desktop View */}
                    <div className="max-h-screen hidden bg-white items-center gap-7 text-black md:flex flex-wrap pl-14 pr-14 w-full pt-3">
                        {/* Left Section: Job List */}
                        <Smalldis jobs={jobs} handleCurrent={handleCurrent} />

                        {/* Right Section: Job Details */}
                        {loading ? (
                            <div className="w-full flex justify-center items-center">
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <Completedis job={jobs[currentJobIdx]} />
                        )}
                    </div>

                    {/* Mobile View */}
                    <div className="max-h-screen md:hidden w-full flex gap-7 flex-col">
                        <SmallSc jobs={jobs} />
                    </div>
                </>
            ) : (
                <div className="w-full flex justify-center items-center h-screen">
                    <p>No jobs available.</p>
                </div>
            )}
        </>
    );
}