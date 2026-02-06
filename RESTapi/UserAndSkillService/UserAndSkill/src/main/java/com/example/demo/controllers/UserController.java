package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ClickedUserProfileDTO;
import com.example.demo.dto.FullProfileDTO;
import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.dto.MatchDTO;
import com.example.demo.dto.NotificationDTO;
import com.example.demo.dto.ProfileDTO;
import com.example.demo.dto.RequestDTO;
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
	public void userRegister(@RequestBody User user) {
		 userv.RegisterUser(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginRequestDTO request) {
	  ProfileDTO profile = userv.LoginUser(request.getEmail(), request.getPassword());
	  System.out.println("Login attempt: " + request.getEmail());

	  if(profile == null) {
		  return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	  }
	  
	  return ResponseEntity.ok(profile);
	}
	
	@GetMapping("/match")
	public List<MatchDTO> findMatches(@RequestParam(required = false) Integer teachSkillId,@RequestParam Integer learnSkillId){
		
		if(learnSkillId == null) {
			throw new RuntimeException("learnSkillId is required");
		}
	    return userv.findMatchUser(teachSkillId, learnSkillId);
	}
	

	@GetMapping("/sendprofile")
	public ClickedUserProfileDTO UserProfile(@RequestParam int uid) {
	   return userv.UserProfile(uid);
	}

	@PostMapping("/sendrequest")
	public void UserProfile(@RequestBody RequestDTO request) {
		    userv.requestSave(request);
		}
	
	@GetMapping("/checkRequest")
	public boolean checkRequest(@RequestParam int senderId,
	                            @RequestParam int receiverId) {

	   return userv.checkRequest(senderId,receiverId);
	}

	
	@GetMapping("/notifications")
	public List<NotificationDTO> DisplayNotifications(@RequestParam int uid) {
		return userv.DisplayNotifications(uid);
	}
	
	@GetMapping("/acceptrequest")
	public void AcceptRequest(@RequestParam int request_id) {
		userv.AcceptStatus(request_id);
	}
	
	@GetMapping("/rejectrequest")
	public void RejectRequest(@RequestParam int request_id) {
		userv.RejectStatus(request_id);
	}
	
	@GetMapping("/profile/{uid}")
	public FullProfileDTO getProfile(@PathVariable Integer uid){
	    return userv.getFullProfile(uid);
	}

}
