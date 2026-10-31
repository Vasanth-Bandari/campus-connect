import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import ResumeUpload from './pages/student/ResumeUpload';
import JobListings from './pages/student/JobListings';
import JobDetail from './pages/student/JobDetail';
import MyApplications from './pages/student/MyApplications';
import InterviewSchedule from './pages/student/InterviewSchedule';
import Notifications from './pages/student/Notifications';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import CompanyProfile from './pages/recruiter/CompanyProfile';
import JobManagement from './pages/recruiter/JobManagement';
import CreateJob from './pages/recruiter/CreateJob';
import ApplicantList from './pages/recruiter/ApplicantList';
import CandidateDetail from './pages/recruiter/CandidateDetail';
import InterviewManagement from './pages/recruiter/InterviewManagement';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import RecruiterManagement from './pages/admin/RecruiterManagement';
import CompanyManagement from './pages/admin/CompanyManagement';
import JobsManagement from './pages/admin/JobsManagement';
import ApplicationsView from './pages/admin/ApplicationsView';
import RecruitmentDrives from './pages/admin/RecruitmentDrives';
import PlacementAnalytics from './pages/admin/PlacementAnalytics';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="resume" element={<ResumeUpload />} />
            <Route path="jobs" element={<JobListings />} />
            <Route path="jobs/:id" element={<JobDetail />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="interviews" element={<InterviewSchedule />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Protected Recruiter Routes */}
          <Route
            path="/recruiter"
            element={
              <ProtectedRoute requiredRole="RECRUITER">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/recruiter/dashboard" replace />} />
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="company" element={<CompanyProfile />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="jobs/create" element={<CreateJob />} />
            <Route path="applicants" element={<ApplicantList />} />
            <Route path="applicants/:applicationId" element={<CandidateDetail />} />
            <Route path="interviews" element={<InterviewManagement />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="recruiters" element={<RecruiterManagement />} />
            <Route path="companies" element={<CompanyManagement />} />
            <Route path="jobs" element={<JobsManagement />} />
            <Route path="applications" element={<ApplicationsView />} />
            <Route path="drives" element={<RecruitmentDrives />} />
            <Route path="analytics" element={<PlacementAnalytics />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
