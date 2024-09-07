package com.kpit.hardwareManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.UserType;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType, Long> {
	UserType findByDescription(String description);
}
