package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    private String uname;
    private String password;
    private String email;
    private String phone;

    @Column(name = "points")   // 🔥 EXPLICIT MAPPING
    private Integer points;

    // ===== GETTERS =====
    public Integer getUid() {
        return uid;
    }

    public Integer getPoints() {
        return points;
    }

    // ===== SETTERS =====
    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}
