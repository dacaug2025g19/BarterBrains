package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userv;
	
	@GetMapping("/all")
	public List<User> getAll(){
		return userv.getAll();
	}

	@PostMapping("/register")
	public User userRegister(@RequestBody User user) {
		return userv.RegisterUser(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginRequestDTO request) {
	  String token = userv.LoginUser(request.getEmail(), request.getPassword());
	  
	  if(token == null) {
		  return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	  }
	  
	  return ResponseEntity.ok(token);
	}
	
}
