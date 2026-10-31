package com.campusconnect.entity;

import com.campusconnect.entity.enums.InterviewMode;
import com.campusconnect.entity.enums.InterviewOutcome;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(name = "scheduled_at", nullable = false)
    private LocalDateTime scheduledAt;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private InterviewMode mode = InterviewMode.ONLINE;

    @Column(length = 255)
    private String venue;

    @Column(name = "meeting_link", length = 500)
    private String meetingLink;

    @Column
    private Integer round = 1;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private InterviewOutcome outcome = InterviewOutcome.PENDING;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
