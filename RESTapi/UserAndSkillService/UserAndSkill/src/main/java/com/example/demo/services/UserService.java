package com.example.demo.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ClickedUserProfileDTO;
import com.example.demo.dto.MatchDTO;
import com.example.demo.dto.ProfileDTO;
import com.example.demo.entities.ExpLevel;
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
				 dto.setUid(user.getUid());
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
		
		public List<MatchDTO> findMatchUser(Integer teachSkillId,Integer learnSkillId) {
			List<Object[]> rows = urepo.findMatchUser(teachSkillId, learnSkillId);
			
			Map<Integer, MatchDTO> map = new HashMap<>();
			
			for(Object[] r : rows) {
				 Integer uid = (Integer) r[0];
			        String uname = (String) r[1];
			        String email = (String) r[2];
			        String teachSkill = (String) r[3];
			        String learnSkill = (String) r[4];
			        
			        if(!map.containsKey(uid)) {
			        	MatchDTO dto = new MatchDTO();
			        	
			        	dto.setUid(uid);
			        	dto.setUname(uname);
			        	dto.setEmail(email);
			        	dto.setTeachSkillName(new ArrayList<>());
			        	dto.setLearnSkillName(new ArrayList<>());
			        	map.put(uid, dto);
			        }
			        
			        if(!map.get(uid).getTeachSkillName().contains(teachSkill) && teachSkill != null) {
			            map.get(uid).getTeachSkillName().add(teachSkill);
			        }

			        if(!map.get(uid).getLearnSkillName().contains(learnSkill) && learnSkill != null) {
			            map.get(uid).getLearnSkillName().add(learnSkill);
			        }
			}
			return new ArrayList<>(map.values());
		}
		
		
	public ClickedUserProfileDTO UserProfile(int id) {
		List<Object[]> rows = urepo.findByUid(id);
		
		
		ClickedUserProfileDTO dto = 	new ClickedUserProfileDTO();
		Set<String> teachSet = new HashSet<>();
		Set<String> learnSet = new HashSet<>();
		
		
		for(Object[] r : rows) {
			dto.setUid((Integer) r[0]);
	        dto.setUname((String) r[1]);
	        dto.setEmail((String) r[2]);
	        dto.setPhone((String) r[3]);
	        dto.setBio((String) r[7]);
	        dto.setCert_url((String)r[6]);
	        
	        ExpLevel level = (ExpLevel)r[5];
	        dto.setExp_level(level.name());

	        teachSet.add((String) r[4]);
	        learnSet.add((String) r[8]);
		}
		
		   dto.setTeachSkills(new ArrayList<>(teachSet));
		    dto.setLearnSkills(new ArrayList<>(learnSet));
		    return dto;
	}
	
}
