package com.kpit.hardwareManagementSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsersDTO {
    private String kpitEmpId;
    private String password;
    private String name;
    private String email;
    private String contactNumber;
    private String location;
}
