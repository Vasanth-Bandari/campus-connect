package com.campusconnect.repository;

import com.campusconnect.entity.Job;
import com.campusconnect.entity.enums.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByStatus(JobStatus status, Pageable pageable);
    List<Job> findByRecruiterId(Long recruiterId);
    Page<Job> findByCompanyId(Long companyId, Pageable pageable);
    long countByStatus(JobStatus status);

    @Query("SELECT j FROM Job j WHERE j.status = 'OPEN' AND j.minCgpa <= :cgpa AND j.graduationYear = :year AND :branch MEMBER OF j.eligibleBranches")
    List<Job> findEligibleJobs(@Param("cgpa") Double cgpa, @Param("year") Integer year, @Param("branch") String branch);
}
