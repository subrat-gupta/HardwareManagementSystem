package com.kpit.hardwareManagementSystem.service;

import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.model.UserType;
import com.kpit.hardwareManagementSystem.repository.UsersRepository;
import com.kpit.hardwareManagementSystem.repository.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users registerUser(Users user) {
        // Set userTypeId to EMPLOYEE
        UserType employeeType = userTypeRepository.findByDescription("EMPLOYEE");
        user.setUserTypeId(employeeType.getId());

        // Set isActive to false
        user.setIsActive(false);

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return usersRepository.save(user);
    }

    public Users getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }
}
