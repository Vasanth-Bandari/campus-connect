package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.dto.interview.InterviewResponse;
import com.campusconnect.dto.interview.ScheduleInterviewRequest;
import com.campusconnect.dto.interview.UpdateOutcomeRequest;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    private final UserRepository userRepository;

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<InterviewResponse>> scheduleInterview(@Valid @RequestBody ScheduleInterviewRequest request) {
        InterviewResponse response = interviewService.scheduleInterview(request, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Interview scheduled successfully", response));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getMyInterviews() {
        List<InterviewResponse> interviews = interviewService.getStudentInterviews(getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(interviews));
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getRecruiterInterviews() {
        List<InterviewResponse> interviews = interviewService.getRecruiterInterviews(getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(interviews));
    }

    @PatchMapping("/{id}/outcome")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<InterviewResponse>> updateOutcome(
            @PathVariable Long id,
            @Valid @RequestBody UpdateOutcomeRequest request) {
        InterviewResponse response = interviewService.updateOutcome(id, request, getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success("Interview outcome updated successfully", response));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getAllInterviews() {
        List<InterviewResponse> interviews = interviewService.getAllInterviews();
        return ResponseEntity.ok(ApiResponse.success(interviews));
    }
}
