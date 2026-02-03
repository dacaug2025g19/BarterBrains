package com.example.demo.repository;

import com.example.demo.dto.ConfirmationDTO;
import com.example.demo.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Integer> {

	@Query("""
		    SELECT new com.example.demo.dto.ConfirmationDTO(
		        bs.bsid,
		        s.seid,
		        t.uid,
		        l.uid,
		        t.uname,
		        l.uname,
		        s.mode,
		        s.sDate,
		        s.endTime,
		        bs.teacherConfirm,
		        bs.learnerConfirm
		    )
		    FROM Session s
		    JOIN BookedSession bs ON bs.seid = s.seid
		    JOIN User t ON t.uid = s.teacherUid
		    JOIN User l ON l.uid = bs.learnerUid
		    WHERE
		      (s.sDate < CURRENT_DATE)
		      OR
		      (s.sDate = CURRENT_DATE AND s.endTime <= CURRENT_TIME)
		""")
		List<ConfirmationDTO> findCompletedSessionsWithNames();

}
