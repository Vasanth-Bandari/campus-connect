package com.campusconnect.entity;

import com.campusconnect.entity.enums.JobStatus;
import com.campusconnect.entity.enums.JobType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drive_id")
    private RecruitmentDrive drive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruiter_id", nullable = false)
    private Recruiter recruiter;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", length = 20)
    private JobType jobType = JobType.FULL_TIME;

    @Column(length = 255)
    private String location;

    @Column(name = "package_lpa", precision = 10, scale = 2)
    private BigDecimal packageLpa;

    @Column(name = "min_cgpa", precision = 4, scale = 2)
    private Double minCgpa = 0.0;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private JobStatus status = JobStatus.OPEN;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_eligible_branches", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "branch")
    @Builder.Default
    private List<String> eligibleBranches = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_required_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    @Builder.Default
    private List<String> requiredSkills = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
