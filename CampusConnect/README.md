# CampusConnect
## HACK-P410 – Campus Recruitment Portal

<div align="center">

![CampusConnect](https://img.shields.io/badge/CampusConnect-v1.0.0-3B82F6?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

**A centralized campus recruitment management system connecting students, placement administrators and company recruiters.**

</div>

---

## Problem Statement

**HACK-P410** – Develop a centralized campus recruitment management system that:
- Connects students, placement administrators and company recruiters
- Manages the complete campus placement lifecycle
- Tracks student profiles, job applications, interview schedules, and placement results
- Provides analytics and reporting for placement administrators

---

## Implemented Features

### 🎓 Student Module
- [x] Student registration and login (JWT authentication)
- [x] Complete profile management (branch, CGPA, graduation year, skills, phone)
- [x] Resume upload and replacement (PDF, max 5MB)
- [x] Browse all open job listings with search and filter
- [x] **Automatic eligibility checking** per job (CGPA, branch, graduation year, skills)
- [x] One-click job application with cover letter
- [x] Application status tracking (Applied → Shortlisted → Interview → Selected)
- [x] Interview schedule viewing
- [x] Placement result viewing
- [x] Notification center with unread count

### 🏢 Recruiter Module
- [x] Recruiter registration (admin approval required)
- [x] Company profile management
- [x] Job posting with full eligibility criteria
- [x] Multi-step job creation (basic info → criteria → review)
- [x] View and filter applicants per job
- [x] Shortlist / Reject candidates
- [x] Schedule interviews (online/offline/hybrid, multi-round)
- [x] Update interview outcomes with feedback
- [x] Restricted to own company's data

### ⚙️ Admin Module
- [x] Admin auto-seeded on first startup
- [x] Complete dashboard with real-time statistics
- [x] Student management with deactivation
- [x] Recruiter approval workflow
- [x] Company approval workflow
- [x] All-jobs oversight with cancel capability
- [x] Recruitment drive management
- [x] Placement result creation (marks student as placed)
- [x] Branch-wise placement analytics
- [x] Application status analytics
- [x] Recharts visualizations (bar, pie, line charts)

### 🔒 Security
- [x] BCrypt password hashing (strength 12)
- [x] JWT access tokens (HS256, 24h expiry)
- [x] Role-based authorization (STUDENT / RECRUITER / ADMIN)
- [x] Method-level @PreAuthorize on sensitive endpoints
- [x] File upload restrictions (PDF only, size limit)
- [x] CORS configuration
- [x] All credentials in environment variables
- [x] Centralized exception handling

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + TypeScript + Vite |
| UI Styling | Tailwind CSS (custom design system) |
| Icons | Lucide React |
| Charts | Recharts |
| HTTP Client | Axios (with JWT interceptor) |
| Routing | React Router v6 |
| Backend Framework | Spring Boot 3.2 (Java 17) |
| Security | Spring Security + JWT (jjwt 0.11.5) |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL 8.0 |
| API Documentation | Swagger / OpenAPI 3 (SpringDoc) |
| Validation | Jakarta Bean Validation |
| Build Tool (Backend) | Maven |
| Build Tool (Frontend) | Vite |
| Testing | JUnit 5 + Mockito |

---

## System Architecture

See [`docs/architecture.md`](docs/architecture.md) for full diagrams.

```
Browser (React SPA)
     │ HTTPS/REST (JSON + JWT)
     ▼
Spring Boot (Java 17)
  ├── Controller Layer (REST endpoints)
  ├── Security (JWT filter + RBAC)
  ├── Service Layer (business logic)
  │   └── Eligibility Engine
  ├── Repository Layer (JPA)
  └── Exception Handler
     │ JDBC (Hibernate)
     ▼
MySQL 8.0 (12 tables)
```

---

## Database Design

See [`docs/database-erd.md`](docs/database-erd.md) for the full ER diagram.

**12 tables:** `users`, `students`, `companies`, `recruiters`, `recruitment_drives`, `jobs`, `job_eligible_branches`, `job_required_skills`, `applications`, `interviews`, `placement_results`, `notifications`

---

## API Documentation

Once the backend is running, visit:
**http://localhost:8080/swagger-ui.html**

### Key Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register/student` | Public | Register student |
| POST | `/api/auth/register/recruiter` | Public | Register recruiter |
| POST | `/api/auth/login` | Public | Login (returns JWT) |
| GET | `/api/student/dashboard` | STUDENT | Student dashboard stats |
| GET | `/api/student/profile` | STUDENT | Get own profile |
| PUT | `/api/student/profile` | STUDENT | Update profile |
| GET | `/api/student/eligibility/{jobId}` | STUDENT | Check job eligibility |
| GET | `/api/jobs` | Auth | All open jobs (paginated) |
| POST | `/api/jobs` | RECRUITER | Create job |
| POST | `/api/applications` | STUDENT | Apply to job |
| PATCH | `/api/applications/{id}/status` | RECRUITER | Update application status |
| POST | `/api/interviews` | RECRUITER | Schedule interview |
| GET | `/api/admin/dashboard` | ADMIN | Admin stats |
| GET | `/api/admin/students` | ADMIN | All students |
| PATCH | `/api/admin/recruiters/{id}/approve` | ADMIN | Approve recruiter |

---

## Installation Instructions

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- npm 9+
- MySQL 8.0+ (or Docker)

### 1. Clone / extract the project

```bash
cd CampusConnect
```

### 2. Set up the database

```sql
-- In MySQL client:
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

### 3. Configure backend environment

```bash
# Copy and edit the env file
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=campusconnect
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_64_char_random_secret_key_here
FRONTEND_URL=http://localhost:5173
```

### 4. Run the backend

```bash
cd backend

# Windows:
set DB_PASSWORD=your_password && set JWT_SECRET=your_secret && mvn spring-boot:run

# Linux/Mac:
DB_PASSWORD=your_password JWT_SECRET=your_secret mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**  
Swagger UI: **http://localhost:8080/swagger-ui.html**

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

### 6. Using Docker (alternative)

```bash
# Copy .env.example to .env and fill in values
docker-compose up -d
```

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_NAME` | Database name | `campusconnect` |
| `DB_USERNAME` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | *(required)* |
| `JWT_SECRET` | JWT signing key (64+ chars) | *(required)* |
| `JWT_EXPIRATION_MS` | Token TTL in ms | `86400000` (24h) |
| `SERVER_PORT` | Backend port | `8080` |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `UPLOAD_DIR` | Resume storage directory | `uploads/resumes` |
| `ADMIN_EMAIL` | Default admin email | `admin@campusconnect.edu` |
| `ADMIN_PASSWORD` | Default admin password | `Admin@123` |
| `VITE_API_URL` | Frontend API base URL | `http://localhost:8080/api` |

---

## Demo Credentials (After Running seed.sql)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@campusconnect.edu` | `Admin@123` |
| Recruiter | `recruiter.google@campusconnect.edu` | `Recruiter@123` |
| Student | `alice@student.edu` | `Student@123` |

---

## Testing

### Backend Tests (JUnit + Mockito)
```bash
cd backend
mvn test
```

Tests cover: Auth (register, login, duplicates), Eligibility Engine (all criteria), Job CRUD.

### API Tests (Postman)
Import `tests/CampusConnect.postman_collection.json` into Postman.
Tests included: Auth flow, authorization (401/403), CRUD operations.

---

## Screenshots

*See `screenshots/` folder*

---

## Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend → Render
- Connect GitHub repository
- Set environment variables in Render dashboard
- Build command: `mvn clean package -DskipTests`
- Start command: `java -jar target/campusconnect-backend-1.0.0.jar`

### Database → Aiven / PlanetScale
- Create hosted MySQL instance
- Run schema.sql and seed.sql
- Update DB_* env vars in backend

See [`docs/deployment.md`](docs/deployment.md) for detailed instructions.

---

## Limitations

1. Resume storage is local filesystem — use S3/Cloudinary for production
2. No email verification on registration
3. No password reset flow
4. Admin can only be created via database seed (intentional security design)
5. File preview (resume) served from backend — use CDN in production

## Future Scope

1. Email notifications via SMTP/SendGrid
2. Video interview integration (Zoom/Teams API)
3. AI-powered candidate ranking
4. Mobile app (React Native)
5. Multi-college support / SaaS architecture
6. Resume parsing and automatic skill extraction
7. Analytics export to Excel/PDF
8. Real-time notifications via WebSocket

---

## Team Members

| Name | Roll Number | Contribution |
|---|---|---|
| [Team Member 1] | [Roll No] | Backend Architecture, Security, Database |
| [Team Member 2] | [Roll No] | Spring Boot APIs, Eligibility Engine |
| [Team Member 3] | [Roll No] | React Frontend, UI/UX Design |
| [Team Member 4] | [Roll No] | Testing, Documentation, Deployment |

---

## Project Structure

```
CampusConnect/
├── frontend/                      # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── api/                   # Axios API clients
│   │   ├── components/            # Reusable UI components
│   │   ├── context/               # AuthContext
│   │   ├── layouts/               # DashboardLayout
│   │   └── pages/                 # All pages (35+)
│   ├── tailwind.config.js
│   └── vite.config.ts
├── backend/                       # Spring Boot Java backend
│   └── src/main/java/com/campusconnect/
│       ├── config/                # Security, CORS, Swagger
│       ├── controller/            # REST controllers
│       ├── dto/                   # Request/Response DTOs
│       ├── eligibility/           # Eligibility engine
│       ├── entity/                # JPA entities
│       ├── exception/             # Exception handling
│       ├── repository/            # JPA repositories
│       ├── security/              # JWT filter + UserDetailsService
│       └── service/               # Business logic
├── database/
│   ├── schema.sql                 # MySQL schema (12 tables)
│   └── seed.sql                   # Demo data
├── docs/
│   ├── architecture.md            # System architecture diagrams
│   ├── database-erd.md            # ER diagram
│   ├── api-reference.md           # API endpoint reference
│   └── deployment.md              # Deployment guide
├── tests/
│   └── CampusConnect.postman_collection.json
├── screenshots/                   # Application screenshots
├── docker-compose.yml             # Full-stack local setup
├── .env.example                   # Environment variables template
├── .gitignore
└── README.md                      # This file
```

---

## License

MIT License — See LICENSE file for details.

---

<div align="center">
Built with ❤️ for HACK-P410 | Backend Web Development Hackathon
</div>
