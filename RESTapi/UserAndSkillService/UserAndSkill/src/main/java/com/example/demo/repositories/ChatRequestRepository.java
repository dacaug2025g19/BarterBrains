package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.SenderDTO;
import com.example.demo.entities.Request;
import com.example.demo.entities.RequestStatus;

public interface ChatRequestRepository extends JpaRepository<Request, Integer> {

	@Query("""
		    SELECT new com.example.demo.dto.SenderDTO(
		        CASE
		            WHEN r.sender.uid = :uid THEN r.receiver.uid
		            ELSE r.sender.uid
		        END,
		        CASE
		            WHEN r.sender.uid = :uid THEN r.receiver.uname
		            ELSE r.sender.uname
		        END
		    )
		    FROM Request r
		    WHERE r.status = com.example.demo.entities.RequestStatus.ACCEPTED
		      AND (r.sender.uid = :uid OR r.receiver.uid = :uid)
		""")
		List<SenderDTO> findAcceptedChats(@Param("uid") Integer uid);

}
