package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.dto.UserProfileDTO;
import com.example.demo.entities.Skill;
import com.example.demo.entities.User;
import com.example.demo.entities.UserLearnSkill;
import com.example.demo.entities.UserTeachSkill;
import com.example.demo.repositories.SkillRepository;
import com.example.demo.repositories.UserLearnSkillRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.repositories.UserTeachSkillRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserSkillServiceImp implements UserSkillService{
	 private  UserTeachSkillRepository teachRepo;
	    private  UserLearnSkillRepository learnRepo;
	    private  UserRepository userRepo;
	    private  SkillRepository skillRepo;

	  
	    public UserSkillServiceImp(UserTeachSkillRepository teachRepo, UserLearnSkillRepository learnRepo,
				UserRepository userRepo, SkillRepository skillRepo) {
			super();
			this.teachRepo = teachRepo;
			this.learnRepo = learnRepo;
			this.userRepo = userRepo;
			this.skillRepo = skillRepo;
		}


		@Override
	    public void saveUserSkills(UserProfileDTO request) {

	        User user = userRepo.findById(request.getUid())
	                .orElseThrow(() -> new RuntimeException("User not found"));

	    

	        // 2️⃣ SAVE TEACH SKILLS
	        if (request.getTseid() != null) {
	            for (int sid : request.getTseid()) {

	                Skill skill = skillRepo.findById(sid)
	                        .orElseThrow(() -> new RuntimeException("Skill not found"));

	                UserTeachSkill teach = new UserTeachSkill();
	                teach.setUser(user);
	                teach.setSkill(skill);
	                teach.setExpLevel(request.getExpLevel());
	                teach.setCert_url(request.getCer_url());
	               

	                teachRepo.save(teach);
	            }
	        }

	        // 3️⃣ SAVE LEARN SKILLS
	        if (request.getLsid() != null) {
	            for (int sid : request.getLsid()) {

	                Skill skill = skillRepo.findById(sid)
	                        .orElseThrow(() -> new RuntimeException("Skill not found"));

	                UserLearnSkill learn = new UserLearnSkill();
	                learn.setUser(user);
	                learn.setSkill(skill);

	                learnRepo.save(learn);
	            }
	        }
	    }
}
