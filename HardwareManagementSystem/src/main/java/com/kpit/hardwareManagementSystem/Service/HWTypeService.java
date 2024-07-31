package com.kpit.hardwareManagementSystem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.hardwareManagementSystem.model.HWType;
import com.kpit.hardwareManagementSystem.repository.HWTypeRepository;

import java.util.List;

@Service
public class HWTypeService {
    @Autowired
    private HWTypeRepository hwTypeRepository;

    public List<HWType> getAllHWTypes() {
        return hwTypeRepository.findAll();
    }

    public HWType getHWTypeById(Long id) {
        return hwTypeRepository.findById(id).orElse(null);
    }

    public HWType createHWType(HWType hwType) {
        return hwTypeRepository.save(hwType);
    }

    public void deleteHWType(Long id) {
        hwTypeRepository.deleteById(id);
    }
}
