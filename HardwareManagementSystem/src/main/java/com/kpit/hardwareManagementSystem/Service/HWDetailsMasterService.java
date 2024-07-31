package com.kpit.hardwareManagementSystem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.hardwareManagementSystem.model.HWDetailsMaster;
import com.kpit.hardwareManagementSystem.repository.HWDetailsMasterRepository;

import java.util.List;

@Service
public class HWDetailsMasterService {
    @Autowired
    private HWDetailsMasterRepository hwDetailsMasterRepository;

    public List<HWDetailsMaster> getAllHWDetailsMasters() {
        return hwDetailsMasterRepository.findAll();
    }

    public HWDetailsMaster getHWDetailsMasterById(Long id) {
        return hwDetailsMasterRepository.findById(id).orElse(null);
    }

    public HWDetailsMaster createHWDetailsMaster(HWDetailsMaster hwDetailsMaster) {
        return hwDetailsMasterRepository.save(hwDetailsMaster);
    }

    public void deleteHWDetailsMaster(Long id) {
        hwDetailsMasterRepository.deleteById(id);
    }
}
