package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.ClickedUserProfileDTO;
import com.example.demo.dto.MatchDTO;
import com.example.demo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByEmail(String email);

//	@Query(value = "SELECT DISTINCT u.* " +
//	        "FROM user_table u " +
//	        "JOIN user_teach_skill uts ON u.uid = uts.uid " +
//	        "LEFT JOIN user_learn_skill uls ON u.uid = uls.uid " +
//	        "WHERE uts.sid = :learnSkillId " +
//	        "AND ( :teachSkillId IS NULL OR uls.sid = :teachSkillId )",
//	        nativeQuery = true)

	@Query("""
			SELECT u.uid, u.uname, u.email,
			       ts.skill.sname,
			       ls.skill.sname
			FROM UserTeachSkill ts
			JOIN ts.user u
			JOIN UserLearnSkill ls ON ls.user = u
			WHERE ts.skill.sid = :learnSkillId
			AND (:teachSkillId IS NULL OR ls.skill.sid = :teachSkillId)
			""")

	public List<Object[]> findMatchUser(@Param("teachSkillId") Integer teachSkillId,
			@Param("learnSkillId") Integer learnSkillId);

	@Query("""
			 SELECT u.uid, u.uname, u.email, u.phone,
			 ts.skill.sname, ts.expLevel, ts.cert_url, u.bio,
			 ls.skill.sname
			 FROM UserTeachSkill ts
			 JOIN ts.user u
			 JOIN UserLearnSkill ls ON ls.user = u
			 WHERE u.uid = :uid
		   """)
	public List<Object[]> findByUid(@Param("uid") Integer uid);

}
