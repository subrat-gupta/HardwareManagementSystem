package com.kpit.hardwareManagementSystem.service;

import com.kpit.hardwareManagementSystem.dto.HWRequestDTO;
import com.kpit.hardwareManagementSystem.model.HWRequests;
import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.repository.HWRequestsRepository;
import com.kpit.hardwareManagementSystem.repository.UsersRepository;
import com.kpit.hardwareManagementSystem.repository.HWDetailsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HWRequestsService {

    @Autowired
    private HWRequestsRepository hwRequestsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private HWDetailsRepository hwDetailsRepository;

    @Autowired
    private ModelMapper modelMapper;

    public HWRequests raiseRequest(HWRequestDTO requestDTO) {
        HWRequests request = new HWRequests();
        request.setRequestDate(LocalDateTime.now());
        request.setIsComplete(false);
        request.setStatus("PENDING");
        request.setComments(requestDTO.getComments());
        request.setExpectedReturnDate(requestDTO.getExpectedReturnDate());
        request.setUser(usersRepository.findById(requestDTO.getUserId()).orElse(null));
        request.setHwDetails(hwDetailsRepository.findById(requestDTO.getHwDetailsId()).orElse(null));
        return hwRequestsRepository.save(request); // Ensure this line creates a new entry
    }

    public HWRequests approveRequest(Long requestId) {
        HWRequests request = hwRequestsRepository.findById(requestId).orElse(null);
        if (request != null) {
            request.setStatus("APPROVED");
            request.setIsComplete(true);
            hwRequestsRepository.save(request);
        }
        return request;
    }

    public HWRequests rejectRequest(Long requestId) {
        HWRequests request = hwRequestsRepository.findById(requestId).orElse(null);
        if (request != null) {
            request.setStatus("REJECTED");
            hwRequestsRepository.save(request);
        }
        return request;
    }

    public List<HWRequests> getAllRequests() {
        return hwRequestsRepository.findAll();
    }

    public List<HWRequests> getRequestsByUserId(Long userId) {
        Users user = usersRepository.findById(userId).orElse(null);
        return hwRequestsRepository.findByUser(user);
    }
}
