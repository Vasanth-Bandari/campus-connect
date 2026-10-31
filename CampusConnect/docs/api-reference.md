# CampusConnect – API Reference

**Base URL**: `http://localhost:8080/api`  
**Authentication**: `Authorization: Bearer <JWT_TOKEN>`

---

## Authentication Endpoints

| Method | Endpoint | Auth | Request Body | Response |
|---|---|---|---|---|
| POST | `/auth/register/student` | Public | `{email, password, fullName, rollNumber, branch, cgpa, graduationYear, phone}` | `AuthResponse` |
| POST | `/auth/register/recruiter` | Public | `{email, password, fullName, companyName, designation, phone}` | `AuthResponse` |
| POST | `/auth/login` | Public | `{email, password}` | `AuthResponse` |

**AuthResponse**:
```json
{
  "success": true,
  "data": {
    "token": "eyJ...",
    "userId": 1,
    "email": "alice@student.edu",
    "role": "STUDENT",
    "profileComplete": true
  }
}
```

---

## Student Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/student/profile` | STUDENT | Get own profile |
| PUT | `/student/profile` | STUDENT | Update profile |
| POST | `/student/resume` | STUDENT | Upload resume (multipart/form-data) |
| GET | `/student/dashboard` | STUDENT | Dashboard statistics |
| GET | `/student/eligibility/{jobId}` | STUDENT | Check eligibility for job |
| GET | `/student/jobs/eligible` | STUDENT | Get all eligible jobs |

---

## Job Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/jobs?page=0&size=10` | Auth | All open jobs (paginated) |
| GET | `/jobs/{id}` | Auth | Job detail |
| POST | `/jobs` | RECRUITER | Create job |
| PUT | `/jobs/{id}` | RECRUITER | Update own job |
| DELETE | `/jobs/{id}` | RECRUITER | Cancel own job |

---

## Application Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/applications` | STUDENT | Apply to job |
| GET | `/applications/my?page=0&size=10` | STUDENT | My applications |
| DELETE | `/applications/{id}` | STUDENT | Withdraw application |
| GET | `/applications/job/{jobId}?page=0&size=10` | RECRUITER | Applicants for a job |
| PATCH | `/applications/{id}/status` | RECRUITER | Update status (SHORTLISTED/REJECTED) |

---

## Interview Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/interviews` | RECRUITER | Schedule interview |
| GET | `/interviews/my` | STUDENT | My interview schedule |
| GET | `/interviews/recruiter` | RECRUITER | Interviews I scheduled |
| PATCH | `/interviews/{id}/outcome` | RECRUITER | Update interview outcome |
| GET | `/interviews` | ADMIN | All interviews |

---

## Notification Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/notifications?page=0&size=20` | Auth | Get notifications |
| GET | `/notifications/unread-count` | Auth | Count unread |
| PATCH | `/notifications/read-all` | Auth | Mark all as read |
| PATCH | `/notifications/{id}/read` | Auth | Mark one as read |

---

## Company Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/companies` | Public | All companies |
| GET | `/companies/{id}` | Public | Company detail |
| POST | `/companies` | RECRUITER/ADMIN | Create company |
| PUT | `/companies/{id}` | RECRUITER/ADMIN | Update company |

---

## Admin Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/dashboard` | ADMIN | Full stats |
| GET | `/admin/students?page=0&size=20` | ADMIN | All students |
| GET | `/admin/recruiters` | ADMIN | All recruiters |
| PATCH | `/admin/recruiters/{id}/approve` | ADMIN | Approve recruiter |
| GET | `/admin/companies` | ADMIN | All companies |
| PATCH | `/admin/companies/{id}/approve` | ADMIN | Approve company |
| PATCH | `/admin/users/{id}/deactivate` | ADMIN | Deactivate user |
| POST | `/admin/placement-results` | ADMIN | Create placement result |
| GET | `/admin/drives` | ADMIN | All recruitment drives |
| POST | `/admin/drives` | ADMIN | Create drive |

---

## Standard Response Format

### Success
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### Error
```json
{
  "success": false,
  "message": "Resource not found",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "must be a valid email",
    "cgpa": "must be between 0.0 and 10.0"
  }
}
```

---

## HTTP Status Codes Used

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (wrong role) |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 500 | Internal Server Error |
