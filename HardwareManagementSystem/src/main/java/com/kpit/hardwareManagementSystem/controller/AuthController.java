package com.kpit.hardwareManagementSystem.controller;

import com.kpit.hardwareManagementSystem.dto.AuthenticationResponse;
import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.service.CustomUserDetailsService;
import com.kpit.hardwareManagementSystem.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Users user) throws Exception {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        final Users userEntity = customUserDetailsService.getUserByEmail(user.getEmail());

        if (!userEntity.getIsActive()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "You are not verified yet. Please contact support at +1-234-567-890.");
            return ResponseEntity.status(403).body(response);
        }

        final String jwt = jwtUtil.generateToken(userDetails);
        Map<String, Object> response = new HashMap<>();
        response.put("jwt", jwt);
        response.put("user", userEntity);

        return ResponseEntity.ok(response);
    }
}
