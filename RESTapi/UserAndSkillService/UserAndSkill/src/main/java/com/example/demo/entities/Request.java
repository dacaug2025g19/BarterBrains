package com.example.demo.entities;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "request_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Request {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer request_id;
	@ManyToOne
	@JoinColumn(name = "sender_id")
	private User sender;

	@ManyToOne
	@JoinColumn(name = "receiver_id")
	private User receiver;

	@Enumerated(EnumType.STRING)
	private RequestStatus status;
	LocalDateTime timestamp;
	
	@PrePersist
    public void setTimestamp() {
        this.timestamp = LocalDateTime.now();
    }
}
