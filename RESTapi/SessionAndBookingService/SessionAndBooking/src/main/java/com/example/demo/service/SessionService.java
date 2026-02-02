package com.example.demo.service;

import com.example.demo.dto.SessionCreateDTO;
import com.example.demo.entity.BookedSession;
import com.example.demo.entity.Session;
import com.example.demo.repository.BookedSessionRepository;
import com.example.demo.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SessionService {

    private final SessionRepository sessionRepo;
    private final BookedSessionRepository bookedRepo;

    public SessionService(SessionRepository sessionRepo,
                          BookedSessionRepository bookedRepo) {
        this.sessionRepo = sessionRepo;
        this.bookedRepo = bookedRepo;
    }

    /**
     * Create session + booked_session entry
     */
    public void createSession(SessionCreateDTO dto) {

        Session s = new Session();
        s.setTeacherUid(dto.getTeacherUid());
        s.setLearnerUid(dto.getLearnerUid());
        s.setSkillId(dto.getSkillId());
        s.setMode(dto.getMode());
        s.setSDate(dto.getSDate());
        s.setStartTime(dto.getStartTime());
        s.setEndTime(dto.getEndTime());

        Session saved = sessionRepo.save(s);

        BookedSession b = new BookedSession();
        b.setSeid(saved.getSeid());
        b.setLearnerUid(dto.getLearnerUid());
        b.setTeacherConfirm("no");
        b.setLearnerConfirm("no");
        b.setBookingDate(LocalDate.now());
        b.setFeedback("");

        bookedRepo.save(b);
    }
}
