package com.example.demo.dto;

import lombok.Data;

@Data
public class UserDTO {
	private String uname;
    private String email;
    private String password;
    private String phone;
    private String bdate;     // keep as String in gateway
    private String adhar_id;
}
