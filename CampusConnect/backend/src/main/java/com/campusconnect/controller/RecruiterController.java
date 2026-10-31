package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.dto.job.JobResponse;
import com.campusconnect.dto.recruiter.RecruiterDashboardResponse;
import com.campusconnect.dto.recruiter.RecruiterProfileResponse;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Recruiter;
import com.campusconnect.entity.enums.ApplicationStatus;
import com.campusconnect.entity.enums.JobStatus;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.InterviewRepository;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.RecruiterRepository;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
@PreAuthorize("hasRole('RECRUITER')")
@RequiredArgsConstructor
public class RecruiterController {

    private final JobService jobService;
    private final RecruiterRepository recruiterRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    private Recruiter getCurrentRecruiter() {
        return recruiterRepository.findByUserId(getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found for current user"));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<RecruiterProfileResponse>> getProfile() {
        Recruiter recruiter = getCurrentRecruiter();
        RecruiterProfileResponse response = RecruiterProfileResponse.builder()
                .id(recruiter.getId())
                .userId(recruiter.getUser() != null ? recruiter.getUser().getId() : null)
                .fullName(recruiter.getFullName())
                .email(recruiter.getUser() != null ? recruiter.getUser().getEmail() : null)
                .companyId(recruiter.getCompany() != null ? recruiter.getCompany().getId() : null)
                .companyName(recruiter.getCompany() != null ? recruiter.getCompany().getName() : null)
                .designation(recruiter.getDesignation())
                .phone(recruiter.getPhone())
                .approved(recruiter.isApproved())
                .build();
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<RecruiterDashboardResponse>> getDashboard() {
        Recruiter recruiter = getCurrentRecruiter();
        List<Job> jobs = jobRepository.findByRecruiterId(recruiter.getId());

        long totalJobs = jobs.size();
        long openJobs = jobs.stream().filter(j -> j.getStatus() == JobStatus.OPEN).count();

        long totalApplications = 0;
        long pendingApplications = 0;
        long shortlistedApplications = 0;

        for (Job job : jobs) {
            totalApplications += applicationRepository.findByJobId(job.getId(), Pageable.unpaged()).getTotalElements();
            pendingApplications += applicationRepository.findByJobIdAndStatus(job.getId(), ApplicationStatus.APPLIED).size();
            shortlistedApplications += applicationRepository.findByJobIdAndStatus(job.getId(), ApplicationStatus.SHORTLISTED).size();
        }

        long totalInterviews = interviewRepository.findByRecruiterId(recruiter.getId()).size();

        RecruiterDashboardResponse dashboard = RecruiterDashboardResponse.builder()
                .totalJobs(totalJobs)
                .openJobs(openJobs)
                .totalApplications(totalApplications)
                .pendingApplications(pendingApplications)
                .shortlistedApplications(shortlistedApplications)
                .totalInterviews(totalInterviews)
                .build();

        return ResponseEntity.ok(ApiResponse.success(dashboard));
    }

    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getMyJobs() {
        Recruiter recruiter = getCurrentRecruiter();
        List<JobResponse> jobs = jobService.getRecruiterJobs(recruiter.getId());
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }
}
