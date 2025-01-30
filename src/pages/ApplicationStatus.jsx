import React from 'react'
import Navbar from '../Components/Navbar'
const companies = [
    { id: 1, name: 'Tech World', package: '4.8LPA', status: 'Application sent', position: 'Frontend Developer' },
    { id: 2, name: 'InnovateX', package: '6.5LPA', status: 'Interview Scheduled', position: 'Backend Developer' },
    { id: 3, name: 'CodeCrafters', package: '7.2LPA', status: 'Offer Received', position: 'Full Stack Developer' },
    { id: 4, name: 'DataSphere', package: '5.8LPA', status: 'Rejected', position: 'Data Analyst' },
    { id: 5, name: 'CyberSecure', package: '8.0LPA', status: 'Application sent', position: 'Cybersecurity Engineer' },
    { id: 6, name: 'AI Labs', package: '9.5LPA', status: 'Interview Scheduled', position: 'Machine Learning Engineer' },
    { id: 7, name: 'CloudNest', package: '10.2LPA', status: 'Offer Received', position: 'Cloud Engineer' },
    { id: 8, name: 'FinTech Solutions', package: '6.8LPA', status: 'Application sent', position: 'Software Engineer' },
    { id: 9, name: 'QuantumSoft', package: '12.0LPA', status: 'Interview Scheduled', position: 'Blockchain Developer' },
    { id: 10, name: 'Webify', package: '5.5LPA', status: 'Rejected', position: 'UI/UX Designer' }
];

const ApplicationStatus = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden p-6">
                    <h2 className="text-3xl font-bold text-center text-[#4d6bfe] py-4">Job Applications</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-[#4d6bfe] text-white sticky top-0">
                                <tr>
                                    <th className="p-4 text-left">Company Name</th>
                                    <th className="p-4 text-left">Package</th>
                                    <th className="p-4 text-center">Application Status</th>
                                    <th className="p-4 text-center">Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((student, index) => (
                                    <tr key={student.id} className={`border-b transition-all hover:bg-blue-100 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                                        <td className="p-4 text-gray-700 font-medium">{student.name}</td>
                                        <td className="p-4 text-gray-600">{student.package}</td>
                                        <td className="p-4 text-center">
                                            <a href={student.status} download className="text-[#4d6bfe] font-semibold hover:underline">
                                                {student.status}
                                            </a>
                                        </td>
                                        <td className="p-4 text-gray-600">{student.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicationStatus