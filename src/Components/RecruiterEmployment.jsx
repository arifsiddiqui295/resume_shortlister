import React, { useState } from 'react';

const RecruiterEmployment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterOption, setFilterOption] = useState('all'); // 'all', 'unplaced', 'placed'
    const [packageLimit, setPackageLimit] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md w-[60vw]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Employment</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#275DF5] text-md font-semibold"
                        >
                            Add
                        </button>
                    </div>
                    <div className='mt-2'>
                        <p>Criteria: 
                            {filterOption === 'all' && ' All Students Allowed'}
                            {filterOption === 'unplaced' && ' Only Unplaced Students'}
                            {filterOption === 'placed' && ` Placed Students with ≥ ${packageLimit} LPA`}
                        </p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white border shadow-sm rounded-xl w-[70%] h-[40%] overflow-y-auto p-6">
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

                        <div className="py-3 px-4 border-b">
                            <h1 className='text-2xl font-semibold'>Employment Filter Options</h1>
                        </div>

                        <div className="mt-4 space-y-3">
                            <label className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='employmentFilter'
                                    value='all'
                                    checked={filterOption === 'all'}
                                    onChange={() => setFilterOption('all')}
                                />
                                Allow all students
                            </label>

                            <label className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='employmentFilter'
                                    value='unplaced'
                                    checked={filterOption === 'unplaced'}
                                    onChange={() => setFilterOption('unplaced')}
                                />
                                Allow only unplaced students
                            </label>

                            <label className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='employmentFilter'
                                    value='placed'
                                    checked={filterOption === 'placed'}
                                    onChange={() => setFilterOption('placed')}
                                />
                                Allow students placed with a certain package (≥ specified LPA)
                            </label>

                            {filterOption === 'placed' && (
                                <input
                                    type='number'
                                    className='border rounded p-2 w-full mt-2'
                                    placeholder='Enter minimum package (LPA)'
                                    value={packageLimit}
                                    onChange={(e) => setPackageLimit(e.target.value)}
                                />
                            )}
                        </div>

                        <div className='flex justify-end gap-2 mt-4'>
                            <button onClick={closeModal} className='bg-[#275DF5] text-white px-3 py-2 rounded-xl'>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecruiterEmployment;
