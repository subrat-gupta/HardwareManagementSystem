package com.kpit.hardwareManagementSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kpid;
    private String racfId;
    private String saltPassword;
    private String password;
    private String name;
    private String emailId;
    private String contactNumber;
    private String location;
    private Boolean isActive;


    @Column(name = "userTypeId")
    private Long userTypeId;

    @Transient
    private UserType userType;
    
    // Getters and Setters
}