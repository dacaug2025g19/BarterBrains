import React, { useEffect } from "react";
import { useState } from "react";
import { getAllSkills, getMatchedUsers } from "../api/authApi"
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/SkillSearch.css";

const SkillSearch = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [teachSkill, setTeachSkill] = useState("");
    const [learnSkill, setLearnSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);

    const navigate = useNavigate();

    const uid = useSelector((state)=>state.auth.user?.uid);

    const toggleFilter = () => {
        setShowFilters(!showFilters);
    }
    useEffect(() => {
        fetchSkills();
    }, [])

    const fetchSkills = async () => {
        // API call to fetch skills from backend
        try {
            const res = await getAllSkills();
            setSkills(res.data);
            console.log("Fetched skills:", res.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    }

    const ShowMatchedUsers = async () => {
        // Logic to show matches based on selected skills
        if (!learnSkill) {
            alert("Please select skill you want to learn");
            return;
        }

        console.log("Finding matches for Teach Skill ID:", teachSkill, "and Learn Skill ID:", learnSkill);
        const res = await getMatchedUsers(teachSkill, learnSkill);
        setMatchedUsers(res.data);
        console.log("Matched Users:", res.data);
    }

    const filteredLearnSkills = skills.filter(skill => skill.sid !== Number(teachSkill));

    const filteredTeachSkills = skills.filter(skill => skill.sid !== Number(learnSkill));

    const filteredMatchedUsers = matchedUsers.filter(user =>  user.uid !== Number(uid));

    const reset = () => {
        // Reset filters
        setTeachSkill("");
        setLearnSkill("");
    }

    return (
        <>
            <UserNavbar />
            <div className="d-flex user-layout">

                <UserSidebar />
                <div className="skillsearch-container">

                    <h2>Skill Search Page</h2>
                    <p>Connect with people who want to share their skills and learn from you.</p>

                    <div className="mb-3">
                        <button className="btn btn-primary me-2" onClick={toggleFilter}>
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </button>
                    </div>
                    {showFilters && (<div className="filter-card">
                        <div className="mb-3">
                            <label className="form-label">Select Skill to Teach</label>
                            <select className="form-select" value={teachSkill} onChange={(e) => setTeachSkill(e.target.value)}>
                                <option value="">Select Skill to teach</option>
                                {
                                    filteredTeachSkills.map((skill) => (<option key={skill.sid} value={skill.sid}>
                                        {skill.sname} ({skill.category.cname})
                                    </option>))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Select Skill to Learn</label>
                            <select className="form-select" value={learnSkill} onChange={(e) => setLearnSkill(e.target.value)}>
                                <option value="">Select Skill to learn</option>
                                {
                                    filteredLearnSkills.map((skill) => (<option key={skill.sid} value={skill.sid}>
                                        {skill.sname} ({skill.category.cname})
                                    </option>))
                                }
                            </select>
                        </div>
                        <button className="btn btn-success mt-3 me-2" onClick={reset}>Reset</button>
                        <button className="btn btn-success mt-3" onClick={ShowMatchedUsers}>Apply Filters</button>
                    </div>
                    )}

                    <div className="mt-4">
                        {matchedUsers.length === 0 ? (
                            <p>No matched users found.</p>
                        ) : (
                            <div className="card-grid">
                                {filteredMatchedUsers.map((user) => (
                                    <div key={`${user.uid}`}
                                    >
                                        <div className="match-card h-100">

                                            <h5 className="card-title">{user.uname}</h5>
                                            <p className="text-muted" >{user.email}</p>
                                            
                                            <hr />

                                            <p>
                                                <strong>Can Teach:</strong><br />
                                                {user.teachSkillName?.length > 0 ? user.teachSkillName.join(", ") : "N/A"}
                                            </p>

                                            <p>
                                                <strong>Wants To Learn:</strong><br />
                                                {user.learnSkillName?.length > 0 ? user.learnSkillName.join(", ") : "N/A"}
                                            </p>


                                            <button onClick={()=> navigate(`/profile/${user.uid}`)} className="view-btn mt-3">
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}

export default SkillSearch;