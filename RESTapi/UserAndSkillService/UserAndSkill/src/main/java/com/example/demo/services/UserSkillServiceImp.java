package com.example.demo.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.TeachSkillDTO;
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
public class UserSkillServiceImp implements UserSkillService {

    private final UserTeachSkillRepository teachRepo;
    private final UserLearnSkillRepository learnRepo;
    private final UserRepository userRepo;
    private final SkillRepository skillRepo;

    public UserSkillServiceImp(
            UserTeachSkillRepository teachRepo,
            UserLearnSkillRepository learnRepo,
            UserRepository userRepo,
            SkillRepository skillRepo) {

        this.teachRepo = teachRepo;
        this.learnRepo = learnRepo;
        this.userRepo = userRepo;
        this.skillRepo = skillRepo;
    }

    @Override
    public void saveUserSkills(UserProfileDTO request) {

        System.out.println("UID = " + request.getUid());
        System.out.println("Bio = " + request.getBio());

        User user = userRepo.findById(request.getUid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ SAVE BIO (ONCE)
        user.setBio(request.getBio());
        userRepo.save(user);

        // 🔥 OPTIONAL: clear old skills before re-saving (recommended)
//        teachRepo.deleteByUser(user);
//        learnRepo.deleteByUser(user);

        // =========================
        // ✅ SAVE TEACH SKILLS
        // =========================
        if (request.getTeachSkills() != null) {
            for (TeachSkillDTO ts : request.getTeachSkills()) {

                Skill skill = skillRepo.findById(ts.getSkillId())
                        .orElseThrow(() -> new RuntimeException("Skill not found"));

                UserTeachSkill teach = new UserTeachSkill();
                teach.setUser(user);
                teach.setSkill(skill);
                teach.setExpLevel(ts.getExperienceLevel());

                // ✅ save certificate PER SKILL
                String certPath = saveCertificate(ts.getCertificate());
                teach.setCert_url(certPath);

                teachRepo.save(teach);
            }
        }

        // =========================
        // ✅ SAVE LEARN SKILLS
        // =========================
        if (request.getLearnSkillId() != null) {
            for (Integer sid : request.getLearnSkillId()) {

                Skill skill = skillRepo.findById(sid)
                        .orElseThrow(() -> new RuntimeException("Skill not found"));

                UserLearnSkill learn = new UserLearnSkill();
                learn.setUser(user);
                learn.setSkill(skill);

                learnRepo.save(learn);
            }
        }
    }

    // =========================
    // ✅ FILE SAVE METHOD
    // =========================
    private static final String UPLOAD_DIR =
            "D:/BarterBrains Project/BarterBrains/RESTapi/UserAndSkillService/UserAndSkill/uploads/certificate/";

    private String saveCertificate(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            // ensure directory exists
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);

            file.transferTo(filePath.toFile());

            // store relative path in DB
            return "uploads/certificate/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Certificate upload failed", e);
        }
    }


}
