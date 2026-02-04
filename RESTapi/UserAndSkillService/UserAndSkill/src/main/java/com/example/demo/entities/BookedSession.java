package com.example.demo.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "booked_session")
@Data
public class BookedSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bsid;

    @Column(name = "learner_uid")
    private Integer learnerUid;

    @Column(name = "teacher_uid")
    private Integer teacherUid;

    @Column(name = "feedback")
    private String feedback;

    @Column(name = "booking_date")
    private LocalDate bookingDate;
}

