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
public class HWIssueRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime issueDate;
    private LocalDateTime expectedReturnDate;
    private LocalDateTime actualReturnDate;
    private LocalDateTime lastReminderDate;
    private Boolean isReturned;

    @ManyToOne
    @JoinColumn(name = "requestId")
    private HWRequests hwRequests;

    @ManyToOne
    @JoinColumn(name = "HwId")
    private HWDetails hwDetailsMaster;
    
    // Getters and Setters
}
