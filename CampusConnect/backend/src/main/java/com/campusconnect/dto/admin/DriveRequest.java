package com.campusconnect.dto.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriveRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;
}
