import React, { useEffect, useState } from "react";
import request from "../api/request";
import Navbar from "../Components/Navbar";

// const companies = [
//     {
//         id: 1,
//         name: "Tech World",
//         package: "4.8LPA",
//         status: "Application sent",
//         position: "Frontend Developer",
//         note: "Awaiting response from HR."
//     },
//     {
//         id: 2,
//         name: "InnovateX",
//         package: "6.5LPA",
//         status: "Interview Scheduled",
//         position: "Backend Developer",
//         note: "Interview scheduled for next Monday."
//     },
//     {
//         id: 3,
//         name: "CodeCrafters",
//         package: "7.2LPA",
//         status: "Offer Received",
//         position: "Full Stack Developer",
//         note: "Offer details need to be reviewed."
//     },
//     {
//         id: 4,
//         name: "DataSphere",
//         package: "5.8LPA",
//         status: "Rejected",
//         position: "Data Analyst",
//         note: "May apply again next cycle."
//     },
//     {
//         id: 5,
//         name: "CyberSecure",
//         package: "8.0LPA",
//         status: "Application sent",
//         position: "Cybersecurity Engineer",
//         note: "Follow up in two weeks."
//     },
//     {
//         id: 6,
//         name: "AI Labs",
//         package: "9.5LPA",
//         status: "Interview Scheduled",
//         position: "Machine Learning Engineer",
//         note: "Prepare for technical round."
//     },
//     {
//         id: 7,
//         name: "CloudNest",
//         package: "10.2LPA",
//         status: "Offer Received",
//         position: "Cloud Engineer",
//         note: "Compare offer with other companies."
//     },
//     {
//         id: 8,
//         name: "FinTech Solutions",
//         package: "6.8LPA",
//         status: "Application sent",
//         position: "Software Engineer",
//         note: "HR might reach out this week."
//     },
//     {
//         id: 9,
//         name: "QuantumSoft",
//         package: "12.0LPA",
//         status: "Interview Scheduled",
//         position: "Blockchain Developer",
//         note: "Review blockchain concepts."
//     },
//     {
//         id: 10,
//         name: "Webify",
//         package: "5.5LPA",
//         status: "Rejected",
//         position: "UI/UX Designer",
//         note: "Consider improving portfolio."
//     },
// ];

const ApplicationStatus = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companies, setCompanies] = useState([]);

    const openNotes = (company) => {
        setSelectedCompany(company);
        setIsOpen(true);
    };

    // Close modal
    const closeNotes = () => {
        setIsOpen(false);
        setSelectedCompany(null);
    };
    useEffect(() => {
        const getApplicationStatus = async () => {
            const res = await request('get', '/jobs/application_list/');
            console.log("res from getApplicationStatus", res);
            const com = res.concat(res);
            console.log(com);
            setCompanies(res);
        }
        getApplicationStatus();
    }, [])
    return (
        <>
            <Navbar />
            <div className="min-h-screen  hidden bg-gray-100 md:flex items-top justify-center p-6">
                <div className="w-full max-w-6xl h-fit bg-white shadow-lg rounded-xl overflow-hidden p-6">
                    <h2 className="text-3xl font-bold text-center text-[#4d6bfe] py-4">
                        Job Applications
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-[#4d6bfe] text-white sticky top-0">
                                <tr>
                                    <th className="py-4 px-2 text-center">Company Name</th>
                                    <th className="py-4 px-2 text-center">Position</th>
                                    <th className="py-4 px-2 text-center">Package</th>
                                    <th className="py-4 px-2 text-center">Application Status</th>
                                    <th className="py-4 px-2 text-center">Notification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company, index) => (
                                    <tr
                                        key={company.jobs.id}
                                        className={`border-b transition-all hover:bg-blue-100 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"
                                            }`}
                                    >
                                        <td className="py-4 px-2 text-center text-gray-700 font-medium">
                                            {company.jobs.company}
                                        </td>
                                        <td className="py-4 px-2 text-center text-gray-600">
                                            {company.jobs.title}
                                        </td>
                                        <td className="py-4 px-2 text-center text-gray-600">
                                            {company.jobs.package}
                                        </td>
                                        <td className="py-4 px-2 text-center text-gray-600">
                                            {company.status}
                                        </td>
                                        <td className="py-4 px-2 text-center hover:scale-125">
                                            <button className="cursor-pointer" onClick={() => openNotes(company)}>🖊️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* cards For small screen  */}
            <div className="w-full p-4 flex gap-4 flex-col md:hidden">
                {companies.map((company, index) => (
                    <div
                        key={index}
                        className={`w-full rounded-xl ${index % 2 === 0
                            ? "bg-blue-50"
                            : "bg-white border-[0.7px] border-[#4d6bfe]"
                            } p-4 gap-4 h-auto flex flex-col`}
                    >
                        <div className="text-[#4d6bfe] text-[29px] font-bold">
                            {company.jobs.company}
                        </div>
                        <div className="text-gray-600 font-semibold text-[18px]">
                            {company.jobs.title}
                        </div>
                        <div className="text-gray-600 text-[14px]">   {company.jobs.package}</div>
                        <div className="flex text-[#4d6bfe] font-semibold justify-between">
                            {company.status}
                            <button className="cursor-pointer" onClick={() => openNotes(company)}>🖊️</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Notes */}
            {isOpen && selectedCompany && (
                <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white flex flex-col p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] mx-auto">
                        <button className="self-end font-bold text-lg" onClick={closeNotes}>
                            X
                        </button>
                        <h2 className="text-2xl font-bold text-center text-[#4d6bfe]">
                            Notification
                        </h2>
                        <p className="text-center text-gray-700 mt-2">
                            <span className="font-semibold">{selectedCompany.remark}</span>
                        </p>
                        <p className="text-center text-gray-700 mt-2">
                            <span className="font-semibold">{selectedCompany.jobs.jd}</span>
                        </p>
                        <p className="text-center text-gray-700 mt-2">
                            <span className="font-semibold">{selectedCompany.jobs.description}</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplicationStatus;
