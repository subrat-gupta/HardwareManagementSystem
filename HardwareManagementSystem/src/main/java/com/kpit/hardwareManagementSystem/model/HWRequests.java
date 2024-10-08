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
public class HWRequests {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime requestDate;
    private Boolean isComplete;
    private String comments;
    private LocalDateTime expectedReturnDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "hwId")  // Ensure this column name matches the foreign key column in the database
    private HWDetails hwDetails;

    // Getters and Setters
}
