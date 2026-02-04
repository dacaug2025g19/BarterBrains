package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "skill_table")   // ✅ VERY IMPORTANT
@Getter
@Setter
public class Skill {

    @Id
    @Column(name = "sid")
    private Integer sid;

    @Column(name = "sname")
    private String sname;

}
