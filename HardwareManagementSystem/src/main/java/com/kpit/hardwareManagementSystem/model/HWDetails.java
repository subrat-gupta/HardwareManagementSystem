package com.kpit.hardwareManagementSystem.model;

import java.time.LocalDateTime;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String partNumber;
    private String productSerialNumber;
    private String kpitSerialNo;
    private LocalDateTime dateOfInduction;
    private Boolean isIssued;
    private Boolean isUnusable;
    private Boolean inMultiModule;
    private Boolean released;

    @ManyToOne
    @JoinColumn(name = "hwTypeId")
    private HWType hwType;

    // Getters and Setters
}
