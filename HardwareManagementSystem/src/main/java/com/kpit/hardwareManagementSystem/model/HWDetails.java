package com.kpit.hardwareManagementSystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class HWDetails {
    @Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "hwTypeId")
    private HWType hwType;
    
    // Getters and Setters
}
