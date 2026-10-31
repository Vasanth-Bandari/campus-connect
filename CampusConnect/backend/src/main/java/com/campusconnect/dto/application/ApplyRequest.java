package com.campusconnect.dto.application;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplyRequest {

    @NotNull(message = "Job ID is required")
    private Long jobId;

    private String coverLetter;
}
