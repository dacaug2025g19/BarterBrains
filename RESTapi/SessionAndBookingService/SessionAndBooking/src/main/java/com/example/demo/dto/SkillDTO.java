package com.example.demo.dto;

public class SkillDTO {

    private Integer sid;
    private String sname;

    public SkillDTO(Integer sid, String sname) {
        this.sid = sid;
        this.sname = sname;
    }

    public Integer getSid() {
        return sid;
    }

    public String getSname() {
        return sname;
    }
}
