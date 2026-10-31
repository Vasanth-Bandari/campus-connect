package com.campusconnect.dto.admin;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchStat {

    private String branch;
    private long total;
    private long placed;
    private double percentage;
}
