package com.kpit.hardwareManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.hardwareManagementSystem.model.HWRequests;
import com.kpit.hardwareManagementSystem.repository.HWRequestsRepository;

import java.util.List;

@Service
public class HWRequestsService {
    @Autowired
    private HWRequestsRepository hwRequestsRepository;

    public List<HWRequests> getAllHWRequests() {
        return hwRequestsRepository.findAll();
    }

    public HWRequests getHWRequestsById(Long id) {
        return hwRequestsRepository.findById(id).orElse(null);
    }

    public HWRequests createHWRequests(HWRequests hwRequests) {
        return hwRequestsRepository.save(hwRequests);
    }

    public void deleteHWRequests(Long id) {
        hwRequestsRepository.deleteById(id);
    }
}
