package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.model.HWDetailsMaster;
import com.kpit.hardwareManagementSystem.service.HWDetailsMasterService;

import java.util.List;

@RestController
@RequestMapping("/api/hw-details-master")
public class HWDetailsMasterController {
    @Autowired
    private HWDetailsMasterService hwDetailsMasterService;

    @GetMapping
    public List<HWDetailsMaster> getAllHWDetailsMasters() {
        return hwDetailsMasterService.getAllHWDetailsMasters();
    }

    @GetMapping("/{id}")
    public HWDetailsMaster getHWDetailsMasterById(@PathVariable Long id) {
        return hwDetailsMasterService.getHWDetailsMasterById(id);
    }

    @PostMapping
    public HWDetailsMaster createHWDetailsMaster(@RequestBody HWDetailsMaster hwDetailsMaster) {
        return hwDetailsMasterService.createHWDetailsMaster(hwDetailsMaster);
    }

    @DeleteMapping("/{id}")
    public void deleteHWDetailsMaster(@PathVariable Long id) {
        hwDetailsMasterService.deleteHWDetailsMaster(id);
    }
}
