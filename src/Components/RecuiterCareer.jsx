import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecuiterCareer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInternship, setIsInternship] = useState(false);
    const [isJob, setIsJob] = useState(false);
    const [selected, setSelected] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [noticePeriod, setNoticePeriod] = useState('Immediate');
    const [jobType, setJobType] = useState([]);

    const cities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
        'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
    ];

    const noticePeriodOptions = [
        'Immediate',
        '15 Days',
        '1 Month',
        '2 Months',
        '3 Months'
    ];

    const handleSearch = () => {
        const selectedJobTypes = [];
        if (isInternship) selectedJobTypes.push('Internship');
        if (isJob) selectedJobTypes.push('Job');

        if (selectedJobTypes.length === 0) {
            toast.error("Please select at least one job type");
            return;
        }

        setJobType(selectedJobTypes);
        setNoticePeriod(noticePeriodOptions[selected]);
        setIsOpen(false);
    };

    const addRemoveCity = (city) => {
        const updatedCities = selectedCities.includes(city)
            ? selectedCities.filter(c => c !== city)
            : [...selectedCities, city];
        setSelectedCities(updatedCities);
    };

    const filterCities = (e) => {
        const value = e.target.value.toLowerCase();
        setInputValue(value);
        setFilteredCities(
            cities.filter(city => 
                city.toLowerCase().startsWith(value) && 
                !selectedCities.includes(city)
            )
        );
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const city = inputValue.trim();
            if (!selectedCities.includes(city)) {
                addRemoveCity(city);
            }
            setInputValue('');
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Candidate Search Criteria</h2>
                    <button
                        className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => setIsOpen(true)}
                    >
                        Set Filters
                    </button>
                </div>

                {/* Current Filters Display */}
                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="text-sm text-gray-600">Job Types</h3>
                        <div className="flex gap-2 mt-1">
                            {jobType.join(', ') || 'Not specified'}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-600">Notice Period</h3>
                        <p>{noticePeriod}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-600">Preferred Locations</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {selectedCities.map(city => (
                                <span key={city} className="px-3 py-1 bg-gray-100 rounded-full">
                                    {city}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Filters Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-[70%] h-[70%] overflow-y-auto p-6">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center pb-4 border-b">
                            <h2 className="text-2xl font-semibold">Search Filters</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                                ✕
                            </button>
                        </div>

                        {/* Job Type Selection */}
                        <div className="py-6">
                            <h3 className="text-lg font-medium mb-4">Job Type Required</h3>
                            <div className="flex gap-4">
                                {['Internship', 'Job'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            if (type === 'Internship') setIsInternship(!isInternship);
                                            if (type === 'Job') setIsJob(!isJob);
                                        }}
                                        className={`px-6 py-2 rounded-full ${(type === 'Internship' && isInternship) || (type === 'Job' && isJob)
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Notice Period Selection */}
                        <div className="py-6">
                            <h3 className="text-lg font-medium mb-4">Maximum Notice Period</h3>
                            <div className="flex flex-wrap gap-4">
                                {noticePeriodOptions.map((option, index) => (
                                    <button
                                        key={option}
                                        onClick={() => setSelected(index)}
                                        className={`px-4 py-2 rounded-full ${selected === index
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Selection */}
                        {/* Location Selection */}
                        <div className="py-6">
                            <h3 className="text-lg font-medium mb-4">Job Locations</h3>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search locations..."
                                        className="w-full p-3 border rounded-lg"
                                        value={inputValue}
                                        onChange={filterCities}
                                        onFocus={() => setFilteredCities(cities.filter(city => !selectedCities.includes(city)))}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {filteredCities.map(city => (
                                        <button
                                            key={city}
                                            onClick={() => addRemoveCity(city)}
                                            className={`px-4 py-2 rounded-full flex items-center gap-2 ${selectedCities.includes(city)
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {city}
                                            {selectedCities.includes(city) && '✕'}
                                        </button>
                                    ))}
                                    {inputValue.trim() !== '' &&
                                        !cities.map(c => c.toLowerCase()).includes(inputValue.trim().toLowerCase()) &&
                                        !selectedCities.map(c => c.toLowerCase()).includes(inputValue.trim().toLowerCase()) && (
                                            <button
                                                onClick={() => {
                                                    addRemoveCity(inputValue.trim());
                                                    setInputValue('');
                                                }}
                                                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            >
                                                Add "{inputValue.trim()}"
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-4 pt-6 border-t">
                            <button
                                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={handleSearch}
                            >
                                Search Candidates
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecuiterCareer;