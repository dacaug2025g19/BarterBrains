package com.example.demo.repository;

import com.example.demo.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Integer> {

    @Query("""
        SELECT s
        FROM Session s
        WHERE
          (s.sDate < CURRENT_DATE)
          OR
          (s.sDate = CURRENT_DATE AND s.endTime <= CURRENT_TIME)
    """)
    List<Session> findCompletedSessions();
}
