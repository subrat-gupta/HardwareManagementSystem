package com.kpit.hardwareManagementSystem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.hardwareManagementSystem.dto.UsersDTO;
import com.kpit.hardwareManagementSystem.model.UserType;
import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.repository.UserTypeRepository;
import com.kpit.hardwareManagementSystem.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private UserTypeRepository userTypeRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(Long kpid) {
        return usersRepository.findById(kpid).orElse(null);
    }

    public Users createUser(UsersDTO userDTO) {
        UserType userType = userTypeRepository.findById(userDTO.getUserTypeId())
            .orElseThrow(() -> new RuntimeException("UserType not found"));
        
        Users user = new Users();
        user.setRacfId(userDTO.getRacfId());
        user.setSaltPassword(userDTO.getSaltPassword());
        user.setPassword(userDTO.getPassword());
        user.setName(userDTO.getName());
        user.setEmailId(userDTO.getEmailId());
        user.setContactNumber(userDTO.getContactNumber());
        user.setLocation(userDTO.getLocation());
        user.setIsActive(userDTO.getIsActive());
        user.setUserTypeId(userDTO.getUserTypeId());
        user.setUserType(userType);
        
        return usersRepository.save(user);
    }

    public void deleteUser(Long kpid) {
        usersRepository.deleteById(kpid);
    }
}