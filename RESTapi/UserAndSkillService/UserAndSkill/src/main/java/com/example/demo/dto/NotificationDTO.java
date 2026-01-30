package com.example.demo.dto;

import java.time.LocalDateTime;

import com.example.demo.entities.RequestStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class NotificationDTO {
   
	Integer request_id;
	Integer sender_id;
	String sender_name;
	LocalDateTime timestamp;
	RequestStatus status;
}
