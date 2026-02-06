package com.example.demo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import com.example.demo.config.SecurityConfig;
import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.dto.ProfileDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.security.JWTUtil;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final SecurityConfig securityConfig;

    private final JWTUtil jwtUtil;
    private final WebClient webClient;

    public AuthController(JWTUtil jwtUtil, WebClient.Builder builder, SecurityConfig securityConfig) {
        this.jwtUtil = jwtUtil;
        this.webClient = builder.baseUrl("http://localhost:8081").build();
        this.securityConfig = securityConfig;
    }

    @PostMapping("/login")
    public Mono<ProfileDTO> login(@RequestBody LoginRequestDTO dto) {
    	
        return webClient.post()
                .uri("/user/login")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(dto)
                .retrieve()
                .bodyToMono(ProfileDTO.class)
                .map(profile -> {
                    // generate JWT
                    String token = jwtUtil.generateToken(profile.getEmail());
                    profile.setToken(token);
                    return profile;
                });
    }
     
    @PostMapping("/register")
    public Mono<Void> register(@RequestBody UserDTO userDTO) {
    	
        return webClient.post()
                .uri("/user/register")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(userDTO)
                .retrieve()
                .bodyToMono(Void.class);
                
    }
}
