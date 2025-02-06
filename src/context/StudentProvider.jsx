import { createContext, useContext, useState, useEffect } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {
    const [student, setStudent] = useState(() => {
        return localStorage.getItem("studentEnrollment") || "";
    });

    // Save to localStorage whenever student changes
    useEffect(() => {
        if (student) {
            localStorage.setItem("studentEnrollment", student);
        }
    }, [student]);

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudent() {
    return useContext(StudentContext);
}
