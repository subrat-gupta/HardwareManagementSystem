package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.model.HWIssueRegister;
import com.kpit.hardwareManagementSystem.service.HWIssueRegisterService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/hw-issue-register")
public class HWIssueRegisterController {
    @Autowired
    private HWIssueRegisterService hwIssueRegisterService;

    @GetMapping
    public List<HWIssueRegister> getAllHWIssueRegisters() {
        return hwIssueRegisterService.getAllHWIssueRegisters();
    }

    @GetMapping("/{id}")
    public HWIssueRegister getHWIssueRegisterById(@PathVariable Long id) {
        return hwIssueRegisterService.getHWIssueRegisterById(id);
    }

    @PostMapping
    public HWIssueRegister createHWIssueRegister(@RequestBody HWIssueRegister hwIssueRegister) {
        return hwIssueRegisterService.createHWIssueRegister(hwIssueRegister);
    }

    @DeleteMapping("/{id}")
    public void deleteHWIssueRegister(@PathVariable Long id) {
        hwIssueRegisterService.deleteHWIssueRegister(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/issued/{userId}")
    public List<HWIssueRegister> getIssuedHardwareByUser(@PathVariable Long userId) {
        return hwIssueRegisterService.getIssuedHardwareByUser(userId);
    }

}