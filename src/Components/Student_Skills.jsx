import React, { useState, useEffect } from 'react';
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';
import SkillsFilter from './SkillsFilter';
const Student_Skills = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [primaryKey, setPrimaryKey] = useState('');
    useEffect(() => {
        const studentSkills = async () => {
            try {
                // console.log("selectedSkills: ", selectedSkills)
                const res = await request('get', '/skill/');
                // console.log('res from studentSkills : ', res)
                const matchedStudentSkills = res.find(stu => stu.student === student);
                // console.log("matchedStudentSkills: ", matchedStudentSkills);
                setPrimaryKey(matchedStudentSkills.id);
                setSelectedSkills(matchedStudentSkills.skill);
            } catch (error) {
                console.log(error);
            }
        }
        studentSkills();
    }, [])
    const handleSkillChange = (skills) => {
        setSkills(skills)
    }
    const sendSkillsToServer = async () => {
        try {
            // console.log("selectedSkills: ", selectedSkills)
            if (selectedSkills == '') {
                const res = await request('post', '/skill/', { skill: skills, student });
                console.log("response from Skill: ", res);
                setPrimaryKey(res.id);
                setSelectedSkills(res.skill);
                setIsModalOpen(false);
            } else {
                const res = await request('patch', `/skill/${primaryKey}/`, { skill: skills, student });
                console.log("response from Skill: ", res);
                setSelectedSkills(res.skill);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div id='student-skills' className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
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
                            // onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="py-3 px-4 border-b">
                            <h1 className='text-2xl font-semibold'>Key skills</h1>
                            <p className='text-sm text-[#717b9e]'>Add skills to appear in searches. You can add custom skills if needed.</p>
                        </div>
                        <SkillsFilter onSkillChange={handleSkillChange} skillsSelected={selectedSkills} />

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