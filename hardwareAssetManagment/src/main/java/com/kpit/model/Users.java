package com.kpit.model;

import java.time.LocalDateTime;  
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String employeeId;
    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private RoleType role;
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false) // Foreign key column in Users table
    private Project project;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
