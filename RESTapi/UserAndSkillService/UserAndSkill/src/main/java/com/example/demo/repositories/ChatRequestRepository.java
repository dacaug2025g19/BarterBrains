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
            r.sender.uid,
            r.sender.uname
        )
        FROM Request r
        WHERE r.receiver.uid = :receiverId
          AND r.status = com.example.demo.entities.RequestStatus.ACCEPTED
    """)
    List<SenderDTO> findAcceptedSenderDTOs(
        @Param("receiverId") Integer receiverId
    );
}
