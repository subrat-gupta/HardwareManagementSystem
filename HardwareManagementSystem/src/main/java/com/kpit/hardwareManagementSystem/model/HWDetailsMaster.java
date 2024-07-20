package com.kpit.hardwareManagementSystem.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class HWDetailsMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String partNumber;
    private String hwNumber;
    private Boolean isIssued;
    private Boolean isUnusable;
    private Boolean inMultiModule;
    private Boolean released;
    
    @ManyToOne
    @JoinColumn(name = "hwListId")
    private HWDetails hwDetails;
    
    // Getters and Setters
}