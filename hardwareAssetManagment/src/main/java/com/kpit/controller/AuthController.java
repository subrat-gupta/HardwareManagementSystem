package com.kpit.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kpit.model.AuthRequest;
import com.kpit.model.AuthResponse;
import com.kpit.model.Project;
import com.kpit.model.RoleType;
import com.kpit.model.SignupRequest;
import com.kpit.model.Users;
import com.kpit.repository.ProjectRepository;
import com.kpit.repository.UserRepository;
import com.kpit.service.CustomUserDetailsService;
import com.kpit.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        // Authenticate the user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        // Load user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final Users user = userRepository.findByEmail(authRequest.getEmail());
        // Generate JWT token
        final String jwt = jwtUtil.generateToken(userDetails, user);

        // Return the token in the response
        return ResponseEntity.ok(new AuthResponse(jwt, user.getRole().toString(),user.getUserId().toString()));
    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        // Check if the email is already registered
        if (userRepository.findByEmail(signupRequest.getEmail())!=null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (userRepository.findByEmployeeId(signupRequest.getEmployeeId()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Employee ID is already in use!");
        }
     // Fetch the project from the database
        Project project = projectRepository.findById(signupRequest.getProjectId())
                .orElseThrow(() -> new RuntimeException("Error: Project not found"));
        // Create a new user
        Users user = new Users();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
//        user.setRole(RoleType.valueOf(signupRequest.getRole().toUpperCase()));
        user.setRole(RoleType.EMPLOYEE);
        user.setEmployeeId(signupRequest.getEmployeeId());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setProject(project);

        // Save the user to the database
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }
}