package com.campusconnect.repository;

import com.campusconnect.entity.RecruitmentDrive;
import com.campusconnect.entity.enums.DriveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentDriveRepository extends JpaRepository<RecruitmentDrive, Long> {
    List<RecruitmentDrive> findByCompanyId(Long companyId);
    List<RecruitmentDrive> findByStatus(DriveStatus status);
}
