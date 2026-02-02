package com.example.demo.service;

import com.example.demo.dto.SkillDTO;
import com.example.demo.repository.UserSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final UserSkillRepository repo;

    public SkillService(UserSkillRepository repo) {
        this.repo = repo;
    }

    public List<SkillDTO> getTeacherSkills(Integer teacherId) {
        return repo.findSkillsByTeacher(teacherId);
    }
}
