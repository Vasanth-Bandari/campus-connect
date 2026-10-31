package com.campusconnect.dto.interview;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateOutcomeRequest {

    @NotBlank(message = "Outcome is required")
    private String outcome;

    private String feedback;
}
