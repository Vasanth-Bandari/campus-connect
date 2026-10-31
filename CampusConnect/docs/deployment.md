# CampusConnect – Deployment Guide

## Overview

| Component | Recommended Host | Free Tier Available |
|---|---|---|
| Frontend (React) | Vercel | ✅ Yes |
| Backend (Spring Boot) | Render | ✅ Yes (with sleep) |
| Database (MySQL) | Aiven / PlanetScale | ✅ Yes |

---

## Step 1: Database – Aiven (Hosted MySQL)

1. Go to [aiven.io](https://aiven.io) → Create free account
2. Create a new MySQL service (free tier: 5GB)
3. Note your connection details:
   - `Host`, `Port`, `User`, `Password`, `Database name`
4. Connect with a MySQL client and run:
   ```sql
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;
   ```

**Alternative: PlanetScale**
1. Go to [planetscale.com](https://planetscale.com)
2. Create database → Get connection string
3. Note: PlanetScale doesn't support foreign key constraints by default. Use Aiven instead.

---

## Step 2: Backend – Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → Select `backend/` directory
4. Configure:
   - **Runtime**: Java
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/campusconnect-backend-1.0.0.jar`
5. Add Environment Variables in Render dashboard:

```
DB_HOST=your-aiven-host
DB_PORT=your-aiven-port
DB_NAME=campusconnect
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=<generate with: openssl rand -base64 64>
JWT_EXPIRATION_MS=86400000
FRONTEND_URL=https://your-app.vercel.app
SPRING_PROFILES_ACTIVE=prod
UPLOAD_DIR=/opt/render/project/uploads
SERVER_PORT=8080
```

6. Deploy → Note your backend URL: `https://campusconnect-backend.onrender.com`

> ⚠️ **Free tier note**: Render free tier spins down after 15 min of inactivity. First request may take 30–60 seconds. Upgrade to avoid this.

---

## Step 3: Frontend – Vercel

1. Update frontend environment:
   ```env
   VITE_API_URL=https://campusconnect-backend.onrender.com/api
   ```

2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo → Select `frontend/` as root directory
4. Add environment variable:
   - `VITE_API_URL` = `https://campusconnect-backend.onrender.com/api`
5. Deploy → Note your frontend URL: `https://campusconnect.vercel.app`

6. Go back to Render → Update `FRONTEND_URL` env var → Redeploy backend

---

## Step 4: Update CORS

After getting the Vercel URL, update `FRONTEND_URL` in Render backend env vars to match exactly.

---

## Verification Checklist

After deployment:
- [ ] `curl https://campusconnect-backend.onrender.com/api/auth/login` returns JSON
- [ ] Swagger UI loads at `https://campusconnect-backend.onrender.com/swagger-ui.html`
- [ ] Frontend loads at `https://campusconnect.vercel.app`
- [ ] Login works on live site
- [ ] Job listings load
- [ ] Application submission works

---

## Generating a Secure JWT Secret

```bash
# Linux/Mac
openssl rand -base64 64

# Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
```

Use the output as your `JWT_SECRET` environment variable.

---

## Production Hardening Checklist

- [ ] Change default admin password (`Admin@123` → strong password)
- [ ] Use a generated JWT secret (not the default)
- [ ] Enable MySQL SSL (`useSSL=true` in production profile)
- [ ] Set `SPRING_PROFILES_ACTIVE=prod`
- [ ] Configure file storage to S3 instead of local filesystem
- [ ] Enable HTTPS on all services
- [ ] Set up database backups
