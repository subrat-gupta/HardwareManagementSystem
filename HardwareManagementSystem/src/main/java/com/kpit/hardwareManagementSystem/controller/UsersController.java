package com.kpit.hardwareManagementSystem.controller;

import com.kpit.hardwareManagementSystem.dto.UsersDTO;
import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<Users> registerUser(@RequestBody UsersDTO usersDTO) {
        Users user = new Users();
        user.setEmail(usersDTO.getEmail());
        user.setPassword(usersDTO.getPassword());
        user.setName(usersDTO.getName());
        user.setContactNumber(usersDTO.getContactNumber());
        user.setLocation(usersDTO.getLocation());
        user.setKpitEmpId(usersDTO.getKpitEmpId());
        Users savedUser = usersService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
        Users user = usersService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Users> getUserByEmail(@PathVariable String email) {
        Users user = usersService.getUserByEmail(email);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        usersService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/editUser")
    public ResponseEntity<Users> editUser(@RequestBody UsersDTO usersDTO) {
        Users user = usersService.getUserById(usersDTO.getId());
        if (user != null) {
            user.setEmail(usersDTO.getEmail());
            user.setPassword(usersDTO.getPassword());
            user.setName(usersDTO.getName());
            user.setContactNumber(usersDTO.getContactNumber());
            user.setLocation(usersDTO.getLocation());
            user.setKpitEmpId(usersDTO.getKpitEmpId());
            user.setUserType(usersDTO.getUserType());
            user.setIsActive(usersDTO.getIsActive());
            Users updatedUser = usersService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/addUser")
    public ResponseEntity<Users> addUser(@RequestBody UsersDTO usersDTO) {
        Users user = new Users();
        user.setEmail(usersDTO.getEmail());
        user.setPassword(usersDTO.getPassword()); // Password encoding will be handled in the service
        user.setName(usersDTO.getName());
        user.setContactNumber(usersDTO.getContactNumber());
        user.setLocation(usersDTO.getLocation());
        user.setKpitEmpId(usersDTO.getKpitEmpId());
        user.setIsActive(usersDTO.getIsActive());
        user.setUserType(usersDTO.getUserType());
        Users savedUser = usersService.addUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
