    import React, { useState, useEffect } from 'react'

    const Student_College_Education = (props) => {
        var { gradP, onSave, closeModal, updateInformation, edit } = props;
        const [graduation, setGraduation] = useState();
        const [inputValue, setInputValue] = useState('')
        const [program, setProgram] = useState('');
        const [specialization, setSpecialization] = useState('');
        const [isBoardFocused, setIsBoadFocused] = useState(false);
        const [isMediumFocused, setIsMediumFocused] = useState(false);
        const [percent, setPercent] = useState();
        const [collegeName, setCollegeName] = useState();
        const [startYear, setStartyear] = useState();
        const [passingYear, setPassingYear] = useState();
        const [isEdit, setIsEdit] = useState(false);
        useEffect(() => {
            // console.log(gradP)
            console.log(updateInformation)
            setIsEdit(edit)
            console.log(edit)
            if (edit) {
                // console.log(updateInformation.college)
                setGraduation(updateInformation.college)
                setProgram(updateInformation.grade_Program)
                setSpecialization(updateInformation.board_specialization)
                setPercent(updateInformation.percent_cgpa)
                setCollegeName(updateInformation.schoolName_CollegName)
                setStartyear(updateInformation.startYear);
                setPassingYear(updateInformation.passingYear)
            }
            console.log(graduation)
        }, [updateInformation, setGraduation])

        const graduation_programs = [
            "B.E/B.Tech",
            "BCA",
            "BBA",
            "B.Pharma",
            "Other"
        ];
        const graduationSpecialization = [
            "Computer Science and Enigeering",
            "Artificial Intelligence and Machine learning",
            "Computer Science and Data Science",
            "Mechnanical Engieering",
            "Civil Engineering",
            "Other"
        ];

        const selectingProgram = (value) => {
            // console.log(value)
            setProgram(value);
            setInputValue('')
        }
        const filteredPrograms = graduation_programs.filter(program =>
            program.toLowerCase().includes(inputValue.toLowerCase())
        );

        const selectingSpecialization = (value) => {
            // console.log(value)
            setSpecialization(value);
            setInputValue('')
        }
        const filteredSpecialization = graduationSpecialization.filter(specialization =>
            specialization.toLowerCase().includes(inputValue.toLowerCase())
        );

        const updateClass = () => {
            // console.log(gradP)
            setGraduation(gradP)
            // console.log()
            const newCollege = {
                college: graduation,
                grade_Program: program,
                schoolName_CollegName: collegeName,
                board_specialization: specialization,
                percent_cgpa: percent,
                startYear: startYear,
                passingYear: passingYear
            }
            console.log(newCollege)
            setProgram('')
            setCollegeName('')
            setSpecialization('');
            setPassingYear('')
            setPercent('')
            closeModal();
            onSave(newCollege)
        }
        const savingClass = () => {
            // console.log(graduation, program, specialization, startYear, passingYear, collegeName, percent)
            const newCollege = {
                college: graduation,
                grade_Program: program,
                schoolName_CollegName: collegeName,
                board_specialization: specialization,
                percent_cgpa: percent,
                startYear: startYear,
                passingYear: passingYear
            }
            // console.log(newCollege)
            onSave(newCollege)
            setProgram('')
            setCollegeName('')
            setSpecialization('');
            setPassingYear('')
            setPercent('')
            closeModal();
        }
        return (
            <div>
                <div>
                    <p className='mb-2 text-black font-medium'>Course Name for {graduation}</p>
                    {program ? (
                        <p className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 w-fit rounded-full text-black focus:outline-none bg-[#e7e7f1]'>
                            {program}
                            <i
                                onClick={() => { setProgram('') }}
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
                                placeholder='Search Course Name'
                            />

                            {/* Dropdown List */}
                            {isBoardFocused && (
                                <ul className='absolute z-10 border border-gray-300 bg-white w-full max-h-60 overflow-auto mt-1'>
                                    {filteredPrograms.map((program, index) => (
                                        <li
                                            key={index}
                                            className='text-xl p-2 hover:bg-slate-100 cursor-pointer'
                                            onClick={() => selectingProgram(program)}
                                        >
                                            {program}
                                        </li>
                                    ))}
                                    {filteredPrograms.length === 0 && (
                                        <li
                                            onClick={() => { selectingProgram('Other') }}
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
                        <p className='mb-2 text-black font-medium'>Specialization</p>
                        {specialization ? (
                            <p className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 w-fit rounded-full text-black focus:outline-none bg-[#e7e7f1]'>
                                {specialization}
                                <i
                                    onClick={() => setSpecialization('')}
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
                                    placeholder='Search Specialization'
                                />

                                {/* Dropdown List */}
                                {isMediumFocused && (
                                    <ul className='absolute z-10 border border-gray-300 bg-white w-full max-h-60 overflow-auto mt-1'>
                                        {filteredSpecialization.map((specialization, index) => (
                                            <li
                                                key={index}
                                                className='text-xl p-2 hover:bg-slate-100 cursor-pointer'
                                                onClick={() => selectingSpecialization(specialization)}
                                            >
                                                {specialization}
                                            </li>
                                        ))}
                                        {filteredSpecialization.length === 0 && (
                                            <li
                                                onClick={() => { selectingSpecialization('Other') }}
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
                    <p className='mb-2 text-black font-medium'>Current CGPA</p>
                    <input
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        type="number"
                        className='border-2 w-full p-3 outline-none'
                        placeholder='Your Current CGPA'
                    />
                </div>
                <div className='mt-5'>
                    <p className='mb-2 text-black font-medium'>College Name</p>
                    <input
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        type="Text"
                        className='border-2 w-full p-3 outline-none'
                        placeholder='College Name'
                    />
                </div>
                <div className='mt-5'>
                    <p className='mb-2 text-black font-medium'>Starting Year</p>
                    <input
                        value={startYear}
                        onChange={(e) => setStartyear(e.target.value)}
                        type="number"
                        className='border-2 w-full p-3 outline-none'
                        placeholder='Starting Year'
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

    export default Student_College_Education;