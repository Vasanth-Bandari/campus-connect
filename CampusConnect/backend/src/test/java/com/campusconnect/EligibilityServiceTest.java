package com.campusconnect;

import com.campusconnect.dto.eligibility.EligibilityResponse;
import com.campusconnect.eligibility.EligibilityService;
import com.campusconnect.entity.Company;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Student;
import com.campusconnect.entity.enums.JobStatus;
import com.campusconnect.entity.enums.JobType;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EligibilityServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private EligibilityService eligibilityService;

    private Student testStudent;
    private Job testJob;

    @BeforeEach
    void setUp() {
        Company company = Company.builder()
                .id(1L)
                .name("Acme Corp")
                .industry("Technology")
                .build();

        testStudent = Student.builder()
                .id(1L)
                .fullName("Alice Smith")
                .rollNumber("CS101")
                .branch("Computer Science")
                .cgpa(8.5)
                .graduationYear(2025)
                .skills("Java, Spring Boot, MySQL, Git")
                .build();

        testJob = Job.builder()
                .id(100L)
                .title("Software Engineer")
                .description("Junior SE role")
                .company(company)
                .jobType(JobType.FULL_TIME)
                .location("Bangalore")
                .packageLpa(BigDecimal.valueOf(12.0))
                .minCgpa(7.5)
                .graduationYear(2025)
                .applicationDeadline(LocalDate.now().plusDays(30))
                .status(JobStatus.OPEN)
                .eligibleBranches(List.of("Computer Science", "Information Technology"))
                .requiredSkills(List.of("Java", "Spring Boot"))
                .build();
    }

    @Test
    void checkEligibility_allPassing_returnsEligible() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));
        when(jobRepository.findById(100L)).thenReturn(Optional.of(testJob));

        EligibilityResponse response = eligibilityService.checkEligibility(1L, 100L);

        assertNotNull(response);
        assertTrue(response.isEligible());
        assertEquals(4, response.getCriteria().size());
        assertTrue(response.getCriteria().stream().allMatch(c -> c.isPassed()));
        assertTrue(response.getSummary().contains("meets all"));
    }

    @Test
    void checkEligibility_lowCgpa_returnsNotEligible() {
        testStudent.setCgpa(6.5); // Minimum required is 7.5

        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));
        when(jobRepository.findById(100L)).thenReturn(Optional.of(testJob));

        EligibilityResponse response = eligibilityService.checkEligibility(1L, 100L);

        assertNotNull(response);
        assertFalse(response.isEligible());
        assertTrue(response.getCriteria().stream()
                .anyMatch(c -> c.getName().equals("CGPA") && !c.isPassed()));
        assertTrue(response.getSummary().contains("CGPA"));
    }

    @Test
    void checkEligibility_wrongBranch_returnsNotEligible() {
        testStudent.setBranch("Civil Engineering"); // Job requires CS or IT

        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));
        when(jobRepository.findById(100L)).thenReturn(Optional.of(testJob));

        EligibilityResponse response = eligibilityService.checkEligibility(1L, 100L);

        assertNotNull(response);
        assertFalse(response.isEligible());
        assertTrue(response.getCriteria().stream()
                .anyMatch(c -> c.getName().equals("Branch") && !c.isPassed()));
        assertTrue(response.getSummary().contains("Branch"));
    }
}
