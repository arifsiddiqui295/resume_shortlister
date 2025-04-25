import React from "react";
import Line from "../Components/Line";
import XIcon from "@mui/icons-material/X";
import MailIcon from "@mui/icons-material/Mail";

export default function Footer(props) {
    return (
        <>
            <div className="w-full px-8 py-5 md:px-16 md:py-8 border rounded-b  rounded-xl bg-[#2B308B]">
                {/* Header */}
                <div>
                    <div className="flex gap-1 mb-3">
                        {/* Image */}
                        <p className="text-lg">📲</p>
                        <h1 className="text-lg text-white font-semibold">Oriental</h1>
                    </div>
                </div>
                {/* Middle  */}
                <div className="text-white md:mb-8 font-light">
                    <p className="text-xs md:text-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                        accusamus necessitatibus magni repellat <br /> fugit! Eligendi
                        officia architecto quisquam dolor aspernatur!
                    </p>
                </div>
                {/* links  */}
                <div className="flex md:gap-14 md:my-6 my-4 gap-2 md:text-lg font-bold text-white text-xs  md:text-[16px] ">
                    <a href="job" className="hover:underline ">Jobs</a>
                    <a href="job" className="hover:underline">Jobs</a>
                    <a href="application-status" className="whitespace-nowrap hover:underline">
                        For job seekers
                    </a>
                    <a href="recuiter-search" className="hover:underline">For companies</a>
                </div>

                <Line className="border mt-3 mb-3 border-[#D8D8D8] w-full" />

                {/* CopyWrite  */}
                <div className="flex text-white justify-between w-full text-xs font-bold">
                    <div>
                        <p>Copyright2025&copy;.AllRights Reserved</p>
                    </div>
                    <div className="flex gap-2 ">
                        <div className="flex items-center">
                            <XIcon />
                        </div >
                        <div className="text-sm flex items-center">
                            <MailIcon />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
