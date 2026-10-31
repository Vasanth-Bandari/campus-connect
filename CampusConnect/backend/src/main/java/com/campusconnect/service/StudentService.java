package com.campusconnect.service;

import com.campusconnect.dto.student.StudentDashboardResponse;
import com.campusconnect.dto.student.StudentProfileRequest;
import com.campusconnect.dto.student.StudentProfileResponse;
import com.campusconnect.eligibility.EligibilityService;
import com.campusconnect.entity.Application;
import com.campusconnect.entity.Student;
import com.campusconnect.entity.enums.ApplicationStatus;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.InterviewRepository;
import com.campusconnect.repository.NotificationRepository;
import com.campusconnect.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;
    private final NotificationRepository notificationRepository;
    private final EligibilityService eligibilityService;

    @Transactional(readOnly = true)
    public StudentProfileResponse getProfile(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + userId));
        return mapToProfileResponse(student);
    }

    @Transactional
    public StudentProfileResponse updateProfile(Long userId, StudentProfileRequest request) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + userId));

        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            student.setFullName(request.getFullName().trim());
        }
        if (request.getPhone() != null) {
            student.setPhone(request.getPhone().trim());
        }
        if (request.getSkills() != null) {
            student.setSkills(request.getSkills().trim());
        }
        if (request.getCgpa() != null) {
            student.setCgpa(request.getCgpa());
        }
        if (request.getGraduationYear() != null) {
            student.setGraduationYear(request.getGraduationYear());
        }
        if (request.getBranch() != null && !request.getBranch().isBlank()) {
            student.setBranch(request.getBranch().trim());
        }

        Student updated = studentRepository.save(student);
        return mapToProfileResponse(updated);
    }

    @Transactional
    public StudentProfileResponse updateResumeUrl(Long userId, String resumeUrl) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + userId));

        student.setResumeUrl(resumeUrl);
        Student updated = studentRepository.save(student);
        return mapToProfileResponse(updated);
    }

    @Transactional(readOnly = true)
    public StudentDashboardResponse getDashboard(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + userId));

        List<Application> applications = applicationRepository.findByStudentId(student.getId(), Pageable.unpaged()).getContent();
        int totalApplications = applications.size();
        int shortlistedCount = (int) applications.stream()
                .filter(app -> app.getStatus() == ApplicationStatus.SHORTLISTED)
                .count();

        int interviewCount = interviewRepository.findByStudentId(student.getId()).size();
        int unreadNotifications = (int) notificationRepository.countByUserIdAndReadFalse(userId);
        int eligibleJobsCount = eligibilityService.getEligibleJobs(student.getId()).size();

        boolean profileComplete = student.getFullName() != null && !student.getFullName().isBlank()
                && student.getRollNumber() != null && !student.getRollNumber().isBlank()
                && student.getBranch() != null && !student.getBranch().isBlank()
                && student.getCgpa() != null && student.getCgpa() > 0.0
                && student.getResumeUrl() != null && !student.getResumeUrl().isBlank();

        return StudentDashboardResponse.builder()
                .profileComplete(profileComplete)
                .totalApplications(totalApplications)
                .shortlistedCount(shortlistedCount)
                .interviewCount(interviewCount)
                .unreadNotifications(unreadNotifications)
                .eligibleJobsCount(eligibleJobsCount)
                .build();
    }

    @Transactional(readOnly = true)
    public Page<StudentProfileResponse> getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable).map(this::mapToProfileResponse);
    }

    public StudentProfileResponse mapToProfileResponse(Student student) {
        return StudentProfileResponse.builder()
                .id(student.getId())
                .userId(student.getUser() != null ? student.getUser().getId() : null)
                .fullName(student.getFullName())
                .email(student.getUser() != null ? student.getUser().getEmail() : null)
                .rollNumber(student.getRollNumber())
                .branch(student.getBranch())
                .cgpa(student.getCgpa())
                .graduationYear(student.getGraduationYear())
                .phone(student.getPhone())
                .skills(student.getSkills())
                .resumeUrl(student.getResumeUrl())
                .placed(student.isPlaced())
                .build();
    }
}
