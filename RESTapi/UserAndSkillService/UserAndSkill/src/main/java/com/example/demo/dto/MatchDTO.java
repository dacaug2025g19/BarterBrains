package com.example.demo.dto;

import java.util.List;

import com.example.demo.entities.ExpLevel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class MatchDTO {

	Integer uid;
	String uname;
	String email;

	List<String> teachSkillName;
	List<String> learnSkillName;
	public MatchDTO(Integer uid, String uname, String email, List<String> teachSkillName,
			List<String> learnSkillName) {

		this.uid = uid;
		this.uname = uname;
		this.email = email;
		this.teachSkillName = teachSkillName;
//		this.expLevel = expLevel;
		this.learnSkillName = learnSkillName;
	}
}
