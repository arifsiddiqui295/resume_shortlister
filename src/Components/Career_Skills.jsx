import React from 'react'
import Education_Career from './Education_Career'
import Skills_Languages from './Skills_Languages'

const Career_Skills = () => {
    return (
        <div>
            <div className=' flex flex-col gap-5'>
                <Education_Career />
                <Education_Career />
                <Skills_Languages />
                <Skills_Languages />
                <Skills_Languages />
                <Skills_Languages />
                <Skills_Languages />
                {/* Accompliment */}
                <Skills_Languages />
                <Skills_Languages />
                <Skills_Languages />

            </div>
        </div>
    )
}

export default Career_Skills