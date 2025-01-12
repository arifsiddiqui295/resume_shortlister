import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react'

const Student_Competetive_Exams = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isExamSelected, setIsExamSelected] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [inputValue, setInputValue] = useState(null);
    const [score, setScore] = useState();
    const [selectedExams, setSelectedExams] = useState([]);
    const [currSelectedExams, setCurrSelectedExams] = useState();
    const [filteredExams, setFilteredExams] = useState([]);
    const [allSelectedExams, setAllSelectedExams] = useState([])
    const filterExams = (e) => {
        const currLetter = e.target.value;
        setInputValue(e.target.value);
        const filter = competitiveExams.filter((exam) => exam.toLowerCase().startsWith(currLetter.toLowerCase()))
        setFilteredExams(filter);
    }
    const examSelect = () => {
        console.log(currSelectedExams, score)
        // console.log(allSelectedExams)
        const newExam = {
            exam: currSelectedExams,
            score: score
        }
        // console.log(newExam)
        setAllSelectedExams((prevExams) => {
            const existingIndex = prevExams.findIndex((exam) => {
                return (exam.exam === currSelectedExams)
            })
            console.log("existing index ", existingIndex)
            if (existingIndex !== -1) {
                const updatedExams = [...prevExams];
                updatedExams[existingIndex].score = score;
                return updatedExams;
            } else {
                return [...prevExams, newExam]
            }
        })
        console.log(allSelectedExams)
        setIsExamSelected(false);
        setIsModalOpen(false);

        setInputValue('');
    };
    const addExams = (exam) => {
        // console.log(language)
        setCurrSelectedExams(exam);
        setIsExamSelected(true)
    }
    useEffect(() => { }, [selectedExams, allSelectedExams]);

    const checkOrRemove = () => {
        console.log(isEdit)
        if (isEdit) {
            const updatedExams = allSelectedExams.filter((exams) => {
                return exams.exam != currSelectedExams;
            })
            console.log(updatedExams);
            setAllSelectedExams(updatedExams)
            setIsExamSelected(false);
        }
    }
    const editExam = (exam) => {
        console.log(exam)
        setIsModalOpen(true)
        setCurrSelectedExams(exam.exam)
        setIsEdit(true)
        setIsExamSelected(true);
    }
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
            <div>
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
                                        {value.exam}
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
                                            onChange={(e) => filterExams(e)}
                                        />
                                        {inputValue && (
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