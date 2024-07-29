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
        UserType employeeType = userTypeRepository.findByDescription("EMPLOYEE");
        user.setUserTypeId(employeeType.getId());
        user.setIsActive(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    public Users getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public List<Users> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        for (Users user : users) {
            if (user.getUserTypeId() != null) {
                UserType userType = userTypeRepository.findById(user.getUserTypeId()).orElse(null);
                user.setUserType(userType);
            }
        }
        return users;
    }
    
    public Users addUser(Users user) {
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }
    public Users getUserById(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }

    public Users updateUser(Users user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            Users existingUser = usersRepository.findById(user.getId()).orElse(null);
            if (existingUser != null) {
                user.setPassword(existingUser.getPassword());
            }
        }
        return usersRepository.save(user);
    }
}
