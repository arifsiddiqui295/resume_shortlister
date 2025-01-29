import React from 'react'
import RecruiterAccomplishments from './RecruiterAccomplishments'
import RecruiterCertifications from './RecruiterCertifications'
import RecruiterEducation from './RecruiterEducation'
import RecruiterEmployment from './RecruiterEmployment'
import RecruiterInternships from './RecruiterInternships'
import RecuiterCareer from './RecuiterCareer'
import Student_Accomplishments from './Student_Accomplishments'
import Student_Employement from './Student_Employement'
import Student_Languages from './Student_Languages'
import Student_resume from './Student_resume'
import Student_Skills from './Student_Skills'

const RecruiterCareerSkills = () => {

    return (
        <div>
            <div className=' flex flex-col gap-5'>
                <RecuiterCareer />
                <RecruiterEducation />
                <Student_Skills />
                <Student_Languages />
                <RecruiterInternships />
                <RecruiterAccomplishments />
                <RecruiterEmployment />
                <RecruiterCertifications />
                <div className='flex w-full items-center justify-center'>
                    <button
                        className="mt-4 bg-blue-500 text-white px-6 text-xl py-3 rounded-md hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
                {/* <Skills_Languages />
                <Skills_Languages />
                <Skills_Languages /> */}
                {/* Accompliment */}
            </div>
        </div>
    )
}

export default RecruiterCareerSkills
