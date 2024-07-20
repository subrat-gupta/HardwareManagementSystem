package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.Service.HWDetailsService;
import com.kpit.hardwareManagementSystem.model.HWDetails;

import java.util.List;

@RestController
@RequestMapping("/api/hw-details")
public class HWDetailsController {
    @Autowired
    private HWDetailsService hwDetailsService;

    @GetMapping
    public List<HWDetails> getAllHWDetails() {
        return hwDetailsService.getAllHWDetails();
    }

    @GetMapping("/{id}")
    public HWDetails getHWDetailsById(@PathVariable Long id) {
        return hwDetailsService.getHWDetailsById(id);
    }

    @PostMapping
    public HWDetails createHWDetails(@RequestBody HWDetails hwDetails) {
        return hwDetailsService.createHWDetails(hwDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteHWDetails(@PathVariable Long id) {
        hwDetailsService.deleteHWDetails(id);
    }
}
