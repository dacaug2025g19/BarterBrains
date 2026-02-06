package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {

    private Integer uid;
    private String uname;
    private String adhar_id;
    private String bdate;
    private String phone;
    private Integer points;
    private String role;
    private String token;   // gateway will set this
    private String email;   // needed for JWT generation
}

