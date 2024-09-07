package com.kpit.hardwareManagementSystem.controller;

import com.kpit.hardwareManagementSystem.model.HWDetails;
import com.kpit.hardwareManagementSystem.service.HWDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hw-details")
public class HWDetailsController {

    @Autowired
    private HWDetailsService hwDetailsService;

    @GetMapping
    public ResponseEntity<List<HWDetails>> getAllHWDetails() {
        List<HWDetails> hwDetails = hwDetailsService.getAllHWDetails();
        return ResponseEntity.ok(hwDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HWDetails> getHWDetailsById(@PathVariable Long id) {
        HWDetails hwDetails = hwDetailsService.getHWDetailsById(id);
        return hwDetails != null ? ResponseEntity.ok(hwDetails) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<HWDetails> createHWDetails(@RequestBody HWDetails hwDetails) {
        HWDetails savedHWDetails = hwDetailsService.saveHWDetails(hwDetails);
        return ResponseEntity.ok(savedHWDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HWDetails> updateHWDetails(@PathVariable Long id, @RequestBody HWDetails hwDetails) {
        hwDetails.setId(id);
        HWDetails updatedHWDetails = hwDetailsService.saveHWDetails(hwDetails);
        return ResponseEntity.ok(updatedHWDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHWDetails(@PathVariable Long id) {
        hwDetailsService.deleteHWDetails(id);
        return ResponseEntity.ok().build();
    }
}
