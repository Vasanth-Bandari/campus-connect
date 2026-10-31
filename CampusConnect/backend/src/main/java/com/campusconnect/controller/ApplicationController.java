package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.dto.application.ApplicationResponse;
import com.campusconnect.dto.application.ApplyRequest;
import com.campusconnect.dto.application.UpdateStatusRequest;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    private final UserRepository userRepository;

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ApplicationResponse>> apply(@Valid @RequestBody ApplyRequest request) {
        ApplicationResponse response = applicationService.apply(getCurrentUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application submitted successfully", response));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Page<ApplicationResponse>>> getMyApplications(
            @PageableDefault(size = 10, sort = "appliedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ApplicationResponse> applications = applicationService.getStudentApplications(getCurrentUserId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(applications));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Void>> withdrawApplication(@PathVariable Long id) {
        applicationService.withdrawApplication(id, getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success("Application withdrawn successfully", null));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<Page<ApplicationResponse>>> getJobApplicants(
            @PathVariable Long jobId,
            @PageableDefault(size = 10, sort = "appliedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ApplicationResponse> applications = applicationService.getJobApplications(jobId, getCurrentUserId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(applications));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<ApplicationResponse>> updateApplicationStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {
        ApplicationResponse response = applicationService.updateStatus(id, request, getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success("Application status updated successfully", response));
    }
}
