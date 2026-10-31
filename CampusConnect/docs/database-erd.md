# CampusConnect – Database ER Diagram

## Entity Relationship Diagram

```mermaid
erDiagram
    USERS {
        bigint id PK
        varchar email UK
        varchar password
        enum role
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    STUDENTS {
        bigint id PK
        bigint user_id FK
        varchar full_name
        varchar roll_number UK
        varchar branch
        decimal cgpa
        int graduation_year
        varchar phone
        text skills
        varchar resume_url
        boolean is_placed
    }

    COMPANIES {
        bigint id PK
        varchar name UK
        text description
        varchar industry
        varchar website
        varchar logo_url
        boolean is_approved
    }

    RECRUITERS {
        bigint id PK
        bigint user_id FK
        bigint company_id FK
        varchar full_name
        varchar designation
        varchar phone
        boolean is_approved
    }

    RECRUITMENT_DRIVES {
        bigint id PK
        varchar title
        bigint company_id FK
        text description
        date start_date
        date end_date
        enum status
    }

    JOBS {
        bigint id PK
        bigint company_id FK
        bigint drive_id FK
        bigint recruiter_id FK
        varchar title
        text description
        enum job_type
        varchar location
        decimal package_lpa
        decimal min_cgpa
        int graduation_year
        date application_deadline
        enum status
    }

    JOB_ELIGIBLE_BRANCHES {
        bigint id PK
        bigint job_id FK
        varchar branch
    }

    JOB_REQUIRED_SKILLS {
        bigint id PK
        bigint job_id FK
        varchar skill
    }

    APPLICATIONS {
        bigint id PK
        bigint student_id FK
        bigint job_id FK
        enum status
        text cover_letter
        timestamp applied_at
        timestamp updated_at
    }

    INTERVIEWS {
        bigint id PK
        bigint application_id FK
        datetime scheduled_at
        enum mode
        varchar venue
        varchar meeting_link
        int round
        enum outcome
        text feedback
    }

    PLACEMENT_RESULTS {
        bigint id PK
        bigint application_id FK
        decimal package_lpa
        date offer_date
        date joining_date
        varchar offer_letter_url
        boolean has_joined
    }

    NOTIFICATIONS {
        bigint id PK
        bigint user_id FK
        varchar title
        text message
        enum type
        boolean is_read
        timestamp created_at
    }

    USERS ||--o| STUDENTS : "has profile"
    USERS ||--o| RECRUITERS : "has profile"
    STUDENTS ||--o{ APPLICATIONS : "submits"
    COMPANIES ||--o{ RECRUITERS : "employs"
    COMPANIES ||--o{ JOBS : "posts"
    COMPANIES ||--o{ RECRUITMENT_DRIVES : "runs"
    RECRUITERS ||--o{ JOBS : "manages"
    RECRUITMENT_DRIVES ||--o{ JOBS : "contains"
    JOBS ||--o{ JOB_ELIGIBLE_BRANCHES : "has"
    JOBS ||--o{ JOB_REQUIRED_SKILLS : "requires"
    JOBS ||--o{ APPLICATIONS : "receives"
    APPLICATIONS ||--o{ INTERVIEWS : "leads to"
    APPLICATIONS ||--o| PLACEMENT_RESULTS : "results in"
    USERS ||--o{ NOTIFICATIONS : "receives"
```

## Table Descriptions

| Table | Purpose |
|---|---|
| `users` | Central authentication table. All roles authenticate through here. |
| `students` | Extended profile for STUDENT users. One-to-one with users. |
| `companies` | Company registry. Must be approved by admin before jobs go live. |
| `recruiters` | Extended profile for RECRUITER users. Linked to one company. |
| `recruitment_drives` | Groups multiple jobs under a campus drive. |
| `jobs` | Individual job postings. Contains eligibility criteria. |
| `job_eligible_branches` | Element collection: which branches can apply to a job. |
| `job_required_skills` | Element collection: which skills are required for a job. |
| `applications` | Student ↔ Job junction with status tracking. |
| `interviews` | Interview schedule for a given application. Supports multiple rounds. |
| `placement_results` | Final outcome of a successful application: offer, package, joining. |
| `notifications` | User inbox for system events (shortlisted, interview scheduled, etc.). |

## Key Constraints

- `users.email` — UNIQUE (prevents duplicate accounts)
- `students.roll_number` — UNIQUE (prevents duplicate student profiles)
- `companies.name` — UNIQUE (prevents duplicate company entries)
- `applications(student_id, job_id)` — UNIQUE (prevents duplicate applications)
- `placement_results.application_id` — UNIQUE (one result per application)
- All FK relationships have appropriate CASCADE/RESTRICT rules
