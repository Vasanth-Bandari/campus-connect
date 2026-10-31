package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.CampusConnectException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final StudentService studentService;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    @Value("${campusconnect.upload-dir:uploads/resumes}")
    private String uploadDir;

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadResume(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new CampusConnectException("File cannot be empty", 400);
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equalsIgnoreCase("application/pdf")) {
            throw new CampusConnectException("Only PDF documents are supported for resumes", 400);
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new CampusConnectException("File size exceeds 5MB limit", 400);
        }

        Student student = studentRepository.findByUserId(getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

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
            throw new CampusConnectException("Could not upload file: " + e.getMessage(), 500);
        }
    }

    @GetMapping("/resume/{filename}")
    public ResponseEntity<Resource> serveResume(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                throw new ResourceNotFoundException("Resume file not found or unreadable: " + filename);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            throw new CampusConnectException("Error processing file path: " + e.getMessage(), 500);
        }
    }
}
