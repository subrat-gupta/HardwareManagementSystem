package com.kpit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.model.Hardware;
import com.kpit.model.Project;
import com.kpit.model.SearchResponse;
import com.kpit.model.Users;
import com.kpit.repository.HardwareRepository;
import com.kpit.repository.ProjectRepository;
import com.kpit.repository.UserRepository;

@Service
public class SearchService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final HardwareRepository hardwareRepository;

    @Autowired
    public SearchService(UserRepository userRepository,
                         ProjectRepository projectRepository,
                         HardwareRepository hardwareRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.hardwareRepository = hardwareRepository;
    }

    public SearchResponse search(String query) {
        List<Users> users = userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrEmployeeIdContainingIgnoreCase(query, query, query);
        List<Project> projects = projectRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
        List<Hardware> hardware = hardwareRepository.findByNameContainingIgnoreCaseOrKpitSerialNumberContainingIgnoreCase(query, query);

        return new SearchResponse(users, projects, hardware);
    }
}

