package com.campusconnect.repository;

import com.campusconnect.entity.PlacementResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlacementResultRepository extends JpaRepository<PlacementResult, Long> {
    Optional<PlacementResult> findByApplicationId(Long applicationId);
    Optional<PlacementResult> findByApplicationStudentId(Long studentId);
}
