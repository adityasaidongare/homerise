package com.homerise.controller;

import com.homerise.dto.AuthResponse;
import com.homerise.dto.LoginRequest;
import com.homerise.dto.RegisterRequest;
import com.homerise.dto.UserSummary;
import com.homerise.model.User;
import com.homerise.security.JwtUtil;
import com.homerise.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone().trim());
        user.setRole(User.Role.valueOf(request.getRole()));

        User savedUser = userService.registerUser(user);
        AuthResponse response = new AuthResponse(true, "Registration successful", null, UserSummary.from(savedUser));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(email);
        AuthResponse response = new AuthResponse(true, "Login successful", token, UserSummary.from(user));
        return ResponseEntity.ok(response);
    }
}
