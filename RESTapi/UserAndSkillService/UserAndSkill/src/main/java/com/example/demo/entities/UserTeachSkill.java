package com.example.demo.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_teach_skill")
public class UserTeachSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teid;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "sid")
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(name = "exp_level")
    private ExpLevel expLevel;


    private String cert_url;
}
