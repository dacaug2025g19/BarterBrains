package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ConfirmationDTO {

    private Integer bsid;
    private Integer seid;
    private Integer teacherUid;
    private Integer learnerUid;
    private String tName;
    private String lName;
    private String mode;
    private LocalDate sDate;
    private LocalTime endTime;
    private String teacherConfirm;
    private String learnerConfirm;

    public ConfirmationDTO(
            Integer bsid,
            Integer seid,
            Integer teacherUid,
            Integer learnerUid,
            String tName,
            String lName,
            String mode,
            LocalDate sDate,
            LocalTime endTime,
            String teacherConfirm,
            String learnerConfirm
    ) {
        this.bsid = bsid;
        this.seid = seid;
        this.teacherUid = teacherUid;
        this.learnerUid = learnerUid;
        this.tName = tName;          // 🔥 MISSING
        this.lName = lName;          // 🔥 MISSING
        this.mode = mode;
        this.sDate = sDate;
        this.endTime = endTime;
        this.teacherConfirm = teacherConfirm;
        this.learnerConfirm = learnerConfirm;
    }

    public Integer getBsid() { return bsid; }
    public Integer getSeid() { return seid; }
    public Integer getTeacherUid() { return teacherUid; }
    public Integer getLearnerUid() { return learnerUid; }
    public String getTName() { return tName; }     // 🔥 REQUIRED
    public String getLName() { return lName; }     // 🔥 REQUIRED
    public String getMode() { return mode; }
    public LocalDate getsDate() { return sDate; }
    public LocalTime getEndTime() { return endTime; }
    public String getTeacherConfirm() { return teacherConfirm; }
    public String getLearnerConfirm() { return learnerConfirm; }
}
