package com.example.demo.dto;

public class SessionConfirmDTO {

    private Integer bsid;
    private String role;      // teacher / learner
    private String feedback;  // 🔥 NEW

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
}
