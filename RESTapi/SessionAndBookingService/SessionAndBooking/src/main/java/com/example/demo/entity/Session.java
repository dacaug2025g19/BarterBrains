package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "session_table")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seid;

    @Column(name = "teacher_uid")
    private Integer teacherUid;

    @Column(name = "learner_uid")
    private Integer learnerUid;

    @Column(name = "skill_id")
    private Integer skillId;

    private String mode;

    @Column(name = "s_date")
    private LocalDate sDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    // =====================
    // GETTERS
    // =====================

    public Integer getSeid() {
        return seid;
    }

    public Integer getTeacherUid() {
        return teacherUid;
    }

    public Integer getLearnerUid() {
        return learnerUid;
    }

    public Integer getSkillId() {
        return skillId;
    }

    public String getMode() {
        return mode;
    }

    public LocalDate getSDate() {
        return sDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    // =====================
    // SETTERS (REQUIRED)
    // =====================

    public void setTeacherUid(Integer teacherUid) {
        this.teacherUid = teacherUid;
    }

    public void setLearnerUid(Integer learnerUid) {
        this.learnerUid = learnerUid;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public void setSDate(LocalDate sDate) {
        this.sDate = sDate;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
