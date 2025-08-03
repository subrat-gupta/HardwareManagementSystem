package com.kpit.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kpit.model.Hardware;
import com.kpit.model.HardwareStatus;
import com.kpit.repository.HardwareRepository;

@Service
public class HardwareService {
 @Autowired
 private HardwareRepository hardwareRepository;

 public Hardware createHardware(Hardware hardware) {
     hardware.setCreatedAt(LocalDateTime.now());
     hardware.setUpdatedAt(LocalDateTime.now());
     return hardwareRepository.save(hardware);
 }

 public List<Hardware> getAvailableHardware() {
     return hardwareRepository.findByStatus(HardwareStatus.AVAILABLE);
 }
 public List<Hardware> getAllHardware() {
     return hardwareRepository.findAll();
 }

 public Hardware addHardware(Hardware hardware) {
     hardware.setCreatedAt(LocalDateTime.now());
     hardware.setUpdatedAt(LocalDateTime.now());
     return hardwareRepository.save(hardware);
 }

 public Hardware updateHardware(Long id, Hardware hardware) {
     Optional<Hardware> existingHardware = hardwareRepository.findById(id);
     if (existingHardware.isPresent()) {
         Hardware updatedHardware = existingHardware.get();
         updatedHardware.setName(hardware.getName());
         updatedHardware.setType(hardware.getType());
         updatedHardware.setSerialNumber(hardware.getSerialNumber());
         updatedHardware.setKpitSerialNumber(hardware.getKpitSerialNumber());
         updatedHardware.setPartNumber(hardware.getPartNumber());
         updatedHardware.setMultiModule(hardware.isMultiModule());
         updatedHardware.setUnusable(hardware.isUnusable());
         updatedHardware.setStatus(hardware.getStatus());
         updatedHardware.setUpdatedAt(LocalDateTime.now());
         return hardwareRepository.save(updatedHardware);
     }
     return null;
 }
 public void deleteHardware(Long id) {
     hardwareRepository.deleteById(id);
 }
 
}
