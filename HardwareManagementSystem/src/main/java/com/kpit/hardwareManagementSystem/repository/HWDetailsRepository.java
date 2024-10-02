package com.kpit.hardwareManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.HWDetails;

@Repository
public interface HWDetailsRepository extends JpaRepository<HWDetails, Long> {
    List<HWDetails> findByHwTypeIdAndIsIssued(Long hwTypeId, Boolean isIssued);
}
