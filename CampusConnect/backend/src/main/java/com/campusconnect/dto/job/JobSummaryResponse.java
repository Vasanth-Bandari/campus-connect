package com.campusconnect.dto.job;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobSummaryResponse {

    private Long id;
    private String title;
    private String companyName;
    private String companyLogoUrl;
    private String location;
    private BigDecimal packageLpa;
    private LocalDate deadline;
    private String status;
    private String jobType;
}
