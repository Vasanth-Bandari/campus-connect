package com.campusconnect;

import com.campusconnect.dto.auth.AuthResponse;
import com.campusconnect.dto.auth.LoginRequest;
import com.campusconnect.dto.auth.RegisterStudentRequest;
import com.campusconnect.entity.Student;
import com.campusconnect.entity.User;
import com.campusconnect.entity.enums.Role;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.repository.CompanyRepository;
import com.campusconnect.repository.RecruiterRepository;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.security.JwtUtil;
import com.campusconnect.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private RecruiterRepository recruiterRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsService userDetailsService;

    @InjectMocks
    private AuthService authService;

    private RegisterStudentRequest registerRequest;
    private User studentUser;
    private Student student;
    private UserDetails userDetails;

    @BeforeEach
    void setUp() {
        registerRequest = RegisterStudentRequest.builder()
                .email("student@example.com")
                .password("Password123")
                .fullName("John Doe")
                .rollNumber("CS202401")
                .branch("Computer Science")
                .graduationYear(2025)
                .cgpa(8.5)
                .phone("9876543210")
                .build();

        studentUser = User.builder()
                .id(1L)
                .email("student@example.com")
                .password("encoded_pass")
                .role(Role.STUDENT)
                .active(true)
                .build();

        student = Student.builder()
                .id(10L)
                .user(studentUser)
                .fullName("John Doe")
                .rollNumber("CS202401")
                .branch("Computer Science")
                .graduationYear(2025)
                .cgpa(8.5)
                .build();

        userDetails = org.springframework.security.core.userdetails.User.builder()
                .username("student@example.com")
                .password("encoded_pass")
                .roles("STUDENT")
                .build();
    }

    @Test
    void registerStudent_success() {
        when(userRepository.existsByEmail("student@example.com")).thenReturn(false);
        when(studentRepository.existsByRollNumber("CS202401")).thenReturn(false);
        when(passwordEncoder.encode("Password123")).thenReturn("encoded_pass");
        when(userRepository.save(any(User.class))).thenReturn(studentUser);
        when(studentRepository.save(any(Student.class))).thenReturn(student);
        when(userDetailsService.loadUserByUsername("student@example.com")).thenReturn(userDetails);
        when(jwtUtil.generateToken(any(UserDetails.class), eq(1L), eq("STUDENT"))).thenReturn("mock_jwt_token");

        AuthResponse response = authService.registerStudent(registerRequest);

        assertNotNull(response);
        assertEquals("mock_jwt_token", response.getToken());
        assertEquals(1L, response.getUserId());
        assertEquals("student@example.com", response.getEmail());
        assertEquals("STUDENT", response.getRole());
        assertTrue(response.isProfileComplete());

        verify(userRepository, times(1)).save(any(User.class));
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    void registerStudent_duplicateEmail_throwsException() {
        when(userRepository.existsByEmail("student@example.com")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> authService.registerStudent(registerRequest));
        verify(userRepository, never()).save(any(User.class));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    void login_success() {
        LoginRequest loginRequest = LoginRequest.builder()
                .email("student@example.com")
                .password("Password123")
                .build();

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
        when(userRepository.findByEmail("student@example.com")).thenReturn(Optional.of(studentUser));
        when(studentRepository.findByUserId(1L)).thenReturn(Optional.of(student));
        when(userDetailsService.loadUserByUsername("student@example.com")).thenReturn(userDetails);
        when(jwtUtil.generateToken(any(UserDetails.class), eq(1L), eq("STUDENT"))).thenReturn("valid_jwt_token");

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("valid_jwt_token", response.getToken());
        assertEquals(1L, response.getUserId());
        assertEquals("student@example.com", response.getEmail());
        assertEquals("STUDENT", response.getRole());
        assertTrue(response.isProfileComplete());
    }

    @Test
    void login_invalidCredentials_throwsException() {
        LoginRequest loginRequest = LoginRequest.builder()
                .email("student@example.com")
                .password("WrongPassword")
                .build();

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThrows(BadCredentialsException.class, () -> authService.login(loginRequest));
        verify(userRepository, never()).findByEmail(anyString());
    }
}
