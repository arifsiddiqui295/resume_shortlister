import React, { useState, useEffect } from 'react';

const SkillsFilter = ({ onSkillChange, skillsSelected }) => {
    const [skills, setSkills] = useState('');
    const [skillsFocused, setSkillsFocused] = useState(false);
    const allSkills = [
        "Python", "Java", "JavaScript", "Express.js", "MongoDB", "C#", "C++", "SQL", "Machine Learning",
        "Artificial Intelligence", "Data Science", "Cloud Computing (AWS, Azure, GCP)", "DevOps", "Cybersecurity",
        "Data Engineering", "Big Data", "Blockchain", "React", "Angular", "Vue.js", "Node.js", "Docker", "Kubernetes",
        "Ansible", "Terraform", "Git", "Agile Methodologies", "Scrum", "Kanban", "Project Management",
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
    ];
    const [selectedSkills, setSelectedSkills] = useState(skillsSelected || []);
    const [filteredSkills, setFilteredSkills] = useState(allSkills);
    const [showAddSkillPrompt, setShowAddSkillPrompt] = useState(false);

    const handleSkillsChange = (e) => {
        const currSkill = e.target.value.toLowerCase();
        setSkills(currSkill);

        // Filter skills based on input
        const filter = allSkills.filter((skill) =>
            skill.toLowerCase().startsWith(currSkill)
        );
        setFilteredSkills(filter);

        // Show add skill prompt if no matching skills are found
        if (currSkill && filter.length === 0) {
            setShowAddSkillPrompt(true);
        } else {
            setShowAddSkillPrompt(false);
        }
    };

    const handleSkillSelect = (skill) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
        setSkills('');
        setFilteredSkills(allSkills);
        setSkillsFocused(false);
    };

    const removeSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    const addCustomSkill = () => {
        if (skills.trim() && !allSkills.includes(skills)) {
            allSkills.push(skills);
            setSelectedSkills([...selectedSkills, skills]);
            setSkills('');
            setFilteredSkills(allSkills);
            setShowAddSkillPrompt(false);
        }
    };
    useEffect(() => {
        if (onSkillChange) {
            onSkillChange(selectedSkills);
        }
        // console.log(selectedSkills)
    }, [selectedSkills, onSkillChange]);
    return (
        <div>
            <div className='flex flex-col py-5'>
                <h1 className='font-medium'>Skills</h1>
                <div className='flex flex-col m-2'>
                    {/* Display selected skills */}
                    {selectedSkills.length > 0 && (
                        <div className='flex flex-wrap gap-2 mb-2'>
                            {selectedSkills.map((skill,index) => (
                                
                                <span
                                    key={index}
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
                    )}
                    {/* Skill input and dropdown */}
                    <div className='relative w-full'>
                        <input
                            type="text"
                            className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                            placeholder='Search Skills'
                            value={skills}
                            onFocus={() => setSkillsFocused(true)}
                            onBlur={() => setTimeout(() => setSkillsFocused(false), 200)}
                            onChange={handleSkillsChange}
                        />
                        {skillsFocused && (
                            <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg'>
                                <ul className='max-h-32 overflow-y-auto'>
                                    {filteredSkills.map((skill, index) => (
                                        <li
                                            key={index}
                                            className='px-4 py-2 text-sm hover:bg-slate-100 cursor-pointer transition-colors'
                                            onClick={() => handleSkillSelect(skill)}
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                                {/* Add custom skill prompt */}
                                {showAddSkillPrompt && (
                                    <div className='px-4 py-2 text-sm bg-gray-100 cursor-pointer transition-colors'>
                                        <span>Add </span>
                                        <span className='font-semibold'>{skills}</span>
                                        <span> as a new skill</span>
                                        <button
                                            onClick={addCustomSkill}
                                            className='ml-2 text-blue-500 hover:text-blue-700'
                                        >
                                            Add
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsFilter;