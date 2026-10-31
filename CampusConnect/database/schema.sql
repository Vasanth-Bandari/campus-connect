-- ============================================================
-- CampusConnect Database Schema
-- MySQL 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS campusconnect CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE campusconnect;

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- TABLE: users (base authentication table)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('STUDENT','RECRUITER','ADMIN') NOT NULL,
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: companies
-- ============================================================
CREATE TABLE IF NOT EXISTS companies (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL UNIQUE,
    description     TEXT,
    industry        VARCHAR(100),
    website         VARCHAR(255),
    logo_url        VARCHAR(500),
    is_approved     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_companies_name (name)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: students
-- ============================================================
CREATE TABLE IF NOT EXISTS students (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL UNIQUE,
    full_name       VARCHAR(255) NOT NULL,
    roll_number     VARCHAR(50) NOT NULL UNIQUE,
    branch          VARCHAR(100) NOT NULL,
    cgpa            DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    graduation_year INT NOT NULL,
    phone           VARCHAR(15),
    skills          TEXT COMMENT 'Comma-separated list',
    resume_url      VARCHAR(500),
    is_placed       BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_students_branch (branch),
    INDEX idx_students_cgpa (cgpa),
    INDEX idx_students_grad_year (graduation_year)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: recruiters
-- ============================================================
CREATE TABLE IF NOT EXISTS recruiters (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL UNIQUE,
    company_id      BIGINT NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    designation     VARCHAR(100),
    phone           VARCHAR(15),
    is_approved     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_recruiter_user    FOREIGN KEY (user_id)    REFERENCES users(id)     ON DELETE CASCADE,
    CONSTRAINT fk_recruiter_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT,
    INDEX idx_recruiters_company (company_id)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: recruitment_drives
-- ============================================================
CREATE TABLE IF NOT EXISTS recruitment_drives (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    company_id      BIGINT NOT NULL,
    description     TEXT,
    start_date      DATE,
    end_date        DATE,
    status          ENUM('UPCOMING','ACTIVE','COMPLETED','CANCELLED') DEFAULT 'UPCOMING',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_drive_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT,
    INDEX idx_drive_status (status)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: jobs
-- ============================================================
CREATE TABLE IF NOT EXISTS jobs (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id          BIGINT NOT NULL,
    drive_id            BIGINT,
    recruiter_id        BIGINT NOT NULL,
    title               VARCHAR(255) NOT NULL,
    description         TEXT NOT NULL,
    job_type            ENUM('FULL_TIME','INTERNSHIP','CONTRACT') DEFAULT 'FULL_TIME',
    location            VARCHAR(255),
    package_lpa         DECIMAL(10,2),
    min_cgpa            DECIMAL(4,2) DEFAULT 0.00,
    graduation_year     INT,
    application_deadline DATE,
    status              ENUM('DRAFT','OPEN','CLOSED','CANCELLED') DEFAULT 'OPEN',
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_job_company   FOREIGN KEY (company_id)   REFERENCES companies(id)           ON DELETE RESTRICT,
    CONSTRAINT fk_job_drive     FOREIGN KEY (drive_id)     REFERENCES recruitment_drives(id)  ON DELETE SET NULL,
    CONSTRAINT fk_job_recruiter FOREIGN KEY (recruiter_id) REFERENCES recruiters(id)          ON DELETE RESTRICT,
    INDEX idx_jobs_status (status),
    INDEX idx_jobs_deadline (application_deadline)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: job_eligible_branches
-- ============================================================
CREATE TABLE IF NOT EXISTS job_eligible_branches (
    id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id  BIGINT NOT NULL,
    branch  VARCHAR(100) NOT NULL,
    CONSTRAINT fk_branch_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    UNIQUE KEY uk_job_branch (job_id, branch)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: job_required_skills
-- ============================================================
CREATE TABLE IF NOT EXISTS job_required_skills (
    id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id  BIGINT NOT NULL,
    skill   VARCHAR(100) NOT NULL,
    CONSTRAINT fk_skill_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    UNIQUE KEY uk_job_skill (job_id, skill)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: applications
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id      BIGINT NOT NULL,
    job_id          BIGINT NOT NULL,
    status          ENUM('APPLIED','SHORTLISTED','REJECTED','SELECTED','WITHDRAWN') DEFAULT 'APPLIED',
    cover_letter    TEXT,
    applied_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_app_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_app_job     FOREIGN KEY (job_id)     REFERENCES jobs(id)     ON DELETE CASCADE,
    UNIQUE KEY uk_student_job (student_id, job_id),
    INDEX idx_app_status (status),
    INDEX idx_app_student (student_id),
    INDEX idx_app_job (job_id)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: interviews
-- ============================================================
CREATE TABLE IF NOT EXISTS interviews (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id  BIGINT NOT NULL,
    scheduled_at    DATETIME NOT NULL,
    mode            ENUM('ONLINE','OFFLINE','HYBRID') DEFAULT 'ONLINE',
    venue           VARCHAR(255),
    meeting_link    VARCHAR(500),
    round           INT DEFAULT 1,
    outcome         ENUM('PENDING','PASSED','FAILED','CANCELLED') DEFAULT 'PENDING',
    feedback        TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_interview_app FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_interview_scheduled (scheduled_at)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: placement_results
-- ============================================================
CREATE TABLE IF NOT EXISTS placement_results (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id  BIGINT NOT NULL UNIQUE,
    package_lpa     DECIMAL(10,2),
    offer_date      DATE,
    joining_date    DATE,
    offer_letter_url VARCHAR(500),
    has_joined      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_result_app FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: notifications
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    title       VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    type        ENUM('INFO','SUCCESS','WARNING','ERROR') DEFAULT 'INFO',
    is_read     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notif_user_read (user_id, is_read)
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
