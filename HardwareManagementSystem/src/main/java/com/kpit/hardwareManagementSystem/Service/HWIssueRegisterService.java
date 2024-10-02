package com.kpit.hardwareManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.hardwareManagementSystem.model.HWDetails;
import com.kpit.hardwareManagementSystem.model.HWIssueRegister;
import com.kpit.hardwareManagementSystem.repository.HWIssueRegisterRepository;

import java.util.List;

@Service
public class HWIssueRegisterService {
    @Autowired
    private HWIssueRegisterRepository hwIssueRegisterRepository;

    public List<HWIssueRegister> getAllHWIssueRegisters() {
        return hwIssueRegisterRepository.findAll();
    }

    public List<HWDetails> getHWIssueRegisterById(Long id) {
    	String empIdString = String.valueOf(id);
        return hwIssueRegisterRepository.findIssuedHardwareByEmpId(empIdString);
    }

    public HWIssueRegister createHWIssueRegister(HWIssueRegister hwIssueRegister) {
        return hwIssueRegisterRepository.save(hwIssueRegister);
    }

    public void deleteHWIssueRegister(Long id) {
        hwIssueRegisterRepository.deleteById(id);
    }
}
