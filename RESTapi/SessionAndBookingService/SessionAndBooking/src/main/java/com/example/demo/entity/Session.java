package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "session_table")
@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
