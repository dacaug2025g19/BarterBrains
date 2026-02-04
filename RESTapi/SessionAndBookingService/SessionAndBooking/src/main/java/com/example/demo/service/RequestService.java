package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.AcceptedRequestDTO;
import com.example.demo.repository.RequestRepository;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public List<AcceptedRequestDTO> getAcceptedRequests(Integer teacherId) {
        return requestRepository.findAcceptedRequestsWithLearnerName(teacherId);
    }
}
