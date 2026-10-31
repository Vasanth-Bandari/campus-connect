package com.campusconnect.service;

import com.campusconnect.dto.company.CompanyResponse;
import com.campusconnect.dto.job.JobRequest;
import com.campusconnect.dto.job.JobResponse;
import com.campusconnect.dto.job.JobSummaryResponse;
import com.campusconnect.entity.Company;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Recruiter;
import com.campusconnect.entity.enums.JobStatus;
import com.campusconnect.entity.enums.JobType;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.exception.UnauthorizedException;
import com.campusconnect.repository.CompanyRepository;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.RecruiterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final RecruiterRepository recruiterRepository;
    private final CompanyRepository companyRepository;

    @Transactional
    public JobResponse createJob(JobRequest request, Long recruiterId) {
        Recruiter recruiter = findRecruiter(recruiterId);

        Company company = recruiter.getCompany();
        if (company == null && request.getCompanyId() != null) {
            company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + request.getCompanyId()));
        }

        if (company == null) {
            throw new ResourceNotFoundException("Company not associated with recruiter or request");
        }

        JobType jobType = JobType.FULL_TIME;
        if (request.getJobType() != null && !request.getJobType().isBlank()) {
            try {
                jobType = JobType.valueOf(request.getJobType().toUpperCase());
            } catch (IllegalArgumentException ignored) {
            }
        }

        JobStatus status = JobStatus.OPEN;
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            try {
                status = JobStatus.valueOf(request.getStatus().toUpperCase());
            } catch (IllegalArgumentException ignored) {
            }
        }

        Job job = Job.builder()
                .title(request.getTitle().trim())
                .description(request.getDescription().trim())
                .company(company)
                .recruiter(recruiter)
                .jobType(jobType)
                .location(request.getLocation())
                .packageLpa(request.getPackageLpa())
                .minCgpa(request.getMinCgpa())
                .graduationYear(request.getGraduationYear())
                .applicationDeadline(request.getApplicationDeadline())
                .status(status)
                .eligibleBranches(request.getEligibleBranches() != null ? new ArrayList<>(request.getEligibleBranches()) : new ArrayList<>())
                .requiredSkills(request.getRequiredSkills() != null ? new ArrayList<>(request.getRequiredSkills()) : new ArrayList<>())
                .build();

        Job saved = jobRepository.save(job);
        return mapToJobResponse(saved);
    }

    @Transactional(readOnly = true)
    public JobResponse getJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));
        return mapToJobResponse(job);
    }

    @Transactional(readOnly = true)
    public Page<JobSummaryResponse> getAllOpenJobs(Pageable pageable) {
        return jobRepository.findByStatus(JobStatus.OPEN, pageable)
                .map(this::mapToJobSummaryResponse);
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getRecruiterJobs(Long recruiterId) {
        Recruiter recruiter = findRecruiter(recruiterId);
        return jobRepository.findByRecruiterId(recruiter.getId()).stream()
                .map(this::mapToJobResponse)
                .toList();
    }

    @Transactional
    public JobResponse updateJob(Long id, JobRequest request, Long recruiterId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

        Recruiter recruiter = findRecruiter(recruiterId);
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not authorized to modify this job posting");
        }

        job.setTitle(request.getTitle().trim());
        job.setDescription(request.getDescription().trim());
        if (request.getLocation() != null) {
            job.setLocation(request.getLocation().trim());
        }
        if (request.getPackageLpa() != null) {
            job.setPackageLpa(request.getPackageLpa());
        }
        if (request.getMinCgpa() != null) {
            job.setMinCgpa(request.getMinCgpa());
        }
        if (request.getGraduationYear() != null) {
            job.setGraduationYear(request.getGraduationYear());
        }
        if (request.getApplicationDeadline() != null) {
            job.setApplicationDeadline(request.getApplicationDeadline());
        }
        if (request.getJobType() != null && !request.getJobType().isBlank()) {
            try {
                job.setJobType(JobType.valueOf(request.getJobType().toUpperCase()));
            } catch (IllegalArgumentException ignored) {
            }
        }
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            try {
                job.setStatus(JobStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException ignored) {
            }
        }
        if (request.getEligibleBranches() != null) {
            job.setEligibleBranches(new ArrayList<>(request.getEligibleBranches()));
        }
        if (request.getRequiredSkills() != null) {
            job.setRequiredSkills(new ArrayList<>(request.getRequiredSkills()));
        }

        Job updated = jobRepository.save(job);
        return mapToJobResponse(updated);
    }

    @Transactional
    public void deleteJob(Long id, Long recruiterId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

        Recruiter recruiter = findRecruiter(recruiterId);
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not authorized to cancel this job posting");
        }

        job.setStatus(JobStatus.CANCELLED);
        jobRepository.save(job);
    }

    private Recruiter findRecruiter(Long recruiterIdOrUserId) {
        return recruiterRepository.findById(recruiterIdOrUserId)
                .or(() -> recruiterRepository.findByUserId(recruiterIdOrUserId))
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with ID: " + recruiterIdOrUserId));
    }

    public JobResponse mapToJobResponse(Job job) {
        CompanyResponse companyResponse = null;
        if (job.getCompany() != null) {
            companyResponse = CompanyResponse.builder()
                    .id(job.getCompany().getId())
                    .name(job.getCompany().getName())
                    .description(job.getCompany().getDescription())
                    .industry(job.getCompany().getIndustry())
                    .website(job.getCompany().getWebsite())
                    .logoUrl(job.getCompany().getLogoUrl())
                    .approved(job.getCompany().isApproved())
                    .build();
        }

        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .jobType(job.getJobType() != null ? job.getJobType().name() : null)
                .location(job.getLocation())
                .packageLpa(job.getPackageLpa())
                .minCgpa(job.getMinCgpa())
                .graduationYear(job.getGraduationYear())
                .applicationDeadline(job.getApplicationDeadline())
                .status(job.getStatus() != null ? job.getStatus().name() : null)
                .company(companyResponse)
                .eligibleBranches(job.getEligibleBranches() != null ? new ArrayList<>(job.getEligibleBranches()) : List.of())
                .requiredSkills(job.getRequiredSkills() != null ? new ArrayList<>(job.getRequiredSkills()) : List.of())
                .createdAt(job.getCreatedAt())
                .build();
    }

    public JobSummaryResponse mapToJobSummaryResponse(Job job) {
        return JobSummaryResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .companyName(job.getCompany() != null ? job.getCompany().getName() : null)
                .companyLogoUrl(job.getCompany() != null ? job.getCompany().getLogoUrl() : null)
                .location(job.getLocation())
                .packageLpa(job.getPackageLpa())
                .deadline(job.getApplicationDeadline())
                .status(job.getStatus() != null ? job.getStatus().name() : null)
                .jobType(job.getJobType() != null ? job.getJobType().name() : null)
                .build();
    }
}
