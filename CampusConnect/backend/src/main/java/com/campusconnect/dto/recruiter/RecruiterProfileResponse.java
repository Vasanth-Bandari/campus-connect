package com.campusconnect.dto.recruiter;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruiterProfileResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private Long companyId;
    private String companyName;
    private String designation;
    private String phone;
    private boolean approved;
}
