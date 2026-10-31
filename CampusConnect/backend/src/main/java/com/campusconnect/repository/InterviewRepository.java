package com.campusconnect.repository;

import com.campusconnect.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByApplicationId(Long applicationId);

    @Query("SELECT i FROM Interview i WHERE i.application.student.id = :studentId ORDER BY i.scheduledAt ASC")
    List<Interview> findByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT i FROM Interview i WHERE i.application.job.recruiter.id = :recruiterId ORDER BY i.scheduledAt ASC")
    List<Interview> findByRecruiterId(@Param("recruiterId") Long recruiterId);
}
