package com.campusconnect.dto.job;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Job description is required")
    private String description;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    @NotNull(message = "Package LPA is required")
    private BigDecimal packageLpa;

    @NotNull(message = "Minimum CGPA is required")
    private Double minCgpa;

    @NotNull(message = "Graduation year is required")
    private Integer graduationYear;

    @NotNull(message = "Application deadline is required")
    private LocalDate applicationDeadline;

    private String jobType;

    private String location;

    private String status;

    @Builder.Default
    private List<String> eligibleBranches = new ArrayList<>();

    @Builder.Default
    private List<String> requiredSkills = new ArrayList<>();
}
