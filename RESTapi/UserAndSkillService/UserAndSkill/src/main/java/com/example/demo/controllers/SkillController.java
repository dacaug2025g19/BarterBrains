package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Skill;
import com.example.demo.services.SkillService;

@RestController
@RequestMapping("/skill")
public class SkillController {

	@Autowired
	SkillService sserv;
	
	@GetMapping("/all")
	public List<Skill> getAll(){
		return sserv.getAllSkill();
	}
}
