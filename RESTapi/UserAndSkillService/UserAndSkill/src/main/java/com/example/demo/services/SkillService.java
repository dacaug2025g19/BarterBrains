package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Skill;
import com.example.demo.repositories.SkillRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SkillService {

	@Autowired
	private SkillRepository srepo;
	
	public List<Skill> getAllSkill(){
		return srepo.findAll();
	}
}
