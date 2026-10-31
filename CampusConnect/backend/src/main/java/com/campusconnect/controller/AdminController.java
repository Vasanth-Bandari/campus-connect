package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.dto.admin.DashboardStatsResponse;
import com.campusconnect.dto.admin.DriveRequest;
import com.campusconnect.dto.admin.DriveResponse;
import com.campusconnect.dto.admin.PlacementResultRequest;
import com.campusconnect.dto.company.CompanyResponse;
import com.campusconnect.dto.recruiter.RecruiterProfileResponse;
import com.campusconnect.dto.student.StudentProfileResponse;
import com.campusconnect.entity.PlacementResult;
import com.campusconnect.service.AdminService;
import com.campusconnect.service.CompanyService;
import com.campusconnect.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final StudentService studentService;
    private final CompanyService companyService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        DashboardStatsResponse stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/students")
    public ResponseEntity<ApiResponse<Page<StudentProfileResponse>>> getAllStudents(
            @PageableDefault(size = 20, sort = "rollNumber") Pageable pageable) {
        Page<StudentProfileResponse> students = studentService.getAllStudents(pageable);
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @GetMapping("/recruiters")
    public ResponseEntity<ApiResponse<List<RecruiterProfileResponse>>> getAllRecruiters() {
        List<RecruiterProfileResponse> recruiters = adminService.getAllRecruiters();
        return ResponseEntity.ok(ApiResponse.success(recruiters));
    }

    @PatchMapping("/recruiters/{id}/approve")
    public ResponseEntity<ApiResponse<Void>> approveRecruiter(@PathVariable Long id) {
        adminService.approveRecruiter(id);
        return ResponseEntity.ok(ApiResponse.success("Recruiter approved successfully", null));
    }

    @GetMapping("/companies")
    public ResponseEntity<ApiResponse<List<CompanyResponse>>> getAllCompanies() {
        List<CompanyResponse> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(ApiResponse.success(companies));
    }

    @PatchMapping("/companies/{id}/approve")
    public ResponseEntity<ApiResponse<Void>> approveCompany(@PathVariable Long id) {
        adminService.approveCompany(id);
        return ResponseEntity.ok(ApiResponse.success("Company approved successfully", null));
    }

    @PatchMapping("/users/{id}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivateUser(@PathVariable Long id) {
        adminService.deactivateUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deactivated successfully", null));
    }

    @PostMapping("/placement-results")
    public ResponseEntity<ApiResponse<PlacementResult>> createPlacementResult(
            @Valid @RequestBody PlacementResultRequest request) {
        PlacementResult result = adminService.createPlacementResult(
                request.getApplicationId(),
                request.getPackageLpa(),
                request.getOfferDate()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Placement offer recorded successfully", result));
    }

    @GetMapping("/drives")
    public ResponseEntity<ApiResponse<List<DriveResponse>>> getAllDrives() {
        List<DriveResponse> drives = adminService.getAllDrives();
        return ResponseEntity.ok(ApiResponse.success(drives));
    }

    @PostMapping("/drives")
    public ResponseEntity<ApiResponse<DriveResponse>> createDrive(@Valid @RequestBody DriveRequest request) {
        DriveResponse drive = adminService.createDrive(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Recruitment drive created successfully", drive));
    }
}
