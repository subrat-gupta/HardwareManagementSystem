package com.kpit.hardwareManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.HWIssueRegister;

@Repository
public interface HWIssueRegisterRepository extends JpaRepository<HWIssueRegister, Long> {
	@Query("SELECT issue FROM HWIssueRegister issue " +
		       "JOIN issue.hwRequests req " +
		       "WHERE req.user.id = :userId AND issue.isReturned = false")
		List<HWIssueRegister> findIssuedHardwareByUser(@Param("userId") Long userId);


}
