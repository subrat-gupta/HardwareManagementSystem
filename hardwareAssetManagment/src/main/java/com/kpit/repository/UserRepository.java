package com.kpit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
    Optional<Users> findByEmployeeId(String employeeId);
    List<Users> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrEmployeeIdContainingIgnoreCase(
            String name,
            String email,
            String empId
        );
}
