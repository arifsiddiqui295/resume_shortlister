import React, { useState, useEffect } from 'react'
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';

const Student_Competetive_Exams = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isExamSelected, setIsExamSelected] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [score, setScore] = useState('');
    const [examFocused, setExamFocused] = useState(false);
    const [currSelectedExams, setCurrSelectedExams] = useState();
    const [primaryKey, setPrimaryKey] = useState('');
    const [filteredExams, setFilteredExams] = useState([
        "TOEFL",
        "GMAT",
        "GRE",
        "SAT",
        "IELTS",
        "LSAT",
        "MCAT",
        "CAT",
        "MAT",
        "SNAP",
        "GATE",
        "NATIONAL ELIGIBILITY TEST(NET)",
        "XAT",
        "AICEE",
        "CLAT",
        "JEE Mains",
        "JEE Advance",
        "BITSAT",
        "NEET"
    ]);
    const [allSelectedExams, setAllSelectedExams] = useState([])
    const filterExams = (e) => {
        try {
            const currLetter = e.target.value;
            setInputValue(currLetter);
            const filter = competitiveExams.filter((exam) => exam.toLowerCase().startsWith(currLetter.toLowerCase()))
            setFilteredExams(filter);
        } catch (error) {
            console.error("Error filtering exams:", error);
            alert("Error searching exams. Please try again.");
        }
    }
    const examSelect = async () => {
        try {
            const newExam = {
                exam_name: currSelectedExams,
                score: score,
                student
            }

            if (!newExam.exam_name || !newExam.score) {
                alert("Please select an exam and enter a score");
                return;
            }

            if (isEdit) {
                const res = await request('patch', `/competitive_exams/${primaryKey}/`, newExam);
                const updatedExams = allSelectedExams.map(exam =>
                    exam.id === primaryKey ? res : exam
                );
                setAllSelectedExams(updatedExams);
            } else {
                const res = await request('post', '/competitive_exams/', newExam)
                setAllSelectedExams(prev => [...prev, res]);
            }
            closeModal();
        } catch (error) {
            console.error("Error saving exam:", error);
            alert("Failed to save exam. Please try again.");
        }
    };
    const addExams = (exam) => {
        try {
            setCurrSelectedExams(exam);
            setIsExamSelected(true)
            setInputValue('')
        } catch (error) {
            console.error("Error selecting exam:", error);
        }
    }
    const checkOrRemove = () => {
        setCurrSelectedExams('');
        setIsExamSelected(false)
    }
    const editExam = async (exam) => {
        try {
            setIsModalOpen(true)
            setPrimaryKey(exam.id);
            setScore(exam.score)
            setCurrSelectedExams(exam.exam_name)
            setIsEdit(true)
            setIsExamSelected(true);
        } catch (error) {
            console.error("Error editing exam:", error);
            alert("Error loading exam details. Please try again.");
        }
    }
    const closeModal = () => {
        try {
            setIsModalOpen(false);
            setScore('');
            setCurrSelectedExams('');
            setInputValue('');
            setIsEdit(false);
            setIsExamSelected(false);
        } catch (error) {
            console.error("Error closing modal:", error);
        }
    }
    useEffect(() => {
        const getStudentCompetetiveExams = async () => {
            try {
                const res = await request('get', '/competitive_exams/');
                const matchedCompetetiveExams = res.filter(exams => exams.student === student);
                // console.log("matchedCompetetiveExams: ", matchedCompetetiveExams)
                setAllSelectedExams(matchedCompetetiveExams)
            } catch (error) {
                console.error("Error fetching exams:", error);
                alert("Failed to load exams. Please try again.");
            }
        }
        getStudentCompetetiveExams();
    }, [student])
    const competitiveExams = [
        "TOEFL",
        "GMAT",
        "GRE",
        "SAT",
        "IELTS",
        "LSAT",
        "MCAT",
        "CAT",
        "MAT",
        "SNAP",
        "GATE",
        "NATIONAL ELIGIBILITY TEST(NET)",
        "XAT",
        "AICEE",
        "CLAT",
        "JEE Mains",
        "JEE Advance",
        "BITSAT",
        "NEET"
    ];

    return (
        <>
            <div id='student-competitive-exams'>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw] font-sans">
                    <div className="flex justify-between items-center  ">
                        <div className='flex flex-col'>
                            <h2 className="text-lg font-semibold">Competitive exams</h2>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add</button>
                    </div>
                    <div className='mt-2 flex gap-2 flex-col'>
                        {allSelectedExams && (
                            allSelectedExams.map((value, index) => (
                                <div
                                    key={index}
                                >
                                    <p className='flex gap-1 text-lg'>
                                        {value.exam_name}
                                        <i
                                            onClick={() => editExam(value)}
                                            className="ri-pencil-line text-gray-500"></i>
                                    </p>
                                    <p className='text-md text-gray-500'>Got {value.score} Score</p>
                                </div>
                            ))
                        )}
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
                                onClick={() => {
                                    setIsModalOpen(false)
                                    setIsEdit(false);
                                    setIsExamSelected(false)
                                }
                                }
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
                                <h1 className='text-2xl font-semibold'>Competitive exams</h1>
                                <p className='text-sm text-[#717b9e]'>Add details of competitive exams you have taken to enhance your profile.</p>
                            </div>

                        </div>

                        <div className='flex flex-col py-10'>
                            <div className='flex flex-col p-2 mt-2 gap-5 w-[98%] '>
                                <h1 className='text-lg font-medium'>Competitive exams</h1>
                                {isExamSelected ? (
                                    <div>
                                        <div className='flex flex-wrap gap-2'>
                                            <p
                                                className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1] '>
                                                {currSelectedExams}
                                                <i
                                                    onClick={checkOrRemove}
                                                    className="ri-close-large-line cursor-pointer"></i>
                                            </p>
                                        </div>
                                        <div className='comfort flex flex-wrap gap-2 mt-2'>
                                            <input
                                                value={score}
                                                onChange={(e) => { setScore(e.target.value) }}
                                                className='border-2 w- rounded-2xl outline-gray-500 p-3 '
                                                type="number" placeholder='Score' />
                                        </div>
                                    </div>
                                ) : (
                                    <div className=''>
                                        <input type="text"
                                            className='border-2 w-full p-3 outline-none'
                                            placeholder='Search Exams'
                                            value={inputValue}
                                            onFocus={() => {
                                                setExamFocused(true)
                                            }}
                                            onBlur={() => setTimeout(() => setExamFocused(false), 200)}
                                            onChange={(e) => filterExams(e)}
                                        />
                                        {examFocused && (
                                            <ul className='h-22'>
                                                {filteredExams.map((exam, index) => (
                                                    <li
                                                        onClick={() => addExams(exam)}
                                                        key={index}
                                                        className='text-xl flex gap-1 m-2 hover:bg-slate-100 mt-1'>
                                                        {exam}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='text-[#275df5] font-semibold'>Cancel</button>
                            {isExamSelected ? (
                                <button
                                    onClick={examSelect}
                                    className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                            ) : (
                                <button
                                    onClick={examSelect}
                                    className='bg-[#c5c8d1] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                            )}
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_Competetive_Exams