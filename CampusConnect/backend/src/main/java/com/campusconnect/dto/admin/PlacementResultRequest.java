package com.campusconnect.dto.admin;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementResultRequest {

    @NotNull(message = "Application ID is required")
    private Long applicationId;

    @NotNull(message = "Package LPA is required")
    private BigDecimal packageLpa;

    @NotNull(message = "Offer date is required")
    private LocalDate offerDate;

    private LocalDate joiningDate;

    private String offerLetterUrl;
}
