package com.kpit.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kpit.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	List<Project> findByName(String name);
	List<Project> findByDescriptionContainingIgnoreCase(String description);
	List<Project> findByStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
	List<Project> findByStatus(String status);
}
