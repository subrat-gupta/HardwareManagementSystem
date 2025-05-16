package com.kpit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.kpit.model.Hardware;
import com.kpit.model.HardwareRequest;
import com.kpit.model.Request;
import com.kpit.model.RequestStatus;
import com.kpit.model.Users;
import com.kpit.repository.HardwareRepository;
import com.kpit.repository.RequestRepository;
import com.kpit.repository.UserRepository;

@Service
public class RequestService {
 @Autowired
 private RequestRepository requestRepository;
 @Autowired
 private HardwareRepository hardwareRepository;
 @Autowired
 private UserRepository userRepository;
 public Request createRequest(Request request) {
     request.setRequestDate(LocalDate.now());
     request.setStatus(RequestStatus.PENDING);
     request.setCreatedAt(LocalDateTime.now());
     request.setUpdatedAt(LocalDateTime.now());
     return requestRepository.save(request);
 }

 public List<Request> getPendingRequests() {
     return requestRepository.findByStatus(RequestStatus.PENDING);
 }
 public Optional<Request> getRequestById(Long requestId) {
     return requestRepository.findById(requestId);
 }
 public void requestHardware(Long hardwareId, UserDetails userDetails) {
     Hardware hardware = hardwareRepository.findById(hardwareId).get();
     Users user = userRepository.findByEmail(userDetails.getUsername());
     Request request = new Request();
     request.setUser(user);
     request.setHardware(hardware);
     request.setProject(user.getProject());
     request.setStatus(RequestStatus.PENDING);
     request.setCreatedAt(LocalDateTime.now());

     requestRepository.save(request);
 }
 public List<Request> getMyRequests(Users user) {
     return requestRepository.findByUser(user);
 }
}
