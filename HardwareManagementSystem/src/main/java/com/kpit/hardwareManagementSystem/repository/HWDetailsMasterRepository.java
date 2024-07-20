package com.kpit.hardwareManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kpit.hardwareManagementSystem.model.HWDetailsMaster;

public interface HWDetailsMasterRepository extends JpaRepository<HWDetailsMaster, Long> {
}
