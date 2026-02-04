package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.FeedbackDTO;
import com.example.demo.entities.BookedSession;

public interface BookedSessionRepository extends JpaRepository<BookedSession, Integer> {

	@Query("""
		    SELECT new com.example.demo.dto.FeedbackDTO(u.uname, b.feedback)
		    FROM BookedSession b
		    JOIN User u ON u.uid = b.learnerUid
		    WHERE b.teacherUid = :uid
		    AND b.feedback IS NOT NULL
		""")
		List<FeedbackDTO> findFeedbacksForTeacher(@Param("uid") Integer uid);

}
