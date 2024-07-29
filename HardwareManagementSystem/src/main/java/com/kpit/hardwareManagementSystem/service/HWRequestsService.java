package com.kpit.hardwareManagementSystem.service;

import com.kpit.hardwareManagementSystem.model.HWRequests;
import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.repository.HWRequestsRepository;
import com.kpit.hardwareManagementSystem.repository.UsersRepository;
import com.kpit.hardwareManagementSystem.repository.HWDetailsRepository;
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

    public HWRequests raiseRequest(Long userId, Long hwDetailsId, String comments) {
        HWRequests request = new HWRequests();
        request.setRequestDate(LocalDateTime.now());
        request.setIsComplete(false);
        request.setComments(comments);
        request.setStatus("PENDING");
        request.setUser(usersRepository.findById(userId).orElse(null));
        request.setHwDetails(hwDetailsRepository.findById(hwDetailsId).orElse(null));
        return hwRequestsRepository.save(request);
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
