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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kpit.model.HardwareRequest;
import com.kpit.model.Issue;
import com.kpit.model.Request;
import com.kpit.model.Users;
import com.kpit.service.RequestService;


//RequestController.java
@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:4200")
public class RequestController {
 @Autowired
 private RequestService requestService;

 @PostMapping
 public Request createRequest(@RequestBody Request request) {
     return requestService.createRequest(request);
 }

 @GetMapping("/pending")
 public ResponseEntity<List<Request>> getPendingRequests() {
	 List<Request> pendingRequests = requestService.getPendingRequests();
     return ResponseEntity.ok(pendingRequests);
 }
 
 @PostMapping("/{hardwareId}")
 public ResponseEntity<String> requestHardware(
         @PathVariable Long hardwareId,
         @AuthenticationPrincipal UserDetails userDetails) {
     
     requestService.requestHardware(hardwareId, userDetails);
     return ResponseEntity.ok("Hardware request submitted successfully!");
 }
 @GetMapping("/my-requests")
 public ResponseEntity<List<Request>> getMyRequests(@AuthenticationPrincipal Users user) {
     List<Request> myRequests = requestService.getMyRequests(user);
     return ResponseEntity.ok(myRequests);
 }
 @PutMapping("/reject/{requestId}")
 public ResponseEntity<String> rejectHardwareRequest(@PathVariable  Long requestId) {
     requestService.rejectRequest(requestId);
     return ResponseEntity.ok("Request rejected successfully!");
 }
}