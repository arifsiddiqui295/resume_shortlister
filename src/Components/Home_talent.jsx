import React from "react";
import Line from "./Line";
import Section from "./Section";

const Home_talent = () => {
    return (
        <div className="flex justify-between">
            <Section
                className="py-10 px-16 w-1/2"
                heading="Why Ambitious Talent Relies on Us"
                text1="Apply directly to companies and internship opportunities available through on-campus placements."
                text2="Everything you need to know, all upfront. View salary, stock options, and more before applying."
                text3="Say goodbye to cover letters - your profile is all you need. One click to apply and you're done."
                text4="A reliable on-campus MNC known for mass hiring, trusted in the industry."
            />
            <Section
                className="bg-[#F2F4FF] py-10 px-16 w-1/2"
                heading="Why Top Recruiters Rely on Us"
                text1="Tap into a community of 10lakh+ engaged, company ready candidates."
                text2="Everything you need to kickstart your recruiting — set
                up job posts, company branding, and HR tools within 10
                minutes, all for free"
                text3="A free applicant tracking system, or free integration with
                any ATS you may already use."
                text4="Create a company profile to start posting jobs, list openings with clear descriptions and deadlines, browse resumes, filter by skills and experience, and connect directly with candidates."
            />
        </div>
    )
}
export default Home_talent