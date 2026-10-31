package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.dto.eligibility.EligibilityResponse;
import com.campusconnect.dto.job.JobResponse;
import com.campusconnect.dto.student.StudentDashboardResponse;
import com.campusconnect.dto.student.StudentProfileRequest;
import com.campusconnect.dto.student.StudentProfileResponse;
import com.campusconnect.eligibility.EligibilityService;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.CampusConnectException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final EligibilityService eligibilityService;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    @Value("${campusconnect.upload-dir:uploads/resumes}")
    private String uploadDir;

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    private Student getCurrentStudent() {
        Long userId = getCurrentUserId();
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found for current user"));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfileResponse>> getProfile() {
        StudentProfileResponse profile = studentService.getProfile(getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfileResponse>> updateProfile(@Valid @RequestBody StudentProfileRequest request) {
        StudentProfileResponse profile = studentService.updateProfile(getCurrentUserId(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", profile));
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadResume(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new CampusConnectException("Cannot upload empty file", 400);
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equalsIgnoreCase("application/pdf")) {
            throw new CampusConnectException("Only PDF documents are allowed for resume upload", 400);
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new CampusConnectException("File size must not exceed 5MB", 400);
        }

        Student student = getCurrentStudent();
        String filename = student.getId() + "_" + System.currentTimeMillis() + ".pdf";

        try {
            Path targetDir = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(targetDir);

            Path targetPath = targetDir.resolve(filename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/api/files/resume/" + filename;
            studentService.updateResumeUrl(student.getUser().getId(), fileUrl);

            return ResponseEntity.ok(ApiResponse.success("Resume uploaded successfully", Map.of("url", fileUrl)));
        } catch (IOException e) {
            throw new CampusConnectException("Failed to store resume file: " + e.getMessage(), 500);
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<StudentDashboardResponse>> getDashboard() {
        StudentDashboardResponse dashboard = studentService.getDashboard(getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(dashboard));
    }

    @GetMapping("/eligibility/{jobId}")
    public ResponseEntity<ApiResponse<EligibilityResponse>> checkEligibility(@PathVariable Long jobId) {
        Student student = getCurrentStudent();
        EligibilityResponse response = eligibilityService.checkEligibility(student.getId(), jobId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/jobs/eligible")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getEligibleJobs() {
        Student student = getCurrentStudent();
        List<JobResponse> jobs = eligibilityService.getEligibleJobs(student.getId());
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }
}
