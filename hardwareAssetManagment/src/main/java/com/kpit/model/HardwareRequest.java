package com.kpit.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class HardwareRequest {
	private Long hardwareId;
    private String purpose;
    private LocalDate requiredFromDate;
    private LocalDate requiredToDate;
}
