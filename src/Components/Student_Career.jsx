import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../api/request';
const Student_Career = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInternship, setIsInternship] = useState(false);
    const [isJob, setIsJob] = useState(false);
    const [selected, setSelected] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [preferredLocations, setPreferredLocations] = useState([]);
    const [selectedDate, setSelectedDate] = useState('15 Days or less');
    const [jobType, setJobType] = useState([]);

    const settingValues = async () => {
        console.log('isInternship: ', isInternship);
        console.log(isJob);
        if (isInternship && isJob) {
            setJobType(['Internship,', ' Job']);
        } else if (isInternship) {
            setJobType(['Internship']);
        } else if (isJob) {
            setJobType(['Job']);
        } else {
            toast.error("Select Job Type")
        }
        // console.log(jobType);

        setSelectedDate(options[selected]);
        console.log(selectedCities)
        if (selectedCities.length < 3) {
            toast.error("Select Atlest 3 cities")
        } else {
            
            // const response = await request('post', "/", newStudent);
            // console.log("Response:", response);
            setIsOpen(false)
            setFilteredCities('')
            setIsInternship(false);
        }

    };
    useEffect(() => {
        // console.log('Updated jobType:', jobType);
    }, [jobType]);
    const addRemoveCity = (city) => {
        const currentCities = [...selectedCities]
        const isAlreadySelected = selectedCities.includes(city);

        const updatedSelectedCities = isAlreadySelected
            ? currentCities.filter(selectedCity => selectedCity !== city)
            : [...currentCities, city];

        // console.log(updatedSelectedCities)
        setSelectedCities(updatedSelectedCities)
        console.log(selectedCities)
    }
    const removeCity = (city) => {
        // console.log(city)
        const removedCities = selectedCities.filter((selectCity) => selectCity != city);
        console.log(removedCities)
        setSelectedCities(removedCities);
    }
    const filterValue = (e) => {
        const searchValue = e.target.value.toLowerCase();
        console.log(searchValue)
        setInputValue(e.target.value); // Update state

        const filteredCity = cities.filter((city) => city.toLowerCase().startsWith(searchValue));
        setFilteredCities(filteredCity); // Filter and set cities
    };

    const options = [
        '15 Days or less',
        '1 Month',
        '2 Months',
        '3 Months',
        'More than 3 Months'
    ];
    const cities = [
        "Bengaluru",
        "Hyderabad",
        "Pune",
        "Chennai",
        "Delhi-NCR",
        "Mumbai",
        "Ahmedabad",
        "Kolkata",
        "Jaipur",
        "Surat",
        "Lucknow",
        "Indore",
        "Patna",
        "Bhopal",
        "Coimbatore",
        "Chandigarh",
        "Nagpur",
        "Bhubaneswar",
        "Guwahati",
        "Dehradun",
        "Shimla",
        "Amritsar",
        "Jalandhar",
        "Ludhiana",
        "Bikaner",
        "Kota",
        "Udaipur",
        "Ajmer",
        "Gwalior",
        "Jabalpur",
        "Raipur",
        "Bilaspur",
        "Durgapur",
        "Asansol",
        "Ranchi",
        "Bhubaneswar",
        "Guwahati",
        "Dehradun",
        "Shimla"
    ];
    return (
        <>
            <ToastContainer />
            <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Your career preferences</h2>

                    <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => setIsOpen(true)}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    {/* Preferred Job Type */}
                    <div className="flex gap-52">
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">Preferred job type</h3>
                            <div className='flex gap-1'>
                                {isInternship || isJob ? (
                                    jobType.map((value, index) => (
                                        <p key={index} href="#" className="text-[#000000] text-sm font-semibold">{value}</p>
                                    ))
                                ) : (
                                    <a href="#" className="text-[#275DF5] text-sm font-semibold" onClick={() => { setIsOpen(true) }}>Add desired job type</a>
                                )
                                }
                            </div>
                        </div>

                        {/* Work Availability */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">Availability to work</h3>

                            {selectedDate ? (
                                <p className="text-[#275DF5] text-sm font-semibold" >{selectedDate}</p>
                            ) : (
                                <a href="#" className="text-[#275DF5] text-sm font-semibold" onClick={() => { setIsOpen(true) }}>Add work availability</a>
                            )}

                        </div>
                    </div>

                    {/* Preferred Location */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Preferred location</h3>
                        <div className='mt-2 flex gap-2 flex-wrap'>
                            {selectedCities.length > 2 ? (
                                selectedCities.map((value, index) => (
                                    <p
                                        className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 hover:bg-gray-200 rounded-full text-gray-600  focus:outline-none  '
                                        key={index}>{value}</p>
                                ))
                            ) : (
                                <a href="#" className="text-[#275DF5] text-sm font-semibold" onClick={() => { setIsOpen(true) }}>Add preferred work location</a>
                            )}
                        </div>


                    </div>
                </div>
            </div>

            {/* Modal */}
            {
                isOpen && (
                    <div
                        className="fixed  inset-0 z-[80]  bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <div className="bg-white border shadow-sm rounded-xl w-[70%] h-[70%] overflow-y-auto p-6">
                            <div className='flex justify-end '>
                                <button
                                    type="button"
                                    className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                    onClick={() => {
                                        setIsOpen(false)
                                        setFilteredCities('');
                                        console.log("hdh")
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
                                    <h1 className='text-2xl font-semibold'>Career Preferences</h1>
                                    <p className='text-sm text-[#717b9e]'>Tell us your preferences for your next job & we will send you most relevant recommendations</p>
                                </div>

                            </div>

                            {/* looking for Job and Intenship */}
                            <div className='flex flex-col py-10'>
                                <h1 className='font-medium'>Looking For</h1>
                                <div className='flex gap-3 m-2'>
                                    <button
                                        onClick={() => { setIsInternship(!isInternship) }}
                                        className={isInternship ? (`flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1] `) : (
                                            `flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600  focus:outline-none`
                                        )}>
                                        Internships
                                        {isInternship ? (<i className="ri-check-fill"></i>) : (<i className=" ri-add-line"></i>)}
                                    </button>
                                    <button
                                        onClick={() => { setIsJob(!isJob) }}
                                        className={isJob ? (`flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1] `) : (
                                            `flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600  focus:outline-none`
                                        )}>
                                        Jobs
                                        {isJob ? (<i className="ri-check-fill"></i>) : (<i className=" ri-add-line"></i>)}
                                    </button>

                                </div>
                            </div>

                            {/* Availability to work */}
                            <div className='flex flex-col'>
                                <h1 className='font-medium'>Availability to work</h1>
                                <div className='mt-2'>
                                    <div className='flex gap-2'>
                                        {options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => { setSelected(index) }}
                                                className={selected == index ? (`flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1]`) : (
                                                    `flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600  focus:outline-none`
                                                )} >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Preferred work location(s) */}
                            <div className='flex flex-col py-10'>
                                <h1 className='font-medium'>Preferred work location(s)</h1>
                                <div className='flex flex-col border-2 p-2 mt-2 gap-5 w-[98%] '>
                                    <div className='flex flex-wrap gap-2'>
                                        {selectedCities && (
                                            selectedCities.map((city, index) => (
                                                <button
                                                    key={index}
                                                    className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1]'>
                                                    {city}
                                                    <i
                                                        onClick={() => removeCity(city)}
                                                        className="ri-close-large-line"></i>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                    <div className=''>
                                        <div className='relative'>
                                            <input
                                                type="text"
                                                className='border-2 w-full p-3 outline-none'
                                                placeholder='Search Cities'
                                                value={inputValue}
                                                onChange={filterValue}
                                                onFocus={() => {
                                                    // Show all cities when input is focused, if no inputValue exists
                                                    if (!inputValue) {
                                                        setFilteredCities(cities);
                                                    }
                                                }}
                                            />
                                            {inputValue && (
                                                <button
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                // onClick={()=>{
                                                //     setInputValue('')
                                                // }}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                        {filteredCities.length > 0 && (
                                            <ul>
                                                {filteredCities.map((city, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            addRemoveCity(city);
                                                        }}
                                                        className='text-2xl flex gap-1 cursor-pointer'
                                                    >
                                                        {selectedCities.includes(city) ? (
                                                            <i className="ri-checkbox-fill text-blue-400"></i>
                                                        ) : (
                                                            <i className="text-gray-400 ri-checkbox-blank-line"></i>
                                                        )}
                                                        {city}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-end gap-2'>
                                <button
                                    onClick={() => {
                                        setFilteredCities('');
                                        console.log("hdh")
                                    }}
                                    className='text-[#275df5] font-semibold'>I'll add this later</button>
                                <button
                                    onClick={settingValues}
                                    className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Student_Career;
