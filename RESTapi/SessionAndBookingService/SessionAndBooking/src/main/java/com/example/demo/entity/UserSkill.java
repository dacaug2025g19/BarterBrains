package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_skill")   // ✅ correct
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "sid")
    private Integer sid;

    public Integer getUid() {
        return uid;
    }

    public Integer getSid() {
        return sid;
    }
}
