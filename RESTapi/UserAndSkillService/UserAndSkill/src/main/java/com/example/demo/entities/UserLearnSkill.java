package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_learn_skill")
public class UserLearnSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lid;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "sid")
    private Skill skill;
}
