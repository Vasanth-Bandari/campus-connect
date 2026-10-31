package com.campusconnect.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_results")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PlacementResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false, unique = true)
    private Application application;

    @Column(name = "package_lpa", precision = 10, scale = 2)
    private BigDecimal packageLpa;

    @Column(name = "offer_date")
    private LocalDate offerDate;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "offer_letter_url", length = 500)
    private String offerLetterUrl;

    @Column(name = "has_joined")
    private boolean hasJoined = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
