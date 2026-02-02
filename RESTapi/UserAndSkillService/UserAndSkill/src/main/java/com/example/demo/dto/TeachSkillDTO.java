package com.example.demo.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.ExpLevel;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TeachSkillDTO {

	 private int skillId;
	 
	 @Enumerated(EnumType.STRING)
	 @Column(name = "exp_level")
	    private ExpLevel experienceLevel;
	    
	    private MultipartFile certificate;
}
