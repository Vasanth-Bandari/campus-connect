package com.campusconnect.dto.student;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfileResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String rollNumber;
    private String branch;
    private Double cgpa;
    private Integer graduationYear;
    private String phone;
    private String skills;
    private String resumeUrl;
    private boolean placed;
}
