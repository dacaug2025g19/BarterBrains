package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AcceptedRequestDTO;
import com.example.demo.service.RequestService;

@RestController
@RequestMapping("/session")
@CrossOrigin
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping("/accepted-requests/{teacherId}")
    public List<AcceptedRequestDTO> getAcceptedRequests(
            @PathVariable Integer teacherId
    ) {
        return requestService.getAcceptedRequests(teacherId);
    }
}
