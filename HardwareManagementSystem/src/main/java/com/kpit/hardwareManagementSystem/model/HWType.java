package com.kpit.hardwareManagementSystem.model;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class HWType {
    @Id
    private Long id;
    private String description;
    
    // Getters and Setters
}
