import React, { useState } from 'react'
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import request from '../api/request';
const Student_Certifications = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [projectName, setProjectName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [certificateName, setCertificateName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [issueDate, setIssueDate] = useState();
    const [credentials, setCredentials] = useState('');
    const [skills, setSkills] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [gitHubLink, setGitHubLInk] = useState('');
    const [liveLink, setLiveLink] = useState();
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [internshipId, setInternshipId] = useState();
    const [selectInternship, setSelectInternship] = useState([]);

    const [isEdit, setIsEdit] = useState(false);
    // Separate states for From and To dates
    const [selectedFromDate, setSelectedFromDate] = useState(new Date());
    const [selectedToDate, setSelectedToDate] = useState(new Date());

    const closeModal = () => {
        setCompanyName('');
        setSelectedFromDate(new Date());
        setSelectedToDate(new Date());
        setProjectDescription('');
        setProjectName('')
        setSelectedSkills([]);
        setInputValue('')
        setGitHubLInk('');
        setLiveLink('');
        setIsEdit(false)
        setIsModalOpen(false)
    }

    const addInternship = async () => {
        const index = selectInternship.findIndex(internship => String(internship.id) === String(internshipId));
        console.log(index)
        // Format dates as strings for consistency before updating state
        const formattedFromDate = selectedFromDate instanceof Date ? selectedFromDate.toDateString() : selectedFromDate;
        const formattedToDate = selectedToDate instanceof Date ? selectedToDate.toDateString() : selectedToDate;

        if (index !== -1) {
            // Create a copy of the array to maintain immutability
            const updatedInternships = [...selectInternship];
            updatedInternships[index] = {
                ...updatedInternships[index],
                companyName,
                selectedFromDate: formattedFromDate,
                selectedToDate: formattedToDate,
                projectName: projectName,
                projectDescription: projectDescription,
                selectedSkills,
                gitHubLink,
                liveLink,
            };
            setIsEdit(false)
            setSelectInternship(updatedInternships);
        } else {
            // Add new internship with formatted dates
            const newInternship = {
                id: uuidv4(),
                companyName,
                selectedFromDate: formattedFromDate,
                selectedToDate: formattedToDate,
                projectName: projectName,
                projectDescription: projectDescription,
                selectedSkills,
                gitHubLink,
                liveLink,
            };
            console.log(selectInternship)
            const response = await request('post', "/", selectInternship);
            console.log(response)
            setSelectInternship([...selectInternship, newInternship]);
        }
        // closeModal();
    };

    const editInternship = (internship) => {
        setIsEdit(true);
        setInternshipId(internship.id);
        setCompanyName(internship.companyName);
        // Convert dates to Date objects if they’re stored as strings
        setProjectDescription(internship.projectDescription);
        setProjectName(internship.projectName)
        setIsModalOpen(true);
    };

    const removeInternship = () => {
        console.log(selectInternship)
        console.log(internshipId)
        const updateInternships = selectInternship.filter((intern) => {
            return intern.id !== internshipId; // Use !== to avoid type coercion issues
        });
        // console.log(updateInternships);
        setSelectInternship(updateInternships)
        setIsModalOpen(false);
        closeModal()
    }
    return (
        <>
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Certifications</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add</button>
                    </div>
                    <div className='mt-2'>
                        {selectInternship.length === 0 ? (
                            <p className="text-gray-500">List certifications you've earned to showcase your expertise and skills.</p>
                        ) : (
                            <div className="space-y-4">
                                {selectInternship.map((internship, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                        <div className='flex gap-1 items-center'>
                                            <h3 className="text-lg font-medium text-black ">{internship.companyName} by {internship.projectName}</h3>
                                            <i
                                                onClick={() => { editInternship(internship, index) }}
                                                className="ri-pencil-line text-gray-500 cursor-pointer"></i>
                                        </div>
                                        <div>
                                            {internship.projectDescription}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[70%] h-[70%] overflow-y-auto p-6">
                        <div className='flex justify-end'>
                            <button
                                type="button"
                                className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                onClick={closeModal}
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-between items-center py-3 px-4 border-b">
                            <div>
                                <h1 className='text-2xl font-semibold'>Internships</h1>
                                <p className='text-sm text-[#717b9e]'>Show your professional learnings</p>
                            </div>
                        </div>

                        {/* Company name */}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Company name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Company name'
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Organization name */}
                        <div className='flex flex-col '>
                            <h1 className='font-medium'>Organization name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Organization name'
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Issue date */}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Issued date</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Month'
                                    value={issueDate}
                                    onChange={(e) => setIssueDate.month(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Year'
                                    value={issueDate}
                                    onChange={(e) => setIssueDate.year(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Credentials*/}
                        <div className='flex flex-col'>
                            <h1 className='font-medium'>Certificate ID</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Certificate ID'
                                    value={credentials}
                                    onChange={(e) => setCredentials(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Skills*/}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Skills</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Search Skills'
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <button 
                            // onClick={() => deleteProfileSummary()}
                             className='text-[#275df5] font-semibold'>Delete</button>
                            <button
                                // onClick={saveProfileSummary}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_Certifications;
