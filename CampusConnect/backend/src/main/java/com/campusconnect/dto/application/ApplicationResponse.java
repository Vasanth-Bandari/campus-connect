package com.campusconnect.dto.application;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {

    private Long id;
    private Long jobId;
    private String jobTitle;
    private String companyName;
    private Long studentId;
    private String studentName;
    private String status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}
