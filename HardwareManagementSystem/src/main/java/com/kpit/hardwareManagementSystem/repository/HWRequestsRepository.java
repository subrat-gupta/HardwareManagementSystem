package com.kpit.hardwareManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.HWRequests;

@Repository
public interface HWRequestsRepository extends JpaRepository<HWRequests, Long> {
}
