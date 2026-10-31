package com.campusconnect.service;

import com.campusconnect.dto.admin.BranchStat;
import com.campusconnect.dto.admin.DashboardStatsResponse;
import com.campusconnect.dto.admin.DriveRequest;
import com.campusconnect.dto.admin.DriveResponse;
import com.campusconnect.dto.recruiter.RecruiterProfileResponse;
import com.campusconnect.entity.*;
import com.campusconnect.entity.enums.ApplicationStatus;
import com.campusconnect.entity.enums.DriveStatus;
import com.campusconnect.entity.enums.JobStatus;
import com.campusconnect.entity.enums.NotificationType;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final PlacementResultRepository placementResultRepository;
    private final RecruitmentDriveRepository recruitmentDriveRepository;
    private final NotificationService notificationService;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        long totalStudents = studentRepository.count();
        long totalCompanies = companyRepository.count();
        long totalRecruiters = recruiterRepository.count();
        long openJobs = jobRepository.countByStatus(JobStatus.OPEN);
        long totalApplications = applicationRepository.count();
        long studentsPlaced = studentRepository.countPlaced();
        long studentsNotPlaced = studentRepository.countNotPlaced();

        double placementPercentage = totalStudents > 0
                ? Math.round(((double) studentsPlaced / totalStudents) * 10000.0) / 100.0
                : 0.0;

        List<Object[]> rawBranchStats = studentRepository.getBranchWiseStats();
        List<BranchStat> branchStats = new ArrayList<>();
        if (rawBranchStats != null) {
            for (Object[] row : rawBranchStats) {
                String branch = row[0] != null ? row[0].toString() : "Unknown";
                long total = row[1] != null ? ((Number) row[1]).longValue() : 0L;
                long placed = row[2] != null ? ((Number) row[2]).longValue() : 0L;
                double pct = total > 0 ? Math.round(((double) placed / total) * 10000.0) / 100.0 : 0.0;
                branchStats.add(BranchStat.builder()
                        .branch(branch)
                        .total(total)
                        .placed(placed)
                        .percentage(pct)
                        .build());
            }
        }

        return DashboardStatsResponse.builder()
                .totalStudents(totalStudents)
                .totalCompanies(totalCompanies)
                .totalRecruiters(totalRecruiters)
                .openJobs(openJobs)
                .totalApplications(totalApplications)
                .studentsPlaced(studentsPlaced)
                .studentsNotPlaced(studentsNotPlaced)
                .placementPercentage(placementPercentage)
                .branchStats(branchStats)
                .build();
    }

    public void approveRecruiter(Long recruiterId) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with ID: " + recruiterId));
        recruiter.setApproved(true);
        recruiterRepository.save(recruiter);

        if (recruiter.getUser() != null) {
            notificationService.sendNotification(
                    recruiter.getUser().getId(),
                    "Recruiter Account Approved",
                    "Your recruiter account has been approved by the placement administrator.",
                    NotificationType.SUCCESS
            );
        }
    }

    public void approveCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + companyId));
        company.setApproved(true);
        companyRepository.save(company);
    }

    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        user.setActive(false);
        userRepository.save(user);
    }

    public PlacementResult createPlacementResult(Long applicationId, BigDecimal packageLpa, LocalDate offerDate) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));

        application.setStatus(ApplicationStatus.SELECTED);
        applicationRepository.save(application);

        Student student = application.getStudent();
        student.setPlaced(true);
        studentRepository.save(student);

        PlacementResult placementResult = placementResultRepository.findByApplicationId(applicationId)
                .orElseGet(() -> PlacementResult.builder()
                        .application(application)
                        .build());

        placementResult.setPackageLpa(packageLpa);
        placementResult.setOfferDate(offerDate != null ? offerDate : LocalDate.now());
        PlacementResult saved = placementResultRepository.save(placementResult);

        // Notify student
        notificationService.sendNotification(
                student.getUser().getId(),
                "Placement Offer Confirmed!",
                "Congratulations! You have received a placement offer from " +
                        application.getJob().getCompany().getName() + " with " + packageLpa + " LPA.",
                NotificationType.SUCCESS
        );

        return saved;
    }

    @Transactional(readOnly = true)
    public List<RecruiterProfileResponse> getAllRecruiters() {
        return recruiterRepository.findAll().stream()
                .map(this::mapToRecruiterProfileResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<DriveResponse> getAllDrives() {
        return recruitmentDriveRepository.findAll().stream()
                .map(this::mapToDriveResponse)
                .toList();
    }

    public DriveResponse createDrive(DriveRequest request) {
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + request.getCompanyId()));

        DriveStatus status = DriveStatus.UPCOMING;
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            try {
                status = DriveStatus.valueOf(request.getStatus().toUpperCase());
            } catch (IllegalArgumentException ignored) {
            }
        }

        RecruitmentDrive drive = RecruitmentDrive.builder()
                .title(request.getTitle())
                .company(company)
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(status)
                .build();

        RecruitmentDrive saved = recruitmentDriveRepository.save(drive);
        return mapToDriveResponse(saved);
    }

    public RecruiterProfileResponse mapToRecruiterProfileResponse(Recruiter recruiter) {
        return RecruiterProfileResponse.builder()
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
    }

    public DriveResponse mapToDriveResponse(RecruitmentDrive drive) {
        return DriveResponse.builder()
                .id(drive.getId())
                .title(drive.getTitle())
                .companyId(drive.getCompany() != null ? drive.getCompany().getId() : null)
                .companyName(drive.getCompany() != null ? drive.getCompany().getName() : null)
                .description(drive.getDescription())
                .startDate(drive.getStartDate())
                .endDate(drive.getEndDate())
                .status(drive.getStatus() != null ? drive.getStatus().name() : null)
                .build();
    }
}
