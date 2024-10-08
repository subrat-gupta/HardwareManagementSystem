package com.kpit.hardwareManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.hardwareManagementSystem.model.UserType;
import com.kpit.hardwareManagementSystem.repository.UserTypeRepository;

import java.util.List;

@Service
public class UserTypeService {
    @Autowired
    private UserTypeRepository userTypeRepository;

    public List<UserType> getAllUserTypes() {
        return userTypeRepository.findAll();
    }

    public UserType getUserTypeById(Long id) {
        return userTypeRepository.findById(id).orElse(null);
    }

    public UserType createUserType(UserType userType) {
        return userTypeRepository.save(userType);
    }

    public void deleteUserType(Long id) {
        userTypeRepository.deleteById(id);
    }
}
