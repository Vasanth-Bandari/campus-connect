package com.campusconnect.dto.company;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyRequest {

    @NotBlank(message = "Company name is required")
    private String name;

    @NotBlank(message = "Company description is required")
    private String description;

    @NotBlank(message = "Industry is required")
    private String industry;

    @NotBlank(message = "Website is required")
    private String website;

    private String logoUrl;
}
