import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecruiterEducation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [requirements, setRequirements] = useState([]);
    const [formData, setFormData] = useState({
        educationLevel: '',
        percentage: '',
        board: '',
        cgpa: '',
        backlogs: '',
        branch: ''
    });

    const educationLevels = ['Class X', 'Class XII', 'Graduation'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { educationLevel, percentage, board, cgpa, backlogs, branch } = formData;
        
        if (!educationLevel) {
            toast.error("Please select an education level");
            return false;
        }

        if (educationLevel === 'Class X' || educationLevel === 'Class XII') {
            if (!percentage || !board) {
                toast.error("Please fill all required fields");
                return false;
            }
        }

        if (educationLevel === 'Graduation') {
            if (!cgpa || !backlogs || !branch) {
                toast.error("Please fill all required fields");
                return false;
            }
        }

        return true;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const newRequirement = { ...formData };
        if (editIndex >= 0) {
            const updated = [...requirements];
            updated[editIndex] = newRequirement;
            setRequirements(updated);
        } else {
            setRequirements([...requirements, newRequirement]);
        }

        setIsOpen(false);
        setEditIndex(-1);
        setFormData({
            educationLevel: '',
            percentage: '',
            board: '',
            cgpa: '',
            backlogs: '',
            branch: ''
        });
    };

    const handleEdit = (index) => {
        setFormData(requirements[index]);
        setEditIndex(index);
        setIsOpen(true);
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
            <ToastContainer />
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Education Criteria</h2>
                <button
                    className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setIsOpen(true)}
                >
                    Add Criteria
                </button>
            </div>

            <div className="mt-4 space-y-4">
                {requirements.map((req, index) => (
                    <div key={index} className="border-b pb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">{req.educationLevel} Requirements</h3>
                            <button
                                onClick={() => handleEdit(index)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Edit
                            </button>
                        </div>
                        
                        {req.educationLevel !== 'Graduation' ? (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <p>Minimum Percentage: {req.percentage}%</p>
                                <p>Board: {req.board}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <p>CGPA: {req.cgpa}</p>
                                <p>Active Backlogs: {req.backlogs}</p>
                                <p>Branch: {req.branch}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-[70%] p-6">
                        <div className="flex justify-between items-center pb-4 border-b">
                            <h2 className="text-2xl font-semibold">Set Education Criteria</h2>
                            <button onClick={() => {
                                setIsOpen(false);
                                setEditIndex(-1);
                                setFormData({
                                    educationLevel: '',
                                    percentage: '',
                                    board: '',
                                    cgpa: '',
                                    backlogs: '',
                                    branch: ''
                                });
                            }} className="text-gray-500 hover:text-gray-700">
                                ✕
                            </button>
                        </div>

                        <div className="mt-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Education Level
                                </label>
                                <select
                                    name="educationLevel"
                                    value={formData.educationLevel}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select Education Level</option>
                                    {educationLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>

                            {formData.educationLevel && (
                                <div className="grid grid-cols-2 gap-4">
                                    {formData.educationLevel !== 'Graduation' ? (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Minimum Percentage (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="percentage"
                                                    value={formData.percentage}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                                    min="0"
                                                    max="100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Board
                                                </label>
                                                <input
                                                    type="text"
                                                    name="board"
                                                    value={formData.board}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                                    placeholder="e.g., CBSE, ICSE"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Current CGPA
                                                </label>
                                                <input
                                                    type="number"
                                                    name="cgpa"
                                                    value={formData.cgpa}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                                    step="0.01"
                                                    min="0"
                                                    max="10"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Active Backlogs
                                                </label>
                                                <input
                                                    type="number"
                                                    name="backlogs"
                                                    value={formData.backlogs}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                                    min="0"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium mb-2">
                                                    Branch
                                                </label>
                                                <input
                                                    type="text"
                                                    name="branch"
                                                    value={formData.branch}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                                    placeholder="e.g., Computer Science"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t mt-6">
                            <button
                                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={handleSave}
                            >
                                {editIndex >= 0 ? 'Update' : 'Save'} Criteria
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterEducation;