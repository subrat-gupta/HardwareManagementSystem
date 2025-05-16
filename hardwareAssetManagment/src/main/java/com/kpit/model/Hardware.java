package com.kpit.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Hardware {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hardwareId;

    private String name;
    private String type;
    private String serialNumber;
    private String kpitSerialNumber;
    private String partNumber;
    private boolean isMultiModule;
    private boolean isUnusable;

    @Enumerated(EnumType.STRING)
    private HardwareStatus status; // Use HardwareStatus enum

    private LocalDate purchaseDate;
    private LocalDate warrantyExpiryDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}