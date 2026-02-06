package com.example.demo.security;

import java.util.Date;

import org.springframework.stereotype.Component;



import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;

@Component
public class JWTUtil {

	private static final String SECRET_KEY = "simplejwtsecretkeysimplejwtsecretkey";
	
	
	public String generateToken(String email) {
		return Jwts.builder()
			       .setSubject(email)
			       .setIssuedAt(new Date())
			       .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
			       .compact();
	}
	
	
	public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }
	
	private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
