package com.example.demo.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
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
	   
	    @PostMapping(value = "/save", consumes = "multipart/form-data")
	    public ResponseEntity<?> saveUserSkills(
	            @ModelAttribute UserProfileDTO dto) {

	        userSkillService.saveUserSkills(dto);
	        return ResponseEntity.ok("Saved successfully");
	    }

	    
}
