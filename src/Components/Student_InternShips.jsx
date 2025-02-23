import React, { useEffect, useState } from 'react'
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';
import SkillsFilter from './SkillsFilter';
const Student_InternShips = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [selectInternship, setSelectInternship] = useState([]);
    const [skills, setSkills] = useState('')
    const [primaryKey, setPrimaryKey] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    // Separate states for From and To dates
    const handleSkillChange = (skills) => {
        setSkills(skills)
    }

    const saveInternships = async () => {
        try {
            const newInternship = {
                company_city: companyName,
                start_date: startDate,
                end_date: endDate,
                description: description,
                skills_used: skills,
                student,
            }
            // console.log("New Internship: ", newInternship)
            // console.log("primaryKey: ", primaryKey)
            if (isEdit) {
                const res = await request('patch', `/internship/${primaryKey}/`, newInternship);
                const updatedInternships = selectInternship.map(internship =>
                    internship.id === res.id ? { ...internship, ...res } : internship
                );
                // console.log(updatedInternships);
                setSelectInternship(updatedInternships);
                // console.log("res form internship:", res)
            } else {
                // console.log("Inside Updat ")
                const res = await request('post', '/internship/', newInternship);
                const updatedInternships = [...selectInternship, res];
                // console.log(updatedInternships);
                setSelectInternship(updatedInternships);
                // console.log("res from internship:", res);

            }
            setIsModalOpen(false);
            setIsEdit(false);
            closeModal();
        } catch (error) {
            console.log(error)
        }
    }
    const editInternship = (internship, index) => {
        // console.log(internship)
        setCompanyName(internship.company_city);
        setStartDate(internship.start_date);
        setEndDate(internship.end_date);
        setDescription(internship.description);
        setSkills(internship.skills_used);
        setPrimaryKey(internship.id);
        setIsEdit(true)
        setIsModalOpen(true)
    }
    const removeInternship = async () => {
        try {
            // console.log("Primary Key: ", primaryKey);
            const res = await request('delete', `/internship/${primaryKey}/`);
            // console.log("res:", res);
            const updatedInternships = selectInternship.filter(internship => internship.id != primaryKey);
            // console.log("updatedInternships: ", updatedInternships);
            setSelectInternship(updatedInternships);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const getStudentInternshiDetails = async () => {
            // console.log(selectInternship)
            const res = await request('get', `/internship/`);
            // console.log("res from internships details", res);
            const studentInternships = res.filter(internship => internship.student === student)
            // console.log("studentInternships: ", studentInternships)
            setSelectInternship(studentInternships)
        }
        getStudentInternshiDetails();
    }, [])
    const closeModal = () => {
        setCompanyName('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setSkills('');
        setIsModalOpen(false)
    }
    return (
        <>
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Internships</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add</button>
                    </div>
                    <div className='mt-2'>
                        {selectInternship.length === 0 ? (
                            <p className="text-gray-500">No internships added yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {selectInternship.map((internship, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                        <div className='flex gap-1 items-center'>
                                            <h3 className="text-lg font-medium text-black ">{internship.company_city}</h3>
                                            <i
                                                onClick={() => { editInternship(internship, index) }}
                                                className="ri-pencil-line text-gray-500 cursor-pointer"></i>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {internship.start_date}  to {internship.end_date}
                                        </p>
                                        <p>{internship.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {internship.skills_used.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="flex items-center justify-center px-3 py-1 border border-gray-300 hover:bg-gray-100  text-gray-600 rounded-full text-xs font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
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
                        <div className='flex flex-col pt-5'>
                            <h1 className='font-medium'>Company name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Search Cities'
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex w-full'>
                            {/* Internship Start Date */}
                            <div className='flex flex-col py-5 w-1/2'>
                                <h1 className='font-medium text-lg mb-3'>Start Date</h1>
                                <div className='m-2'>
                                    <input
                                        type='date'
                                        className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl focus:border-blue-500 transition-colors'
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Internship End Date */}
                            <div className='flex flex-col py-5 w-1/2'>
                                <h1 className='font-medium text-lg mb-3'>End Date</h1>
                                <div className='m-2'>
                                    <input
                                        type='date'
                                        className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl focus:border-blue-500 transition-colors'
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Describe what you did at internship */}
                        <div className='flex flex-col'>
                            <h1 className='font-medium'>Project  Description</h1>
                            <div className='flex gap-3 m-2'>
                                <textarea
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-xl'
                                    placeholder='Project Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Key Skills */}
                        <SkillsFilter onSkillChange={handleSkillChange} skillsSelected={skills} />

                        <div className='flex justify-end gap-2'>
                            {isEdit ? (
                                <button
                                    onClick={removeInternship}
                                    className='text-[#275df5] font-semibold'>Remove Internship</button>
                            ) : (
                                <button
                                    onClick={closeModal}
                                    className='text-[#275df5] font-semibold'>I'll add this later</button>
                            )}
                            <button
                                onClick={saveInternships}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_InternShips;
