package com.example.demo.config;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class RouterConfig {
	
	@Bean
	public RouteLocator createRoutes(RouteLocatorBuilder builder) {
		
		return builder.routes()
			   .route("UserAndSkill", r-> r
					   .path("/user/**", "/skill/**", "/chat/**", "/userskill/**")
					   .uri("http://localhost:8081"))
//					   .uri("lb://UserAndSkill"))
			   .route("SessionAndBooking", r-> r
					   .path("/skills/**", "/session/**", "/confirm/**")
					   .uri("http://localhost:8082"))
			   .route("AdminService", r -> r
					    .path("/admin/**")
					    .uri("http://localhost:5291"))
			   .build();
		
	}
	
}
