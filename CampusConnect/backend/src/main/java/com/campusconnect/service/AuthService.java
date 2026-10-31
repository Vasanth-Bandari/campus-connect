package com.campusconnect.service;

import com.campusconnect.dto.auth.AuthResponse;
import com.campusconnect.dto.auth.LoginRequest;
import com.campusconnect.dto.auth.RegisterRecruiterRequest;
import com.campusconnect.dto.auth.RegisterStudentRequest;
import com.campusconnect.entity.Company;
import com.campusconnect.entity.Recruiter;
import com.campusconnect.entity.Student;
import com.campusconnect.entity.User;
import com.campusconnect.entity.enums.Role;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.exception.UnauthorizedException;
import com.campusconnect.repository.CompanyRepository;
import com.campusconnect.repository.RecruiterRepository;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    @Transactional
    public AuthResponse registerStudent(RegisterStudentRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }
        if (studentRepository.existsByRollNumber(request.getRollNumber())) {
            throw new DuplicateResourceException("Roll number already registered: " + request.getRollNumber());
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .active(true)
                .build();
        user = userRepository.save(user);

        Student student = Student.builder()
                .user(user)
                .fullName(request.getFullName())
                .rollNumber(request.getRollNumber())
                .branch(request.getBranch())
                .cgpa(request.getCgpa())
                .graduationYear(request.getGraduationYear())
                .phone(request.getPhone())
                .placed(false)
                .build();
        studentRepository.save(student);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails, user.getId(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .profileComplete(true)
                .build();
    }

    @Transactional
    public AuthResponse registerRecruiter(RegisterRecruiterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }

        Company company = companyRepository.findByName(request.getCompanyName())
                .orElseGet(() -> companyRepository.save(Company.builder()
                        .name(request.getCompanyName())
                        .description(request.getCompanyName() + " - Partner Organization")
                        .industry("Technology")
                        .website("https://example.com")
                        .approved(false)
                        .build()));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.RECRUITER)
                .active(true)
                .build();
        user = userRepository.save(user);

        Recruiter recruiter = Recruiter.builder()
                .user(user)
                .company(company)
                .fullName(request.getFullName())
                .designation(request.getDesignation())
                .phone(request.getPhone())
                .approved(false)
                .build();
        recruiterRepository.save(recruiter);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails, user.getId(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .profileComplete(true)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        if (!user.isActive()) {
            throw new UnauthorizedException("User account is deactivated. Contact administrator.");
        }

        boolean profileComplete = true;
        if (user.getRole() == Role.STUDENT) {
            profileComplete = studentRepository.findByUserId(user.getId()).isPresent();
        } else if (user.getRole() == Role.RECRUITER) {
            profileComplete = recruiterRepository.findByUserId(user.getId()).isPresent();
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails, user.getId(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .profileComplete(profileComplete)
                .build();
    }
}
