package com.campusconnect.repository;

import com.campusconnect.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUserId(Long userId);
    Optional<Student> findByRollNumber(String rollNumber);
    boolean existsByRollNumber(String rollNumber);
    boolean existsByUserId(Long userId);

    @Query("SELECT COUNT(s) FROM Student s WHERE s.placed = true")
    long countPlaced();

    @Query("SELECT COUNT(s) FROM Student s WHERE s.placed = false")
    long countNotPlaced();

    @Query("SELECT s.branch, COUNT(s), SUM(CASE WHEN s.placed = true THEN 1 ELSE 0 END) FROM Student s GROUP BY s.branch")
    List<Object[]> getBranchWiseStats();

    Page<Student> findByBranch(String branch, Pageable pageable);
    Page<Student> findByGraduationYear(Integer year, Pageable pageable);
}
