package com.example.demo.dto;

import java.util.List;

import com.example.demo.entities.ExpLevel;
import com.fasterxml.jackson.annotation.JsonProperty;

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
public class UserProfileDTO {

    private int uid;

    @JsonProperty("about")
    private String bio;

    @JsonProperty("experienceLevel")
    private ExpLevel expLevel;

    @JsonProperty("certificationUrl")
    private String cer_url;

    @JsonProperty("teachSkillId")
    private List<Integer> tseid;

    @JsonProperty("learnSkillId")
    private List<Integer> lsid;
	    
}
