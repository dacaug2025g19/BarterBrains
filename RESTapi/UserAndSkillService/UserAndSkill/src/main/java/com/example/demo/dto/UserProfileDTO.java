package com.example.demo.dto;

import java.util.List;

import com.example.demo.entities.ExpLevel;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {

    private Integer uid;          // ✅ Integer, not int

    private String bio;           // ✅ no JsonProperty

    private List<TeachSkillDTO> teachSkills;  // ✅ exact match

    private List<Integer> learnSkillId;   // ✅ exact match
}
