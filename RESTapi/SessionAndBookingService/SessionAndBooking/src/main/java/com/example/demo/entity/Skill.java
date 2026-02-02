package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skill_table")   // ✅ VERY IMPORTANT
public class Skill {

    @Id
    @Column(name = "sid")
    private Integer sid;

    @Column(name = "sname")
    private String sname;

    // getters
    public Integer getSid() {
        return sid;
    }

    public String getSname() {
        return sname;
    }
}
