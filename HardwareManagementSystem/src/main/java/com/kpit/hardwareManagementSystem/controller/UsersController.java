package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.Service.UsersService;
import com.kpit.hardwareManagementSystem.dto.UsersDto;
import com.kpit.hardwareManagementSystem.model.Users;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping
    public ResponseEntity<List<Users>>  getAllUsers() {
    	List<Users> users = usersService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{kpid}")
    public Users getUserById(@PathVariable Long kpid) {
        return usersService.getUserById(kpid);
    }

    @PostMapping("/addUser")
    @CrossOrigin(origins = "http://localhost:4200")
    public Users createUser(@RequestBody UsersDto userDto) {
        return usersService.createUser(userDto);
    }

    @DeleteMapping("/{kpid}")
    public void deleteUser(@PathVariable Long kpid) {
        usersService.deleteUser(kpid);
    }
    @PutMapping("/editUser")
    public ResponseEntity<Void> updateUser(@RequestBody Users user) {
    	usersService.editUser(user);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
