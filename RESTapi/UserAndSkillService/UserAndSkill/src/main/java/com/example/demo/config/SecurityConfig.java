package com.example.demo.config;

import com.example.demo.security.JWTUtil;
import com.example.demo.security.JwtAuthFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JWTUtil JWTUtil;

    SecurityConfig(JWTUtil JWTUtil) {
        this.JWTUtil = JWTUtil;
    }
    
    @Autowired
    private JwtAuthFilter jwtAuthFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	    http
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .csrf(csrf -> csrf.disable())
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers(
	                "/user/login",
	                "/user/register",
	                "/user/all",
	                "/skill/all"
	                
	            ).permitAll()
	            .anyRequest().authenticated()
	        ).addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // React
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
    
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
          .addResourceHandler("/uploads/**")
          .addResourceLocations("file:uploads/");
    }


    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
