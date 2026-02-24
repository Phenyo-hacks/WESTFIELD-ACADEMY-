package com.schoolmgmt.controller;

import com.schoolmgmt.model.User;
import com.schoolmgmt.model.Role;
import com.schoolmgmt.security.JwtUtil;
import com.schoolmgmt.security.UserDetailsServiceImpl;
import com.schoolmgmt.service.UserService;
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
@CrossOrigin(origins = "*") // Allow all origins for development
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService; // To create initial users for testing

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        // Get the actual User object to retrieve the role
        User user = userService.getUserByUsername(authRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));

        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        response.put("role", user.getRole().name());

        return ResponseEntity.ok(response);
    }

    // Helper class for login request body
    static class AuthRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // Endpoint to create an initial admin user for testing (remove in production)
    @PostMapping("/register/admin")
    public ResponseEntity<User> registerAdmin(@RequestBody User user) {
        user.setRole(Role.ADMIN);
        return ResponseEntity.ok(userService.createUser(user));
    }

    // Endpoint to create an initial teacher user for testing (remove in production)
    @PostMapping("/register/teacher")
    public ResponseEntity<User> registerTeacher(@RequestBody User user) {
        user.setRole(Role.TEACHER);
        return ResponseEntity.ok(userService.createUser(user));
    }

    // Endpoint to create an initial student user for testing (remove in production)
    @PostMapping("/register/student")
    public ResponseEntity<User> registerStudent(@RequestBody User user) {
        user.setRole(Role.STUDENT);
        return ResponseEntity.ok(userService.createUser(user));
    }
}
