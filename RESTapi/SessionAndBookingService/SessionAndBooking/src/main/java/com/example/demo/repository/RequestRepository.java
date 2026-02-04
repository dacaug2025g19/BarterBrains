package com.example.demo.repository;

import com.example.demo.dto.AcceptedRequestDTO;
import com.example.demo.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {

    @Query(
        "SELECT new com.example.demo.dto.AcceptedRequestDTO(" +
        " r.request_id, u.uid, u.uname ) " +
        "FROM Request r " +
        "JOIN User u ON u.uid = r.sender_id " +
        "WHERE r.receiver_id = :teacherId " +
        "AND r.status = 'ACCEPTED'"
    )
    List<AcceptedRequestDTO> findAcceptedRequestsWithLearnerName(
            @Param("teacherId") Integer teacherId
    );
}
