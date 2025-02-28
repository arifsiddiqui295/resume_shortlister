import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';

const Student_Accomplishments = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [accomplishments, setAccomplishments] = useState(
        { id: '' },
        { leadership: '' },
        { research_paper: '' },
        { summary: '' }
    );
    const [hasLeadershipRole, setHasLeadershipRole] = useState(false);
    const [leadershipDescription, setLeadershipDescription] = useState('');
    const [hasResearchPapers, setHasResearchPapers] = useState(false);
    const [researchDescription, setResearchDescription] = useState('');

    const saveAccomplishments = async () => {
        const Student_Accomplishments = {
            summary: inputValue,
            leadership: hasLeadershipRole ? leadershipDescription : null,
            research_paper: hasResearchPapers ? researchDescription : null,
            student
        };

        console.log("Student_Accomplishments", Student_Accomplishments);
        const res = await request('post', '/accomplishments/', Student_Accomplishments);
        console.log("response from student accomplishments: ", response);
        const matchedStudentAccomplishments = res.filter(accomplishments => accomplishments.student === student);
        console.log("matchedStudentAccomplishments: ", matchedStudentAccomplishments);
        const newStudentAccomplishments = {
            id: matchedStudentAccomplishments[1].id,
            leadership: matchedStudentAccomplishments[1].leadership,
            research_paper: matchedStudentAccomplishments[1].research_paper,
            summary: matchedStudentAccomplishments[1].summary
        }
        console.log("newStudentAccomplishments:", newStudentAccomplishments)
        setAccomplishments(newStudentAccomplishments)
        // setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const words = e.target.value.split(' ');
        if (words.length <= 50) {
            setInputValue(e.target.value);
        } else {
            toast.error('Only 50 words allowed.');
        }
    };
    useEffect(() => {
        const getStudetnAccomplishmentsDetails = async () => {
            const res = await request('get', '/accomplishments/');
            // console.log("res from get student accomplishments: ", res);
            const matchedStudentAccomplishments = res.filter(accomplishments => accomplishments.student === student);
            // console.log("matchedStudentAccomplishments: ", matchedStudentAccomplishments);
            const newStudentAccomplishments = {
                id: matchedStudentAccomplishments[0].id,
                leadership: matchedStudentAccomplishments[0].leadership,
                research_paper: matchedStudentAccomplishments[0].research_paper,
                summary: matchedStudentAccomplishments[0].summary
            }
            // console.log("newStudentAccomplishments:", newStudentAccomplishments)
            setAccomplishments(newStudentAccomplishments)
        }
        getStudetnAccomplishmentsDetails();
    }, [])
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
            <div id='student-accomplishments' className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Accomplishments</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#275DF5] text-md font-semibold"
                    >
                        Add/Edit
                    </button>
                </div>
                <div className='mt-2 flex gap-2 flex-wrap'>
                    {accomplishments ? (
                        <div>
                            <p><strong>Summary:</strong> {accomplishments.summary}</p>
                            <p><strong>Research Paper:</strong> {accomplishments.research_paper}</p>
                            <p><strong>Leadership Role:</strong> {accomplishments.leadership}</p>
                        </div>
                    ) : (
                        <div>Write about your key accomplishments...</div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[60%] h-[60%] overflow-y-auto p-6">
                        <div className='flex justify-end'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="ml-auto inline-flex justify-center items-center rounded-full focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <h1 className='text-2xl font-semibold'>Accomplishments Summary</h1>
                        <textarea className='border-2 rounded-2xl w-full p-3 h-32 outline-gray-600' placeholder='Write Accomplishments summary' value={inputValue} onChange={handleInputChange} />

                        <div className='mt-4'>
                            <label className='flex items-center gap-2'>
                                <input type='checkbox' checked={hasLeadershipRole} onChange={() => setHasLeadershipRole(!hasLeadershipRole)} />
                                Have you been part of any leadership group?
                            </label>
                            {hasLeadershipRole && (
                                <textarea className='border-2 rounded-2xl w-full p-3 h-24 mt-2' placeholder='Describe your leadership experience' value={leadershipDescription} onChange={(e) => setLeadershipDescription(e.target.value)} />
                            )}
                        </div>

                        <div className='mt-4'>
                            <label className='flex items-center gap-2'>
                                <input type='checkbox' checked={hasResearchPapers} onChange={() => setHasResearchPapers(!hasResearchPapers)} />
                                Have you published any research papers?
                            </label>
                            {hasResearchPapers && (
                                <textarea className='border-2 rounded-2xl w-full p-3 h-24 mt-2' placeholder='Describe your research papers' value={researchDescription} onChange={(e) => setResearchDescription(e.target.value)} />
                            )}
                        </div>

                        <div className='flex justify-end gap-2 mt-4'>
                            <button onClick={() => setIsModalOpen(false)} className='text-[#275df5] font-semibold'>I'll add this later</button>
                            <button onClick={saveAccomplishments} className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Student_Accomplishments;
