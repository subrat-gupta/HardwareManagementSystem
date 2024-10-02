package com.kpit.hardwareManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.HWDetails;
import com.kpit.hardwareManagementSystem.model.HWIssueRegister;

@Repository
public interface HWIssueRegisterRepository extends JpaRepository<HWIssueRegister, Long> {
	@Query("SELECT hwd FROM HWIssueRegister hir " +
		       "JOIN hir.hwRequests hr " +
		       "JOIN hr.hwDetails hwd " +
		       "JOIN hr.user u " +
		       "WHERE u.kpitEmpId = :empId AND hr.status = 'approved' AND hir.isReturned = false")
		List<HWDetails> findIssuedHardwareByEmpId(@Param("empId") String empId);

}
