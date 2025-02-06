import React, { useState, useEffect } from 'react'
import request from '../api/request';
import { useStudent } from '../context/StudentProvider';
const Student_Languages = () => {
    const { student } = useStudent();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [islangSelected, setIsLangSelected] = useState(false);
    const [inputValue, setInputValue] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [primaryKey, setPrimaryKey] = useState('');
    const [langFocused, setLangFocused] = useState(false);
    const filteredLanguage = (e) => {
        const currLetter = e.target.value.toLowerCase();
        // console.log(currLetter)
        setInputValue(e.target.value);
        const filter = languages.filter((language) => language.toLowerCase().startsWith(currLetter))
        setFilteredLanguages(filter);
    }
    const addLanguages = async (language) => {
        const langArray = selectedLanguages;
        langArray.push(language)
        // console.log('langArray: ', langArray)
        const res = await request('patch', `/languages/${primaryKey}/`, {
            languages: langArray,
            student
        })
        // console.log("res from add languages", res)
        setSelectedLanguages(res.languages)
        setIsModalOpen(false)
        // setIsLangSelected(true)
    }
    const removeLang = async (elem) => {
        // console.log("primaryKey:", primaryKey);
        const removedElementArray = selectedLanguages.filter((lang) => lang !== elem);
        const res = await request('patch', `/languages/${primaryKey}/`, {
            languages: removedElementArray,
            student
        })
        // console.log("res from removeLang: ", res)
        setSelectedLanguages(res.languages)
        // console.log('removedElementArray', removedElementArray)
    }
    useEffect(() => {
        const student_languages = async () => {
            const res = await request('get', `/languages/`);
            // console.log("res: ", res[0]);
            setSelectedLanguages(res[0].languages)
            setPrimaryKey(res[0].id);
            // console.log("primaryKey:", primaryKey);
        }
        student_languages()
    }, []);

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

    return (
        <>
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw] font-sans">
                    <div className="flex justify-between items-center  ">
                        <h2 className="text-lg font-semibold">Languages</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold">Add</button>
                    </div>
                    <div className='mt-2 flex gap-2 flex-col'>
                        {selectedLanguages && (
                            <div className='flex flex-col gap-2'>
                                {selectedLanguages.map((elem, index) => (
                                    <div
                                        key={index}
                                    >
                                        <p className='flex gap-1 text-lg'>
                                            {elem}
                                            <i
                                                onClick={() => removeLang(elem)}
                                                className="ri-close-circle-line text- text-gray-500"></i>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
            {isModalOpen && (
                <div
                    className="fixed  inset-0 z-[80]  bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <div className="bg-white border shadow-sm rounded-xl w-[60%] h-[50%] overflow-y-auto p-6">
                        <div className='flex justify-end '>
                            <button
                                type="button"
                                className="ml-auto inline-flex justify-center items-center gap-x-2 rounded-full focus:outline-none"
                                onClick={() => {
                                    setIsModalOpen(false)
                                    setIsLangSelected(false)
                                    // setCurrSelectedLanguages('');
                                }
                                }
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
                                <h1 className='text-2xl font-semibold'>Languages known</h1>
                                <p className='text-sm text-[#717b9e]'>Strengthen your resume by letting recruiters know you can communicate in multiple languages</p>
                            </div>

                        </div>

                        <div className='flex flex-col py-10'>
                            <div className='flex flex-col p-2 mt-2 gap-5 w-[98%] '>
                                <h1 className='text-lg font-medium'>Languages</h1>
                                <div className=''>
                                    <input type="text"
                                        className='border-2 w-full p-3 outline-none'
                                        onFocus={() => {
                                            setLangFocused(true)
                                            setFilteredLanguages(languages)
                                        }}
                                        onBlur={() => setTimeout(() => setLangFocused(false), 150)}
                                        placeholder='Search Languages'
                                        value={inputValue}
                                        onChange={(e) => filteredLanguage(e)}
                                    />
                                    {langFocused && (
                                        <ul className='h-22'>
                                            {filteredLanguages.map((language, index) => (
                                                <li
                                                    onClick={() => addLanguages(language)}
                                                    key={index}
                                                    className='text-xl flex gap-1 m-2 hover:bg-slate-100 mt-1'>
                                                    {language}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {/* {islangSelected ? (
                                    <div>
                                        <div className='flex flex-wrap gap-2'>
                                            <p
                                                className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full  text-black  focus:outline-none bg-[#e7e7f1] '>
                                                {currSelectedLanguages}
                                                <i
                                                    onClick={checkOrRemove}
                                                    className="ri-close-large-line cursor-pointer"></i>
                                            </p>
                                        </div>
                                        <h1 className='text-lg font-medium mt-2 mb-1'>Comfortable In</h1>
                                        <div className='comfort flex flex-wrap gap-2 '>
                                            {comfortLevel && (
                                                comfortLevel.map((level, index) => (
                                                    <p
                                                        key={index}
                                                        onClick={() => setIsComfortSelected(level)}
                                                        className={
                                                            isComfortSelected === level
                                                                ? "flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-600 rounded-full text-black focus:outline-none bg-[#e7e7f1]"
                                                                : "flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600 focus:outline-none cursor-pointer"
                                                        }
                                                    >
                                                        {level}
                                                    </p>
                                                ))
                                            )}

                                        </div>
                                    </div>
                                ) : (
                                    <div className=''>
                                        <input type="text"
                                            className='border-2 w-full p-3 outline-none'
                                            onFocus={() => {
                                                setLangFocused(true)
                                                setFilteredLanguages(languages)
                                            }}
                                            onBlur={() => setTimeout(() => setLangFocused(false), 150)}
                                            placeholder='Search Languages'
                                            value={inputValue}
                                            onChange={(e) => filteredLanguage(e)}
                                        />
                                        {langFocused && (
                                            <ul className='h-22'>
                                                {filteredLanguages.map((language, index) => (
                                                    <li
                                                        onClick={() => addLanguages(language)}
                                                        key={index}
                                                        className='text-xl flex gap-1 m-2 hover:bg-slate-100 mt-1'>
                                                        {language}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )} */}


                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='text-[#275df5] font-semibold'>Cancel</button>
                            {islangSelected ? (
                                <button
                                    onClick={addLanguages}
                                    className='bg-[#275df5] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                            ) : (
                                <button
                                    onClick={addLanguages}
                                    className='bg-[#c5c8d1] text-white px-3 py-2 rounded-xl'>Save Changes</button>
                            )}
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Student_Languages