package com.kpit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.model.Hardware;
import com.kpit.model.HardwareStatus;

@Repository
public interface HardwareRepository extends JpaRepository<Hardware, Long> {
	List<Hardware> findByStatus(HardwareStatus status);
}
