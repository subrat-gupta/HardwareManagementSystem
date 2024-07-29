package com.kpit.hardwareManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.hardwareManagementSystem.model.HWRequests;
import com.kpit.hardwareManagementSystem.model.Users;

@Repository
public interface HWRequestsRepository extends JpaRepository<HWRequests, Long> {
	List<HWRequests> findByUser(Users user);
}


