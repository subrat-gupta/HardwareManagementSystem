package com.kpit.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kpit.model.UserRequest;
import com.kpit.model.Users;
import com.kpit.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;

//    @PostMapping
//    public Users createUser(@RequestBody Users user) {
//        return userService.createUser(user);
//    }

    @GetMapping("/{email}")
    public ResponseEntity<Users> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }
    @GetMapping
    public ResponseEntity<List<Users>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/requests")
    public ResponseEntity<List<UserRequest>> getUserRequests() {
        return ResponseEntity.ok(userService.getUserRequests());
    }

    @PutMapping("/requests/{id}/approve")
    public ResponseEntity<Void> approveUserRequest(@PathVariable Long id) {
        userService.approveUserRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/requests/{id}/reject")
    public ResponseEntity<Void> rejectUserRequest(@PathVariable Long id) {
        userService.rejectUserRequest(id);
        return ResponseEntity.noContent().build();
    }
}