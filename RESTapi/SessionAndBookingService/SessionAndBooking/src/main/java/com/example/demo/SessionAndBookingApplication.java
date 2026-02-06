
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.example.demo.entity")   // ✅ ADD THIS
@EnableJpaRepositories("com.example.demo.repository") // ✅ ADD THIS
@EnableDiscoveryClient
public class SessionAndBookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(SessionAndBookingApplication.class, args);
    }
}

