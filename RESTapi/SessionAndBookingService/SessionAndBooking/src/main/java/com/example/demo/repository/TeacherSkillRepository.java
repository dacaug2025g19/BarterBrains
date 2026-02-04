package com.example.demo.repository;

import com.example.demo.dto.SkillDTO;
import com.example.demo.entity.TeacherSkill;
import com.example.demo.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeacherSkillRepository extends JpaRepository<TeacherSkill, Integer> {

    @Query("""
        SELECT new com.example.demo.dto.SkillDTO(s.sid, s.sname)
        FROM TeacherSkill ts, Skill s
        WHERE ts.sid = s.sid
        AND ts.uid = :uid
    """)
    List<SkillDTO> findSkillsByTeacherUid(@Param("uid") Integer uid);
}
