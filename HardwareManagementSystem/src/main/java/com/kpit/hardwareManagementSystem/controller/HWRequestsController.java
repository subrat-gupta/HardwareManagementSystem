package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.model.HWRequests;
import com.kpit.hardwareManagementSystem.service.HWRequestsService;

import java.util.List;

@RestController
@RequestMapping("/api/hw-requests")
public class HWRequestsController {
    @Autowired
    private HWRequestsService hwRequestsService;

    @GetMapping
    public List<HWRequests> getAllHWRequests() {
        return hwRequestsService.getAllHWRequests();
    }

    @GetMapping("/{id}")
    public HWRequests getHWRequestsById(@PathVariable Long id) {
        return hwRequestsService.getHWRequestsById(id);
    }

    @PostMapping
    public HWRequests createHWRequests(@RequestBody HWRequests hwRequests) {
        return hwRequestsService.createHWRequests(hwRequests);
    }

    @DeleteMapping("/{id}")
    public void deleteHWRequests(@PathVariable Long id) {
        hwRequestsService.deleteHWRequests(id);
    }
}
