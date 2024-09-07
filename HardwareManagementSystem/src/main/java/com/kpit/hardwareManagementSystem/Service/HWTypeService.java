package com.kpit.hardwareManagementSystem.service;

import com.kpit.hardwareManagementSystem.model.HWType;
import com.kpit.hardwareManagementSystem.repository.HWTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HWTypeService {

    @Autowired
    private HWTypeRepository hwTypeRepository;

    // Fetch all hardware types
    public List<HWType> getAllHWTypes() {
        return hwTypeRepository.findAll();
    }

    // Fetch specific hardware type by ID
    public HWType getHWTypeById(Long id) {
        return hwTypeRepository.findById(id).orElse(null);
    }

    // Save new or updated hardware type
    public HWType saveHWType(HWType hwType) {
        return hwTypeRepository.save(hwType);
    }

    // Delete hardware type
    public void deleteHWType(Long id) {
        hwTypeRepository.deleteById(id);
    }
}
