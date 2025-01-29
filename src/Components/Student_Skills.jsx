import React, { useState, useMemo } from 'react';

const Student_Skills = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [customSkills, setCustomSkills] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const refinedSkills = useMemo(() => [
        "Python", "Java", "JavaScript", "Express.js", "MongoDB", "C#", "C++", "SQL", "Machine Learning",
        "Artificial Intelligence", "Data Science", "Cloud Computing (AWS, Azure, GCP)", "DevOps", "Cybersecurity",
        "Data Engineering", "Big Data", "Blockchain", "React", "Angular", "Vue.js", "Node.js", "Docker"
    ], []);

    const baseSkills = useMemo(() => [
        ...refinedSkills,
        "Kubernetes", "Ansible", "Terraform", "Git", "Agile Methodologies", "Scrum", "Kanban", "Project Management",
        "Software Development Lifecycle (SDLC)", "Web Development", "Mobile Development (iOS, Android)", "Data Analysis",
        "Data Visualization", "Business Intelligence", "Data Mining", "Data Warehousing", "ETL", "NoSQL Databases (MongoDB, Cassandra)",
        "R Programming", "Julia", "Scala", "Kotlin", "Swift", "PHP", "Ruby on Rails", "Go", "Rust", "TypeScript", "HTML", "CSS",
        "RESTful APIs", "Microservices Architecture", "Serverless Computing", "Internet of Things (IoT)", "Artificial Neural Networks",
        "Natural Language Processing (NLP)", "Computer Vision", "Robotics", "Network Security", "Ethical Hacking", "Penetration Testing",
        "Incident Response", "Digital Forensics", "Cloud Security", "DevSecOps", "Information Security Management", "Risk Management",
        "Compliance", "Data Privacy", "User Experience (UX) Design", "User Interface (UI) Design", "Product Design", "Design Thinking",
        "Game Development", "Virtual Reality (VR)", "Augmented Reality (AR)", "Mixed Reality (MR)", "3D Modeling", "3D Animation",
        "Game Engines (Unity, Unreal Engine)", "Digital Marketing", "Social Media Marketing", "Content Marketing", "Search Engine Optimization (SEO)",
        "Search Engine Marketing (SEM)", "Email Marketing", "E-commerce", "Data Analytics for Marketing", "Software Testing", "Test Automation",
        "Performance Testing", "Security Testing", "Quality Assurance (QA)", "Agile Testing", "DevOps Testing", "ITIL", "COBIT", "ISO 27001",
        "GDPR", "HIPAA", "PCI DSS", "Networking (TCP/IP, OSI Model)", "Network Administration", "Network Security", "Wireless Networking",
        "Cloud Networking", "Linux", "Windows Server", "VMware", "Citrix", "Microsoft Office Suite", "Google Workspace", "Project Management Tools (Jira, Trello, Asana)",
        "Version Control (Git, SVN)", "Continuous Integration/Continuous Delivery (CI/CD)", "Cloud-Native Technologies", "Serverless Architecture",
        "Edge Computing", "Quantum Computing", "AI Ops", "Low-Code/No-Code Development"
    ], [refinedSkills]);

    const allSkills = useMemo(() => [...baseSkills, ...customSkills], [baseSkills, customSkills]);

    const filteredSkills = useMemo(() => {
        if (isInputFocused && !inputValue) return refinedSkills;
        const searchValue = inputValue.toLowerCase();
        return allSkills.filter(skill => 
            skill.toLowerCase().includes(searchValue)
        );
    }, [inputValue, allSkills, isInputFocused, refinedSkills]);

    const addRemoveSkills = (skill) => {
        setSelectedSkills(prev => 
            prev.includes(skill) 
                ? prev.filter(s => s !== skill) 
                : [...prev, skill]
        );
    };

    const handleAddCustomSkill = () => {
        const newSkill = inputValue.trim();
        if (!newSkill) return;

        if (!customSkills.includes(newSkill)) {
            setCustomSkills(prev => [...prev, newSkill]);
        }

        if (!selectedSkills.includes(newSkill)) {
            setSelectedSkills(prev => [...prev, newSkill]);
        }

        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue && !allSkills.includes(inputValue)) {
            handleAddCustomSkill();
        }
    };

    const removeSkill = (skillToRemove) => {
        setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
    };

    const sendSkillsToServer = async () => {
        // Implement your API call here
        setIsModalOpen(false);
        console.log("Sending skills to server:", selectedSkills);
    };

    return (
        <>
            <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Key Skills</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#275DF5] text-md font-semibold"
                    >
                        Add/Edit
                    </button>
                </div>
                <div className='mt-2 flex gap-2 flex-wrap'>
                    {selectedSkills.map((skill) => (
                        <p
                            key={skill}
                            className='px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600'
                        >
                            {skill}
                        </p>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl w-[60%] h-[50%] overflow-y-auto p-6">
                        <div className='flex justify-end'>
                            <button
                                className="p-2 hover:bg-gray-100 rounded-full"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="py-3 px-4 border-b">
                            <h1 className='text-2xl font-semibold'>Key skills</h1>
                            <p className='text-sm text-[#717b9e]'>Add skills to appear in searches. You can add custom skills if needed.</p>
                        </div>

                        <div className='py-6'>
                            <div className='border-2 p-2 mt-2 gap-5 w-[98%]'>
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {selectedSkills.map((skill) => (
                                        <span
                                            key={skill}
                                            className='flex items-center px-4 py-2 border-2 border-gray-600 rounded-full bg-[#e7e7f1]'
                                        >
                                            {skill}
                                            <button
                                                onClick={() => removeSkill(skill)}
                                                className="ml-2 text-gray-500 hover:text-gray-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className='border-2 w-full p-3 outline-none'
                                        placeholder='Search or add skills'
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <ul className='mt-2 max-h-40 overflow-y-auto'>
                                        {filteredSkills.map((skill) => (
                                            <li
                                                key={skill}
                                                onClick={() => addRemoveSkills(skill)}
                                                className='p-2 hover:bg-gray-100 cursor-pointer flex items-center'
                                            >
                                                {selectedSkills.includes(skill) ? (
                                                    <span className="text-blue-500 mr-2">✓</span>
                                                ) : (
                                                    <span className="w-4 h-4 border mr-2" />
                                                )}
                                                {skill}
                                            </li>
                                        ))}
                                        {inputValue && !allSkills.includes(inputValue) && (
                                            <li
                                                onClick={handleAddCustomSkill}
                                                className='p-2 hover:bg-gray-100 cursor-pointer text-blue-500'
                                            >
                                                + Add "{inputValue}"
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end gap-2 mt-4'>
                            <button
                                className='text-[#275df5] font-semibold'
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={sendSkillsToServer}
                                className='bg-[#275df5] text-white px-4 py-2 rounded-lg'
                            >
                                Save Skills
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Student_Skills;