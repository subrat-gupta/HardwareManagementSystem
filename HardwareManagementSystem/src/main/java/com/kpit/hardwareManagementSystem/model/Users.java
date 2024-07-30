package com.kpit.hardwareManagementSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;
    private String kpitEmpId;
    private String contactNumber;

    private String email;

    private Boolean isActive;

    private String location;

    private String name;

    private String password;

    @ManyToOne
    @JoinColumn(name = "userTypeId")
    @JsonProperty("userType")
    private UserType userType;
    
}

