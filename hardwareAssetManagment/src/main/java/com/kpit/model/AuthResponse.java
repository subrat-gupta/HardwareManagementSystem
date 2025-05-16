package com.kpit.model;

public class AuthResponse {
    private String jwt;
    private String role;

    // Default constructor (required for JSON deserialization)
    public AuthResponse() {}

    // Parameterized constructor
    public AuthResponse(String jwt, String role) {
        this.jwt = jwt;
        this.role = role;
    }

    // Getter and Setter
    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
    public String getRole() {
        return role;
    }
}