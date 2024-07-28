package com.kpit.hardwareManagementSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long kpid;
    @JsonProperty("contactNumber")
    private String contactNumber;
    




	@JsonProperty("emailId")
    private String emailId;
    @JsonProperty("isActive")
    private Boolean isActive;
    @JsonProperty("location")
    private String location;
    @JsonProperty("name")
    private String name;
    @JsonProperty("password")
    private String password;
    @JsonProperty("racfId")
    private String racfId;
    @JsonProperty("saltPassword")
    private String saltPassword;
    public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
    @ManyToOne
    @JoinColumn(name = "userTypeId")
    @JsonProperty("userType")
    private UserType userType;
    
    // Getters and Setters
    public Long getKpid() {
		return kpid;
	}
	public void setKpid(Long kpid) {
		this.kpid = kpid;
	}
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
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}

}