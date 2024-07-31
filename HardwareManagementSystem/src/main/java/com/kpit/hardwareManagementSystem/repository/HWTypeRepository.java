package com.kpit.hardwareManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.HWType;

@Repository
public interface HWTypeRepository extends JpaRepository<HWType, Long> {
}
