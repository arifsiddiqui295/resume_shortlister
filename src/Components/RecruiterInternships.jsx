import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const RecruiterInternships = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [designation, setDesignation] = useState('');
    const [duration, setDuration] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [criteriaList, setCriteriaList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const skills = [
        "Python", "Java", "JavaScript", "React", "Node.js", 
        "Machine Learning", "AWS", "Docker", "SQL", "Data Analysis"
    ];

    const closeModal = () => {
        setDesignation('');
        setDuration('');
        setSelectedSkills([]);
        setInputValue('');
        setIsEdit(false);
        setEditingId(null);
        setIsModalOpen(false);
    }

    const saveCriteria = () => {
        const newCriteria = {
            id: uuidv4(),
            designation,
            duration,
            skills: selectedSkills
        };

        if (isEdit) {
            setCriteriaList(criteriaList.map(item => 
                item.id === editingId ? newCriteria : item
            ));
        } else {
            setCriteriaList([...criteriaList, newCriteria]);
        }
        closeModal();
    };

    const editCriteria = (criteria) => {
        setDesignation(criteria.designation);
        setDuration(criteria.duration);
        setSelectedSkills(criteria.skills);
        setIsEdit(true);
        setEditingId(criteria.id);
        setIsModalOpen(true);
    };

    const deleteCriteria = (id) => {
        setCriteriaList(criteriaList.filter(item => item.id !== id));
    };

    const filterSkills = (e) => {
        const search = e.target.value.toLowerCase();
        setInputValue(search);
        setFilteredSkills(skills.filter(skill => 
            skill.toLowerCase().includes(search)
        ));
    };

    const toggleSkill = (skill) => {
        setSelectedSkills(prev => prev.includes(skill) 
            ? prev.filter(s => s !== skill) 
            : [...prev, skill]
        );
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Internship Criteria</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600 font-semibold"
                >
                    Add Criteria
                </button>
            </div>

            <div className="mt-4 space-y-3">
                {criteriaList.map(criteria => (
                    <div key={criteria.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium">{criteria.designation}</h3>
                                <p className="text-sm text-gray-600">
                                    Duration: {{
                                        '6': '6 Months',
                                        '12': '1 Year',
                                        '24': '2 Years'
                                    }[criteria.duration]}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => editCriteria(criteria)}
                                    className="text-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCriteria(criteria.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {criteria.skills.map(skill => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-[500px]">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                {isEdit ? 'Edit Criteria' : 'Add Criteria'}
                            </h3>
                            <button onClick={closeModal}>✕</button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">Designation</label>
                                <input
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Duration</label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Duration</option>
                                    <option value="6">6 Months</option>
                                    <option value="12">1 Year</option>
                                    <option value="24">2 Years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2">Required Skills</label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={filterSkills}
                                    className="w-full p-2 border rounded"
                                    placeholder="Search skills"
                                />
                                
                                <div className="mt-2 border p-2 rounded max-h-40 overflow-y-auto">
                                    {filteredSkills.map(skill => (
                                        <label 
                                            key={skill}
                                            className="flex items-center gap-2 p-1 hover:bg-gray-100"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedSkills.includes(skill)}
                                                onChange={() => toggleSkill(skill)}
                                            />
                                            {skill}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveCriteria}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    {isEdit ? 'Save Changes' : 'Add Criteria'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecruiterInternships;