import React, { useState } from 'react'

const Student_Skills = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState(null);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const filterSkills = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setInputValue(e.target.value);

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
        console.log(selectedSkills)
    }
    const removeSkill = (skill) => {
        const newSkill = selectedSkills.filter(selectSkill => selectSkill != skill);
        // console.log(newSkill);
        setSelectedSkills(newSkill)
    }
    const refinedSkills = [
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
    ];
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
                    <div className="flex justify-between items-center  ">
                        <h2 className="text-lg font-semibold">Key Skills</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add/ Edit</button>
                    </div>
                    <div className='mt-2 flex gap-2 flex-wrap'>
                        {selectedSkills && (
                            selectedSkills.map((skill, index) => (
                                <p
                                    key={index}
                                    className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 hover:bg-gray-200 rounded-full text-gray-600  focus:outline-none  '>
                                    {skill}
                                </p>
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
                                onClick={() => setIsModalOpen(false)}
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
                                <h1 className='text-2xl font-semibold'>Key skills</h1>
                                <p className='text-sm text-[#717b9e]'>Recruiters look for candidates with specific keyskills. Add them here to appear in searches.</p>
                            </div>

                        </div>

                        <div className='flex flex-col py-10'>
                            <div className='flex flex-col border-2 p-2 mt-2 gap-5 w-[98%] '>
                                <div className='flex flex-wrap gap-2'>
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
                                <div className=''>
                                    <input type="text"
                                        className='border-2 w-full p-3 outline-none'
                                        placeholder='Search Skills'
                                        value={inputValue}
                                        onFocus={() => {
                                            // Show all cities when input is focused, if no inputValue exists
                                            if (!inputValue) {
                                                setFilteredSkills(refinedSkills);
                                            }
                                        }}
                                        onChange={filterSkills}
                                    />
                                    {filterSkills && (
                                        <ul className='h-22'>
                                            {filteredSkills.map((skill, index) => (
                                                <li
                                                    onClick={() => addRemoveSkills(skill)}
                                                    key={index}
                                                    className='text-2xl flex gap-1 hover:bg-slate-100 mt-1'>
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
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <button className='text-[#275df5] font-semibold'>I'll add this later</button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false)
                                    // setFilteredSkills('');
                                }}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Student_Skills