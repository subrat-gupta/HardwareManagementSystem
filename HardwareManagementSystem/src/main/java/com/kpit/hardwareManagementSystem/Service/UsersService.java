package com.kpit.hardwareManagementSystem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(Long kpid) {
        return usersRepository.findById(kpid).orElse(null);
    }

    public Users createUser(Users user) {
        return usersRepository.save(user);
    }

    public void deleteUser(Long kpid) {
        usersRepository.deleteById(kpid);
    }
}