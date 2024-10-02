package com.kpit.hardwareManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kpit.hardwareManagementSystem.model.HWDetails;
import com.kpit.hardwareManagementSystem.model.HWIssueRegister;
import com.kpit.hardwareManagementSystem.service.HWIssueRegisterService;

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

	
//	 @GetMapping("/{id}") public HWIssueRegister
//	 getHWIssueRegisterById(@PathVariable Long id) { return
//	 hwIssueRegisterService.getHWIssueRegisterById(id); }
	 
	 @GetMapping("/issued/{empId}") 
	 public ResponseEntity<List<HWDetails>> getHWIssueRegisterById(@PathVariable Long empId){
		 List<HWDetails> issuedHardware = hwIssueRegisterService.getHWIssueRegisterById(empId);
	        return ResponseEntity.ok(issuedHardware);
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
