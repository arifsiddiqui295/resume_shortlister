import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const RecruiterCertifications = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [certifications, setCertifications] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const predefinedCerts = [
        "Salesforce ",
        "CCNA1 by Cisco",
        "CCNA2 by Cisco",
        "CCNA3 by Cisco",
        "Cybersecurity Essentials by Cisco",
        "Python Programming Professional",
        "AWS Certified Solutions Architect",
        "Google Cloud Professional",
        "Certified Ethical Hacker (CEH)",
        "CompTIA Security+",
        "Microsoft Azure Fundamentals"
    ];

    const closeModal = () => {
        setSearchInput('');
        setIsEdit(false);
        setEditingId(null);
        setIsModalOpen(false);
    };

    const handleSaveCertification = () => {
        if (!searchInput.trim()) return;

        const newCert = {
            id: uuidv4(),
            name: searchInput.trim()
        };

        if (isEdit) {
            setCertifications(certifications.map(cert =>
                cert.id === editingId ? newCert : cert
            ));
        } else {
            setCertifications([...certifications, newCert]);
        }
        closeModal();
    };

    const handleEdit = (cert) => {
        setSearchInput(cert.name);
        setIsEdit(true);
        setEditingId(cert.id);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setCertifications(certifications.filter(cert => cert.id !== id));
    };

    const filteredCerts = predefinedCerts.filter(cert =>
        cert.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Certification Requirements</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600 font-semibold"
                >
                    Add Certification
                </button>
            </div>

            <div className="space-y-3">
                {certifications.length === 0 ? (
                    <p className="text-gray-500">No certifications requirements added yet.</p>
                ) : (
                    certifications.map(cert => (
                        <div key={cert.id} className="border p-4 rounded-lg flex justify-between items-center">
                            <span className="font-medium">{cert.name}</span>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEdit(cert)}
                                    className="text-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(cert.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-[500px]">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                {isEdit ? 'Edit Certification' : 'Add Certification'}
                            </h3>
                            <button onClick={closeModal}>✕</button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">Search or Add Certification</label>
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    placeholder="Start typing to search or add custom"
                                />

                                {searchInput && (
                                    <div className="mt-2 border p-2 rounded max-h-40 overflow-y-auto">
                                        {searchInput && filteredCerts.map(cert => (
                                            <div
                                                key={cert}
                                                onClick={() => setSearchInput(cert)}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {cert}
                                            </div>
                                        ))}
                                    </div>
                                )
                                }
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveCertification}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    {isEdit ? 'Save Changes' : 'Add Requirement'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterCertifications;