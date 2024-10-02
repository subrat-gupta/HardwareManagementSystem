package com.kpit.hardwareManagementSystem.dto;

import com.kpit.hardwareManagementSystem.model.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsersDTO {
    private Long id;
    private String kpitEmpId;
    private String password;
    private String name;
    private String email;
    private String contactNumber;
    private String location;
    private Boolean isActive;
    private Long userTypeId;

    // Getters and Setters
}