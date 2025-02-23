import React, { useEffect, useState } from 'react'
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';

const Student_Education = () => {
    const { student } = useStudent();
    const [isOpen, setIsOpen] = useState(false);
    const [educationData, setEducationData] = useState({
        qualification: "",
        board_university: "",
        medium: "",
        branch: "",
        percentage_cgpa: "",
        school_college_name: "",
        start_year: "",
        passing_year: ""
    });
    const [educationDetails, setEducationDetails] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [primaryKey, setPrimaryKey] = useState('');
    const handleChange = (e) => {
        setEducationData({ ...educationData, [e.target.name]: e.target.value });
    };

    const saveEducation = async () => {
        try {
            const newEducation = {
                qualification: educationData.qualification,
                board_university: educationData.board_university,
                medium: educationData.medium,
                branch: educationData.branch,
                percentage_cgpa: educationData.percentage_cgpa,
                school_college_name: educationData.school_college_name,
                start_year: educationData.start_year,
                passing_year: educationData.passing_year,
                student: student
            }
            if (isEdit) {
                const res = await request('patch', `/education/${primaryKey}/`, newEducation)
                // console.log("res from update:", res);
                const updateEducation = educationDetails.map(education =>
                    education.id === res.id ? { ...education, ...res } : education
                );
                // console.log(updateEducation);
                setEducationDetails(updateEducation);
                setIsOpen(false);
                setIsEdit(false);
                closeModal();
            } else {
                const res = await request('post', '/education/', newEducation)
                const updateEducation = [...educationDetails, res];
                // console.log(updatedInternships);
                setEducationDetails(updateEducation);
                // setPrimaryKey(res.id);
                setIsOpen(false);
                // console.log("res from post", res);
            }
            // console.log("res from student education: ", res);
        } catch (error) {
            console.log("error from Student_Education: ", error)
        }
    };

    const updateEducation = async (education) => {
        // console.log("Primary Key", primaryKey)
        // console.log(education)
        setPrimaryKey(education.id)
        setEducationData({
            qualification: education.qualification || "",
            board_university: education.board_university || "",
            medium: education.medium || "",
            branch: education.branch || "",
            percentage_cgpa: education.percentage_cgpa || "",
            school_college_name: education.school_college_name || "",
            start_year: education.start_year || "",
            passing_year: education.passing_year || ""
        });
        setIsEdit(true);
        setIsOpen(true);
        // const res = await request('patch')
    }
    useEffect(() => {
        const getStudentEducationDetails = async () => {
            try {
                const res = await request('get', '/education/');
                // console.log("res from student Education: ", res);
                const matchedStudentEducation = res.filter(edu => edu.student === student);
                // console.log("matchedStudentEducation: ", matchedStudentEducation);
                if (matchedStudentEducation) {
                    // Set only the common fields
                    setEducationDetails(matchedStudentEducation);
                    setPrimaryKey(matchedStudentEducation.id);
                }
                // console.log("educationDetails: ", educationDetails)
            } catch (error) {
                console.log("Error:", error);
            }
        }
        getStudentEducationDetails();
    }, [])
    const isSchoolLevel = ["Class 10", "Class 12"].includes(educationData.qualification);
    const isCollegeLevel = !isSchoolLevel && educationData.qualification !== "";

    const closeModal = () => {
        setEducationData({
            qualification: "",
            board_university: "",
            medium: "",
            branch: "",
            percentage_cgpa: "",
            school_college_name: "",
            start_year: "",
            passing_year: ""
        });
        setIsOpen(false);
    };
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
                    {
                        educationDetails.length > 0 ? (
                            educationDetails.map((education, index) => (
                                <div key={index}>
                                    <div className='flex gap-1 items-center'>
                                        <h1 className='text-xl font-semibold'>
                                            {education.qualification} from {education.school_college_name}
                                        </h1>
                                        <i
                                            onClick={() => { updateEducation(education) }}
                                            className="ri-pencil-line text-gray-500 cursor-pointer"
                                        ></i>
                                    </div>
                                    <div className='text-[#1a192b]'>
                                        <div className='flex'>
                                            <p className=''>
                                                {education.board_university},
                                                {
                                                    isCollegeLevel ? (
                                                        education.branch
                                                    ) : (
                                                        education.medium
                                                    )
                                                }

                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-[#818aa9]'>
                                            Scored {education.percentage_cgpa}, {education.start_year}-{education.passing_year}
                                        </p>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <p>Education details not added</p>
                        )
                    }
                </div>
            </div>

            {/* Modal */}

            {isOpen && (
                <div
                    className="fixed  inset-0 z-[80]  bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <div className="p-8 bg-white h-[60%] overflow-y-auto rounded-xl shadow-2xl w-full max-w-lg mx-auto relative">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Form Title */}
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Education Details</h2>

                        {/* Qualification Dropdown */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                            <select
                                name="qualification"
                                value={educationData.qualification}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="">Select Qualification</option>
                                <option value="Class 10">Class 10</option>
                                <option value="Class 12">Class 12</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="B.Pharma">B.Pharma</option>
                                <option value="MBA">MBA</option>
                                <option value="M.Tech">M.Tech</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>

                        {/* Board/University */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">{isSchoolLevel ? "Board" : "University"}</label>
                            <input
                                type="text"
                                name="board_university"
                                value={educationData.board_university}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Medium (Only for School Level) */}
                        {isSchoolLevel && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
                                <input
                                    type="text"
                                    name="medium"
                                    value={educationData.medium}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        )}

                        {/* Branch (Only for College Level) */}
                        {isCollegeLevel && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                                <input
                                    type="text"
                                    name="branch"
                                    value={educationData.branch}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        )}

                        {/* Percentage/CGPA */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Percentage/CGPA</label>
                            <input
                                type="text"
                                name="percentage_cgpa"
                                value={educationData.percentage_cgpa}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* School/College Name */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">School/College Name</label>
                            <input
                                type="text"
                                name="school_college_name"
                                value={educationData.school_college_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Start Year */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                            <input
                                type="number"
                                name="start_year"
                                value={educationData.start_year}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Passing Year */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Passing Year</label>
                            <input
                                type="number"
                                name="passing_year"
                                value={educationData.passing_year}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={saveEducation}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        >
                            {educationData.id ? "Update Changes" : "Save Changes"}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Student_Education



