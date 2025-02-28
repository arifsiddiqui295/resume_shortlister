import React, { useState } from "react";
import SmallSc from "../Components/SmallSc";
import Completedis from "../Components/Completedis";
import Smalldis from "../Components/Smalldiss";
import Navbar from "../Components/Navbar";

export default function Job(props) {
    const [jobs, setJobs] = useState([
        {
            company_name: "ABC Tech",
            role: "Frontend Developer",
            location: "Indore",
            salary: 45000,
            dateOfPublish: "28/01/2025",
            discrip:
                "Looking for an experienced Frontend Developer with expertise in React.js and CSS.Looking for an experienced Frontend Developer with expertise in React.js and CSS.",
        },
        {
            company_name: "PQR Solutions",
            role: "Backend Developer",
            location: "Bhopal",
            salary: 55000,
            dateOfPublish: "27/01/2025",
            discrip:
                "Hiring a Backend Developer skilled in Node.js, Express, and PostgreSQL.Looking for an experienced Frontend Developer with expertise in React.js and CSS.",
        },
        {
            company_name: "LMN Digital",
            role: "Full Stack Developer",
            location: "Mumbai",
            salary: 60000,
            dateOfPublish: "30/01/2025",
            discrip: "We need a Full Stack Developer with knowledge of MERN stack.Looking for an experienced Frontend Developer with expertise in React.js and CSS.",
        },
        {
            company_name: "XYZ Software",
            role: "Web Developer",
            location: "Bangalore",
            salary: 50000,
            dateOfPublish: "29/01/2025",
            discrip:
                "Seeking a Web Developer experienced in JavaScript, HTML, and CSS.Looking for an experienced Frontend Developer with expertise in React.js and CSS.",
        },
        {
            company_name: "TechNova",
            role: "UI/UX Designer",
            location: "Hyderabad",
            salary: 47000,
            dateOfPublish: "26/01/2025",
            discrip: "Hiring a UI/UX Designer proficient in Figma and Adobe XD.Looking for an experienced Frontend Developer with expertise in React.js and CSS.",
        },
        {
            company_name: "Innovate IT",
            role: "Software Engineer",
            location: "Delhi",
            salary: 65000,
            dateOfPublish: "25/01/2025",
            discrip:
                "Looking for a Software Engineer with experience in Python and Django.Looking for an experienced Frontend Developer with expertise in React.js and CSS.",
        },
    ]);

    const [currentjobidx, setCurrentJobidx] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleCurrent = (idx) => {
        setLoading(true); // Show loading when the job index is changing
        setTimeout(() => {
            setCurrentJobidx(idx);
            setLoading(false); // Hide loading after a short delay
        }, 100); // Simulated delay
    };

    return (
        <>
            <Navbar />
            <div className="max-h-screen hidden bg-white ite gap-7 text-black md:flex flex-wrap pl-14 pr-14 w-full pt-3">
                {/* Left section */}
                <Smalldis jobs={jobs} handleCurrent={handleCurrent} />

                {/* Right Section with Loading */}
                {loading ? (
                    <div className="w-full flex justify-center items-center">

                    </div>
                ) : (
                    <Completedis job={jobs[currentjobidx]} />
                )}
            </div>

            <div className="max-h-screen md:hidden w-full flex gap-7 flex-col">
                <SmallSc jobs={jobs} />
            </div>
        </>
    );
}
