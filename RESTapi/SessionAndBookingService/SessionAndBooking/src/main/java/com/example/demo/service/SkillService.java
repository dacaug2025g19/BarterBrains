package com.example.demo.service;

import com.example.demo.dto.SkillDTO;
import com.example.demo.repository.TeacherSkillRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final TeacherSkillRepository repo;

    public SkillService(TeacherSkillRepository repo) {
        this.repo = repo;
    }

    public List<SkillDTO> getTeacherSkills(Integer teacherId) {
        return repo.findSkillsByTeacherUid(teacherId);
    }
}
