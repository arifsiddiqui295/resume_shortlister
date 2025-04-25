import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';

const Student_Accomplishments = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [accomplishments, setAccomplishments] = useState({
        id: '',
        leadership: '',
        research_paper: '',
        summary: ''
    });
    const [hasLeadershipRole, setHasLeadershipRole] = useState(false);
    const [leadershipDescription, setLeadershipDescription] = useState('');
    const [hasResearchPapers, setHasResearchPapers] = useState(false);
    const [researchDescription, setResearchDescription] = useState('');

    const saveAccomplishments = async () => {
        try {
            if (!inputValue.trim()) {
                toast.error('Please enter a summary of your accomplishments');
                return;
            }

            const Student_Accomplishments = {
                summary: inputValue,
                leadership: hasLeadershipRole ? leadershipDescription : null,
                research_paper: hasResearchPapers ? researchDescription : null,
                student
            };

            const res = await request('post', '/accomplishments/', Student_Accomplishments);

            if (!res || !res.id) {
                throw new Error('Invalid response from server');
            }

            const newStudentAccomplishments = {
                id: res.id,
                leadership: res.leadership || '',
                research_paper: res.research_paper || '',
                summary: res.summary || ''
            };
            setAccomplishments(newStudentAccomplishments);
            toast.success('Accomplishments saved successfully!');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving accomplishments:', error);
            toast.error(error.message || 'Failed to save accomplishments. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        try {
            const text = e.target.value;
            const words = text.split(/\s+/).filter(word => word.length > 0);
            if (words.length <= 50) {
                setInputValue(text);
            } else {
                toast.error('Only 50 words allowed in summary');
            }
        } catch (error) {
            console.error('Error handling input:', error);
            toast.error('Error processing your input');
        }
    };

    useEffect(() => {
        const getStudentAccomplishmentsDetails = async () => {
            if (!student) return;

            try {
                const res = await request('get', '/accomplishments/');
                const matchedStudentAccomplishments = res.filter(
                    accomplishment => accomplishment.student === student
                );

                if (matchedStudentAccomplishments.length > 0) {
                    const firstAccomplishment = matchedStudentAccomplishments[0];
                    const newStudentAccomplishments = {
                        id: firstAccomplishment.id || '',
                        leadership: firstAccomplishment.leadership || '',
                        research_paper: firstAccomplishment.research_paper || '',
                        summary: firstAccomplishment.summary || ''
                    };
                    setAccomplishments(newStudentAccomplishments);
                    setInputValue(firstAccomplishment.summary || '');
                    setLeadershipDescription(firstAccomplishment.leadership || '');
                    setResearchDescription(firstAccomplishment.research_paper || '');
                }
            } catch (error) {
                console.error('Error fetching accomplishments:', error);
                toast.error(error.message || 'Failed to load accomplishments');
            }
        };
        getStudentAccomplishmentsDetails();
    }, [student]);

    return (
        <>
            <div className="bg-white rounded-lg p-6 shadow-md w-full md:w-[60vw]">
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
                    <div>
                        <p><strong>Summary:</strong> {accomplishments.summary}</p>
                        <p><strong>Research Paper:</strong> {accomplishments.research_paper}</p>
                        <p><strong>Leadership Role:</strong> {accomplishments.leadership}</p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[60%] h-[60%] overflow-y-auto p-6">
                        <div className='flex justify-end'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="ml-auto inline-flex justify-center items-center rounded-full focus:outline-none"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <h1 className='text-2xl font-semibold'>Accomplishments Summary</h1>
                        <textarea
                            className='border-2 rounded-2xl w-full p-3 h-32 outline-gray-600'
                            placeholder='Write Accomplishments summary'
                            value={inputValue}
                            onChange={handleInputChange}
                        />

                        <div className='mt-4'>
                            <label className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    checked={hasLeadershipRole}
                                    onChange={() => setHasLeadershipRole(!hasLeadershipRole)}
                                />
                                Have you been part of any leadership group?
                            </label>
                            {hasLeadershipRole && (
                                <textarea
                                    className='border-2 rounded-2xl w-full p-3 h-24 mt-2'
                                    placeholder='Describe your leadership experience'
                                    value={leadershipDescription}
                                    onChange={(e) => setLeadershipDescription(e.target.value)}
                                />
                            )}
                        </div>

                        <div className='mt-4'>
                            <label className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    checked={hasResearchPapers}
                                    onChange={() => setHasResearchPapers(!hasResearchPapers)}
                                />
                                Have you published any research papers?
                            </label>
                            {hasResearchPapers && (
                                <textarea
                                    className='border-2 rounded-2xl w-full p-3 h-24 mt-2'
                                    placeholder='Describe your research papers'
                                    value={researchDescription}
                                    onChange={(e) => setResearchDescription(e.target.value)}
                                />
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