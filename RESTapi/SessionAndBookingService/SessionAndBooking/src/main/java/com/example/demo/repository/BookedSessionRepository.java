package com.example.demo.repository;

import com.example.demo.entity.BookedSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookedSessionRepository extends JpaRepository<BookedSession, Integer> {

    Optional<BookedSession> findBySeid(Integer seid);
}
