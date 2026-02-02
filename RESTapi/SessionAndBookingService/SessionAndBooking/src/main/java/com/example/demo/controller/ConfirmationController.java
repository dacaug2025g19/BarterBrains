package com.example.demo.controller;

import com.example.demo.dto.ConfirmationDTO;
import com.example.demo.dto.SessionConfirmDTO;
import com.example.demo.service.ConfirmationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/confirm")
@CrossOrigin
public class ConfirmationController {

    private final ConfirmationService service;

    public ConfirmationController(ConfirmationService service) {
        this.service = service;
    }

    @GetMapping("/{uid}")
    public List<ConfirmationDTO> getCompleted(@PathVariable Integer uid) {
        return service.getCompletedSessions(uid);
    }

    @PostMapping
    public void confirm(@RequestBody SessionConfirmDTO dto) {
        service.confirm(dto);
    }
}
