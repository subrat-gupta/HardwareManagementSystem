package com.kpit.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.kpit.model.Project;
import com.kpit.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Add a new project
    public Project addProject(Project project) {
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());
        return projectRepository.save(project);
    }

    // Update an existing project
    public Project updateProject(Long id, Project project) {
        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project updatedProject = existingProject.get();
            updatedProject.setName(project.getName());
            updatedProject.setDescription(project.getDescription());
            updatedProject.setStartDate(project.getStartDate());
            updatedProject.setEndDate(project.getEndDate());
            updatedProject.setUpdatedAt(LocalDateTime.now());
            return projectRepository.save(updatedProject);
        }
        return null;
    }

    // Delete a project
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // Custom query: Find projects by name
    public List<Project> findProjectsByName(String name) {
        return projectRepository.findByName(name);
    }

    // Custom query: Find projects by description (case-insensitive)
    public List<Project> findProjectsByDescription(String description) {
        return projectRepository.findByDescriptionContainingIgnoreCase(description);
    }
}