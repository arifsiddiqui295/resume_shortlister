import React, { useEffect, useState } from 'react'
import Button from './Button';
import request from '../api/request.js';
import { useStudent } from '../context/StudentProvider';
const Student_Card = () => {
    const { setStudent } = useStudent();
    const [isOpen, setIsOpen] = useState(false);
    const [fullName, setFullName] = useState();
    const [gender, setGender] = useState();
    const [date, setDate] = useState("");
    const [location, setLocation] = useState('');
    const [hometown, setHometown] = useState('');
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [enrollment, setEnrollment] = useState('');
    const [branch, setBranch] = useState('');
    const [password, setPassword] = useState('');
    var [studentDetails, setStudentDetails] = useState({});
    const add_Student_Details = async () => {
        try {
            const newStudent = {
                email: email,
                fullName: fullName,
                gender: gender,
                date: date,
                location: location,
                hometown: hometown,
                number: number
            };

            // const response = await request('post', "/", newStudent);
            // console.log("Response:", response);

            setStudentDetails(newStudent);
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding student details:", error);
        }
    };
    const editStudent = () => {
        console.log("studentDetails:", studentDetails)
        setEnrollment(studentDetails.enrollment_no);
        setBranch(studentDetails.branch)
        setFullName(studentDetails.first_name + " " + studentDetails.last_name)
        setEmail(studentDetails.email)
        setGender(studentDetails.gender);
        setHometown(studentDetails.hometown);
        setDate(studentDetails.dob)
        setLocation(studentDetails.current_location);
        setHometown(studentDetails.permanent_address.city)
        setNumber(studentDetails.mobile_number)
        setIsOpen(true)
    }
    useEffect(() => {
        const student_information = async () => {
            try {
                const res = await request("get", "/student/");
                console.log("res from student card get: ", res);
                if (res.length > 0) {
                    setStudentDetails(res[0]); // Store full student data
                    setStudent(res[0].enrollment_no); // Store enrollment number in Context
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        };
        student_information();
    }, [setStudent]);
    return (
        <>
            <div className="bg-white p-6 shadow-md rounded-lg max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div className="flex items-center gap-4">
                        {/* Profile Image */}
                        <img
                            src="https://images.unsplash.com/photo-1590411506193-00ed62b2d08d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Profile"
                            className="w-12 h-12 object-cover rounded-full"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">{studentDetails.first_name} {studentDetails.last_name}</h2>
                                {/* <Lock className="w-4 h-4 text-red-500" /> */}
                            </div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                {/* <CheckCircle className="w-3 h-3 text-green-500" /> Active */}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={editStudent}
                            className="px-3 py-1 border rounded text-gray-700 text-sm flex items-center gap-1">
                            {/* <Edit className="w-4 h-4" />  */}
                            Edit profile
                        </button>
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                            {/* <MoreHorizontal className="w-5 h-5" /> */}
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <p className="font-medium">Enrollment Number</p>
                        <p className="text-gray-500">{studentDetails.enrollment_no}</p>
                    </div>
                    <div>
                        <p className="font-medium">Password</p>
                        <p className="text-gray-500">None</p>
                    </div>
                    <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-500">{studentDetails.current_location}</p>
                    </div>
                    <div>
                        <p className="font-medium">Gender</p>
                        <p className="text-gray-500">{studentDetails.gender}</p>
                    </div>
                    <div>
                        <p className="font-medium">Mobile number</p>
                        <p className="text-gray-500">{studentDetails.mobile_number}</p>
                    </div>
                    <div>
                        <p className="font-medium">Branch</p>
                        <p className="text-gray-500">{studentDetails.branch}</p>
                    </div>
                    <div>
                        <p className="font-medium">Email address</p>
                        <p className="text-gray-500">{studentDetails.email}</p>
                    </div>
                    <div>
                        <p className="font-medium">Date of Birth</p>
                        <p className="text-gray-500">{studentDetails.dob}</p>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[70%] h-[70%] overflow-y-auto p-6">
                        <div className='flex justify-end'>
                            <button
                                type="button"
                                className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                onClick={() => { setIsOpen(false) }}
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-between items-center py-3 px-4 border-b">
                            <div>
                                <h1 className='text-2xl font-semibold'>All about you</h1>
                            </div>
                        </div>
                        {/* Enrollment Number */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Enrollment Number </h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={enrollment}
                                    onChange={(e) => setEnrollment(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Branch*/}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Branch</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Password*/}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Password</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Full name */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Full name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Gender */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Gender</h1>
                            <div className='flex gap-3 m-2'>
                                <button
                                    onClick={() => { setGender('Male') }}
                                    className={gender == 'Male' ? (`flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1]`) : (
                                        `flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600  focus:outline-none`
                                    )}>Male</button>
                                <button
                                    onClick={() => { setGender('Female') }}
                                    className={gender == 'Female' ? (`flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1]`) : (
                                        `flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600  focus:outline-none`
                                    )}>Female</button>
                                <button
                                    onClick={() => { setGender('Rather not say') }}
                                    className={gender == 'Rather not say' ? (`flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1]`) : (
                                        `flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600  focus:outline-none`
                                    )}>Rather not say</button>
                            </div>
                        </div>
                        {/* Date of Birth  */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Date of Birth</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="date"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Current Location */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Current Location</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Hometown  */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Hometown</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={hometown}
                                    onChange={(e) => setHometown(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Email  */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Email</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="email"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Name'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Mobile Number  */}
                        <div className='flex flex-col py-2'>
                            <h1 className='font-medium'>Mobile Number</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="tel"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Mobile Number'
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>

                            <button
                                onClick={add_Student_Details}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_Card