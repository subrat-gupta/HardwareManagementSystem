package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.Service.UsersService;
import com.kpit.hardwareManagementSystem.model.Users;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }

    @GetMapping("/{kpid}")
    public Users getUserById(@PathVariable Long kpid) {
        return usersService.getUserById(kpid);
    }

    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return usersService.createUser(user);
    }

    @DeleteMapping("/{kpid}")
    public void deleteUser(@PathVariable Long kpid) {
        usersService.deleteUser(kpid);
    }
}
