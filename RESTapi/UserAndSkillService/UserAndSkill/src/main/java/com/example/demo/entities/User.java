package com.example.demo.entities;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="user_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	  Integer uid;
	  String uname;
	  String password;
	  String email;
	  String phone;
	  Date bdate;
	  String adhar_id;
	  String bio;
	  @ManyToOne
	  @JoinColumn(name="rid")
	  Role role;
	  
	  @OneToMany(mappedBy = "user")
	  private List<UserTeachSkill> teachSkills;
	  
	  @OneToMany(mappedBy = "user")
	  private List<UserLearnSkill> learnSkills;
	  
	 

}
