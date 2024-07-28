package com.kpit.hardwareManagementSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String kpitEmpId;
    private String password;
    private String name;
    private String email;
    private String contactNumber;
    private String location;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean isActive = false;  // Default to false
    @Column(name = "userTypeId")
    private Long userTypeId;
    @Transient
    private UserType userType;

    // Getters and Setters
}
