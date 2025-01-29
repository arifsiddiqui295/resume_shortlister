import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../api/request';

const RecruiterAccomplishments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasLeadershipRole, setHasLeadershipRole] = useState(false);
    // const [leadershipDescription, setLeadershipDescription] = useState('');
    const [hasResearchPapers, setHasResearchPapers] = useState(false);
    // const [researchDescription, setResearchDescription] = useState('');

    const saveAccomplishments = async () => {
        // const response = await request('post', '/', Recruiter_Accomplishments);
        // console.log(response);
        setIsModalOpen(false);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
            <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Candidate Accomplishments</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#275DF5] text-md font-semibold"
                    >
                        Add/Edit
                    </button>
                </div>
                <div className='flex gap-2 mt-2'>
                {hasLeadershipRole && (
                    <p className="px-4 py-1 bg-gray-200 rounded-full">Leadership group</p>
                )}
                {hasResearchPapers && (
                    <p className="px-4 py-1 bg-gray-200 rounded-full">Research paper</p>
                )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[60%] h-[35%] overflow-y-auto p-6">
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

                        <h1 className='text-2xl font-semibold'>Candidate Accomplishments</h1>

                        <div className='mt-4'>
                            <label className='flex items-center gap-2'>
                                <input type='checkbox' checked={hasLeadershipRole} onChange={() => setHasLeadershipRole(!hasLeadershipRole)} />
                                Was the candidate part of any leadership group?
                            </label>
                            {/* {hasLeadershipRole && (
                                <textarea className='border-2 rounded-2xl w-full p-3 h-24 mt-2' placeholder='Describe leadership experience' value={leadershipDescription} onChange={(e) => setLeadershipDescription(e.target.value)} />
                            )} */}
                        </div>

                        <div className='mt-4'>
                            <label className='flex items-center gap-2'>
                                <input type='checkbox' checked={hasResearchPapers} onChange={() => setHasResearchPapers(!hasResearchPapers)} />
                                Has the candidate published any research papers?
                            </label>
                            {/* {hasResearchPapers && (
                                <textarea className='border-2 rounded-2xl w-full p-3 h-24 mt-2' placeholder='Describe research papers' value={researchDescription} onChange={(e) => setResearchDescription(e.target.value)} />
                            )} */}
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

export default RecruiterAccomplishments;
