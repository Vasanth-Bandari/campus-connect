package com.campusconnect.dto.student;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDashboardResponse {

    private boolean profileComplete;
    private int totalApplications;
    private int shortlistedCount;
    private int interviewCount;
    private int unreadNotifications;
    private int eligibleJobsCount;
}
