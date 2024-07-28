package com.kpit.hardwareManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public HWIssueRegister getHWIssueRegisterById(Long id) {
        return hwIssueRegisterRepository.findById(id).orElse(null);
    }

    public HWIssueRegister createHWIssueRegister(HWIssueRegister hwIssueRegister) {
        return hwIssueRegisterRepository.save(hwIssueRegister);
    }

    public void deleteHWIssueRegister(Long id) {
        hwIssueRegisterRepository.deleteById(id);
    }
}
