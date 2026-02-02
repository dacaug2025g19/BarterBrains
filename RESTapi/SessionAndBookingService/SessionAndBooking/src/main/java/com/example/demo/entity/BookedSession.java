package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "booked_session")
public class BookedSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bsid;

    private Integer seid;
    private Integer learnerUid;

    @Column(name = "teacher_confirm")
    private String teacherConfirm;

    @Column(name = "learner_confirm")
    private String learnerConfirm;

    private LocalDate bookingDate;
    private String feedback;

    // getters & setters
    public String getTeacherConfirm() {
        return teacherConfirm;
    }

    public void setTeacherConfirm(String teacherConfirm) {
        this.teacherConfirm = teacherConfirm;
    }

    public String getLearnerConfirm() {
        return learnerConfirm;
    }

    public void setLearnerConfirm(String learnerConfirm) {
        this.learnerConfirm = learnerConfirm;
    }

    public Integer getSeid() {
        return seid;
    }
}

