package com.example.demo.service;

import com.example.demo.dto.ConfirmationDTO;
import com.example.demo.dto.SessionConfirmDTO;
import com.example.demo.entity.BookedSession;
import com.example.demo.entity.Session;
import com.example.demo.repository.BookedSessionRepository;
import com.example.demo.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConfirmationService {

    private final BookedSessionRepository bookedRepo;
    private final SessionRepository sessionRepo;
    private final PointTransactionService pts;

    public ConfirmationService(
            BookedSessionRepository bookedRepo,
            SessionRepository sessionRepo,
            PointTransactionService pts
    ) {
        this.bookedRepo = bookedRepo;
        this.sessionRepo = sessionRepo;
        this.pts = pts;
    }

    // ✅ FETCH COMPLETED SESSIONS FOR CONFIRMATION PAGE
    public List<ConfirmationDTO> getCompletedSessions(Integer uid) {

//        List<Session> completedSessions = sessionRepo.findCompletedSessions();
//        List<ConfirmationDTO> result = new ArrayList<>();
//
//        for (Session s : completedSessions) {
//
//            BookedSession b = bookedRepo.findBySeid(s.getSeid()).orElse(null);
//            if (b == null) continue;
//
//            // show only sessions where user is teacher or learner
//            if (!uid.equals(s.getTeacherUid()) && !uid.equals(b.getLearnerUid())) {
//                continue;
//            }
//
//            ConfirmationDTO dto = new ConfirmationDTO(
//                    b.getBsid(),
//                    s.getSeid(),
//                    s.getTeacherUid(),
//                    b.getLearnerUid(),
//                    s.getMode(),
//                    s.getSDate(),
//                    s.getEndTime(),
//                    b.getTeacherConfirm(),
//                    b.getLearnerConfirm()
//            );
//
//            result.add(dto);
//        }
//
//        return result;
    	return sessionRepo.findCompletedSessionsWithNames()
                .stream()
                .filter(dto ->
                        uid.equals(dto.getTeacherUid())
                     || uid.equals(dto.getLearnerUid())
                )
                .toList();
    	
    }

    // ✅ CONFIRM SESSION (YOUR EXISTING LOGIC – UNCHANGED)
    public void confirm(SessionConfirmDTO dto) {

        BookedSession b = bookedRepo.findById(dto.getBsid()).orElseThrow();

        if ("teacher".equalsIgnoreCase(dto.getRole())) {
            b.setTeacherConfirm("yes");
        } else {
            b.setLearnerConfirm("yes");
            b.setFeedback(dto.getFeedback());
            
//         // 🔥 SAVE FEEDBACK ONLY FROM LEARNER
//            if (dto.getFeedback() != null && !dto.getFeedback().isBlank()) {
//            }
        }

        bookedRepo.save(b);

        if (!"yes".equals(b.getTeacherConfirm()) ||
            !"yes".equals(b.getLearnerConfirm())) {
            return;
        }

        Session s = sessionRepo.findById(b.getSeid()).orElseThrow();
        int points = 20;

        if ("learn".equalsIgnoreCase(s.getMode())) {

            pts.transact(b.getLearnerUid(), s.getSeid(), b.getBsid(), -points, "learner");
            pts.transact(s.getTeacherUid(), s.getSeid(), b.getBsid(), points, "teacher");

        } else { // swap

            pts.transact(s.getTeacherUid(), s.getSeid(), b.getBsid(), points, "swap");
            pts.transact(b.getLearnerUid(), s.getSeid(), b.getBsid(), points, "swap");
        }
    }
}
