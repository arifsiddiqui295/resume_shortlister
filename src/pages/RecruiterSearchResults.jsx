import React from 'react';
import Navbar from '../Components/Navbar';

const students = [
    { id: 1, name: 'John Doe', enrollment: '2023001', resume: '#' },
    { id: 2, name: 'Jane Smith', enrollment: '2023002', resume: '#' },
    { id: 3, name: 'Robert Brown', enrollment: '2023003', resume: '#' },
    { id: 4, name: 'Emily Davis', enrollment: '2023004', resume: '#' },
    { id: 5, name: 'Michael Johnson', enrollment: '2023005', resume: '#' },
    { id: 6, name: 'Sarah Wilson', enrollment: '2023006', resume: '#' },
    { id: 1, name: 'John Doe', enrollment: '2023001', resume: '#' },
    { id: 2, name: 'Jane Smith', enrollment: '2023002', resume: '#' },
    { id: 3, name: 'Robert Brown', enrollment: '2023003', resume: '#' },
    { id: 4, name: 'Emily Davis', enrollment: '2023004', resume: '#' },
    { id: 5, name: 'Michael Johnson', enrollment: '2023005', resume: '#' },
    { id: 6, name: 'Sarah Wilson', enrollment: '2023006', resume: '#' },
];

const RecruiterSearchResults = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden p-6">
                    <h2 className="text-3xl font-bold text-center text-[#4d6bfe] py-4">Student Records</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-[#4d6bfe] text-white sticky top-0">
                                <tr>
                                    <th className="p-4 text-left">Student Name</th>
                                    <th className="p-4 text-left">Enrollment Number</th>
                                    <th className="p-4 text-center">Resume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={student.id} className={`border-b transition-all hover:bg-blue-100 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                                        <td className="p-4 text-gray-700 font-medium">{student.name}</td>
                                        <td className="p-4 text-gray-600">{student.enrollment}</td>
                                        <td className="p-4 text-center">
                                            <a href={student.resume} download className="text-[#4d6bfe] font-semibold hover:underline">
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecruiterSearchResults;
