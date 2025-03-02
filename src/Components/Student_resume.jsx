import React, { useState } from "react";

const Student_resume = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            alert("Please upload a000 valid PDF file.");
        }
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            console.log("File uploaded:", selectedFile);
            // Here, you can send the file to the server via an API
        } else {
            alert("No file selected.");
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 flex flex-col shadow-md w-full  md:w-[60vw]">
            <h2 className="text-lg font-semibold mb-2">Resume</h2>
            <p className="text-sm text-gray-600 mb-4">
                Your resume is the first impression you make on potential employers. Craft it carefully to secure your desired job or internship.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center">
                <label
                    htmlFor="resumeUpload"
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-2"
                >
                    Choose File
                </label>
                <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                />
                {selectedFile ? (
                    <p className="text-sm text-gray-700 mt-2">
                        Selected File: {selectedFile.name}
                    </p>
                ) : (
                    <p className="text-sm text-gray-500">No file selected yet.</p>
                )}
            </div>
            <button
                onClick={handleFileUpload}
                className="mt-4 bg-green-500 self-center text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                Upload
            </button>
        </div>
    );
};

export default Student_resume;
