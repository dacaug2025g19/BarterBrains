package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserProfileDTO;
import com.example.demo.services.UserSkillService;

@RestController
@RequestMapping("/userskill")
public class UserSkillController {
	 private final UserSkillService userSkillService;

	    public UserSkillController(UserSkillService userSkillService) {
	        this.userSkillService = userSkillService;
	    }

	    @PostMapping("/save")
	    public ResponseEntity<?> saveSkills(
	            @RequestBody UserProfileDTO request) {
//	    	System.out.println(request.getExpLevel());
	        userSkillService.saveUserSkills(request);
	        return ResponseEntity.ok("Skills saved successfully");
	    }
}
