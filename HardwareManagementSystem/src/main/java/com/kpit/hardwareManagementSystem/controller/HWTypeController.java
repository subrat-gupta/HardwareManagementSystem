package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.model.HWType;
import com.kpit.hardwareManagementSystem.service.HWTypeService;

import java.util.List;

@RestController
@RequestMapping("/api/hw-types")
public class HWTypeController {
    @Autowired
    private HWTypeService hwTypeService;

    @GetMapping
    public List<HWType> getAllHWTypes() {
        return hwTypeService.getAllHWTypes();
    }

    @GetMapping("/{id}")
    public HWType getHWTypeById(@PathVariable Long id) {
        return hwTypeService.getHWTypeById(id);
    }

    @PostMapping
    public HWType createHWType(@RequestBody HWType hwType) {
        return hwTypeService.createHWType(hwType);
    }

    @DeleteMapping("/{id}")
    public void deleteHWType(@PathVariable Long id) {
        hwTypeService.deleteHWType(id);
    }
}
