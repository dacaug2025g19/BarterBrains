package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.SenderDTO;
import com.example.demo.services.ChatRequestService;


@RestController
@RequestMapping("/chat")
//@CrossOrigin(origins = "*")
public class ChatRequestController {

    @Autowired
    private ChatRequestService chatRequestService;

    @GetMapping("/accepted-requests")
    public List<SenderDTO> getAcceptedSenders(
            @RequestParam("receiver_id") Integer receiverId) {

        return chatRequestService.getAcceptedSenders(receiverId);
    }
}