package com.example.demo.dto;

import jakarta.persistence.Column;

public class SessionConfirmDTO {

    private Integer bsid;
    private String role;      // teacher / learner
    private String feedback;  // 🔥 NEW
    
//    @Column(name = "teacher_uid")
//    private Integer teacherUid;
    
    private Integer teacherUid;

    public Integer getBsid() {
        return bsid;
    }

    public void setBsid(Integer bsid) {
        this.bsid = bsid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
    
    public Integer getTeacherUid() {
        return teacherUid;
    }

    public void setTeacherUid(Integer teacherUid) {
        this.teacherUid = teacherUid;
    }
}
