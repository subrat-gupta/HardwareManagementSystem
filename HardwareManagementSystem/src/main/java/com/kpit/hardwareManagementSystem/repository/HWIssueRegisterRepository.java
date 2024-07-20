package com.kpit.hardwareManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.HWIssueRegister;

@Repository
public interface HWIssueRegisterRepository extends JpaRepository<HWIssueRegister, Long> {
}
