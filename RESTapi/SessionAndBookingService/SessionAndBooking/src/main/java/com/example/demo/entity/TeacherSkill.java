package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_teach_skill")
@Data
public class TeacherSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer teid;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "sid")
    private Integer sid;

    @Column(name = "exp_level")
    private String expLevel;

    @Column(name = "cert_url")
    private String certUrl;
}
