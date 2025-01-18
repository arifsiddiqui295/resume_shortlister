import React, { useEffect, useState } from 'react'
import Button from './Button';
import request from '../api/request.js';
const Student_Card = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [dataPresent, setDataPresent] = useState();
    const [fullName, setFullName] = useState();
    const [gender, setGender] = useState();
    const [date, setDate] = useState("");
    const [location, setLocation] = useState('');
    const [hometown, setHometown] = useState('');
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
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

            const response = await request('post', "/", newStudent);
            console.log("Response:", response);

            setStudentDetails(newStudent);
            setDataPresent(true);
            // setIsOpen(false);
        } catch (error) {
            console.error("Error adding student details:", error);
        }
    };
    useEffect(() => {
        // Check if studentDetails is empty by checking the length of its keys
        if (Object.keys(studentDetails).length === 0) {
            setDataPresent(false);
        } else {
            setDataPresent(true);
        }
    }, [studentDetails]);
    const updateDetails = () => {
        if (studentDetails == '') {
            setIsOpen(true)
        }
        setIsOpen(true)
        setEmail(studentDetails.email);
        setNumber(studentDetails.number);
        setGender(studentDetails.gender);
        setFullName(studentDetails.fullName);
        setDate(studentDetails.date)
        setLocation(studentDetails.location)
        setHometown(studentDetails.hometown)
    }

    return (
        <>
            <div className='px-32 py-10'>
                <div className='w-full flex bg-[#ffffff] shadow-lg px-5 rounded-lg py-16'>
                    <div className='flex items-center gap-10'>
                        <div className='flex gap-16 items-center'>
                            <img className='w-32 h-32 rounded-full ' src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            {dataPresent ? (
                                <div className='flex flex-col text-left'>
                                    <div className='flex items-center gap-2 text-white mb-10'>
                                        <h1 className='text-black text-3xl'>
                                            {studentDetails.fullName}</h1>
                                        <i
                                            onClick={updateDetails}
                                            className="ri-pencil-line text-[#717B9E] mt-1 text-2xl "></i>
                                    </div>
                                    <div className='flex gap-5'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-3 items-center'>
                                                <i className="ri-map-pin-line text-[#717B9E]"></i>
                                                <p className='text-[#275DF5] text-lg font-medium'> {studentDetails.location}</p>
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <i className="ri-men-line text-[#717B9E]"></i>
                                                <p className='text-[#275DF5] text-lg font-medium'> {studentDetails.gender}</p>
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <i className="ri-cake-2-line text-[#717B9E]"></i>
                                                <p className='text-[#275DF5] text-lg font-medium'> {studentDetails.date}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center gap-2'>
                                                <div className='flex gap-3 items-center'>
                                                    <i className="ri-phone-line text-[#717B9E]"></i>
                                                    <p className='text-[#717B9E] text-lg font-medium'>{studentDetails.number}</p>
                                                </div>
                                                <a href="" className='text-[#275DF5] font-bold'>Verify</a>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='flex gap-3'>
                                                    <i className="ri-mail-line text-[#717B9E]"></i>
                                                    <p className='text-[#717B9E] text-lg font-medium'>{studentDetails.email}</p>
                                                </div>
                                                <p><i className="ri-verified-badge-fill p-2 text-green-400"></i></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex gap-1 items-center cursor-pointer'>
                                    <i
                                        onClick={updateDetails}
                                        className="ri-pencil-line text-[#717B9E] mt-1 text-2xl "></i>
                                    <h1
                                        onClick={updateDetails}
                                        className="text-blue-700 font-bold"
                                    >Add Details</h1>
                                </div>

                            )
                            }
                        </div>
                        <div className='w-96 flex flex-col gap-5 rounded-lg px-7 py-5 bg-[#CEDEFF]'>
                            <div className='flex justify-between items-center '>
                                <div className='flex gap-2 items-center'>
                                    <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center'>
                                        <i className="ri-graduation-cap-line text-3xl font-mono text-[#717B9E]"></i>
                                    </div>
                                    <p className='text-md font-semibold'>Add Education</p>
                                </div>
                                <div className='flex gap-2 bg-white items-center w-20 h-7 px-2 rounded-2xl text-green-400 text-xl'>
                                    <i className="ri-arrow-up-line "></i>
                                    <p>10%</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center '>
                                <div className='flex gap-2 items-center'>
                                    <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center'>
                                        <i className="ri-mobile-download-line text-3xl font-mono text-[#717B9E]"></i>
                                    </div>
                                    <p className='text-md font-semibold'>Verify Mobile</p>
                                </div>
                                <div className='flex gap-2 bg-white items-center w-20 h-7 px-2 rounded-2xl text-green-400 text-xl'>
                                    <i className="ri-arrow-up-line "></i>
                                    <p>10%</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center '>
                                <div className='flex gap-2 items-center'>
                                    <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center'>
                                        <i className="ri-graduation-cap-line text-3xl font-mono text-[#717B9E]"></i>
                                    </div>
                                    <p className='text-md font-semibold'>Add Details</p>
                                </div>
                                <div className='flex gap-2 bg-white items-center w-20 h-7 px-2 rounded-2xl text-green-400 text-xl'>
                                    <i className="ri-arrow-up-line "></i>
                                    <p>10%</p>
                                </div>
                            </div>
                            <Button text="Add 16 missing details" className='bg-[#275df5] rounded-2xl py-3 text-white ' />
                        </div>
                    </div>
                    <div>

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