package com.example.demo.dto;

import com.example.demo.entities.ExpLevel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeachSkillResponseDTO {
	private String skillName;
    private ExpLevel experienceLevel;
    private String certificateUrl;   // ✅ string path from DB
}
