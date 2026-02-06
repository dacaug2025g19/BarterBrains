package com.example.demo.dto;

import java.sql.Date;

import com.example.demo.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
 public class ProfileDTO {
	Integer uid;
	String uname;
	String email;
	String adhar_id;
	Date bdate;
	String phone;
	Integer points;
	String role;	
}
