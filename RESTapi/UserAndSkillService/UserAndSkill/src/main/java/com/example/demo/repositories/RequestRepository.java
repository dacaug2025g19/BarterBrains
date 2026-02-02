package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.NotificationDTO;
import com.example.demo.entities.Request;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    
	@Query("""
		    SELECT new com.example.demo.dto.NotificationDTO(
	        rq.request_id,
	        rq.sender.uid,
	        rq.sender.uname,
	        rq.timestamp,
	        rq.status
	    )
	    FROM Request rq
	    WHERE rq.receiver.uid = :uid
	    ORDER BY rq.timestamp DESC
	""")
	
	public List<NotificationDTO> GiveUserNotification(@Param("uid") int uid);
	
	
}


