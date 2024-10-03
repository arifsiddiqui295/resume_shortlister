import React from 'react'
import XIcon from '@mui/icons-material/X';
import MailIcon from '@mui/icons-material/Mail';
const Footer = () => {
    return (
        <footer className="bg-[#0A0A5A] text-white py-10 mt-4">
            <div className="container mx-auto flex justify-evenly items-start px-8">
                {/* Left: Social Media Icons */}
                <div className="flex flex-col">
                    <div className='flex gap-5'>
                        <XIcon />
                        <MailIcon />
                    </div>
                    <p className="text-white mt-10">
                        Browse by: <a href="#" className="underline">Jobs</a>, <a href="#" className="underline">Remote Jobs</a>, <a href="#" className="underline">Locations</a>, <a href="#" className="underline">Startups</a>, <a href="#" className="underline">Startups Hiring</a>, <a href="#" className="underline">Industries</a>, <a href="#" className="underline">Tech Hubs</a>
                    </p>
                    <p className='mt-10'>Copyright © 2024 Wellfound (formerly AngelList Talent). All rights reserved.</p>
                </div>

                {/* Middle: Links */}
                <div className="flex space-x-20">
                    {/* For Candidates */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">For Candidates</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm">Overview</a></li>
                            <li><a href="#" className="text-sm">Startup Jobs</a></li>
                            <li><a href="#" className="text-sm">Web3 Jobs</a></li>
                            <li><a href="#" className="text-sm">Featured</a></li>
                            <li><a href="#" className="text-sm">Salary Calculator</a></li>
                            <li><a href="#" className="text-sm">Startup Hiring Data</a></li>
                            <li><a href="#" className="text-sm">Tech Startups</a></li>
                            <li><a href="#" className="text-sm">Remote</a></li>
                        </ul>
                    </div>
                    {/* For Recruiters */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">For Recruiters</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm">Overview</a></li>
                            <li><a href="#" className="text-sm">Recruit Pro</a></li>
                            <li><a href="#" className="text-sm">Curated</a></li>
                            <li><a href="#" className="text-sm">RecruiterCloud</a></li>
                            <li><a href="#" className="text-sm">Hire Developers</a></li>
                            <li><a href="#" className="text-sm">Pricing</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom: Copyright */}

            </div>
        </footer>

    )
}

export default Footer