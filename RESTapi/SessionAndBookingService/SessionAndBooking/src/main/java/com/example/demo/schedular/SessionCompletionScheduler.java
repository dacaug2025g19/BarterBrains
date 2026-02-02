//package com.example.demo.schedular;
//
//import java.util.List;
//
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import com.example.demo.entity.BookedSession;
//import com.example.demo.entity.Session;
//import com.example.demo.repository.BookedSessionRepository;
//import com.example.demo.repository.SessionRepository;
//
//@Component
//@EnableScheduling
//public class SessionCompletionScheduler {
//
//    private final SessionRepository sessionRepo;
//    private final BookedSessionRepository bookedRepo;
//
//    public SessionCompletionScheduler(
//            SessionRepository sessionRepo,
//            BookedSessionRepository bookedRepo) {
//        this.sessionRepo = sessionRepo;
//        this.bookedRepo = bookedRepo;
//    }
//
//    @Scheduled(fixedRate = 60000) // every 1 minute
//    public void detectEndedSessions() {
//
//        List<Session> sessions = sessionRepo.findEndedSessions();
//
//        for (Session s : sessions) {
//            bookedRepo.findBySeid(s.getSeid())
//                .orElseGet(() -> {
//                    BookedSession b = new BookedSession();
//                    b.setSeid(s.getSeid());
//                    b.setLearnerUid(s.getLearnerUid());
//                    b.setTeacherConfirm("no");
//                    b.setLearnerConfirm("no");
//                    b.setBookingDate(s.getSDate());
//                    return bookedRepo.save(b);
//                });
//        }
//    }
//}
