import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../api/request';
const Student_Accomplishments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState(null);
    const [profileSummary, setProfileSummary] = useState('');
    const saveProfileSummary = async () => {
        const Student_Accomplishments = {
            studentAccomplishments: inputValue
        }
        console.log(inputValue)
        const response = await request('post', "/", Student_Accomplishments);
        console.log(response)
        setProfileSummary(inputValue)
        setIsModalOpen(false)
    }
    const handleInputChange = (e) => {
        const words = e.target.value.split(" ");

        // Allow input only if word count is <= 50
        if (words.length <= 50) {
            setInputValue(e.target.value);
        } else {
            // Trigger toast notification if word count exceeds 50
            toast.error("Only 50 words allowed.");
        }
    };
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                    <div className="flex justify-between items-center  ">
                        <h2 className="text-lg font-semibold">Accomplishments</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add/ Edit</button>
                    </div>
                    <div className='mt-2 flex gap-2 flex-wrap'>
                        {profileSummary ? (
                            <div>
                                {profileSummary}
                            </div>

                        ) : (<div>
                            Write about your key accomplishments in academics, extracurricular activities, or any clubs you were part of. Highlight awards, certifications, leadership roles, or impactful projects you've completed. Make sure your summary is meaningful and exceeds 50 words to effectively showcase your achievements and contributions.
                        </div>


                        )
                        }
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div
                    className="fixed  inset-0 z-[80]  bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <div className="bg-white border shadow-sm rounded-xl w-[60%] h-[50%] overflow-y-auto p-6">
                        <div className='flex justify-end '>
                            <button
                                type="button"
                                className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-between items-center py-3 px-4 border-b">
                            <div>
                                <h1 className='text-2xl font-semibold'>Accomplishments summary</h1>
                                <p className='text-sm text-[#717b9e]'>Write about your key accomplishments in academics, extracurriculars, or clubs. Highlight awards, certifications, leadership roles, or impactful projects. Ensure your summary is meaningful and highlights your achievements effectively.</p>
                            </div>

                        </div>
                        <div className='flex flex-col py-10'>
                            <div className='flex flex-col p-2 mt-2 gap-5 w-[98%] '>
                                <div className=''>
                                    <textarea type="text"
                                        className='border-2 rounded-2xl border-gray-400 w-full p-3 h-32 outline-gray-600'
                                        placeholder='Write Accomplishments summary'
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <button onClick={() => setIsModalOpen(false)} className='text-[#275df5] font-semibold'>I'll add this later</button>
                            <button
                                onClick={saveProfileSummary}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Student_Accomplishments