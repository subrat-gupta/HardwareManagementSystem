package com.kpit.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.kpit.model.UserRequest;

public interface UserRequestRepository extends JpaRepository<UserRequest, Long> {
}
