import React, { useState } from 'react'
import { useEffect } from 'react';
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';
import SkillsFilter from './SkillsFilter';
const Student_Projects = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [gitHubLink, setGitHubLInk] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [skills, setSkills] = useState();
    const [selectProject, setSelectProject] = useState([]);
    const [primaryKey, setPrimaryKey] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const closeModal = () => {
        setProjectDescription('');
        setProjectName('')
        setGitHubLInk('');
        setLiveLink('');
        setIsEdit(false)
        setSkills('');
        setIsModalOpen(false)
    }
    const handleSkillChange = (skills) => {
        setSkills(skills)
    }
    const removeProject = async () => {
        // console.log("primaryKey",primaryKey)
        // const res = await request('delete', `/project/${primaryKey}/`);
        const updatedProject = selectProject.filter(project => project.id != primaryKey);
        // console.log("updateProject: ", updatedProject);
        setSelectProject(updatedProject);
        setIsEdit(false);
        closeModal();
    }
    const saveProject = async () => {
        const newProject = {
            project_name: projectName,
            description: projectDescription,
            skills_used: skills,
            student,
            gitHubLink: gitHubLink,
            liveLink: liveLink
        }
        // console.log("newProject: ", newProject)
        // console.log("primaryKey: ", primaryKey)
        if (isEdit) {
            const res = await request('patch', `/project/${primaryKey}/`,
                newProject
            )
            // console.log("res from student projects patch: ", res)
            const updateProject = selectProject.map(project =>
                project.id === res.id ? { ...project, ...res } : project
            );
            // console.log("update Project: ", updateProject)
            setSelectProject(updateProject);
            setIsEdit(false);
            closeModal();
        } else {
            const res = await request('post', '/project/', newProject);
            const updateProject = [...selectProject, res];
            setSelectProject(updateProject)
            // console.log("res from student Projects: ", res)
            closeModal();
        }
    }
    const updateProject = (project, index) => {
        // console.log(project)
        setPrimaryKey(project.id);
        setProjectName(project.project_name);
        setProjectDescription(project.description);
        setSkills(project.skills_used);
        setGitHubLInk(project.gitHubLink);
        setLiveLink(project.liveLink);
        setIsModalOpen(true);
        setIsEdit(true);
    }
    useEffect(() => {
        const getStudentProjectDetails = async () => {
            const res = await request('get', '/project/');
            // console.log("res form student Project get", res);
            const matchedStudentProjects = res.filter((project => project.student === student));
            // console.log("matchedStudentProjects: ", matchedStudentProjects)
            setSelectProject(matchedStudentProjects)
        }
        getStudentProjectDetails();
    }, [])
    return (
        <>
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Personal Projects</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add</button>
                    </div>
                    <div className='mt-2'>
                        {(Array.isArray(selectProject) && selectProject.length === 0) ? (
                            <p className="text-gray-500">No projects added yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {selectProject.map((project, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                        <div className='flex gap-1 items-center'>
                                            <h3 className="text-lg font-medium text-black ">{project.project_name}</h3>
                                            <i
                                                onClick={() => { updateProject(project, index) }}
                                                className="ri-pencil-line text-gray-500 cursor-pointer"></i>
                                        </div>
                                        <div className='py-2'>
                                            <p>{project.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.skills_used.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="flex items-center justify-center px-3 py-1 border border-gray-300 hover:bg-gray-100  text-gray-600 rounded-full text-xs font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            {project.gitHubLink && (
                                                <a href={project.gitHubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 underline mt-2 block">
                                                    GitHub Link
                                                </a>
                                            )}
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline mt-2 block">
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
                                <h1 className='text-2xl font-semibold'>Projects
                                </h1>
                                <p className='text-sm text-[#717b9e]'>Showcase your talent with the best projects you have worked on during college and work</p>
                            </div>
                        </div>

                        {/* Projects name */}
                        <div className='flex flex-col'>
                            <h1 className='font-medium'>Project name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Search Cities'
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Describe what you did at internship */}
                        <div className='flex flex-col pt-4'>
                            <h1 className='font-medium'>Project Description</h1>
                            <div className='flex gap-3 m-2'>
                                <textarea
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 h-32 outline-slate-600 rounded-xl'
                                    placeholder='Project Description'
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Key Skills */}
                        <SkillsFilter onSkillChange={handleSkillChange} skillsSelected={skills} />
                        {/* Project URL */}
                        <div className='flex flex-col'>
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
                                    onClick={removeProject}
                                    className='text-[#275df5] font-semibold'>Remove Internship</button>
                            ) : (
                                <button
                                    onClick={closeModal}
                                    className='text-[#275df5] font-semibold'>I'll add this later</button>
                            )}
                            <button
                                onClick={saveProject}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_Projects;
