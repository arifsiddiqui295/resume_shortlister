import React, { useState, useEffect } from 'react'

const Student_School_Education = (props) => {
    var { gradP, onSave, closeModal, updateInformation, edit } = props;
    const [grade, setGrade] = useState();
    const [inputValue, setInputValue] = useState('')
    const [board, setBoard] = useState('');
    const [medium, setMedium] = useState('');
    const [isBoardFocused, setIsBoadFocused] = useState(false);
    const [isMediumFocused, setIsMediumFocused] = useState(false);
    const [percent, setPercent] = useState();
    const [schoolName, setSchoolName] = useState();
    const [passingYear, setPassingYear] = useState();
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        console.log(updateInformation)
        setIsEdit(edit)
        // console.log(edit)
        if (edit) {
            setGrade()
            setBoard(updateInformation.board_specialization);
            setSchoolName(updateInformation.schoolName_CollegName)
            setPassingYear(updateInformation.passingYear)
            setPercent(updateInformation.percent_cgpa);
            setMedium(updateInformation.medium_university)
        } else {
            // setGrade(gradP);
            console.log(gradP)
            console.log("Is Edit chal raha")
        }

    }, [updateInformation, setGrade])

    const indianEducationBoards = [
        "CBSE",
        "ISCE",
        "NIOS",
        "IB",
        "CIE",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Delhi",
        "Chandigarh",
        "Puducherry",
        "Other"
    ];
    const indianSchoolMediums = [
        "Hindi",
        "English",
        "Urdu",
        "Bengali",
        "Telugu",
        "Marathi",
        "Tamil",
        "Gujarati",
        "Kannada",
        "Odia",
        "Punjabi",
        "Malayalam",
        "Assamese",
        "Konkani",
        "Manipuri",
        "Sanskrit",
        "Sindhi",
        "Kashmiri",
        "Nepali",
        "Bodo",
        "Dogri",
        "Santhali",
        "Maithili",
        "Gujarati",
        "Arabic",
        "Other"
    ];

    const selectingBoard = (value) => {
        // console.log(value)
        setBoard(value);
        setInputValue('')
    }
    const filteredBoards = indianEducationBoards.filter(board =>
        board.toLowerCase().includes(inputValue.toLowerCase())
    );

    const selectingMedium = (value) => {
        // console.log(value)
        setMedium(value);
        setInputValue('')
    }
    const filteredMediums = indianSchoolMediums.filter(medium =>
        medium.toLowerCase().includes(inputValue.toLowerCase())
    );

    const updateClass = () => {
        console.log(gradP)
        setGrade(gradP)
        // console.log()
        const newClass = {
            
            grade_Program: updateInformation.grade_Program,
            schoolName_CollegName: schoolName,
            board_specialization: board,
            medium_university: medium,
            percent_cgpa: percent,
            passingYear: passingYear
        }
        setBoard('')
        setSchoolName('')
        setMedium('');
        setPassingYear('')
        setPercent('')
        closeModal();
        onSave(newClass)
        console.log(newClass)
    }
    const savingClass = () => {
        // console.log(grade, board, medium, percent, schoolName, passingYear)
        console.log(gradP)
        setGrade(gradP)
        // console.log()
        const newClass = {
            grade_Program: gradP,
            schoolName_CollegName: schoolName,
            board_specialization: board,
            medium_university: medium,
            percent_cgpa: percent,
            passingYear: passingYear
        }
        onSave(newClass)
        setBoard('')
        setSchoolName('')
        setMedium('');
        setPassingYear('')
        setPercent('')
        closeModal();
        console.log(newClass)
    }
    return (
        <div>
            <div>
                <p className='mb-2 text-black font-medium'>Examination Board {grade}</p>
                {board ? (
                    <p className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 w-fit rounded-full text-black focus:outline-none bg-[#e7e7f1]'>
                        {board}
                        <i
                            onClick={() => { setBoard('') }}
                            className="ri-close-large-line cursor-pointer"
                        ></i>
                    </p>
                ) : (
                    <div className='relative'>
                        {/* Input Field */}
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsBoadFocused(true)}
                            onBlur={() => setTimeout(() => setIsBoadFocused(false), 200)}
                            type="text"
                            className='border-2 w-full p-3 outline-none'
                            placeholder='Search Xth Board'
                        />

                        {/* Dropdown List */}
                        {isBoardFocused && (
                            <ul className='absolute z-10 border border-gray-300 bg-white w-full max-h-60 overflow-auto mt-1'>
                                {filteredBoards.map((board, index) => (
                                    <li
                                        key={index}
                                        className='text-xl p-2 hover:bg-slate-100 cursor-pointer'
                                        onClick={() => selectingBoard(board)}
                                    >
                                        {board}
                                    </li>
                                ))}
                                {filteredBoards.length === 0 && (
                                    <li
                                        onClick={() => { selectingBoard('Other') }}
                                        className='text-xl p-2 hover:bg-slate-100 cursor-pointer'
                                    >
                                        Other
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                )}

            </div>
            <div className='mt-5'>
                <div>
                    <p className='mb-2 text-black font-medium'>Medium of Study</p>
                    {medium ? (
                        <p className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 w-fit rounded-full text-black focus:outline-none bg-[#e7e7f1]'>
                            {medium}
                            <i
                                onClick={() => setMedium('')}
                                className="ri-close-large-line cursor-pointer"
                            ></i>
                        </p>
                    ) : (
                        <div className='relative'>
                            {/* Input Field */}
                            <input
                                onChange={(e) => setInputValue(e.target.value)}
                                onFocus={() => setIsMediumFocused(true)}
                                onBlur={() => setTimeout(() => setIsMediumFocused(false), 200)}
                                type="text"
                                className='border-2 w-full p-3 outline-none'
                                placeholder='Search Medium'
                            />

                            {/* Dropdown List */}
                            {isMediumFocused && (
                                <ul className='absolute z-10 border border-gray-300 bg-white w-full max-h-60 overflow-auto mt-1'>
                                    {filteredMediums.map((medium, index) => (
                                        <li
                                            key={index}
                                            className='text-xl p-2 hover:bg-slate-100 cursor-pointer'
                                            onClick={() => selectingMedium(medium)}
                                        >
                                            {medium}
                                        </li>
                                    ))}
                                    {filteredMediums.length === 0 && (
                                        <li
                                            onClick={() => { selectingMedium('Other') }}
                                            className='text-xl p-2 hover:bg-slate-100 cursor-pointer'
                                        >
                                            Other
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    )}

                </div>
            </div>
            <div className='mt-5'>
                <p className='mb-2 text-black font-medium'>Percentage</p>
                <input
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                    type="number"
                    className='border-2 w-full p-3 outline-none'
                    placeholder='Your Percentage'
                />
            </div>
            <div className='mt-5'>
                <p className='mb-2 text-black font-medium'>School Name</p>
                <input
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    type="Text"
                    className='border-2 w-full p-3 outline-none'
                    placeholder='School Name'
                />
            </div>
            <div className='mt-5'>
                <p className='mb-2 text-black font-medium'>Passing Year</p>
                <input
                    value={passingYear}
                    onChange={(e) => setPassingYear(e.target.value)}
                    type="number"
                    className='border-2 w-full p-3 outline-none'
                    placeholder='Passing Year'
                />
            </div>
            <div className='flex justify-end gap-2 mt-4'>
                {edit ? (
                    <button className='text-[#275df5] font-semibold'>Delete </button>
                ) : (
                    <button className='text-[#275df5] font-semibold'>I'll add this later</button>
                )}
                {edit ? (
                    <button
                        onClick={updateClass}
                        className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Update Changes</button>
                ) : (
                    <button
                        onClick={savingClass}
                        className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                )}


            </div>
        </div>
    )
}

export default Student_School_Education