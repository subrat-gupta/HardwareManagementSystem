package com.kpit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.kpit.model.Hardware;
import com.kpit.model.HardwareStatus;
import com.kpit.model.Issue;
import com.kpit.model.IssueStatus;
import com.kpit.model.Request;
import com.kpit.model.RequestStatus;
import com.kpit.model.Users;
import com.kpit.repository.HardwareRepository;
import com.kpit.repository.IssueRepository;
import com.kpit.repository.RequestRepository;
import com.kpit.repository.UserRepository;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private HardwareRepository hardwareRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    public Issue issueHardware(Long requestId, Long issuedByUserId) {
        Request request = requestService.getRequestById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        Users issuedBy = userService.getUserById(issuedByUserId).orElseThrow(() -> new RuntimeException("User not found"));

        Issue issue = new Issue();
        issue.setRequest(request);
        issue.setIssuedBy(issuedBy);
        issue.setIssuedDate(LocalDate.now());
        issue.setStatus(IssueStatus.ISSUED);
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());
        approveRequest(requestId);
        changeHarwareStatus(request.getHardware().getHardwareId());
        return issueRepository.save(issue);
    }
    
    private void changeHarwareStatus(Long hardwareId) {
    	Optional<Hardware> optional = hardwareRepository.findById(hardwareId);
	    optional.ifPresent(hardware -> {
	    	hardware.setStatus(HardwareStatus.ISSUED);
	    	hardwareRepository.save(hardware);
	    });
		
	}
    
    private void changeHarwareStatusToAvailable(Long hardwareId) {
    	Optional<Hardware> optional = hardwareRepository.findById(hardwareId);
	    optional.ifPresent(hardware -> {
	    	hardware.setStatus(HardwareStatus.AVAILABLE);
	    	hardwareRepository.save(hardware);
	    });
		
	}

	private void approveRequest(Long requestId) {
	    Optional<Request> optional = requestRepository.findById(requestId);
	    optional.ifPresent(request -> {
	        request.setStatus(RequestStatus.APPROVED);
	        requestRepository.save(request);
	    });
	}
    
    public List<Issue> getMyIssuedHardware(UserDetails userDetails) {
    	Users user = userRepository.findByEmail(userDetails.getUsername());
        return issueRepository.findByIssuedByAndStatus(user, IssueStatus.ISSUED);
    }
    
    public List<Hardware> getMyIssuedHardware(Long userId) {
        List<Hardware> issuedHardwareList = new ArrayList<>();

        // Step 1: Get all issued entries (status = ISSUED)
        List<Issue> issuedList = issueRepository.findByStatus(IssueStatus.ISSUED);

        for (Issue issue : issuedList) {
            Long requestId = issue.getRequest().getRequestId();  // Assuming Issue has getRequest()
            Optional<Request> requestOpt = requestRepository.findById(requestId);

            if (requestOpt.isPresent()) {
                Request request = requestOpt.get();

                // Step 2: Check if the request belongs to the user
                if (request.getUser().getUserId().equals(userId)) {
                    Long hardwareId = request.getHardware().getHardwareId();
                    Optional<Hardware> hardwareOpt = hardwareRepository.findById(hardwareId);

                    // Step 3: If hardware exists, add to the list
                    hardwareOpt.ifPresent(issuedHardwareList::add);
                }
            }
        }

        return issuedHardwareList;
    }


    public boolean returnIssuedHardware(Long userId,Long hwId) {
    	List<Request> hwRequests = requestRepository.findByUser_UserIdAndHardware_HardwareId(userId, hwId);
    	if (hwRequests.isEmpty()) {
            throw new RuntimeException("No hardware request found for userId: " + userId + " and hardwareId: " + hwId);
        }

    	for (Request hwRequest : hwRequests) {
            Optional<Issue> issueOpt = issueRepository.findByRequest_RequestIdAndStatus(hwRequest.getRequestId(), IssueStatus.ISSUED);

            if (issueOpt.isPresent()) {
                Issue issue = issueOpt.get();

                // Step 3: Mark the issue as returned
                issue.setStatus(IssueStatus.RETURNED);
                issue.setActualReturnDate(LocalDate.now());
                issueRepository.save(issue);
                changeHarwareStatusToAvailable(hwId);
                return true; // Successfully returned
            }
    	}
    	throw new RuntimeException("No issued hardware found for return with userId: " + userId + " and hardwareId: " + hwId);
    }
}
