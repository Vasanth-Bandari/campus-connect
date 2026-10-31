package com.campusconnect.dto.auth;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterStudentRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$", message = "Password must contain at least one letter and one number")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Roll number is required")
    private String rollNumber;

    @NotBlank(message = "Branch is required")
    private String branch;

    @NotNull(message = "Graduation year is required")
    private Integer graduationYear;

    @NotNull(message = "CGPA is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "CGPA must be at least 0.0")
    @DecimalMax(value = "10.0", inclusive = true, message = "CGPA cannot exceed 10.0")
    private Double cgpa;

    private String phone;
}
