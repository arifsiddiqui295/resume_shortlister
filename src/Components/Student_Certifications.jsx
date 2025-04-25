import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';
import SkillsFilter from './SkillsFilter';
import 'react-toastify/dist/ReactToastify.css';

const Student_Certifications = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [certificateName, setCertificateName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [credentials, setCredentials] = useState('');
    const [primaryKey, setPrimaryKey] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [certificationsDetail, setCertificationsDetail] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const addingCertificate = async () => {
        if (!certificateName || !organizationName || !issueDate || !credentials || selectedSkills.length === 0) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const newCertificate = {
                certificate_name: certificateName,
                organization_name: organizationName,
                certificate_id: credentials,
                issue_date: issueDate,
                skills_learned: [selectedSkills],
                student
            }

            if (isEdit) {
                const res = await request('patch', `/certificate/${primaryKey}/`, newCertificate);
                const updatedCertificates = certificationsDetail.map(certificate =>
                    certificate.id === res.id ? { ...certificate, ...res } : certificate
                );
                setCertificationsDetail(updatedCertificates);
                toast.success("Certificate updated successfully!");
            } else {
                const res = await request('post', '/certificate/', newCertificate);
                const updatedCertificates = [...certificationsDetail, res];
                setCertificationsDetail(updatedCertificates);
                toast.success("Certificate added successfully!");
            }
        } catch (error) {
            toast.error(error.message || "Failed to save certificate. Please try again.");
        } finally {
            closeModal();
        }
    }

    const handleSkillChange = (skills) => {
        setSelectedSkills(skills)
    }

    const updateCertificate = async (certificate) => {
        try {
            setCertificateName(certificate.certificate_name);
            setOrganizationName(certificate.organization_name);
            setIssueDate(certificate.issue_date);
            setCredentials(certificate.certificate_id);
            setPrimaryKey(certificate.id)
            setSelectedSkills(certificate.skills_learned[0])
            setIsModalOpen(true);
            setIsEdit(true)
        } catch (error) {
            toast.error("Failed to load certificate details. Please try again.");
        }
    }

    const deleteCertificate = async () => {
        try {
            await request('delete', `/certificate/${primaryKey}/`);
            const updatedCertificates = certificationsDetail.filter(cert => cert.id !== primaryKey);
            setCertificationsDetail(updatedCertificates);
            toast.success("Certificate deleted successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to delete certificate. Please try again.");
        } finally {
            closeModal();
        }
    }

    useEffect(() => {
        const handleSaveChanges = async () => {
            try {
                const res = await request('get', '/certificate/');
                const studentCertifications = res.filter(certificate => certificate.student === student)
                setCertificationsDetail(studentCertifications)
            } catch (error) {
                toast.error(error.message || "Failed to load certifications. Please try again.");
            }
        }
        handleSaveChanges();
    }, [student])

    const closeModal = () => {
        setCertificateName('');
        setOrganizationName('');
        setIssueDate('');
        setCredentials('');
        setSelectedSkills([]);
        setIsEdit(false);
        setIsModalOpen(false);
    };

    return (
        <>
            <ToastContainer position="top-right"
                toastStyle={{
                    width: '90%', // Limit width on mobile
                    maxWidth: '400px', // Maximum width for larger screens
                    margin: '10px auto', // Center the toast
                    borderRadius: '8px', // Rounded corners
                    fontSize: '14px', // Smaller font size for mobile
                    padding: '12px', // Adequate padding
                    wordBreak: 'break-word', // Prevent overflow
                }}
                autoClose={3000} hideProgressBar={true} />
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-full  md:w-[60vw]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Certifications</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add</button>
                    </div>
                    <div className='flex gap-4 flex-col'>
                        {certificationsDetail.length > 0 ? (
                            certificationsDetail.map((certificate, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col gap-4'>
                                    <div className='flex justify-between items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                                        <div className="flex-1">
                                            <div className="font-bold text-xl text-gray-800 mb-2">{certificate.certificate_name}</div>
                                            <p className="text-gray-600 text-base mb-2">{certificate.organization_name}</p>
                                            <p className="text-gray-500 text-sm mb-2">Issued {certificate.issue_date}</p>
                                            <p className="text-gray-500 text-sm mb-4">Credential ID: {certificate.certificate_id}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {certificate.skills_learned && certificate.skills_learned[0].map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 ml-4">
                                            <button
                                                onClick={() => updateCertificate(certificate)}
                                                className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
                                                <i className="ri-edit-box-line text-xl"></i>
                                            </button>
                                            <button
                                                onClick={() => updateCertificate(certificate)}
                                                className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                                                <i className="ri-delete-bin-6-line text-xl"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No Certificates added yet</div>
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
                                <h1 className='text-2xl font-semibold'>Certifications</h1>
                                {/* <p className='text-sm text-[#717b9e]'>Show your professional learnings</p> */}
                            </div>
                        </div>

                        {/* Certificate name */}
                        <div className='flex flex-col py-5'>
                            <h1 className='font-medium'>Certificate name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Company name'
                                    value={certificateName}
                                    onChange={(e) => setCertificateName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Organization name */}
                        <div className='flex flex-col '>
                            <h1 className='font-medium'>Organization name</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Organization name'
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Issue date */}
                        <div className='flex flex-col '>
                            <h1 className='font-medium'>Issue date </h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="date"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Organization name'
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Credentials*/}
                        <div className='flex flex-col'>
                            <h1 className='font-medium'>Certificate ID</h1>
                            <div className='flex gap-3 m-2'>
                                <input
                                    type="text"
                                    className='border-2 border-gray-400 w-full p-3 outline-slate-600 rounded-3xl'
                                    placeholder='Certificate ID'
                                    value={credentials}
                                    onChange={(e) => setCredentials(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Skills*/}
                        <SkillsFilter onSkillChange={handleSkillChange} skillsSelected={selectedSkills} />
                        <div className='flex justify-end gap-2'>
                            <button
                                onClick={deleteCertificate}
                                className='text-[#275df5] font-semibold'>Delete</button>
                            <button
                                onClick={addingCertificate}
                                className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_Certifications;