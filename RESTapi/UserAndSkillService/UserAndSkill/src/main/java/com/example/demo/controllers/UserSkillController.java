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
	    /*
	    @PostMapping("/save")
	    public ResponseEntity<?> saveUserSkills(
	            @ModelAttribute UserProfileDTO dto
	    ) {
	    	 String filePath = "";
	    	 System.out.println("UID received: " + dto.getUid());
	    	 if (dto.getCer_url() != null && !dto.getCer_url().isEmpty()) {
	    		 
	    		
	    		 
	    	        String fileName = dto.getCer_url().getOriginalFilename();
	    	        // Save file to local folder or S3, etc.
	    	        Path path = Paths.get("uploads/" + fileName);
	    	        try {
	    	            Files.createDirectories(path.getParent());
	    	            dto.getCer_url().transferTo(path.toFile());
	    	            // Save path or URL to DB
	    	            filePath = path.toString(); // store this in cer_url column
	    	            // pass filePath to service/db
	    	        } catch (IOException e) {
	    	            e.printStackTrace();
	    	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
	    	        }
	    	    }

	        userSkillService.saveUserSkills(dto,filePath);
	        return ResponseEntity.ok("Saved successfully");
	    
	    
	    }*/
	    @PostMapping(value = "/save", consumes = "multipart/form-data")
	    public ResponseEntity<?> saveUserSkills(
	            @ModelAttribute UserProfileDTO dto) {

	        userSkillService.saveUserSkills(dto);
	        return ResponseEntity.ok("Saved successfully");
	    }

	    
}
