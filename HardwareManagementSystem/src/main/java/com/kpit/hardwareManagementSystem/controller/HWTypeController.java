package com.kpit.hardwareManagementSystem.controller;

import com.kpit.hardwareManagementSystem.model.HWType;
import com.kpit.hardwareManagementSystem.service.HWTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hw-types")
public class HWTypeController {

    @Autowired
    private HWTypeService hwTypeService;

    // Get all HW Types
    @GetMapping
    public ResponseEntity<List<HWType>> getAllHWTypes() {
        List<HWType> hwTypes = hwTypeService.getAllHWTypes();
        return ResponseEntity.ok(hwTypes);
    }

    // Get specific HW Type by ID
    @GetMapping("/{id}")
    public ResponseEntity<HWType> getHWTypeById(@PathVariable Long id) {
        HWType hwType = hwTypeService.getHWTypeById(id);
        return hwType != null ? ResponseEntity.ok(hwType) : ResponseEntity.notFound().build();
    }

    // Create new HW Type
    @PostMapping
    public ResponseEntity<HWType> createHWType(@RequestBody HWType hwType) {
        HWType savedHWType = hwTypeService.saveHWType(hwType);
        return ResponseEntity.ok(savedHWType);
    }

    // Update existing HW Type
    @PutMapping("/{id}")
    public ResponseEntity<HWType> updateHWType(@PathVariable Long id, @RequestBody HWType hwType) {
        hwType.setId(id); // Ensure ID is set
        HWType updatedHWType = hwTypeService.saveHWType(hwType);
        return ResponseEntity.ok(updatedHWType);
    }

    // Delete HW Type by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHWType(@PathVariable Long id) {
        hwTypeService.deleteHWType(id);
        return ResponseEntity.ok().build();
    }
}
