package com.campusconnect.dto.student;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfileRequest {

    private String fullName;
    private String phone;
    private String skills;
    @DecimalMin(value = "0.0", inclusive = true)
    @DecimalMax(value = "10.0", inclusive = true)
    private Double cgpa;
    private Integer graduationYear;
    private String branch;
}
