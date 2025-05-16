package com.kpit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.model.Request;
import com.kpit.model.RequestStatus;
import com.kpit.model.Users;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
	List<Request> findByUser(Users user);
    List<Request> findByStatus(RequestStatus status);
}
