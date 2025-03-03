import React from 'react';
import XIcon from '@mui/icons-material/X';
import MailIcon from '@mui/icons-material/Mail';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A5A] text-white py-10 mt-4">
            <div className="container mx-auto px-4 sm:px-8">
                {/* Flex Container */}
                <div className="flex flex-col lg:flex-row justify-evenly items-start space-y-8 lg:space-y-0">
                    {/* Left: Social Media Icons and Links */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex gap-5">
                            <XIcon className="w-6 h-6" />
                            <MailIcon className="w-6 h-6" />
                        </div>
                        <p className="text-white mt-6 text-center lg:text-left">
                            Browse by: <a href="#" className="underline">Jobs</a>, <a href="#" className="underline">Remote Jobs</a>, <a href="#" className="underline">Locations</a>, <a href="#" className="underline">Startups</a>, <a href="#" className="underline">Startups Hiring</a>, <a href="#" className="underline">Industries</a>, <a href="#" className="underline">Tech Hubs</a>
                        </p>
                        <p className="mt-6 text-sm text-center lg:text-left">
                            Copyright © 2024 Wellfound (formerly AngelList Talent). All rights reserved.
                        </p>
                    </div>

                    {/* Middle: Links */}
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12 lg:space-x-20">
                        {/* For Candidates */}
                        <div className="text-center sm:text-left">
                            <h3 className="font-bold text-lg mb-4">For Candidates</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm hover:underline">Overview</a></li>
                                <li><a href="#" className="text-sm hover:underline">Startup Jobs</a></li>
                                <li><a href="#" className="text-sm hover:underline">Web3 Jobs</a></li>
                                <li><a href="#" className="text-sm hover:underline">Featured</a></li>
                                <li><a href="#" className="text-sm hover:underline">Salary Calculator</a></li>
                                <li><a href="#" className="text-sm hover:underline">Startup Hiring Data</a></li>
                                <li><a href="#" className="text-sm hover:underline">Tech Startups</a></li>
                                <li><a href="#" className="text-sm hover:underline">Remote</a></li>
                            </ul>
                        </div>

                        {/* For Recruiters */}
                        <div className="text-center sm:text-left">
                            <h3 className="font-bold text-lg mb-4">For Recruiters</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm hover:underline">Overview</a></li>
                                <li><a href="#" className="text-sm hover:underline">Recruit Pro</a></li>
                                <li><a href="#" className="text-sm hover:underline">Curated</a></li>
                                <li><a href="#" className="text-sm hover:underline">RecruiterCloud</a></li>
                                <li><a href="#" className="text-sm hover:underline">Hire Developers</a></li>
                                <li><a href="#" className="text-sm hover:underline">Pricing</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;