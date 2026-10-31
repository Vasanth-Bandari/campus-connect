package com.campusconnect.service;

import com.campusconnect.dto.interview.InterviewResponse;
import com.campusconnect.dto.interview.ScheduleInterviewRequest;
import com.campusconnect.dto.interview.UpdateOutcomeRequest;
import com.campusconnect.entity.Application;
import com.campusconnect.entity.Interview;
import com.campusconnect.entity.Recruiter;
import com.campusconnect.entity.Student;
import com.campusconnect.entity.enums.InterviewMode;
import com.campusconnect.entity.enums.InterviewOutcome;
import com.campusconnect.entity.enums.NotificationType;
import com.campusconnect.exception.CampusConnectException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.exception.UnauthorizedException;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.InterviewRepository;
import com.campusconnect.repository.RecruiterRepository;
import com.campusconnect.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;
    private final RecruiterRepository recruiterRepository;
    private final StudentRepository studentRepository;
    private final NotificationService notificationService;

    public InterviewResponse scheduleInterview(ScheduleInterviewRequest request, Long recruiterId) {
        Application application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + request.getApplicationId()));

        Recruiter recruiter = findRecruiter(recruiterId);
        if (!application.getJob().getRecruiter().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not authorized to schedule interviews for this application");
        }

        InterviewMode mode = InterviewMode.ONLINE;
        if (request.getMode() != null && !request.getMode().isBlank()) {
            try {
                mode = InterviewMode.valueOf(request.getMode().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new CampusConnectException("Invalid interview mode: " + request.getMode(), 400);
            }
        }

        Interview interview = Interview.builder()
                .application(application)
                .scheduledAt(request.getScheduledAt())
                .mode(mode)
                .venue(request.getVenue())
                .meetingLink(request.getMeetingLink())
                .round(request.getRound() != null ? request.getRound() : 1)
                .outcome(InterviewOutcome.PENDING)
                .build();

        Interview saved = interviewRepository.save(interview);

        // Notify Student
        notificationService.sendNotification(
                application.getStudent().getUser().getId(),
                "Interview Scheduled",
                "Interview (Round " + saved.getRound() + ") scheduled for " + application.getJob().getTitle() + " on " + saved.getScheduledAt(),
                NotificationType.INFO
        );

        return mapToInterviewResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<InterviewResponse> getStudentInterviews(Long studentId) {
        Student student = findStudent(studentId);
        return interviewRepository.findByStudentId(student.getId()).stream()
                .map(this::mapToInterviewResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<InterviewResponse> getRecruiterInterviews(Long recruiterId) {
        Recruiter recruiter = findRecruiter(recruiterId);
        return interviewRepository.findByRecruiterId(recruiter.getId()).stream()
                .map(this::mapToInterviewResponse)
                .toList();
    }

    public InterviewResponse updateOutcome(Long interviewId, UpdateOutcomeRequest request, Long recruiterId) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with ID: " + interviewId));

        Recruiter recruiter = findRecruiter(recruiterId);
        if (!interview.getApplication().getJob().getRecruiter().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not authorized to update this interview");
        }

        InterviewOutcome outcome;
        try {
            outcome = InterviewOutcome.valueOf(request.getOutcome().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new CampusConnectException("Invalid interview outcome: " + request.getOutcome(), 400);
        }

        interview.setOutcome(outcome);
        if (request.getFeedback() != null) {
            interview.setFeedback(request.getFeedback().trim());
        }

        Interview updated = interviewRepository.save(interview);

        // Notify student about outcome
        NotificationType notifType = outcome == InterviewOutcome.PASSED ? NotificationType.SUCCESS : NotificationType.INFO;
        notificationService.sendNotification(
                interview.getApplication().getStudent().getUser().getId(),
                "Interview Result Updated",
                "Round " + updated.getRound() + " interview for " + interview.getApplication().getJob().getTitle() + " marked as: " + outcome.name(),
                notifType
        );

        return mapToInterviewResponse(updated);
    }

    @Transactional(readOnly = true)
    public List<InterviewResponse> getAllInterviews() {
        return interviewRepository.findAll().stream()
                .map(this::mapToInterviewResponse)
                .toList();
    }

    private Recruiter findRecruiter(Long recruiterIdOrUserId) {
        return recruiterRepository.findById(recruiterIdOrUserId)
                .or(() -> recruiterRepository.findByUserId(recruiterIdOrUserId))
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with ID: " + recruiterIdOrUserId));
    }

    private Student findStudent(Long studentIdOrUserId) {
        return studentRepository.findById(studentIdOrUserId)
                .or(() -> studentRepository.findByUserId(studentIdOrUserId))
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentIdOrUserId));
    }

    public InterviewResponse mapToInterviewResponse(Interview interview) {
        return InterviewResponse.builder()
                .id(interview.getId())
                .applicationId(interview.getApplication() != null ? interview.getApplication().getId() : null)
                .studentName(interview.getApplication() != null && interview.getApplication().getStudent() != null
                        ? interview.getApplication().getStudent().getFullName() : null)
                .jobTitle(interview.getApplication() != null && interview.getApplication().getJob() != null
                        ? interview.getApplication().getJob().getTitle() : null)
                .scheduledAt(interview.getScheduledAt())
                .mode(interview.getMode() != null ? interview.getMode().name() : null)
                .venue(interview.getVenue())
                .meetingLink(interview.getMeetingLink())
                .round(interview.getRound())
                .outcome(interview.getOutcome() != null ? interview.getOutcome().name() : null)
                .feedback(interview.getFeedback())
                .build();
    }
}
