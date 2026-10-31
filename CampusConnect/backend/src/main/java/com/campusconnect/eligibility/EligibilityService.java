package com.campusconnect.eligibility;

import com.campusconnect.dto.company.CompanyResponse;
import com.campusconnect.dto.eligibility.EligibilityCriterion;
import com.campusconnect.dto.eligibility.EligibilityResponse;
import com.campusconnect.dto.job.JobResponse;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EligibilityService {

    private final JobRepository jobRepository;
    private final StudentRepository studentRepository;

    public EligibilityResponse checkEligibility(Long studentId, Long jobId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + jobId));

        List<EligibilityCriterion> criteria = new ArrayList<>();

        // 1. CGPA Criterion
        double studentCgpa = student.getCgpa() != null ? student.getCgpa() : 0.0;
        double minCgpa = job.getMinCgpa() != null ? job.getMinCgpa() : 0.0;
        boolean cgpaPassed = studentCgpa >= minCgpa;
        criteria.add(EligibilityCriterion.builder()
                .name("CGPA")
                .required(String.format(">= %.2f", minCgpa))
                .actual(String.format("%.2f", studentCgpa))
                .passed(cgpaPassed)
                .build());

        // 2. Branch Criterion
        List<String> eligibleBranches = job.getEligibleBranches() != null ? job.getEligibleBranches() : Collections.emptyList();
        String studentBranch = student.getBranch() != null ? student.getBranch().trim() : "";
        boolean branchPassed = eligibleBranches.isEmpty() || eligibleBranches.stream()
                .anyMatch(b -> b.equalsIgnoreCase(studentBranch));
        criteria.add(EligibilityCriterion.builder()
                .name("Branch")
                .required(eligibleBranches.isEmpty() ? "All branches" : String.join(", ", eligibleBranches))
                .actual(studentBranch.isEmpty() ? "Not specified" : studentBranch)
                .passed(branchPassed)
                .build());

        // 3. Graduation Year Criterion
        Integer requiredGradYear = job.getGraduationYear();
        Integer studentGradYear = student.getGraduationYear();
        boolean yearPassed = requiredGradYear == null || (studentGradYear != null && studentGradYear.equals(requiredGradYear));
        criteria.add(EligibilityCriterion.builder()
                .name("Graduation Year")
                .required(requiredGradYear != null ? String.valueOf(requiredGradYear) : "Any")
                .actual(studentGradYear != null ? String.valueOf(studentGradYear) : "Not specified")
                .passed(yearPassed)
                .build());

        // 4. Skills Criterion
        List<String> requiredSkills = job.getRequiredSkills() != null ? job.getRequiredSkills() : Collections.emptyList();
        Set<String> studentSkillSet = parseSkills(student.getSkills());
        boolean skillsPassed = requiredSkills.isEmpty() || requiredSkills.stream()
                .map(String::trim)
                .map(String::toLowerCase)
                .allMatch(studentSkillSet::contains);
        criteria.add(EligibilityCriterion.builder()
                .name("Required Skills")
                .required(requiredSkills.isEmpty() ? "None specified" : String.join(", ", requiredSkills))
                .actual(student.getSkills() != null && !student.getSkills().isBlank() ? student.getSkills() : "None")
                .passed(skillsPassed)
                .build());

        boolean eligible = criteria.stream().allMatch(EligibilityCriterion::isPassed);

        String summary;
        if (eligible) {
            summary = "Student meets all eligibility requirements for this job.";
        } else {
            List<String> failedCriteria = criteria.stream()
                    .filter(c -> !c.isPassed())
                    .map(EligibilityCriterion::getName)
                    .toList();
            summary = "Student is not eligible due to failing criteria: " + String.join(", ", failedCriteria) + ".";
        }

        return EligibilityResponse.builder()
                .eligible(eligible)
                .criteria(criteria)
                .summary(summary)
                .build();
    }

    public List<JobResponse> getEligibleJobs(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        Double cgpa = student.getCgpa() != null ? student.getCgpa() : 0.0;
        Integer gradYear = student.getGraduationYear() != null ? student.getGraduationYear() : 0;
        String branch = student.getBranch() != null ? student.getBranch() : "";

        List<Job> matchedJobs = jobRepository.findEligibleJobs(cgpa, gradYear, branch);
        Set<String> studentSkillSet = parseSkills(student.getSkills());

        return matchedJobs.stream()
                .filter(job -> {
                    List<String> requiredSkills = job.getRequiredSkills();
                    if (requiredSkills == null || requiredSkills.isEmpty()) {
                        return true;
                    }
                    return requiredSkills.stream()
                            .map(String::trim)
                            .map(String::toLowerCase)
                            .allMatch(studentSkillSet::contains);
                })
                .map(this::mapToJobResponse)
                .toList();
    }

    private Set<String> parseSkills(String skillsStr) {
        if (skillsStr == null || skillsStr.isBlank()) {
            return Collections.emptySet();
        }
        return Arrays.stream(skillsStr.split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toSet());
    }

    private JobResponse mapToJobResponse(Job job) {
        CompanyResponse companyResponse = null;
        if (job.getCompany() != null) {
            companyResponse = CompanyResponse.builder()
                    .id(job.getCompany().getId())
                    .name(job.getCompany().getName())
                    .description(job.getCompany().getDescription())
                    .industry(job.getCompany().getIndustry())
                    .website(job.getCompany().getWebsite())
                    .logoUrl(job.getCompany().getLogoUrl())
                    .approved(job.getCompany().isApproved())
                    .build();
        }

        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .jobType(job.getJobType() != null ? job.getJobType().name() : null)
                .location(job.getLocation())
                .packageLpa(job.getPackageLpa())
                .minCgpa(job.getMinCgpa())
                .graduationYear(job.getGraduationYear())
                .applicationDeadline(job.getApplicationDeadline())
                .status(job.getStatus() != null ? job.getStatus().name() : null)
                .company(companyResponse)
                .eligibleBranches(job.getEligibleBranches())
                .requiredSkills(job.getRequiredSkills())
                .createdAt(job.getCreatedAt())
                .build();
    }
}
