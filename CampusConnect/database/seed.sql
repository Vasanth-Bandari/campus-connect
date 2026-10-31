-- ============================================================
-- CampusConnect – Seed Data (Demo / Development)
-- Run AFTER schema.sql
-- ============================================================

USE campusconnect;

-- Admin user (password: Admin@123)
-- BCrypt hash of "Admin@123"
INSERT INTO users (email, password, role) VALUES
('admin@campusconnect.edu', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewRCZKV7jvkGx0K2', 'ADMIN');

-- Companies
INSERT INTO companies (name, description, industry, website, is_approved) VALUES
('Google LLC', 'Alphabet subsidiary specializing in internet services and products.', 'Technology', 'https://google.com', TRUE),
('Microsoft', 'Multinational technology corporation producing software, services and hardware.', 'Technology', 'https://microsoft.com', TRUE),
('Infosys', 'Indian multinational IT company offering business consulting and IT services.', 'IT Services', 'https://infosys.com', TRUE),
('Wipro', 'Global IT, consulting and business process services company.', 'IT Services', 'https://wipro.com', TRUE),
('Amazon', 'American multinational technology company focusing on e-commerce and cloud computing.', 'E-Commerce / Cloud', 'https://amazon.com', TRUE);

-- Recruiter users (password: Recruiter@123)
INSERT INTO users (email, password, role) VALUES
('recruiter.google@campusconnect.edu', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.ucrb0G1.O2', 'RECRUITER'),
('recruiter.infosys@campusconnect.edu', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.ucrb0G1.O2', 'RECRUITER');

INSERT INTO recruiters (user_id, company_id, full_name, designation, is_approved) VALUES
((SELECT id FROM users WHERE email='recruiter.google@campusconnect.edu'), 1, 'Priya Sharma', 'Campus Recruiter', TRUE),
((SELECT id FROM users WHERE email='recruiter.infosys@campusconnect.edu'), 3, 'Rahul Verma', 'HR Manager', TRUE);

-- Student users (password: Student@123)
INSERT INTO users (email, password, role) VALUES
('alice@student.edu', '$2a$12$38WC2iDFV7RBFSgqlFJbSedSJKl3O1m8lYBKYi69Xmt.9GOy3fIRq', 'STUDENT'),
('bob@student.edu',   '$2a$12$38WC2iDFV7RBFSgqlFJbSedSJKl3O1m8lYBKYi69Xmt.9GOy3fIRq', 'STUDENT'),
('carol@student.edu', '$2a$12$38WC2iDFV7RBFSgqlFJbSedSJKl3O1m8lYBKYi69Xmt.9GOy3fIRq', 'STUDENT');

INSERT INTO students (user_id, full_name, roll_number, branch, cgpa, graduation_year, phone, skills) VALUES
((SELECT id FROM users WHERE email='alice@student.edu'),   'Alice Johnson', 'CS2021001', 'Computer Science', 9.10, 2025, '9876543210', 'Java,Spring Boot,MySQL,React'),
((SELECT id FROM users WHERE email='bob@student.edu'),     'Bob Williams',  'CS2021002', 'Computer Science', 7.80, 2025, '9876543211', 'Python,Django,PostgreSQL'),
((SELECT id FROM users WHERE email='carol@student.edu'),   'Carol Davis',   'EC2021001', 'Electronics',      8.20, 2025, '9876543212', 'C,VLSI,Embedded Systems');

-- Jobs
INSERT INTO jobs (company_id, recruiter_id, title, description, job_type, location, package_lpa, min_cgpa, graduation_year, application_deadline, status) VALUES
(1, 1, 'Software Engineer', 'Build and scale Google products. Work on cutting-edge distributed systems.', 'FULL_TIME', 'Bangalore', 28.00, 8.0, 2025, '2025-02-28', 'OPEN'),
(1, 1, 'SWE Intern', 'Summer internship at Google working on real products.', 'INTERNSHIP', 'Hyderabad', 6.00, 7.5, 2025, '2025-01-31', 'OPEN'),
(3, 2, 'Systems Engineer', 'Join Infosys as a Systems Engineer trainee.', 'FULL_TIME', 'Pune', 4.50, 6.5, 2025, '2025-03-15', 'OPEN');

-- Eligible branches
INSERT INTO job_eligible_branches (job_id, branch) VALUES
(1, 'Computer Science'), (1, 'Information Technology'), (1, 'Electronics'),
(2, 'Computer Science'), (2, 'Information Technology'),
(3, 'Computer Science'), (3, 'Information Technology'), (3, 'Electronics'), (3, 'Mechanical');

-- Required skills
INSERT INTO job_required_skills (job_id, skill) VALUES
(1, 'Java'), (1, 'Algorithms'), (1, 'System Design'),
(2, 'Python'), (2, 'Algorithms'),
(3, 'Java'), (3, 'SQL');
