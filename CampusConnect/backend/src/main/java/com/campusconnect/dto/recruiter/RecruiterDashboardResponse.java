package com.campusconnect.dto.recruiter;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruiterDashboardResponse {

    private long totalJobs;
    private long openJobs;
    private long totalApplications;
    private long pendingApplications;
    private long shortlistedApplications;
    private long totalInterviews;
}
