import React, { useState } from 'react'
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import request from '../api/request';
const Student_Employement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [projectName, setProjectName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [gitHubLink, setGitHubLInk] = useState('');
    const [liveLink, setLiveLink] = useState();
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [internshipId, setInternshipId] = useState();
    const [selectInternship, setSelectInternship] = useState([]);

    const [isEdit, setIsEdit] = useState(false);
    // Separate states for From and To dates
    const [selectedFromDate, setSelectedFromDate] = useState(new Date());
    const [selectedToDate, setSelectedToDate] = useState(new Date());

    const [view, setView] = useState('date');
    const [isFromOpen, setIsFromOpen] = useState(false);
    const [isToOpen, setIsToOpen] = useState(false);

    const toggleFromOpen = () => setIsFromOpen(!isFromOpen);
    const toggleToOpen = () => setIsToOpen(!isToOpen);

    const closeModal = () => {
        setCompanyName('');
        setSelectedFromDate(new Date());
        setSelectedToDate(new Date());
        setProjectDescription('');
        setProjectName('')
        setSelectedSkills([]);
        setInputValue('')
        setGitHubLInk('');
        setLiveLink('');
        setIsEdit(false)
        setIsModalOpen(false)
    }

    const addInternship = async () => {
        const index = selectInternship.findIndex(internship => String(internship.id) === String(internshipId));
        console.log(index)
        // Format dates as strings for consistency before updating state
        const formattedFromDate = selectedFromDate instanceof Date ? selectedFromDate.toDateString() : selectedFromDate;
        const formattedToDate = selectedToDate instanceof Date ? selectedToDate.toDateString() : selectedToDate;

        if (index !== -1) {
            // Create a copy of the array to maintain immutability
            const updatedInternships = [...selectInternship];
            updatedInternships[index] = {
                ...updatedInternships[index],
                companyName,
                selectedFromDate: formattedFromDate,
                selectedToDate: formattedToDate,
                projectName: projectName,
                projectDescription: projectDescription,
                selectedSkills,
                gitHubLink,
                liveLink,
            };
            console.log(updatedInternships)
            setIsEdit(false)
            setSelectInternship(updatedInternships);
        } else {
            // Add new internship with formatted dates
            const newInternship = {
                id: uuidv4(),
                companyName,
                selectedFromDate: formattedFromDate,
                selectedToDate: formattedToDate,
                projectName: projectName,
                projectDescription: projectDescription,
                selectedSkills,
                gitHubLink,
                liveLink,
            };
            console.log(selectInternship)
            const response = await request('post', "/", selectInternship);
            console.log(response)
            setSelectInternship([...selectInternship, newInternship]);
        }
        // closeModal();
    };

    const editInternship = (internship) => {
        setIsEdit(true);
        setInternshipId(internship.id);
        setCompanyName(internship.companyName);

        // Convert dates to Date objects if they’re stored as strings
        setSelectedFromDate(internship.selectedFromDate ? new Date(internship.selectedFromDate) : new Date());
        setSelectedToDate(internship.selectedToDate ? new Date(internship.selectedToDate) : new Date());
        setProjectDescription(internship.projectDescription);
        setProjectName(internship.projectName)
        setSelectedSkills(internship.selectedSkills);
        setGitHubLInk(internship.gitHubLink);
        setLiveLink(internship.liveLink);
        setIsModalOpen(true);
    };

    const removeInternship = () => {
        console.log(selectInternship)
        console.log(internshipId)
        const updateInternships = selectInternship.filter((intern) => {
            return intern.id !== internshipId; // Use !== to avoid type coercion issues
        });
        // console.log(updateInternships);
        setSelectInternship(updateInternships)
        setIsModalOpen(false);
        closeModal()
    }
    const filterSkills = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setInputValue(e.target.value);
        // console.log(searchValue)
        const filteredSkill = skills.filter((skill) => skill.toLowerCase().startsWith(searchValue));
        setFilteredSkills(filteredSkill);
        // console.log(filteredSkills);
    }

    const addRemoveSkills = (skill) => {
        // console.log(skill)
        const currentSkills = [...selectedSkills];
        const isAlreadySelected = selectedSkills.includes(skill);
        const updatedSelectedSkills = isAlreadySelected ? (selectedSkills.filter((selectSkill) => selectSkill !== skill)) : [...currentSkills, skill];
        // console.log(updatedSelectedSkills);
        setSelectedSkills(updatedSelectedSkills);
        // console.log(selectedSkills)
    }

    const removeSkill = (skill) => {
        const newSkill = selectedSkills.filter(selectSkill => selectSkill != skill);
        // console.log(newSkill);
        // closeModal();
        setSelectedSkills(newSkill)
    }

    const clearInput = () => {
        setInputValue('');
    };
    const handleDateClick = (date, type) => {
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        if (type === 'from') {
            setSelectedFromDate(selectedDate);
            setIsFromOpen(false);
        } else {
            setSelectedToDate(selectedDate);
            setIsToOpen(false);
        }
    };

    const handleMonthClick = (month, type) => {
        let selectedDate;
        if (type === 'from') {
            selectedDate = new Date(selectedFromDate.getFullYear(), month, 1);
        } else {
            selectedDate = new Date(selectedToDate.getFullYear(), month, 1);
        }
        selectedDate.setHours(0, 0, 0, 0);
        if (type === 'from') {
            setSelectedFromDate(selectedDate);
        } else {
            setSelectedToDate(selectedDate);
        }
        setView('date');
    };

    const handleYearClick = (year, type) => {
        let selectedDate;
        if (type === 'from') {
            selectedDate = new Date(year, selectedFromDate.getMonth(), 1);
        } else {
            selectedDate = new Date(year, selectedToDate.getMonth(), 1);
        }
        selectedDate.setHours(0, 0, 0, 0);
        if (type === 'from') {
            setSelectedFromDate(selectedDate);
        } else {
            setSelectedToDate(selectedDate);
        }
        setView('month');
    };

    const renderDateView = (type) => {
        const selectedDate = type === 'from' ? selectedFromDate : selectedToDate;
        const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
        const days = [...Array(daysInMonth)].map((_, i) => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1));

        return (
            <div className="grid grid-cols-7 gap-1 text-center p-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
                    <span key={index} className="text-gray-400">{day}</span>
                ))}
                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => handleDateClick(day, type)}
                        className={`p-2 rounded-lg ${day.getDate() === selectedDate.getDate() ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                    >
                        {day.getDate()}
                    </button>
                ))}
            </div>
        );
    };

    const renderMonthView = (type) => {
        const selectedDate = type === 'from' ? selectedFromDate : selectedToDate;
        const months = Array.from({ length: 12 }, (_, i) => new Date(selectedDate.getFullYear(), i, 1));

        return (
            <div className="grid grid-cols-3 gap-2 p-4">
                {months.map((month, index) => (
                    <button
                        key={index}
                        onClick={() => handleMonthClick(index, type)}
                        className={`p-2 rounded-lg ${month.getMonth() === selectedDate.getMonth() ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                    >
                        {format(month, 'MMM')}
                    </button>
                ))}
            </div>
        );
    };

    const renderYearView = (type) => {
        const selectedDate = type === 'from' ? selectedFromDate : selectedToDate;
        const startYear = Math.floor(selectedDate.getFullYear() / 10) * 10;
        const years = Array.from({ length: 10 }, (_, i) => startYear + i);

        return (
            <div className="grid grid-cols-3 gap-2 p-4">
                {years.map((year, index) => (
                    <button
                        key={index}
                        onClick={() => handleYearClick(year, type)}
                        className={`p-2 rounded-lg ${year === selectedDate.getFullYear() ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                    >
                        {year}
                    </button>
                ))}
            </div>
        );
    };
    const skills = [
        "Python",
        "Java",
        "JavaScript",
        "Express.js",
        "MongoDB",
        "C#",
        "C++",
        "SQL",
        "Machine Learning",
        "Artificial Intelligence",
        "Data Science",
        "Cloud Computing (AWS, Azure, GCP)",
        "DevOps",
        "Cybersecurity",
        "Data Engineering",
        "Big Data",
        "Blockchain",
        "React",
        "Angular",
        "Vue.js",
        "Node.js",
        "Docker",
        "Kubernetes",
        "Ansible",
        "Terraform",
        "Git",
        "Agile Methodologies",
        "Scrum",
        "Kanban",
        "Project Management",
        "Software Development Lifecycle (SDLC)",
        "Web Development",
        "Mobile Development (iOS, Android)",
        "Data Analysis",
        "Data Visualization",
        "Business Intelligence",
        "Data Mining",
        "Data Warehousing",
        "ETL",
        "NoSQL Databases (MongoDB, Cassandra)",
        "R Programming",
        "Julia",
        "Scala",
        "Kotlin",
        "Swift",
        "PHP",
        "Ruby on Rails",
        "Go",
        "Rust",
        "TypeScript",
        "HTML",
        "CSS",
        "RESTful APIs",
        "Microservices Architecture",
        "Serverless Computing",
        "Internet of Things (IoT)",
        "Artificial Neural Networks",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Robotics",
        "Network Security",
        "Ethical Hacking",
        "Penetration Testing",
        "Incident Response",
        "Digital Forensics",
        "Cloud Security",
        "DevSecOps",
        "Information Security Management",
        "Risk Management",
        "Compliance",
        "Data Privacy",
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "Product Design",
        "Design Thinking",
        "Game Development",
        "Virtual Reality (VR)",
        "Augmented Reality (AR)",
        "Mixed Reality (MR)",
        "3D Modeling",
        "3D Animation",
        "Game Engines (Unity, Unreal Engine)",
        "Digital Marketing",
        "Social Media Marketing",
        "Content Marketing",
        "Search Engine Optimization (SEO)",
        "Search Engine Marketing (SEM)",
        "Email Marketing",
        "E-commerce",
        "Data Analytics for Marketing",
        "Software Testing",
        "Test Automation",
        "Performance Testing",
        "Security Testing",
        "Quality Assurance (QA)",
        "Agile Testing",
        "DevOps Testing",
        "ITIL",
        "COBIT",
        "ISO 27001",
        "GDPR",
        "HIPAA",
        "PCI DSS",
        "Networking (TCP/IP, OSI Model)",
        "Network Administration",
        "Network Security",
        "Wireless Networking",
        "Cloud Networking",
        "Linux",
        "Windows Server",
        "VMware",
        "Citrix",
        "Microsoft Office Suite",
        "Google Workspace",
        "Project Management Tools (Jira, Trello, Asana)",
        "Version Control (Git, SVN)",
        "Continuous Integration/Continuous Delivery (CI/CD)",
        "Cloud-Native Technologies",
        "Serverless Architecture",
        "Edge Computing",
        "Quantum Computing",
        "AI Ops",
        "Low-Code/No-Code Development"
    ];
    return (
        <>
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Employment</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add</button>
                    </div>
                    <div className='mt-2'>
                        {selectInternship.length === 0 ? (
                            <p className="text-gray-500">Talk about the company you worked at, your designation and describe what all you did there</p>
                        ) : (
                            <div className="space-y-4">
                                {selectInternship.map((internship, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                        <div className='flex gap-1 items-center'>
                                            <h3 className="text-lg font-medium text-black ">{internship.projectName} at {internship.companyName}</h3>
                                            <i
                                                onClick={() => { editInternship(internship, index) }}
                                                className="ri-pencil-line text-gray-500 cursor-pointer"></i>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {internship.selectedFromDate} - {internship.selectedToDate}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {internship.selectedSkills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="flex items-center justify-center px-3 py-1 border border-gray-300 hover:bg-gray-100  text-gray-600 rounded-full text-xs font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            {internship.gitHubLink && (
                                                <a href={internship.gitHubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 underline mt-2 block">
                                                    GitHub Link
                                                </a>
                                            )}
                                            {internship.liveLink && (
                                                <a href={internship.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline mt-2 block">
                                                    Live Project Link
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[70%] h-[70%] overflow-y-auto p-6">
                        <div className='flex justify-end'>
                            <button
                                type="button"
                                className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                onClick={closeModal}
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
                                <h1 className='text-2xl font-semibold'>Employment details</h1>
                                <p className='text-sm text-[#717b9e]'>Show your professional learnings</p>
                            </div>
                        </div>

                        {/* Company name */}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Company name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Search Cities'
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Internship duration */}
                        <div className='flex flex-col'>
                            <h1 className='font-medium'>Employment duration</h1>
                            <div className='flex gap-10 m-2'>
                                {/* From Date Picker */}
                                <div className="relative">
                                    <div className='flex items-center gap-3'>
                                        <p className='text-md'>From</p>
                                        <div className="flex border gap-10 rounded-lg p-2 px-5 justify-end cursor-pointer" onClick={toggleFromOpen}>
                                            <span className="flex-grow text-gray-700">{format(selectedFromDate, 'dd MMM yyyy')}</span>
                                            <button className="text-blue-500 px-2">📅</button>
                                        </div>
                                    </div>

                                    {isFromOpen && (
                                        <div className="absolute bg-white border rounded-lg shadow-lg mt-2 w-60 z-10">
                                            <div className="flex justify-between p-4 border-b">
                                                <button onClick={() => setView('year')} className="text-gray-700">{selectedFromDate.getFullYear()}</button>
                                                <button onClick={() => setView('month')} className="text-gray-700">{format(selectedFromDate, 'MMMM')}</button>
                                            </div>
                                            {view === 'date' && renderDateView('from')}
                                            {view === 'month' && renderMonthView('from')}
                                            {view === 'year' && renderYearView('from')}
                                        </div>
                                    )}
                                </div>

                                {/* To Date Picker */}
                                <div className="relative">
                                    <div className='flex items-center gap-3'>
                                        <p className='text-md'>To</p>
                                        <div className="flex border gap-10 rounded-lg p-2 px-5 justify-end cursor-pointer" onClick={toggleToOpen}>
                                            <span className="flex-grow text-gray-700">{format(selectedToDate, 'dd MMM yyyy')}</span>
                                            <button className="text-blue-500 px-2">📅</button>
                                        </div>
                                    </div>

                                    {isToOpen && (
                                        <div className="absolute bg-white border rounded-lg shadow-lg mt-2 w-60 z-10">
                                            <div className="flex justify-between p-4 border-b">
                                                <button onClick={() => setView('year')} className="text-gray-700">{selectedToDate.getFullYear()}</button>
                                                <button onClick={() => setView('month')} className="text-gray-700">{format(selectedToDate, 'MMMM')}</button>
                                            </div>
                                            {view === 'date' && renderDateView('to')}
                                            {view === 'month' && renderMonthView('to')}
                                            {view === 'year' && renderYearView('to')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Project  name*/}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Designation</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Your Designation'
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Describe what you did at internship */}
                        <div className='flex flex-col'>
                            <h1 className='font-medium'>Describe what you did at work</h1>
                            <div className='flex gap-3 m-2'>
                                <textarea
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-xl'
                                    placeholder='Enter the responsibilities you held, anything you accomplished or learned while serving in your full time job'
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Key Skills */}
                        <div className='flex flex-col py-5 '>
                            <h1 className='font-medium'>Key Skills</h1>
                            <div className='mt-2 flex gap-2 flex-wrap'>
                                {selectedSkills && (
                                    selectedSkills.map((skill, index) => (
                                        <p
                                            key={index}
                                            className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1] '>
                                            {skill}
                                            <i
                                                onClick={() => removeSkill(skill)}
                                                className="ri-close-large-line cursor-pointer"></i>
                                        </p>
                                    ))
                                )}
                            </div>
                            <div className='flex gap-3 m-2'>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        className="border-2 border-gray-400 w-full p-3 pr-10 outline-slate-600 rounded-xl"
                                        placeholder="Search Skills"
                                        value={inputValue}
                                        onChange={filterSkills}
                                    />
                                    {inputValue && (
                                        <button
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            onClick={clearInput}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {inputValue && (
                                <ul className='h-22'>
                                    {filteredSkills.map((skill, index) => (
                                        <li
                                            onClick={() => addRemoveSkills(skill)}
                                            key={index}
                                            className='text-lg flex gap-1 hover:bg-slate-100 mt-1'>
                                            {selectedSkills.includes(skill) ? (
                                                <i className="ri-checkbox-fill text-blue-400"></i>
                                            ) : (
                                                <i
                                                    className=" text-gray-400 ri-checkbox-blank-line"></i>
                                            )}
                                            {skill}

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Project URL */}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Project Links</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Github Link'
                                    value={gitHubLink}
                                    onChange={(e) => setGitHubLInk(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Live Project'
                                    value={liveLink}
                                    onChange={(e) => setLiveLink(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            {isEdit ? (
                                <button
                                    onClick={removeInternship}
                                    className='text-[#275df5] font-semibold'>Remove Internship</button>
                            ) : (
                                <button
                                    onClick={closeModal}
                                    className='text-[#275df5] font-semibold'>I'll add this later</button>
                            )}
                            <button
                                onClick={addInternship}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_Employement;
