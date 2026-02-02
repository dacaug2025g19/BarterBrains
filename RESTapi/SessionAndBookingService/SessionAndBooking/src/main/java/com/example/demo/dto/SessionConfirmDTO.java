package com.example.demo.dto;

import lombok.Data;

@Data
public class SessionConfirmDTO {
    private Integer bsid;
    private Integer userId;
    private String role; // teacher / learner
}
