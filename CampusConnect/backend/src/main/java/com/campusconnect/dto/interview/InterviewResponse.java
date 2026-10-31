package com.campusconnect.dto.interview;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponse {

    private Long id;
    private Long applicationId;
    private String studentName;
    private String jobTitle;
    private LocalDateTime scheduledAt;
    private String mode;
    private String venue;
    private String meetingLink;
    private Integer round;
    private String outcome;
    private String feedback;
}
