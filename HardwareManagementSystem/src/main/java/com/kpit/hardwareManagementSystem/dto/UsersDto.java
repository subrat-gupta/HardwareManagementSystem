package com.kpit.hardwareManagementSystem.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kpit.hardwareManagementSystem.model.UserType;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UsersDto {

	private String contactNumber;
    private String emailId;
    private Boolean isActive;
    private String location;
    private String name;
    private String password;
    private String racfId;
    private UserType userType;
    public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRacfId() {
		return racfId;
	}
	public void setRacfId(String racfId) {
		this.racfId = racfId;
	}
	public String getSaltPassword() {
		return saltPassword;
	}
	public void setSaltPassword(String saltPassword) {
		this.saltPassword = saltPassword;
	}
	private String saltPassword;
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
}
