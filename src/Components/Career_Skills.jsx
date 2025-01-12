import React from 'react'
import Student_Accomplishments from './Student_Accomplishments'
import Student_Career from './Student_Career'
import Student_Certifications from './Student_Certifications'
import Student_Competetive_Exams from './Student_Competetive_Exams'
import Student_Education from './Student_Education'
import Student_Employement from './Student_Employement'
import Student_InternShips from './Student_InternShips'
import Student_Languages from './Student_Languages'
import Student_Profile_Summary from './Student_Profile_Summary'
import Student_Projects from './Student_Projects'
import Student_resume from './Student_resume'
import Student_Skills from './Student_Skills'

const Career_Skills = () => {

    return (
        <div>
            <div className=' flex flex-col gap-5'>
                <Student_Career />
                <Student_Education />
                <Student_Skills />
                <Student_Languages />
                <Student_InternShips />
                <Student_Projects />
                <Student_Profile_Summary />
                <Student_Accomplishments />
                <Student_Competetive_Exams />
                <Student_Employement />
                <Student_Certifications />
                <Student_resume />
                {/* <Skills_Languages />
                <Skills_Languages />
                <Skills_Languages /> */}
                {/* Accompliment */}


            </div>
        </div>
    )
}

export default Career_Skills
