import React, { useState, useEffect } from 'react';
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';

const Student_Languages = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [langFocused, setLangFocused] = useState(false);
    const [showAddLangPrompt, setShowAddLangPrompt] = useState(false);
    const [studentFinalLanguages, setStudentFinalLanguages] = useState([]);
    const [primaryKey, setPrimaryKey] = useState('');
    const languages = [
        "English", "Mandarin Chinese", "Hindi", "Spanish", "French",
        "Arabic", "Bengali", "Portuguese", "Russian", "Japanese",
        "Punjabi", "German", "Javanese", "Wu Chinese", "Malay/Indonesian",
        "Telugu", "Vietnamese", "Korean", "Marathi", "Tamil",
        "Urdu", "Turkish", "Italian", "Yue Chinese (Cantonese)", "Thai",
        "Gujarati", "Jin Chinese", "Southern Min (Hokkien-Taiwanese)", "Persian", "Polish",
        "Pashto", "Kannada", "Xiang Chinese", "Malayalam", "Sundanese",
        "Hausa", "Odia", "Burmese", "Hakka Chinese", "Ukrainian",
        "Bhojpuri", "Tagalog/Filipino", "Yoruba", "Maithili", "Swahili",
        "Uzbek", "Sindhi", "Amharic", "Fula", "Romanian",
        "Oromo", "Igbo", "Azerbaijani", "Awadhi", "Gan Chinese",
        "Cebuano", "Dutch", "Kurdish", "Serbo-Croatian", "Malagasy",
        "Saraiki", "Nepali", "Sinhalese", "Chittagonian", "Zhuang",
        "Khmer", "Turkmen", "Assamese", "Madurese", "Somali",
        "Marwari", "Magahi", "Haryanvi", "Hungarian", "Chewa",
        "Greek", "Deccan", "Akan", "Kazakh", "Northern Min (Min Bei)",
        "Syriac", "Zulu", "Czech", "Kinyarwanda", "Dhundhari",
        "Haitian Creole", "Eastern Min (Min Dong)", "Ilocano", "Quechua", "Kirundi",
        "Swedish", "Hmong", "Shona", "Uyghur", "Hiligaynon",
        "Mossi", "Xhosa", "Belarusian", "Balochi", "Konkani"
    ];

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await request('get', '/language/');
                const matchedStudentLanguages = res.find(lang => lang.student === student);
                // console.log(matchedStudentLanguages)
                if (matchedStudentLanguages) {
                    setStudentFinalLanguages(matchedStudentLanguages.language);
                    setSelectedLanguages(matchedStudentLanguages.language);
                    setPrimaryKey(matchedStudentLanguages.id)
                }
                // console.log(primaryKey)
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };
        fetchLanguages();
    }, [student]);

    // Filter languages based on input
    const handleInputChange = (e) => {
        const currLetter = e.target.value.toLowerCase();
        setInputValue(currLetter);

        const filter = languages.filter((language) =>
            language.toLowerCase().startsWith(currLetter)
        );
        setFilteredLanguages(filter);

        // Show add language prompt if no matching languages are found
        if (currLetter && filter.length === 0) {
            setShowAddLangPrompt(true);
        } else {
            setShowAddLangPrompt(false);
        }
    };

    const handleLanguageSelect = (language) => {
        if (!selectedLanguages.includes(language)) {
            setSelectedLanguages([...selectedLanguages, language]);
        }
        setInputValue('');
        setFilteredLanguages(languages);
        setLangFocused(false);
    };

    const removeLanguage = (language) => {
        setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    };

    const addCustomLanguage = () => {
        if (inputValue.trim() && !languages.includes(inputValue)) {
            languages.push(inputValue);
            setSelectedLanguages([...selectedLanguages, inputValue]);
            setInputValue('');
            setFilteredLanguages(languages);
            setShowAddLangPrompt(false);
        }
    };

    const saveLanguages = async () => {
        try {
            // console.log('selectedLanguages: ', selectedLanguages)
            // console.log('primaryKey: ', primaryKey)
            if (studentFinalLanguages == '') {
                const res = await request('post', '/language/', {
                    language: selectedLanguages,
                    student
                })
                // console.log(res);
                setStudentFinalLanguages(res.language)
                setPrimaryKey(res.id);
            } else {
                // console.log("hdh")
                const res = await request('patch', `/language/${primaryKey}/`, {
                    language: selectedLanguages,
                    student
                })
                // console.log("res from language update", res);
                setStudentFinalLanguages(res.language)
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving languages:', error);
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg p-6 shadow-md w-[60vw] font-sans">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Languages</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#275DF5] text-md font-semibold"
                    >
                        Add/Edit
                    </button>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {studentFinalLanguages.map((language, index) => (
                        <div
                            key={index}
                            className="flex items-center px-4 py-2 border-2 border-gray-300 rounded-full"
                        >
                            {language}
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[60%] h-[50%] overflow-y-auto p-6">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-between items-center py-3 px-4 border-b">
                            <div>
                                <h1 className="text-2xl font-semibold">Languages Known</h1>
                                <p className="text-sm text-[#717b9e]">
                                    Strengthen your resume by letting recruiters know you can communicate in multiple languages.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-col p-2 mt-2 gap-5 w-[98%]">
                                {selectedLanguages.length > 0 && (
                                    <div className='flex flex-wrap gap-2 mb-2'>
                                        {selectedLanguages.map((lang, index) => (

                                            <span
                                                key={index}
                                                className='flex items-center px-4 py-2 border-2 border-gray-600 rounded-full bg-[#e7e7f1]'
                                            >
                                                {lang}
                                                <button
                                                    onClick={() => removeLanguage(lang)}
                                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        className="border-2 w-full p-3 outline-none rounded-lg"
                                        placeholder="Search Languages"
                                        value={inputValue}
                                        onFocus={() => {
                                            setLangFocused(true);
                                            setFilteredLanguages(languages);
                                        }}
                                        onBlur={() => setTimeout(() => setLangFocused(false), 150)}
                                        onChange={handleInputChange}
                                    />
                                    {langFocused && (
                                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                            <ul className="max-h-32 overflow-y-auto">
                                                {filteredLanguages.map((language, index) => (
                                                    <li
                                                        key={index}
                                                        className="px-4 py-2 text-sm hover:bg-slate-100 cursor-pointer transition-colors"
                                                        onClick={() => handleLanguageSelect(language)}
                                                    >
                                                        {language}
                                                    </li>
                                                ))}
                                            </ul>
                                            {showAddLangPrompt && (
                                                <div className="px-4 py-2 text-sm bg-gray-100 cursor-pointer transition-colors">
                                                    <span>Add </span>
                                                    <span className="font-semibold">{inputValue}</span>
                                                    <span> as a new language</span>
                                                    <button
                                                        onClick={addCustomLanguage}
                                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-[#275df5] font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveLanguages}
                                className="bg-[#275df5] text-white px-3 py-2 rounded-xl"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Student_Languages;