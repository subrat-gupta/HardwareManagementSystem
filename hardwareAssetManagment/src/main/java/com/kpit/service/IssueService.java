package com.kpit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.kpit.model.Issue;
import com.kpit.model.IssueStatus;
import com.kpit.model.Request;
import com.kpit.model.Users;
import com.kpit.repository.IssueRepository;
import com.kpit.repository.UserRepository;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    public Issue issueHardware(Long requestId, Long issuedByUserId) {
        Request request = requestService.getRequestById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        Users issuedBy = userService.getUserById(issuedByUserId).orElseThrow(() -> new RuntimeException("User not found"));

        Issue issue = new Issue();
        issue.setRequest(request);
        issue.setIssuedBy(issuedBy);
        issue.setIssuedDate(LocalDate.now());
        issue.setStatus(IssueStatus.ISSUED);
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());

        return issueRepository.save(issue);
    }
    public List<Issue> getMyIssuedHardware(UserDetails userDetails) {
    	Users user = userRepository.findByEmail(userDetails.getUsername());
        return issueRepository.findByIssuedByAndStatus(user, IssueStatus.ISSUED);
    }

}
