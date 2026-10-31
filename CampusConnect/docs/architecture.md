# CampusConnect Architecture

## System Overview

```mermaid
graph TB
    subgraph "Client Layer"
        B[Browser / React SPA]
    end
    
    subgraph "Frontend – Vite + React + TS"
        B --> LAND[Landing Page]
        B --> AUTH[Auth Pages]
        B --> SDASH[Student Dashboard]
        B --> RDASH[Recruiter Dashboard]
        B --> ADASH[Admin Dashboard]
    end

    subgraph "API Layer – Spring Boot REST"
        AUTH --> AUTHCTRL[AuthController]
        SDASH --> STUCTL[StudentController]
        SDASH --> JOBCTL[JobController]
        SDASH --> APPCTL[ApplicationController]
        RDASH --> RECCTL[RecruiterController]
        RDASH --> INTCTL[InterviewController]
        ADASH --> ADMINCTL[AdminController]
    end

    subgraph "Security – Spring Security + JWT"
        AUTHCTRL --> JWTSVC[JwtUtil]
        STUCTL --> JWTFLT[JwtAuthFilter]
        RECCTL --> JWTFLT
        ADMINCTL --> JWTFLT
    end

    subgraph "Service Layer"
        STUCTL --> STUSVC[StudentService]
        JOBCTL --> JOBSVC[JobService]
        APPCTL --> APPSVC[ApplicationService]
        RECCTL --> RECSVC[RecruiterService]
        INTCTL --> INTSVC[InterviewService]
        ADMINCTL --> ADMSVC[AdminService]
        STUSVC --> ELIGSVC[EligibilityService]
        APPSVC --> NOTIFSVC[NotificationService]
        INTSVC --> NOTIFSVC
    end

    subgraph "Persistence – Spring Data JPA + Hibernate"
        STUSVC --> SREP[StudentRepository]
        JOBSVC --> JREP[JobRepository]
        APPSVC --> AREP[ApplicationRepository]
        INTSVC --> IREP[InterviewRepository]
        NOTIFSVC --> NREP[NotificationRepository]
        ADMSVC --> PREP[PlacementResultRepository]
    end

    subgraph "Database – MySQL 8.0"
        SREP --> DB[(users, students)]
        JREP --> DB2[(jobs, companies)]
        AREP --> DB3[(applications)]
        IREP --> DB4[(interviews)]
        NREP --> DB5[(notifications)]
        PREP --> DB6[(placement_results)]
    end
```

## Layered Architecture

```
┌─────────────────────────────────────────────┐
│              Presentation Layer              │
│         React SPA (Vite + TypeScript)        │
│   Landing │ Auth │ Student │ Recruiter │ Admin│
└─────────────────┬───────────────────────────┘
                  │ HTTP/REST (JSON)
                  │ Authorization: Bearer JWT
┌─────────────────▼───────────────────────────┐
│              Controller Layer                │
│  @RestController + @PreAuthorize (RBAC)      │
│  Request validation + Response wrapping      │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│              Service Layer                   │
│  Business logic + Transaction management     │
│  Eligibility Engine + Notification dispatch  │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│             Repository Layer                 │
│  Spring Data JPA + Custom JPQL queries       │
│  Pagination + Sorting + Filtering            │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           Database Layer                     │
│  MySQL 8.0 – Normalized relational schema    │
│  12 tables, FK constraints, Indexes          │
└─────────────────────────────────────────────┘
```

## Authentication Flow

```
Client                Spring Boot            Database
  │                       │                     │
  ├─POST /auth/login──────►│                     │
  │  {email, password}    │                     │
  │                       ├─findByEmail(email)──►│
  │                       │◄─User─────────────────┤
  │                       │                     │
  │                       │─BCrypt.matches()─────►│
  │                       │◄─true────────────────►│
  │                       │                     │
  │                       │─generateJWT()─────►  │
  │◄──{token, role}───────┤                     │
  │                       │                     │
  ├─GET /api/student/profile                    │
  │  Authorization: Bearer {token}              │
  │                       │                     │
  │              JwtAuthFilter                  │
  │              validates token                │
  │              sets SecurityContext           │
  │                       │                     │
  │              @PreAuthorize                  │
  │              hasRole('STUDENT')             │
  │◄──{profile data}──────┤                     │
```

## Eligibility Engine

The `EligibilityService` performs multi-criteria eligibility checking:

1. **CGPA Check**: `student.cgpa >= job.minCgpa`
2. **Branch Check**: `student.branch ∈ job.eligibleBranches`
3. **Graduation Year Check**: `student.graduationYear == job.graduationYear`
4. **Skills Check**: `requiredSkills ⊆ student.skills` (comma-separated, case-insensitive)

Response format:
```json
{
  "eligible": false,
  "criteria": [
    { "name": "CGPA", "required": "8.0", "actual": "7.5", "passed": false },
    { "name": "Branch", "required": "CSE, IT", "actual": "CSE", "passed": true },
    { "name": "Graduation Year", "required": "2025", "actual": "2025", "passed": true },
    { "name": "Required Skills", "required": "Java, Algorithms", "actual": "Java, Python", "passed": false }
  ],
  "summary": "Not eligible. Failed: CGPA (7.5 < 8.0), Skills (missing: Algorithms)"
}
```

## Security Architecture

| Mechanism | Implementation |
|---|---|
| Password Hashing | BCrypt with strength 12 |
| Authentication | JWT (HS256, 24h expiry) |
| Authorization | Spring Security + @PreAuthorize |
| Session | Stateless (no server session) |
| SQL Injection | JPA/Hibernate (parameterized queries) |
| File Upload | PDF only, max 5MB, renamed on save |
| CORS | Origin whitelist from config |
| Credentials | Environment variables only |
