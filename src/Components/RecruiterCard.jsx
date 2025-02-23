import React, { useEffect, useState } from 'react'
import Button from './Button';
import request from '../api/request.js';
const RecruiterCard = () => {

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

            // const response = await request('post', "/", newStudent);
            // console.log("Response:", response);

            setStudentDetails(newStudent);
            setDataPresent(true);
            setIsOpen(false);
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
                <div className='flex bg-[#ffffff] shadow-lg px-5 rounded-lg py-16'>
                    <div className='flex items-center gap-10 w-full justify-center'>
                        <div className='flex gap-16 items-center '>
                            <img className='w-32 h-32 rounded-full ' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgMGB//EADMQAQACAQIGAQIDBQkAAAAAAAABAgMRMQQFEiFBUWETIjJxoSNSgbHBFDM0YnKCkdHh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APogAAAAAAAAABOwA5W4fHadbRaZiNPxN6UinaNf4y2AAAAAAAAAAAJK7EldgAAAAAAAAASeG4PJnnq/DTzM/wBARhc4+C4ekadHV827yzThMFLzetIifAK3HwefLGtaaR7tOje3LuI07dE/Gq3YBQ3xZMc/tKTX5aPQWiJiYtWJj1KFn5dW+s4ftnzE7ArBtelsdum9ZrPzDUAAAAAACSuxJXYAAAAAAAAEngcEZ8/eftr3n5XERGnr4QuVU0w3t5tf9NE4GAAAADxoAOXE4K8Rj0t+KPw29KSY6Zmsx3idHoFPzCsU4q+m06SCMAAAAABJXYkrsAAAAAAAAC45b/hK/wAf5pKHyu8W4eaeaT+kpgAAAAAACq5tH7av+la+dFRzK0X4qYjaIiARQAAAAAJK7EldgAAAAAAAJ9gn8sx5a3m8RH07RpOqyc+G0+hj026Y0dAAAAAAANdPunx3efyWnJe1u8dUzPd6BU80iK8RrEbxrIIgAAAAAEldiSuwAAAAAADEsgLbluXr4fpnfH2n8vCWpeD4j+zZJvNZtWY0mIW3D5frYYyR5nTT0DoAAAAAB509qXmF/qcVf1H2rPieKx4NYmZ69NYjType89538gAAAAAASV2JK7AAAAAAAAALHlWXTrxzP+aFc3wZJxZa3r4nvAL4I7xrGwAAATPaY28iHzLPOLF0V7Tfz8AgcVl+rnvfxrpDiAAAAAAAEldiSuwAAAAAAAABWNbRHyJfAcPbJli9q/ZWdYn5BbbaRG0AAAAK7m8f3fzrCxcOMwznw9NdOqJ1rqClGbRNJmLRMTE92NQAAAAAAJK7EldgAAAk1APLfHjvltpjpa0pmLltt819I/dr3BAdcPD5c0/ZSdPc9lvj4bFj06aRr7dQQuH5fSmls09c+o2hNiNPWkbQAAAAAAAOebBjzV0vGs+LeYVubl2Wms45i8f8StgHn5rava1Zj82HoL0rftasT+fdFzcBhv8Ag1xyCpEjPwefF36euvuv/SP5/mAABJXYkrsABOwM1rN5rWsTNp8R4WfD8vx1rE5fvt+kMcrwzTHOW29u0fknAxWsVjprERHqGfAAAAAAAAAAAAAAMx2YAI7OWbhsWb8VI19xu6gKji+Dtgnqr91P1hFehtWtomLRrE9tFFnxThzWpPie3zAOcldiSuwDMR1TEe+zDvwNeriqeo7gucdfp0inqGTQAAAAAAAAAAAAAAAAAAAV3NqffTJ/tWKNzGnXwtp/d7gp5K7MSzXYBP5TTW17+o0QNVtyynTw0W/emZ/oCWAAAAAAAAAAAAAAAAAAAA1yU68dq+40bAPOzvozXZ14yn0+JyVj3/65V2B//9k=" alt="" />
                            <div className='flex flex-col text-left'>
                                <div className='flex items-center gap-2 text-white mb-10'>
                                    <h1 className='text-black text-3xl'>
                                        Arif Siddiuqi</h1>
                                    <i
                                        // onClick={updateDetails}
                                        className="ri-pencil-line text-[#717B9E] mt-1 text-2xl "></i>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex gap-3 items-center'>
                                            <i className="ri-map-pin-line text-[#717B9E]"></i>
                                            <p className='text-[#275DF5] text-lg font-medium'> Bhopal</p>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <i className="ri-men-line text-[#717B9E]"></i>
                                            <p className='text-[#275DF5] text-lg font-medium'> Male</p>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <i className="ri-cake-2-line text-[#717B9E]"></i>
                                            <p className='text-[#275DF5] text-lg font-medium'> djdjdj</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <div className='flex gap-3 items-center'>
                                                <i className="ri-phone-line text-[#717B9E]"></i>
                                                <p className='text-[#717B9E] text-lg font-medium'>8770993602</p>
                                            </div>
                                            <a href="" className='text-[#275DF5] font-bold'>Verify</a>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='flex gap-3'>
                                                <i className="ri-mail-line text-[#717B9E]"></i>
                                                <p className='text-[#717B9E] text-lg font-medium'>ajndfnf@mgai.com</p>
                                            </div>
                                            <p><i className="ri-verified-badge-fill p-2 text-green-400"></i></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default RecruiterCard;