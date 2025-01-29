import React, { useEffect, useState } from 'react'
import Student_School_Education from './Student_School_Education';
import Student_College_Education from './Student_College_Education';
import request from '../api/request';

const Student_Education = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isSchoolEdit, setIsSchoolEdit] = useState(false);
    const [isCollegeEdit, setIsCollegEdit] = useState(false);
    const [isClass, setIsClass] = useState();
    const [isCollege, setisCollege] = useState(false);
    const [college, setCollege] = useState();
    const [qualification, setQualification] = useState(false);
    const [schoolInfo, setSchoolInfo] = useState([]);
    const [collegeInfo, setCollegeInfo] = useState([]);
    const [schoolUpdateInfo, setSchoolUpdateInfo] = useState({});
    const [collegeUpdateInfo, setCollegeUpdateInfo] = useState({});

    const handleSaveCollege = (newCollege) => {
        console.log(newCollege)
        setCollegeInfo((prevQualificationInfo) => {
            // Filter out any existing entry with the same grade_Program (Class X or Class XII)
            const updatedInfo = prevQualificationInfo.filter(
                (item) => item.college !== newCollege.college
            );

            // Add the new or updated class information
            return [...updatedInfo, newCollege];
        });

    }
    const handleSaveClass = (newClass) => {
        console.log(newClass)
        setSchoolInfo((prevQualificationInfo) => {
            // Filter out any existing entry with the same grade_Program (Class X or Class XII)
            const updatedInfo = prevQualificationInfo.filter(
                (item) => item.grade_Program !== newClass.grade_Program
            );

            // Add the new or updated class information
            return [...updatedInfo, newClass];
        });

        setIsSchoolEdit(false); // Exit edit mode
        setIsOpen(false); // Close the modal
    };

    const editCollegeEducatoin = (college, grade_Program, schoolName_CollegName, board_specialization, percent_cgpa, startYear, passingYear) => {
        // console.log(college, grade_Program, schoolName_CollegName, board_specialization, percent_cgpa, startYear, passingYear)
        const update_education = {
            college: college,
            grade_Program: grade_Program,
            schoolName_CollegName: schoolName_CollegName,
            board_specialization: board_specialization,
            percent_cgpa: percent_cgpa,
            startYear: startYear,
            passingYear: passingYear
        }
        // console.log("update_education", update_education);
        setCollegeUpdateInfo(update_education)
        setIsCollegEdit(true)
        setIsOpen(true)
        setQualification(true)

    }

    const editSchoolEducation = (grade_Program, schoolName_CollegName, board_specialization, medium_university, percent_cgpa, passingYear) => {
        console.log(grade_Program, schoolName_CollegName, board_specialization, medium_university, percent_cgpa, passingYear)
        const updateEducation = {
            grade_Program: grade_Program,
            schoolName_CollegName: schoolName_CollegName,
            board_specialization: board_specialization,
            medium_university: medium_university,
            percent_cgpa: percent_cgpa,
            passingYear: passingYear
        }
        setSchoolUpdateInfo(updateEducation)
        setIsSchoolEdit(true);
        setIsOpen(true)
        setQualification(true)
    }
    const degreeSelection = (value) => {
        // console.log(value)
        if (value == 0) {
            setIsClass('Class X')
            setisCollege(false)
        } else if (value == 1) {
            setIsClass('Class XII')
            setisCollege(false)
        } else if (value == 2) {
            setisCollege(true)
            setCollege('Graduation')
        }
        else if (value == 3) {
            setisCollege(true)
            setCollege('Post Graduation')
        }
        else if (value == 4) {
            setisCollege(true)
            setCollege('Doctorate')
        }
        setQualification(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            const combinedData = {
                collegeInfo,
                schoolInfo
            };
            console.log(combinedData);

            // const response = await request('post', "/", combinedData);
            // console.log(response);
        };

        fetchData();
    }, [college, collegeInfo, schoolInfo]);

    const options = ['Class X', 'Class XII', 'Graduation', 'Post Graduation', 'Doctorate']
    return (
        <>
            <div className="bg-white  rounded-lg p-6 shadow-md w-[60vw]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Education</h2>

                    <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => setIsOpen(true)}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    {schoolInfo && (
                        schoolInfo.map((value, index) => (
                            <div key={index}>
                                <div className='flex gap-1 items-center'>
                                    <h1 className='text-xl font-semibold'>{value.grade_Program} From {value.schoolName_CollegName} </h1>
                                    <i
                                        onClick={() => editSchoolEducation(
                                            value.grade_Program,
                                            value.schoolName_CollegName,
                                            value.board_specialization,
                                            value.medium_university,
                                            value.percent_cgpa,
                                            value.passingYear
                                        )}
                                        className="ri-pencil-line text-gray-500"></i>
                                </div>
                                <div className=' text-[#1a192b]'>
                                    <div className='flex '>
                                        <p className=''>{value.board_specialization}, {value.medium_university} </p>
                                        {value.medium_university && (
                                            <p className=''> </p>
                                        )}
                                    </div>
                                </div>
                                <div className='flex'>
                                    <p className='text-[#818aa9]'>Scored {value.percent_cgpa}%, {value.passingYear}</p>
                                    {/* <p className='text-[#818aa9]'></p> */}
                                </div>
                            </div>
                        ))
                    )}
                    {collegeInfo && (
                        collegeInfo.map((value, index) => (
                            <div key={index}>
                                <div className='flex gap-1 items-center'>
                                    <h1 className='text-xl font-semibold'>{value.grade_Program} From {value.schoolName_CollegName} </h1>
                                    <i
                                        onClick={() => editCollegeEducatoin(
                                            value.college,
                                            value.grade_Program,
                                            value.schoolName_CollegName,
                                            value.board_specialization,
                                            value.percent_cgpa,
                                            value.startYear,
                                            value.passingYear
                                        )}
                                        className="ri-pencil-line text-gray-500"></i>
                                </div>
                                <div className=' text-[#1a192b]'>
                                    <div className='flex '>
                                        <p className=''>{value.board_specialization}</p>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <p className='text-[#818aa9]'>Scored {value.percent_cgpa} CGPA , {value.startYear}-{value.passingYear} </p>
                                    <p className='text-[#818aa9]'></p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed  inset-0 z-[80]  bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <div className="bg-white border shadow-sm rounded-xl w-[70%] h-[40%] overflow-y-auto p-6">
                        <div className='flex justify-end '>
                            <button
                                type="button"
                                className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                onClick={() => {
                                    setIsOpen(false)
                                    setIsSchoolEdit(false)
                                    setQualification(false)
                                }} // Close modal
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
                                <h1 className='text-2xl font-semibold'>Education</h1>
                                <p className='text-sm text-[#717b9e]'>Adding your educational details help recruiters know your value as a potential candidate</p>
                            </div>
                        </div>
                        <div className=' mt-6  gap-2 flex-wrap '>
                            {qualification ? (
                                isCollege ? (
                                    <Student_College_Education
                                        edit={isCollegeEdit}
                                        updateInformation={isCollegeEdit ? collegeUpdateInfo : undefined}
                                        gradP={!isCollegeEdit ? college : undefined}
                                        onSave={handleSaveCollege}
                                        closeModal={() => {
                                            setIsOpen(false)
                                            setQualification(false)
                                        }}
                                    />
                                ) : (
                                    <Student_School_Education
                                        edit={isSchoolEdit}
                                        updateInformation={isSchoolEdit ? schoolUpdateInfo : undefined}
                                        gradP={!isSchoolEdit ? isClass : undefined}
                                        onSave={handleSaveClass}
                                        closeModal={() => {
                                            setIsOpen(false)
                                            setQualification(false)
                                        }}
                                    />
                                )
                            ) : (

                                <div>
                                    <h1>Qualification/Degree</h1>
                                    <div className='flex mt-2 gap-2'>
                                        {options.map((value, index) => (
                                            <p
                                                onClick={() => { degreeSelection(index) }}
                                                className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 hover:bg-gray-200 rounded-full text-gray-600  focus:outline-none  '
                                                key={index}>{value}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default Student_Education



