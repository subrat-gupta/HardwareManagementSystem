package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.Service.HWIssueRegisterService;
import com.kpit.hardwareManagementSystem.model.HWIssueRegister;

import java.util.List;

@RestController
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
}
