package com.kpit.hardwareManagementSystem.controller;

import com.kpit.hardwareManagementSystem.model.HWRequests;
import com.kpit.hardwareManagementSystem.service.HWRequestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class HWRequestsController {

    @Autowired
    private HWRequestsService hwRequestsService;

    @PostMapping("/raise")
    public ResponseEntity<HWRequests> raiseRequest(@RequestParam Long userId, @RequestParam Long hwDetailsId, @RequestParam String comments) {
        HWRequests request = hwRequestsService.raiseRequest(userId, hwDetailsId, comments);
        return ResponseEntity.ok(request);
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<HWRequests> approveRequest(@PathVariable Long id) {
        HWRequests request = hwRequestsService.approveRequest(id);
        return ResponseEntity.ok(request);
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<HWRequests> rejectRequest(@PathVariable Long id) {
        HWRequests request = hwRequestsService.rejectRequest(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/all")
    public ResponseEntity<List<HWRequests>> getAllRequests() {
        List<HWRequests> requests = hwRequestsService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<HWRequests>> getRequestsByUser(@PathVariable Long userId) {
        List<HWRequests> requests = hwRequestsService.getRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }
}
