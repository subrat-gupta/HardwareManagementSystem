package com.kpit.hardwareManagementSystem.controller;

import com.kpit.hardwareManagementSystem.model.HWDetails;
import com.kpit.hardwareManagementSystem.model.HWType;
import com.kpit.hardwareManagementSystem.service.HWDetailsService;
import com.kpit.hardwareManagementSystem.service.HWTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hw-details")
public class HWDetailsController {

    @Autowired
    private HWDetailsService hwDetailsService;
    
    @Autowired
    private HWTypeService hwTypeService; // Injecting HWTypeService

    // Get all hardware with hardware type
    @GetMapping
    public ResponseEntity<List<HWDetails>> getAllHWDetails() {
        List<HWDetails> hwDetails = hwDetailsService.getAllHWDetailsWithType();
        return ResponseEntity.ok(hwDetails);
    }

    // Get a specific hardware by ID
    @GetMapping("/{id}")
    public ResponseEntity<HWDetails> getHWDetailsById(@PathVariable Long id) {
        HWDetails hwDetails = hwDetailsService.getHWDetailsById(id);
        return hwDetails != null ? ResponseEntity.ok(hwDetails) : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/type/{hwTypeId}")
    public ResponseEntity<List<HWDetails>> getHWDetailsByTypeId(@PathVariable Long hwTypeId) {
        List<HWDetails> hwDetailsList = hwDetailsService.getHWDetailsByTypeId(hwTypeId);
        if (hwDetailsList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(hwDetailsList);
    }
    
    // Create new hardware with type
    @PostMapping
    public ResponseEntity<HWDetails> createHWDetails(@RequestBody HWDetails hwDetails) {
        if (hwDetails.getHwType() != null) {
            HWType hwType = hwTypeService.getHWTypeById(hwDetails.getHwType().getId());
            if (hwType == null) {
                return ResponseEntity.badRequest().body(null); // Invalid type
            }
            hwDetails.setHwType(hwType); // Set valid HW type
        }
        HWDetails savedHWDetails = hwDetailsService.saveHWDetails(hwDetails);
        return ResponseEntity.ok(savedHWDetails);
    }

    // Update existing hardware
    @PutMapping("/{id}")
    public ResponseEntity<HWDetails> updateHWDetails(@PathVariable Long id, @RequestBody HWDetails hwDetails) {
        if (hwDetails.getHwType() != null) {
            HWType hwType = hwTypeService.getHWTypeById(hwDetails.getHwType().getId());
            if (hwType == null) {
                return ResponseEntity.badRequest().body(null); // Invalid type
            }
            hwDetails.setHwType(hwType); // Set valid HW type
        }
        hwDetails.setId(id); // Ensure ID is correctly set
        HWDetails updatedHWDetails = hwDetailsService.saveHWDetails(hwDetails);
        return ResponseEntity.ok(updatedHWDetails);
    }

    // Delete hardware by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHWDetails(@PathVariable Long id) {
        hwDetailsService.deleteHWDetails(id);
        return ResponseEntity.ok().build();
    }
}
