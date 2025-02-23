import React, { useEffect, useState } from 'react'
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';
import SkillsFilter from './SkillsFilter';
const Student_Certifications = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [certificateName, setCertificateName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [issueDate, setIssueDate] = useState({ month: '', year: '' });
    const [credentials, setCredentials] = useState('');
    // const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [certificationsDetail, setCertificationsDetail] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    // Separate states for From and To dates

    const [monthFocued, setMonthFocused] = useState(false);
    const [yearFocused, setYearFocused] = useState(false);
    const [filteredMonths, setFilteredMonths] = useState(['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December']);
    const [filteredYears, setFilteredYears] = useState([2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030])

    const addingCertificate = (e) => {
        e.preventDefault();
        const newCertificate = {
            certificateName: certificateName,
            organizationName: organizationName,
            credentials: credentials,
            issueDate: issueDate.month + " " + issueDate.year,
            skills: [selectedSkills]
        }
        console.log("newCertificate: ", newCertificate)
        // setCertificationsDetail(newCertificate);
        setIsModalOpen(false)
    }
    const handleSkillChange = (skills) => {
        setSelectedSkills(skills)
    }
    useEffect(() => {
        const handleSaveChanges = () => {
            // console.log("Selected Skills", selectedSkills);
            // console.log("Skills :", certificationsDetail.skills);
        }
        handleSaveChanges();
    })
    const handelYearChange = (e) => {
        const currentYear = e.target.value;
        setIssueDate({ ...issueDate, year: e.target.value })
        currentYear.toLowerCase();
        const filter = allYears.filter((year) => {
            return (
                year.toString().startsWith(currentYear)
            )
        })
        setFilteredYears(filter)
    }
    const handelMonthChange = (e) => {
        const currentMonth = e.target.value;
        // console.log('currentMonth:', currentMonth)
        currentMonth.toLowerCase();
        setIssueDate({ ...issueDate, month: currentMonth })
        const filter = months.filter((month) =>
            month.toLowerCase().startsWith(currentMonth)
        )
        // console.log('filter: ', filter);
        setFilteredMonths(filter)
    }

    const closeModal = () => {
        setCertificateName('');
        setIsEdit(false)
        setIsModalOpen(false)
    }
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const allYears = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
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
                    {certificationsDetail && (
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                                <div className="flex-1">
                                    <div className="font-bold text-xl text-gray-800 mb-2">{certificationsDetail.certificateName}</div>
                                    <p className="text-gray-600 text-base mb-2">{certificationsDetail.organizationName}</p>
                                    <p className="text-gray-500 text-sm mb-2">Issued {certificationsDetail.issueDate}</p>
                                    <p className="text-gray-500 text-sm mb-4">Credential ID: {certificationsDetail.credentials}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {certificationsDetail.skills && certificationsDetail.skills[0].map((skill, index) => (
                                            <span
                                                key={index} // Add a unique key for each skill
                                                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 ml-4">
                                    <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
                                        <i className="ri-edit-box-line text-xl"></i>
                                    </button>
                                    <button className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                                        <i className="ri-delete-bin-6-line text-xl"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
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
                                <h1 className='text-2xl font-semibold'>Certifications</h1>
                                {/* <p className='text-sm text-[#717b9e]'>Show your professional learnings</p> */}
                            </div>
                        </div>

                        {/* Certificate name */}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Certificate name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Company name'
                                    value={certificateName}
                                    onChange={(e) => setCertificateName(e.target.value)}
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
                            <h1 className='font-medium text-lg mb-3'>Issued Date</h1>
                            <div className='flex gap-3 m-2'>
                                {/* Month Input */}
                                <div className='relative w-1/2'>
                                    <input
                                        type="text"
                                        className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl focus:border-blue-500 transition-colors'
                                        placeholder='Month'
                                        value={issueDate.month}
                                        onFocus={() => setMonthFocused(true)}
                                        onBlur={() => setTimeout(() => setMonthFocused(false), 200)}
                                        onChange={handelMonthChange}
                                    />
                                    {monthFocued && (
                                        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg'>
                                            <ul className='max-h-32 overflow-y-auto'>
                                                {filteredMonths.map((month, index) => (
                                                    <li
                                                        key={index}
                                                        className='px-4 py-2 text-sm hover:bg-slate-100 cursor-pointer transition-colors'
                                                        onClick={() => {
                                                            setIssueDate({ ...issueDate, month: month })
                                                        }}
                                                    >
                                                        {month}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Year Input */}
                                <div className='relative w-1/2'>
                                    <input
                                        type="text"
                                        className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl focus:border-blue-500 transition-colors'
                                        placeholder='Year'
                                        value={issueDate.year}
                                        onFocus={() => setYearFocused(true)}
                                        onBlur={() => setTimeout(() => setYearFocused(false), 200)}
                                        onChange={handelYearChange}
                                    />
                                    {yearFocused && (
                                        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg'>
                                            <ul className='max-h-32 overflow-y-auto'>
                                                {filteredYears.map((year, index) => (
                                                    <li
                                                        key={index}
                                                        className='px-4 py-2 text-sm hover:bg-slate-100 cursor-pointer transition-colors'
                                                        onClick={() => {
                                                            setIssueDate({ ...issueDate, year: year })
                                                        }}
                                                    >
                                                        {year}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
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
                        <SkillsFilter onSkillChange={handleSkillChange} skillsSelected={selectedSkills} />
                        <div className='flex justify-end gap-2'>
                            <button
                                // onClick={() => deleteProfileSummary()}
                                className='text-[#275df5] font-semibold'>Delete</button>
                            <button
                                onClick={addingCertificate}
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
