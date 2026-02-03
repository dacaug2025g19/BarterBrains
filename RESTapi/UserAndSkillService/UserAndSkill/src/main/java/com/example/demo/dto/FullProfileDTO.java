package com.example.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FullProfileDTO {
	private Integer uid;
    private String bio;
    private List<TeachSkillResponseDTO> teachSkills;
    private List<String> learnSkillId;
}
