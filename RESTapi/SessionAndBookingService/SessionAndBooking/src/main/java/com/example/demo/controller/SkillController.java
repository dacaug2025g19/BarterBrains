package com.example.demo.controller;

import com.example.demo.dto.SkillDTO;
import com.example.demo.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping("/teacher/{id}")
    public List<SkillDTO> getSkills(@PathVariable Integer id) {
        System.out.println("HIT /skills/teacher/" + id); // 🔴 ADD THIS
        return skillService.getTeacherSkills(id);
    }
}
