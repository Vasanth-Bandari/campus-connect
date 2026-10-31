package com.campusconnect.dto.admin;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriveResponse {

    private Long id;
    private String title;
    private Long companyId;
    private String companyName;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
