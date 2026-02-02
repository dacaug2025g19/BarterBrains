package com.example.demo.repository;

import com.example.demo.dto.SkillDTO;
import com.example.demo.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserSkillRepository extends JpaRepository<UserSkill, Integer> {

    @Query("""
        SELECT new com.example.demo.dto.SkillDTO(s.sid, s.sname)
        FROM UserSkill us, Skill s
        WHERE us.sid = s.sid
        AND us.uid = :teacherId
    """)
    List<SkillDTO> findSkillsByTeacher(@Param("teacherId") Integer teacherId);
}
