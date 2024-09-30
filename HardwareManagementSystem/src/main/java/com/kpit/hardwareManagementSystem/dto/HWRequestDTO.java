package com.kpit.hardwareManagementSystem.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HWRequestDTO {
    private Long userId;
    private Long hwDetailsId;
    private String comments;
    private LocalDateTime expectedReturnDate;
}
