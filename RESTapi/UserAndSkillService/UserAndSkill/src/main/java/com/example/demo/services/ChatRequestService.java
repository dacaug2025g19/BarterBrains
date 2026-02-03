package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SenderDTO;
import com.example.demo.entities.Request;
import com.example.demo.repositories.ChatRequestRepository;

@Service
public class ChatRequestService {

    @Autowired
    private ChatRequestRepository chatRequestRepository;

    public List<SenderDTO> getAcceptedSenders(Integer uid) {
        return chatRequestRepository.findAcceptedChats(uid);
    }

}

