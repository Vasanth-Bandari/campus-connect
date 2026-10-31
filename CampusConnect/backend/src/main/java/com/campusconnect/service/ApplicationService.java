package com.campusconnect.service;

import com.campusconnect.dto.application.ApplicationResponse;
import com.campusconnect.dto.application.ApplyRequest;
import com.campusconnect.dto.application.UpdateStatusRequest;
import com.campusconnect.entity.Application;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Recruiter;
import com.campusconnect.entity.Student;
import com.campusconnect.entity.enums.ApplicationStatus;
import com.campusconnect.entity.enums.NotificationType;
import com.campusconnect.exception.CampusConnectException;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.exception.UnauthorizedException;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.RecruiterRepository;
import com.campusconnect.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;
    private final NotificationService notificationService;

    public ApplicationResponse apply(Long studentId, ApplyRequest request) {
        Student student = findStudent(studentId);

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + request.getJobId()));

        if (applicationRepository.existsByStudentIdAndJobId(student.getId(), job.getId())) {
            throw new DuplicateResourceException("You have already applied for this position: " + job.getTitle());
        }

        Application application = Application.builder()
                .student(student)
                .job(job)
                .status(ApplicationStatus.APPLIED)
                .coverLetter(request.getCoverLetter())
                .build();

        Application saved = applicationRepository.save(application);

        // Notify Student
        notificationService.sendNotification(
                student.getUser().getId(),
                "Application Submitted",
                "Your application for " + job.getTitle() + " at " + job.getCompany().getName() + " was submitted successfully.",
                NotificationType.SUCCESS
        );

        // Notify Recruiter
        if (job.getRecruiter() != null && job.getRecruiter().getUser() != null) {
            notificationService.sendNotification(
                    job.getRecruiter().getUser().getId(),
                    "New Application Received",
                    student.getFullName() + " applied for " + job.getTitle(),
                    NotificationType.INFO
            );
        }

        return mapToApplicationResponse(saved);
    }

    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getStudentApplications(Long studentId, Pageable pageable) {
        Student student = findStudent(studentId);
        return applicationRepository.findByStudentId(student.getId(), pageable)
                .map(this::mapToApplicationResponse);
    }

    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getJobApplications(Long jobId, Long recruiterId, Pageable pageable) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + jobId));

        Recruiter recruiter = findRecruiter(recruiterId);
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not authorized to view applications for this job");
        }

        return applicationRepository.findByJobId(jobId, pageable)
                .map(this::mapToApplicationResponse);
    }

    public ApplicationResponse updateStatus(Long appId, UpdateStatusRequest request, Long recruiterId) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + appId));

        Recruiter recruiter = findRecruiter(recruiterId);
        if (!application.getJob().getRecruiter().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not authorized to update applications for this job");
        }

        ApplicationStatus newStatus;
        try {
            newStatus = ApplicationStatus.valueOf(request.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new CampusConnectException("Invalid application status: " + request.getStatus(), 400);
        }

        application.setStatus(newStatus);
        Application updated = applicationRepository.save(application);

        // Notify student about status change
        NotificationType notifType = (newStatus == ApplicationStatus.SHORTLISTED || newStatus == ApplicationStatus.SELECTED)
                ? NotificationType.SUCCESS : NotificationType.INFO;

        notificationService.sendNotification(
                application.getStudent().getUser().getId(),
                "Application Status Updated",
                "Your application for " + application.getJob().getTitle() + " has been updated to: " + newStatus.name(),
                notifType
        );

        return mapToApplicationResponse(updated);
    }

    public void withdrawApplication(Long appId, Long studentId) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + appId));

        Student student = findStudent(studentId);
        if (!application.getStudent().getId().equals(student.getId())) {
            throw new UnauthorizedException("You are not authorized to withdraw this application");
        }

        if (application.getStatus() != ApplicationStatus.APPLIED) {
            throw new CampusConnectException("Cannot withdraw application with status: " + application.getStatus(), 400);
        }

        application.setStatus(ApplicationStatus.WITHDRAWN);
        applicationRepository.save(application);
    }

    private Student findStudent(Long studentIdOrUserId) {
        return studentRepository.findById(studentIdOrUserId)
                .or(() -> studentRepository.findByUserId(studentIdOrUserId))
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentIdOrUserId));
    }

    private Recruiter findRecruiter(Long recruiterIdOrUserId) {
        return recruiterRepository.findById(recruiterIdOrUserId)
                .or(() -> recruiterRepository.findByUserId(recruiterIdOrUserId))
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with ID: " + recruiterIdOrUserId));
    }

    public ApplicationResponse mapToApplicationResponse(Application application) {
        return ApplicationResponse.builder()
                .id(application.getId())
                .jobId(application.getJob() != null ? application.getJob().getId() : null)
                .jobTitle(application.getJob() != null ? application.getJob().getTitle() : null)
                .companyName(application.getJob() != null && application.getJob().getCompany() != null
                        ? application.getJob().getCompany().getName() : null)
                .studentId(application.getStudent() != null ? application.getStudent().getId() : null)
                .studentName(application.getStudent() != null ? application.getStudent().getFullName() : null)
                .status(application.getStatus() != null ? application.getStatus().name() : null)
                .appliedAt(application.getAppliedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }
}
