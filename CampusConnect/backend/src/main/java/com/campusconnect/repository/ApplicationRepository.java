package com.campusconnect.repository;

import com.campusconnect.entity.Application;
import com.campusconnect.entity.enums.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Page<Application> findByStudentId(Long studentId, Pageable pageable);
    Page<Application> findByJobId(Long jobId, Pageable pageable);
    Optional<Application> findByStudentIdAndJobId(Long studentId, Long jobId);
    boolean existsByStudentIdAndJobId(Long studentId, Long jobId);
    long countByStatus(ApplicationStatus status);
    List<Application> findByJobIdAndStatus(Long jobId, ApplicationStatus status);
}
