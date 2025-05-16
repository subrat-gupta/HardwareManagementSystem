package com.kpit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kpit.model.Issue;
import com.kpit.model.IssueStatus;
import com.kpit.model.Users;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByStatus(String status);
    List<Issue> findByIssuedByAndStatus(Users user, IssueStatus status);
}
