import React, { useState } from 'react';

const DropdownMenu = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="bg-transparent border border-gray-300 text-white py-2 px-4 rounded-full flex items-center space-x-2"
            >
                <span>{title}</span>
                <svg
                    className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="absolute bg-white text-black border border-gray-300 rounded-md mt-2 w-full">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Job_Collection = () => {
    const dropdownItems = [
        'Option 1',
        'Option 2',
        'Option 3',
    ];

    return (
        <div className='flex items-center justify-center gap-2'>
            <div className="py-10 w-3/4 flex gap-5 justify-center items-center rounded-lg bg-[#2B308B] ">
                <DropdownMenu title="Job Collections" items={dropdownItems} />
                <DropdownMenu title="Remote Jobs" items={dropdownItems} />
                <DropdownMenu title="Jobs by Location" items={dropdownItems} />
                <DropdownMenu title="Jobs by Role" items={dropdownItems} />
                <DropdownMenu title="Jobs by Role & Location" items={dropdownItems} />
            </div>
        </div>
    );
};

export default Job_Collection;
