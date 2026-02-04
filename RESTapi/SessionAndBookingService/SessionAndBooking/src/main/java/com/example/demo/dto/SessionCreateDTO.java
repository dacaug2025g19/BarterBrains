package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class SessionCreateDTO {
    private Integer teacherUid;
    private Integer learnerUid;
    private Integer skillId;
    private String mode;
    private LocalDate sDate;
    private LocalTime startTime;
    private LocalTime endTime;
}
