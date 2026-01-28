package com.example.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClickedUserProfileDTO {
    private int uid;
    private String uname;
    private String email;
    private String phone;
    private String bio;

    private List<String> teachSkills;
    private List<String> learnSkills;
}
