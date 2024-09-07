package com.kpit.hardwareManagementSystem.service;

import com.kpit.hardwareManagementSystem.model.HWDetails;
import com.kpit.hardwareManagementSystem.repository.HWDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HWDetailsService {

    @Autowired
    private HWDetailsRepository hwDetailsRepository;

    public List<HWDetails> getAllHWDetails() {
        return hwDetailsRepository.findAll();
    }

    public HWDetails getHWDetailsById(Long id) {
        return hwDetailsRepository.findById(id).orElse(null);
    }

    public HWDetails saveHWDetails(HWDetails hwDetails) {
        return hwDetailsRepository.save(hwDetails);
    }

    public void deleteHWDetails(Long id) {
        hwDetailsRepository.deleteById(id);
    }
}
