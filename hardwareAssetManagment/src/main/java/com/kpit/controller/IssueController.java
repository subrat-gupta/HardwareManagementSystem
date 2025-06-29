package com.kpit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kpit.model.Hardware;
import com.kpit.model.Issue;
import com.kpit.model.Request;
import com.kpit.model.Users;
import com.kpit.service.IssueService;

//IssueController.java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/issues")

public class IssueController {
 @Autowired
 private IssueService issueService;

 @PutMapping("/issue/{requestId}/{issuedByUserId}")
 public Issue issueHardware(@PathVariable  Long requestId, @PathVariable  Long issuedByUserId) {
     return issueService.issueHardware(requestId, issuedByUserId);
 }
// @GetMapping("/issued")
// public ResponseEntity<List<Issue>> getMyIssuedHardware(@AuthenticationPrincipal UserDetails userDetails) {
//     List<Issue> issuedHardware = issueService.getMyIssuedHardware(userDetails);
//     return ResponseEntity.ok(issuedHardware);
// }
 @GetMapping("/issued/{UserId}")
 public ResponseEntity<List<Hardware>> getMyIssuedHardware(@PathVariable  Long UserId) {
     List<Hardware> issuedHardware = issueService.getMyIssuedHardware(UserId);
     return ResponseEntity.ok(issuedHardware);
 }
}
