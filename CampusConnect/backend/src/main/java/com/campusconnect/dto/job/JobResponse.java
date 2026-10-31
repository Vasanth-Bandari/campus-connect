package com.campusconnect.dto.job;

import com.campusconnect.dto.company.CompanyResponse;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private String jobType;
    private String location;
    private BigDecimal packageLpa;
    private Double minCgpa;
    private Integer graduationYear;
    private LocalDate applicationDeadline;
    private String status;
    private CompanyResponse company;
    private List<String> eligibleBranches;
    private List<String> requiredSkills;
    private LocalDateTime createdAt;
}
