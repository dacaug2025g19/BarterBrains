package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProfileDTO;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.security.JWTUtil;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository urepo;
	
	@Autowired
	private RoleRepository rrepo;

	@Autowired
	private JWTUtil jwtutil;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public List<User> getAll(){
		return urepo.findAll();
	}

	//user register
	public User RegisterUser(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		
		Role userRole = rrepo.findByRname("User");
		
		 user.setRole(userRole);
		 
		return urepo.save(user);
	}
	
	//User login
		public ProfileDTO LoginUser(String email,String rawPassword) {
			
			 User user = urepo.findByEmail(email);
			 
			 if(user!=null && encoder.matches(rawPassword,user.getPassword())) {
				 String token = jwtutil.generateToken(email);  //if valid credentials then give jwt token to user
				 
				 ProfileDTO dto = new ProfileDTO();
				 
				 dto.setUname(user.getUname());
				 dto.setAdhar_id(user.getAdhar_id());
			     dto.setBdate(user.getBdate());
			     dto.setPhone(user.getPhone());
			     dto.setRole(user.getRole().getRname());
			     dto.setToken(token);
			     
			     return dto;
			 }
			 return null;  //invalid
		}
}
