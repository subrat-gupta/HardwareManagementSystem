package com.kpit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kpit.model.Hardware;
import com.kpit.service.HardwareService;

//HardwareController.java
@RestController
@RequestMapping("/api/hardware")
@CrossOrigin(origins = "http://localhost:4200")
public class HardwareController {

    @Autowired
    private HardwareService hardwareService;

    @GetMapping
    public ResponseEntity<List<Hardware>> getHardware() {
        return ResponseEntity.ok(hardwareService.getAllHardware());
    }

    @PostMapping
    public ResponseEntity<Hardware> addHardware(@RequestBody Hardware hardware) {
        return ResponseEntity.ok(hardwareService.addHardware(hardware));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hardware> updateHardware(@PathVariable Long id, @RequestBody Hardware hardware) {
        return ResponseEntity.ok(hardwareService.updateHardware(id, hardware));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHardware(@PathVariable Long id) {
        hardwareService.deleteHardware(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/available")
    public ResponseEntity<List<Hardware>> getAvailableHardware() {
        List<Hardware> hardwareList = hardwareService.getAvailableHardware();
        return ResponseEntity.ok(hardwareList);
    }
    
}
