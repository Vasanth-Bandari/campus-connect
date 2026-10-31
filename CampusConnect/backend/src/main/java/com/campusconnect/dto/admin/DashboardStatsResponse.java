package com.campusconnect.dto.admin;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {

    private long totalStudents;
    private long totalCompanies;
    private long totalRecruiters;
    private long openJobs;
    private long totalApplications;
    private long studentsPlaced;
    private long studentsNotPlaced;
    private double placementPercentage;

    @Builder.Default
    private List<BranchStat> branchStats = new ArrayList<>();
}
