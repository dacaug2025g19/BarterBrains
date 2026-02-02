package com.example.demo.controller;

import com.example.demo.dto.AcceptedRequestDTO;
import com.example.demo.dto.SessionCreateDTO;
import com.example.demo.repository.RequestRepository;
import com.example.demo.service.SessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/session")
@CrossOrigin
public class SessionController {

    private final SessionService sessionService;
    private final RequestRepository requestRepository;

    public SessionController(SessionService sessionService,
                             RequestRepository requestRepository) {
        this.sessionService = sessionService;
        this.requestRepository = requestRepository;
    }

//    @GetMapping("/accepted-requests/{teacherId}")
//    public List<AcceptedRequestDTO> getAcceptedRequests(
//            @PathVariable Integer teacherId
//    ) {
//        return requestRepository.findAcceptedRequestsWithLearnerName(teacherId);
//    }

    @PostMapping("/create")
    public void createSession(@RequestBody SessionCreateDTO dto) {
        sessionService.createSession(dto);
    }
}
