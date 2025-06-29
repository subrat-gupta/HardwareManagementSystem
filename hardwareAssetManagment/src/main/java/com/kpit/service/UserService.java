package com.kpit.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.model.Project;
import com.kpit.model.RoleType;
import com.kpit.model.UserRequest;
import com.kpit.model.Users;
import com.kpit.repository.ProjectRepository;
import com.kpit.repository.UserRepository;
import com.kpit.repository.UserRequestRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRequestRepository userRequestRepository;
    @Autowired
    private ProjectRepository projectRepository;
    public Users createUser(Users user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Optional<Users> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users addUser(Users user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public Users updateUser(Long id, Users user) {
        Optional<Users> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            Users updatedUser = existingUser.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setRole(user.getRole());
            updatedUser.setUpdatedAt(LocalDateTime.now());
            Project newProject = projectRepository.findById(user.getProject().getProjectId()).orElse(null);
            if (newProject != null) {
                updatedUser.setProject(newProject);
            }
            return userRepository.save(updatedUser);
        }
        return null;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserRequest> getUserRequests() {
        return userRequestRepository.findAll();
    }

    public void approveUserRequest(Long id) {
        Optional<UserRequest> userRequest = userRequestRepository.findById(id);
        if (userRequest.isPresent()) {
            UserRequest request = userRequest.get();
            request.setApproved(true);
            userRequestRepository.save(request);

            // Create a new user from the request
            Users user = new Users();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setRole(RoleType.valueOf(request.getRole().toUpperCase()));
            user.setEmployeeId(request.getEmployeeId());
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
        }
    }

    public void rejectUserRequest(Long id) {
        userRequestRepository.deleteById(id);
    }
}
