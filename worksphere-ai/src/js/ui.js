/* WorkSphere AI - UI Component Renderer */

import { StateManager } from './state.js';
import { Router } from './router.js';

export const UI = {
  // 1. LANDING PAGE
  renderLandingPage() {
    const state = StateManager.get();
    return `
      <div class="landing-container anim-fade-in">
        <!-- Navigation -->
        <nav class="landing-nav">
          <div class="brand-logo">
            <div class="brand-logo-icon"><i data-lucide="globe"></i></div>
            <span>WorkSphere AI</span>
          </div>
          <div class="nav-links">
            <a href="#" class="nav-link active" data-scroll="home">Home</a>
            <a href="#" class="nav-link" data-scroll="features">Features</a>
            <a href="#" class="nav-link" data-scroll="solutions">Solutions</a>
            <a href="#" class="nav-link" data-scroll="about">About</a>
            <a href="#" class="nav-link" data-scroll="contact">Contact</a>
          </div>
          <div class="nav-auth">
            <button class="outline-btn" id="landing-login-btn">Login</button>
            <button class="gradient-btn" id="landing-launch-btn">Launch WorkSphere AI</button>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-section" id="home">
          <div class="badge-pill">
            <i data-lucide="sparkles"></i> The AI Workforce Intelligence Platform
          </div>
          <h1 class="hero-title">
            Transform HR Operations with <span class="gradient-text">Autonomous AI</span>
          </h1>
          <p class="hero-subtitle">
            WorkSphere AI automates recruitment, payroll, attendance, performance, leave management, and employee lifecycles using intelligent AI Agents connected to your workflows.
          </p>
          <div class="hero-cta">
            <button class="gradient-btn" id="hero-launch-btn">Launch WorkSphere AI <i data-lucide="arrow-right"></i></button>
            <button class="outline-btn" id="hero-demo-btn"><i data-lucide="play-circle"></i> Watch Demo</button>
          </div>

          <!-- Animated Dashboard Preview -->
          <div class="hero-preview glassmorphism">
            <div class="preview-nav">
              <div class="preview-dot"></div>
              <div class="preview-dot"></div>
              <div class="preview-dot"></div>
            </div>
            <div class="preview-content">
              <aside class="preview-sidebar">
                <div class="preview-sidebar-item active"></div>
                <div class="preview-sidebar-item"></div>
                <div class="preview-sidebar-item"></div>
                <div class="preview-sidebar-item"></div>
              </aside>
              <main class="preview-body">
                <div class="preview-header">
                  <div style="width: 100px; height: 16px; background: rgba(255,255,255,0.1); border-radius: 4px;"></div>
                  <div style="width: 40px; height: 16px; background: rgba(255,255,255,0.1); border-radius: 4px;"></div>
                </div>
                <div class="preview-blocks">
                  <div class="preview-grid-main">
                    <div class="preview-card">
                      <div style="width: 50%; height: 12px; background: var(--primary); opacity: 0.7; border-radius: 2px; margin-bottom: 8px;"></div>
                      <div style="width: 80%; height: 20px; background: rgba(255,255,255,0.08); border-radius: 4px;"></div>
                    </div>
                    <div class="preview-card">
                      <div style="width: 50%; height: 12px; background: var(--accent-cyan); opacity: 0.7; border-radius: 2px; margin-bottom: 8px;"></div>
                      <div style="width: 80%; height: 20px; background: rgba(255,255,255,0.08); border-radius: 4px;"></div>
                    </div>
                    <div class="preview-card">
                      <div style="width: 50%; height: 12px; background: var(--accent-purple); opacity: 0.7; border-radius: 2px; margin-bottom: 8px;"></div>
                      <div style="width: 80%; height: 20px; background: rgba(255,255,255,0.08); border-radius: 4px;"></div>
                    </div>
                    <div class="preview-card-large preview-card">
                      <div style="width: 150px; height: 14px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 12px;"></div>
                      <div class="preview-bar-chart">
                        <div class="preview-bar" style="height: 40%; width: 20px;"></div>
                        <div class="preview-bar" style="height: 70%; width: 20px; background: var(--accent-cyan);"></div>
                        <div class="preview-bar" style="height: 55%; width: 20px;"></div>
                        <div class="preview-bar" style="height: 90%; width: 20px; background: var(--accent-purple);"></div>
                        <div class="preview-bar" style="height: 75%; width: 20px;"></div>
                      </div>
                    </div>
                  </div>
                  <div class="preview-card" style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="width: 100%; height: 20px; background: rgba(255,255,255,0.05); border-radius: 4px;"></div>
                    <div style="width: 90%; height: 12px; background: rgba(255,255,255,0.03); border-radius: 4px;"></div>
                    <div style="width: 80%; height: 12px; background: rgba(255,255,255,0.03); border-radius: 4px;"></div>
                    <div style="width: 95%; height: 12px; background: rgba(255,255,255,0.03); border-radius: 4px;"></div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>

        <!-- Stats Counter Section -->
        <section class="stats-section">
          <div class="stat-card glassmorphism">
            <div class="stat-number">98%</div>
            <div class="stat-label">ATS Match Accuracy</div>
          </div>
          <div class="stat-card glassmorphism">
            <div class="stat-number">40%</div>
            <div class="stat-label">Reduction in Vetting Time</div>
          </div>
          <div class="stat-card glassmorphism">
            <div class="stat-number">$12k+</div>
            <div class="stat-label">Saved Per Recruited Candidate</div>
          </div>
          <div class="stat-card glassmorphism">
            <div class="stat-number">0.5s</div>
            <div class="stat-label">Average AI Command Response</div>
          </div>
        </section>

        <!-- Features Grid -->
        <section class="section-wrapper" id="features">
          <div class="section-header">
            <span class="section-subtitle">Intelligent Core</span>
            <h2 class="section-title">Fully Autonomous Capabilities</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card glassmorphism">
              <div class="feature-icon-wrapper"><i data-lucide="file-text"></i></div>
              <h3>ATS Automation & Vetting</h3>
              <p>Upload resumes in bulk. Our AI scores ATS compatibility, checks skill gaps, summarizes experience, and prepares interview pipelines.</p>
            </div>
            <div class="feature-card glassmorphism">
              <div class="feature-icon-wrapper"><i data-lucide="message-square"></i></div>
              <h3>AI HR Copilot</h3>
              <p>A natural chat interface. Ask for attrition risk reports, check attendance dips, summarize payroll registers, and generate contracts instantly.</p>
            </div>
            <div class="feature-card glassmorphism">
              <div class="feature-icon-wrapper"><i data-lucide="trending-up"></i></div>
              <h3>Predictive Attrition Risk</h3>
              <p>Prevent team turnover. Advanced AI modeling analyzes check-ins, overtime, and tenure records to score and flag potential departures early.</p>
            </div>
            <div class="feature-card glassmorphism">
              <div class="feature-icon-wrapper"><i data-lucide="calendar"></i></div>
              <h3>Leave & Attendance Calendars</h3>
              <p>Track leave requests, view attendance percentages, manage active timelines, and monitor shift rosters dynamically in one place.</p>
            </div>
            <div class="feature-card glassmorphism">
              <div class="feature-icon-wrapper"><i data-lucide="dollar-sign"></i></div>
              <h3>Compliant Payroll Automation</h3>
              <p>Review wages, calculate tax liabilities, add performance bonuses, process refunds, and generate payslips securely with n8n triggers.</p>
            </div>
            <div class="feature-card glassmorphism">
              <div class="feature-icon-wrapper"><i data-lucide="users"></i></div>
              <h3>Lifecycle Management</h3>
              <p>Follow standard pipelines from Onboarding onboarding lists, Promotions promotions, and Role transfers to Offboarding exit flows.</p>
            </div>
          </div>
        </section>

        <!-- How It Works (Solutions) -->
        <section class="section-wrapper" id="solutions">
          <div class="section-header">
            <span class="section-subtitle">Integration Architecture</span>
            <h2 class="section-title">How WorkSphere AI Works</h2>
          </div>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <h3>Select Role & Identity</h3>
                <p>Authenticate as an HR Admin to orchestrate operations, or as an Employee to coordinate tasks, submit leaves, and download payslips.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <h3>Read the AI Daily Briefing</h3>
                <p>Begin your morning with a cognitive summary of urgent tasks, pending leave requests, attrition flags, and recruitment priorities.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <h3>Execute with Commands & Chat</h3>
                <p>Run HR procedures by asking the AI Copilot. Actions generate templates, send notifications, and log data triggers into mock PostgreSQL systems.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <h3>API Webhook Orchestration</h3>
                <p>Connect backend endpoints directly to n8n pipelines, routing automated tasks to Gmail, Slack, and LLM APIs for live operation.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Testimonials -->
        <section class="section-wrapper">
          <div class="section-header">
            <span class="section-subtitle">Success Records</span>
            <h2 class="section-title">Trusted by Modern People Teams</h2>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card glassmorphism">
              <p class="testimonial-text">"WorkSphere AI completely transformed how we recruit at scale. The ATS screening reports are spot-on, and the n8n integration saves hours."</p>
              <div class="testimonial-author">
                <div class="author-avatar" style="background-color: #6366f1;"></div>
                <div class="author-info">
                  <h4>Jane Miller</h4>
                  <span>Director of Talent, Vercel</span>
                </div>
              </div>
            </div>
            <div class="testimonial-card glassmorphism">
              <p class="testimonial-text">"The predictive attrition analytics flagged a key engineer risk. We initiated a comp review immediately and prevented a major project delay."</p>
              <div class="testimonial-author">
                <div class="author-avatar" style="background-color: #06b6d4;"></div>
                <div class="author-info">
                  <h4>David Lee</h4>
                  <span>VP of HR, Linear</span>
                </div>
              </div>
            </div>
            <div class="testimonial-card glassmorphism">
              <p class="testimonial-text">"Managing leaves, payroll, and team reviews in one system with an AI command bar feels like using software from 2030."</p>
              <div class="testimonial-author">
                <div class="author-avatar" style="background-color: #a855f7;"></div>
                <div class="author-info">
                  <h4>Sophia Alvi</h4>
                  <span>Head of Operations, Retool</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="section-wrapper">
          <div class="section-header">
            <span class="section-subtitle">Clarifications</span>
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>
          <div class="faq-list">
            <div class="faq-item glassmorphism">
              <div class="faq-question">
                <span>Can we connect WorkSphere AI to our n8n webhooks?</span>
                <i data-lucide="chevron-down" class="faq-toggle-icon"></i>
              </div>
              <div class="faq-answer">
                <p>Yes. WorkSphere AI features a Webhook Configuration module in Settings. Inputting your n8n URL routes all client events, including resume parses and approvals, directly to your webhook endpoints.</p>
              </div>
            </div>
            <div class="faq-item glassmorphism">
              <div class="faq-question">
                <span>How secure is the candidate resume parser?</span>
                <i data-lucide="chevron-down" class="faq-toggle-icon"></i>
              </div>
              <div class="faq-answer">
                <p>We process documents through sandbox environments using client metadata isolation, preparing payload arrays before routing calculations into private secure database structures.</p>
              </div>
            </div>
            <div class="faq-item glassmorphism">
              <div class="faq-question">
                <span>Is there an employee-restricted view?</span>
                <i data-lucide="chevron-down" class="faq-toggle-icon"></i>
              </div>
              <div class="faq-answer">
                <p>Yes. Employees log into a restricted portal. They only see and interact with Leave Requests, Attendance logs, Payroll, Performance metrics, and basic Profile settings. HR Admin screens are fully hidden.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="section-wrapper contact-section" id="contact">
          <div class="contact-info">
            <h2>Ready to transform your workforce operations?</h2>
            <p style="color: var(--text-muted);">Get in touch with our product integration consultants or request a custom architectural sandbox build for your enterprise.</p>
            <div class="contact-details">
              <div class="contact-detail-item">
                <div class="contact-detail-icon"><i data-lucide="mail"></i></div>
                <div>
                  <h4 style="font-size: 0.9rem; color: var(--text-muted);">Email Us</h4>
                  <p style="font-weight: 500;">enterprise@worksphere.ai</p>
                </div>
              </div>
              <div class="contact-detail-item">
                <div class="contact-detail-icon"><i data-lucide="phone"></i></div>
                <div>
                  <h4 style="font-size: 0.9rem; color: var(--text-muted);">Call Operations</h4>
                  <p style="font-weight: 500;">+1 (800) 555-WORK</p>
                </div>
              </div>
            </div>
          </div>
          <div class="contact-form glassmorphism">
            <h3 style="margin-bottom: 20px;">Request Sandbox Access</h3>
            <form id="landing-contact-form" onsubmit="event.preventDefault(); alert('Request sent successfully!');">
              <div class="form-group" style="margin-bottom: 16px;">
                <label>Name</label>
                <input type="text" class="form-input" placeholder="Alex Rivera" required>
              </div>
              <div class="form-group" style="margin-bottom: 16px;">
                <label>Work Email</label>
                <input type="email" class="form-input" placeholder="alex@company.com" required>
              </div>
              <div class="form-group" style="margin-bottom: 24px;">
                <label>Message</label>
                <textarea class="form-input" placeholder="Briefly describe your workforce integration scope..." required></textarea>
              </div>
              <button type="submit" class="gradient-btn" style="width: 100%; justify-content: center;">Submit Request</button>
            </form>
          </div>
        </section>

        <!-- Professional Footer -->
        <footer class="professional-footer">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="brand-logo">
                <div class="brand-logo-icon"><i data-lucide="globe"></i></div>
                <span>WorkSphere AI</span>
              </div>
              <p>The AI Workforce Intelligence Platform powering autonomous human resource pipelines and business intelligence workflows.</p>
            </div>
            <div class="footer-column">
              <h4>Platform</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">Features</a>
                <a href="#" class="footer-link">Integrations</a>
                <a href="#" class="footer-link">Security Specs</a>
                <a href="#" class="footer-link">Pricing Models</a>
              </div>
            </div>
            <div class="footer-column">
              <h4>Solutions</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">AI Recruitment</a>
                <a href="#" class="footer-link">Talent Retention</a>
                <a href="#" class="footer-link">Compliance Payroll</a>
                <a href="#" class="footer-link">Analytics Dashboard</a>
              </div>
            </div>
            <div class="footer-column">
              <h4>Resources</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">Documentation</a>
                <a href="#" class="footer-link">System Status</a>
                <a href="#" class="footer-link">n8n Guides</a>
                <a href="#" class="footer-link">API Keys</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; 2026 WorkSphere AI Inc. All rights reserved.</span>
            <div style="display: flex; gap: 20px;">
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    `;
  },

  // 2. AUTHENTICATION (LOGIN/SIGNUP)
  renderAuthPage(mode) {
    const isLogin = mode === 'login';
    return `
      <div class="auth-container anim-fade-in">
        <div class="auth-card glassmorphism">
          <div class="auth-header">
            <div class="brand-logo" style="justify-content: center; margin-bottom: 24px;">
              <div class="brand-logo-icon"><i data-lucide="globe"></i></div>
              <span>WorkSphere AI</span>
            </div>
            <h2>${isLogin ? 'Welcome Back' : 'Create Enterprise Account'}</h2>
            <p>${isLogin ? 'Login to access the AI HR Command Center' : 'Register your company and launch intelligence workflows'}</p>
          </div>
          <form class="auth-form" id="auth-submit-form">
            <div class="form-group">
              <label>Work Email Address</label>
              <input type="email" id="auth-email" class="form-input" placeholder="vasanth@worksphere.ai" value="vasanth@worksphere.ai" required>
            </div>
            <div class="form-group">
              <label>Security Password</label>
              <input type="password" id="auth-password" class="form-input" placeholder="••••••••" value="password" required>
            </div>
            ${!isLogin ? `
              <div class="form-group">
                <label>Company Name</label>
                <input type="text" id="auth-company" class="form-input" placeholder="Acme Corporation" required>
              </div>
            ` : ''}
            <button type="submit" class="gradient-btn" style="width: 100%; justify-content: center; margin-top: 10px;">
              ${isLogin ? 'Authenticate Identity' : 'Register Account'} <i data-lucide="shield-check"></i>
            </button>
          </form>
          <div class="auth-footer">
            <span>${isLogin ? "New to WorkSphere AI?" : 'Already registered?'}</span>
            <a href="#" class="auth-link" id="auth-toggle-link">${isLogin ? 'Create Account' : 'Login Identity'}</a>
          </div>
        </div>
      </div>
    `;
  },

  // 3. ROLE SELECTION
  renderRoleSelectPage() {
    return `
      <div class="role-container anim-fade-in">
        <div class="role-card glassmorphism">
          <div class="auth-header" style="margin-bottom: 40px;">
            <div class="brand-logo" style="justify-content: center; margin-bottom: 24px;">
              <div class="brand-logo-icon"><i data-lucide="globe"></i></div>
              <span>WorkSphere AI</span>
            </div>
            <h2>Select Workspace Role Profile</h2>
            <p>Access rules, sidebar links, and actions adjust automatically according to your permissions.</p>
          </div>
          <div class="role-cards-grid">
            <div class="role-select-box glassmorphism" id="role-select-admin">
              <div class="role-icon"><i data-lucide="user-cog"></i></div>
              <h3>HR Administrator</h3>
              <p>Full control center access. Monitor recruiting funnels, run compensation schedules, audit performance logs, and review predictive attrition trends.</p>
            </div>
            <div class="role-select-box glassmorphism" id="role-select-employee">
              <div class="role-icon"><i data-lucide="user"></i></div>
              <h3>Standard Employee</h3>
              <p>Self-service panel. Review personal leave balance sheets, clock-in timesheets, read supervisor feedback loops, and retrieve payslip downloads.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 4. AI DAILY BRIEFING
  renderBriefingPage() {
    const state = StateManager.get();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    // Count pending leave requests
    const pendingLeavesCount = state.leaveRequests.filter(l => l.status === 'Pending').length;
    // Count high attrition risk
    const highRiskCount = state.employees.filter(e => e.riskScore >= 70).length;
    
    return `
      <div class="briefing-container anim-fade-in">
        <div class="briefing-header">
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.9rem; text-transform: uppercase;">Morning Briefing &bull; ${today}</span>
          <h1 class="gradient-text">Good Morning, ${state.activeUser.name}</h1>
          <p style="color: var(--text-muted); font-size: 1.1rem; margin-top: 6px;">Here is your unified HR intelligence overview for today.</p>
        </div>

        <div class="briefing-grid">
          <!-- Leave briefing -->
          <div class="briefing-card glassmorphism leave">
            <div class="briefing-card-header text-warning">
              <i data-lucide="calendar"></i> Pending Leave Requests
            </div>
            <div class="briefing-card-body">
              There are <strong>${pendingLeavesCount}</strong> leave requests awaiting your decision. Sarah Jenkins is requesting a 5-day annual leave starting July 10th.
            </div>
            <div class="briefing-card-value">${pendingLeavesCount}</div>
            <div class="briefing-card-footer">
              <span>Required action: Approve/Reject</span>
              <span>Pending</span>
            </div>
          </div>

          <!-- Payroll status briefing -->
          <div class="briefing-card glassmorphism payroll">
            <div class="briefing-card-header text-success">
              <i data-lucide="dollar-sign"></i> Payroll Compensation
            </div>
            <div class="briefing-card-body">
              June payroll calculation ledger is compiled. <strong>4</strong> employees are in 'Processing' review status. Ready to execute payment dispatch.
            </div>
            <div class="briefing-card-value">Ready</div>
            <div class="briefing-card-footer">
              <span>Required action: Disburse funds</span>
              <span>API Ready</span>
            </div>
          </div>

          <!-- Risk briefing -->
          <div class="briefing-card glassmorphism risk">
            <div class="briefing-card-header text-danger">
              <i data-lucide="alert-triangle"></i> Attrition Risk Assessment
            </div>
            <div class="briefing-card-body">
              AI Agents detected <strong>${highRiskCount}</strong> key employees at high attrition risk. Competitor outreach patterns and extreme workloads flagged.
            </div>
            <div class="briefing-card-value">${highRiskCount} Alert${highRiskCount !== 1 ? 's' : ''}</div>
            <div class="briefing-card-footer">
              <span>Primary risk: Sarah Jenkins (82%)</span>
              <span>Urgent Review</span>
            </div>
          </div>

          <!-- Recruitment briefing -->
          <div class="briefing-card glassmorphism recruitment">
            <div class="briefing-card-header text-cyan">
              <i data-lucide="file-check"></i> Recruitment & ATS Pipeline
            </div>
            <div class="briefing-card-body">
              AI screened <strong>5</strong> candidates for the Principal Architect role. Candidate <strong>Rahul Sharma</strong> holds a 96% compatibility index score.
            </div>
            <div class="briefing-card-value">96% Match</div>
            <div class="briefing-card-footer">
              <span>Recommendation: Offer approved</span>
              <span>5 Candidates</span>
            </div>
          </div>
        </div>

        <!-- AI Command Bar Section -->
        <div class="ai-command-container">
          <div class="ai-command-bar glassmorphism">
            <i data-lucide="sparkles" style="color: var(--accent-cyan);"></i>
            <input type="text" id="ai-briefing-command-input" class="ai-command-input" placeholder="Ask WorkSphere AI anything..." autofocus>
            <button class="header-icon-btn" id="ai-briefing-command-btn" style="border:none; background:var(--primary); color:#fff;"><i data-lucide="arrow-right"></i></button>
          </div>
          <div class="ai-command-suggestions">
            <span class="suggestion-tag">Analyze today's resumes</span>
            <span class="suggestion-tag">Show payroll status</span>
            <span class="suggestion-tag">Approve leave requests</span>
            <span class="suggestion-tag">Find employees at risk</span>
            <span class="suggestion-tag">Generate HR Report</span>
          </div>
        </div>

        <!-- Large launch command center button -->
        <button class="gradient-btn" id="briefing-launch-dashboard-btn" style="margin-top: 50px; padding: 16px 36px; font-size: 1.1rem; border-radius: var(--radius-xl);">
          Launch HR Command Center <i data-lucide="layout-dashboard"></i>
        </button>
      </div>
    `;
  },

  // 5. MAIN DASHBOARD LAYOUT (SIDEBAR + MAIN AREA)
  renderDashboardLayout(role, activeTab) {
    const state = StateManager.get();
    
    // Exact sidebar list ordered for HR Admin
    const hrSidebarTabs = [
      { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'copilot', name: 'AI HR Copilot', icon: 'bot' },
      { id: 'employees', name: 'Employees', icon: 'users' },
      { id: 'recruitment', name: 'Recruitment', icon: 'file-text' },
      { id: 'leave', name: 'Leave Management', icon: 'calendar' },
      { id: 'payroll', name: 'Payroll', icon: 'dollar-sign' },
      { id: 'attendance', name: 'Attendance', icon: 'clock' },
      { id: 'performance', name: 'Performance', icon: 'trending-up' },
      { id: 'attrition', name: 'Attrition Analytics', icon: 'alert-triangle' },
      { id: 'lifecycle', name: 'Employee Lifecycle', icon: 'refresh-cw' },
      { id: 'reports', name: 'Reports', icon: 'bar-chart' },
      { id: 'notifications', name: 'Notifications', icon: 'bell' },
      { id: 'settings', name: 'Settings', icon: 'settings' }
    ];

    // Restricted sidebar list for Employee
    const employeeSidebarTabs = [
      { id: 'leave', name: 'Leave Management', icon: 'calendar' },
      { id: 'attendance', name: 'Attendance', icon: 'clock' },
      { id: 'payroll', name: 'Payroll Ledger', icon: 'dollar-sign' },
      { id: 'performance', name: 'Performance Review', icon: 'trending-up' },
      { id: 'notifications', name: 'Notifications', icon: 'bell' },
      { id: 'profile', name: 'My Profile', icon: 'user' }
    ];

    const tabsToUse = (role === 'hr_admin') ? hrSidebarTabs : employeeSidebarTabs;

    // Check notification badge count
    const unreadNotifications = state.notifications.filter(n => !n.read).length;

    // Build Sidebar HTML
    let sidebarHtml = `
      <aside class="sidebar-panel">
        <div class="sidebar-logo">
          <div class="brand-logo">
            <div class="brand-logo-icon"><i data-lucide="globe"></i></div>
            <span>WorkSphere AI</span>
          </div>
        </div>
        <nav class="sidebar-nav-container">
    `;

    tabsToUse.forEach(tab => {
      const activeClass = (tab.id === activeTab) ? 'active' : '';
      let badgeHtml = '';
      if (tab.id === 'notifications' && unreadNotifications > 0) {
        badgeHtml = `<span class="column-card-count" style="background: var(--danger); color: #fff; margin-left: auto;">${unreadNotifications}</span>`;
      }
      sidebarHtml += `
        <a href="#" class="sidebar-link ${activeClass}" data-tab="${tab.id}">
          <i data-lucide="${tab.icon}"></i>
          <span>${tab.name}</span>
          ${badgeHtml}
        </a>
      `;
    });

    sidebarHtml += `
        </nav>
        <div class="sidebar-footer">
          <div class="user-profile-badge">
            <div class="profile-avatar">${state.activeUser.avatar}</div>
            <div class="profile-info">
              <span class="profile-name">${state.activeUser.name}</span>
              <span class="profile-role">${role === 'hr_admin' ? 'HR Administrator' : 'Employee Portal'}</span>
            </div>
          </div>
          <button class="logout-btn" id="sidebar-logout-btn" title="Sign Out"><i data-lucide="log-out"></i></button>
        </div>
      </aside>
    `;

    // Render Sub-tab Content
    let moduleContentHtml = '';
    switch (activeTab) {
      case 'dashboard':
        moduleContentHtml = this.renderDashboardModule();
        break;
      case 'copilot':
        moduleContentHtml = this.renderCopilotModule();
        break;
      case 'employees':
        moduleContentHtml = this.renderEmployeesModule();
        break;
      case 'recruitment':
        moduleContentHtml = this.renderRecruitmentModule();
        break;
      case 'leave':
        moduleContentHtml = this.renderLeaveModule(role);
        break;
      case 'payroll':
        moduleContentHtml = this.renderPayrollModule(role);
        break;
      case 'attendance':
        moduleContentHtml = this.renderAttendanceModule(role);
        break;
      case 'performance':
        moduleContentHtml = this.renderPerformanceModule(role);
        break;
      case 'attrition':
        moduleContentHtml = this.renderAttritionModule();
        break;
      case 'lifecycle':
        moduleContentHtml = this.renderLifecycleModule();
        break;
      case 'reports':
        moduleContentHtml = this.renderReportsModule();
        break;
      case 'notifications':
        moduleContentHtml = this.renderNotificationsModule();
        break;
      case 'settings':
        moduleContentHtml = this.renderSettingsModule();
        break;
      case 'profile':
        moduleContentHtml = this.renderProfileModule();
        break;
      default:
        moduleContentHtml = `<div>Module Not Found</div>`;
    }

    // Build final layout shell
    return `
      <div class="dashboard-layout anim-fade-in">
        ${sidebarHtml}
        <div class="dashboard-content-panel">
          <!-- Global Search & Header -->
          <header class="dashboard-header">
            <div class="header-title-area">
              <h2>${activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</h2>
              <p>WorkSphere AI Unified Intelligent Workspace</p>
            </div>
            
            <div class="header-actions">
              <!-- Global Search bar -->
              <div class="global-search-bar glassmorphism">
                <i data-lucide="search" style="color: var(--text-dark); width: 16px; height: 16px;"></i>
                <input type="text" id="global-search-input" class="global-search-input" placeholder="Search employees, files, requests...">
              </div>

              <div class="icon-actions">
                <!-- Theme Toggle -->
                <button class="header-icon-btn" id="theme-toggle-btn" title="Toggle Theme">
                  <i data-lucide="${state.settings.theme === 'dark' ? 'sun' : 'moon'}" style="width: 18px; height: 18px;"></i>
                </button>
                
                <!-- Notification Bell -->
                <button class="header-icon-btn" id="header-notif-btn" title="Notifications">
                  <i data-lucide="bell" style="width: 18px; height: 18px;"></i>
                  ${unreadNotifications > 0 ? `<span class="notification-dot"></span>` : ''}
                </button>

                <!-- Quick Actions button -->
                <button class="outline-btn" style="padding: 8px 16px; font-size: 0.85rem;" id="header-quick-action-btn">
                  <i data-lucide="zap" style="width: 14px; height: 14px;"></i> Quick Actions
                </button>
              </div>
            </div>
          </header>

          <main class="module-container">
            ${moduleContentHtml}
          </main>
        </div>

        <!-- Floating AI Copilot Trigger -->
        <button class="floating-ai-trigger" id="floating-ai-trigger" title="Ask HR Copilot">
          <i data-lucide="bot"></i>
        </button>

        <!-- Floating Chat Overlay (initially hidden) -->
        <div class="floating-chat-window glassmorphism hidden" id="floating-chat-window">
          <div class="floating-chat-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <i data-lucide="bot" style="color: var(--accent-cyan);"></i>
              <strong style="font-size:0.9rem;">WorkSphere Assistant</strong>
            </div>
            <button id="floating-chat-close-btn" style="color:var(--text-muted);"><i data-lucide="x" style="width:16px; height:16px;"></i></button>
          </div>
          <div class="copilot-messages" id="floating-chat-messages" style="font-size:0.85rem; padding:12px;">
            <div class="chat-message ai">
              <div class="chat-bubble" style="padding:10px;">I am your active sidebar assistant. Ask me to draft rejection drafts, query leaves, or compare salaries.</div>
            </div>
          </div>
          <div class="copilot-input-area" style="padding:10px;">
            <form class="copilot-form" id="floating-chat-form" style="padding:4px 10px;">
              <input type="text" id="floating-chat-input" class="copilot-input" style="font-size:0.8rem;" placeholder="Ask me anything...">
              <button type="submit" style="color:var(--primary);"><i data-lucide="send" style="width:14px; height:14px;"></i></button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // MODULE RENDERERS
  // ==========================================

  // A. DASHBOARD VIEW (HR Command Center)
  renderDashboardModule() {
    const state = StateManager.get();
    
    // Calculations
    const empCount = state.employees.length;
    const candidatesCount = state.candidates.length;
    const pendingLeaves = state.leaveRequests.filter(l => l.status === 'Pending').length;
    const highRisk = state.employees.filter(e => e.riskScore >= 70).length;
    
    return `
      <div class="anim-slide-up" style="display:flex; flex-direction:column; gap:30px;">
        <!-- Welcome banner -->
        <div class="glassmorphism" style="padding: 24px; display:flex; justify-content:space-between; align-items:center; background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(6,182,212,0.08) 100%);">
          <div>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-bottom: 4px;">Welcome Back, HR Control Center</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem;">WorkSphere AI has run daily integrations. Webhook routes are connected and healthy.</p>
          </div>
          <button class="gradient-btn" id="dashboard-briefing-btn"><i data-lucide="sparkles"></i> Open Daily Briefing</button>
        </div>

        <!-- AI Insights & Action Cards -->
        <div class="ai-recommendations-panel glassmorphism">
          <div class="ai-recommendations-header">
            <i data-lucide="zap" class="text-cyan" style="color: var(--accent-cyan);"></i>
            <h3>Automated AI Insights</h3>
          </div>
          <div class="ai-rec-list">
            ${state.aiInsights.map(ins => `
              <div class="ai-rec-card glassmorphism" style="border-left-color: ${ins.type === 'risk' ? 'var(--danger)' : ins.type === 'payroll' ? 'var(--success)' : 'var(--accent-cyan)'}">
                <div class="ai-rec-content">
                  <div class="ai-rec-title">${ins.title}</div>
                  <div class="ai-rec-desc">${ins.desc}</div>
                </div>
                <button class="outline-btn btn-small action-insight-btn" data-type="${ins.type}">Resolve</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- KPI Grid -->
        <div class="kpi-cards-grid">
          <div class="kpi-card glassmorphism">
            <div class="kpi-info">
              <h4>Total Employees</h4>
              <div class="kpi-value">${empCount}</div>
              <span class="kpi-trend up"><i data-lucide="arrow-up-right"></i> +2 this month</span>
            </div>
            <div class="kpi-icon-container"><i data-lucide="users"></i></div>
          </div>
          <div class="kpi-card glassmorphism">
            <div class="kpi-info">
              <h4>Candidates Screened</h4>
              <div class="kpi-value">${candidatesCount}</div>
              <span class="kpi-trend up"><i data-lucide="arrow-up-right"></i> +12 parsed</span>
            </div>
            <div class="kpi-icon-container"><i data-lucide="file-check"></i></div>
          </div>
          <div class="kpi-card glassmorphism">
            <div class="kpi-info">
              <h4>Pending Leaves</h4>
              <div class="kpi-value">${pendingLeaves}</div>
              <span class="kpi-trend down"><i data-lucide="arrow-down-left"></i> Awaiting resolution</span>
            </div>
            <div class="kpi-icon-container"><i data-lucide="calendar"></i></div>
          </div>
          <div class="kpi-card glassmorphism">
            <div class="kpi-info">
              <h4>High Attrition Risk</h4>
              <div class="kpi-value">${highRisk}</div>
              <span class="kpi-trend down" style="color: var(--danger);"><i data-lucide="alert-triangle"></i> Action recommended</span>
            </div>
            <div class="kpi-icon-container" style="color: var(--danger); background: var(--danger-light);"><i data-lucide="alert-octagon"></i></div>
          </div>
        </div>

        <!-- Dashboard Charts and Analytics -->
        <div class="charts-grid-layout">
          <!-- Recruitment Funnel -->
          <div class="chart-card glassmorphism">
            <div class="chart-header">
              <span class="chart-title">Recruitment Pipeline Funnel</span>
              <i data-lucide="file-search2" class="text-dark"></i>
            </div>
            <div class="chart-canvas">
              <div class="recruitment-funnel-visual">
                <div class="funnel-tier"><span>Applied (12)</span><span>100%</span></div>
                <div class="funnel-tier"><span>AI Screening (9)</span><span>75%</span></div>
                <div class="funnel-tier"><span>Shortlisted (6)</span><span>50%</span></div>
                <div class="funnel-tier"><span>Interview (3)</span><span>25%</span></div>
                <div class="funnel-tier"><span>Selected (1)</span><span>8%</span></div>
              </div>
            </div>
          </div>

          <!-- Attendance trends bar chart -->
          <div class="chart-card glassmorphism">
            <div class="chart-header">
              <span class="chart-title">Weekly Team Attendance %</span>
              <i data-lucide="clock" class="text-dark"></i>
            </div>
            <div class="chart-canvas">
              <div class="custom-bar-chart">
                <div class="custom-bar-col">
                  <div class="custom-bar-track">
                    <div class="custom-bar-fill" style="height: 98%;"></div>
                  </div>
                  <span class="custom-bar-label">Mon</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track">
                    <div class="custom-bar-fill" style="height: 95%;"></div>
                  </div>
                  <span class="custom-bar-label">Tue</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track">
                    <div class="custom-bar-fill" style="height: 87%;"></div>
                  </div>
                  <span class="custom-bar-label">Wed</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track">
                    <div class="custom-bar-fill" style="height: 96%;"></div>
                  </div>
                  <span class="custom-bar-label">Thu</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track">
                    <div class="custom-bar-fill" style="height: 91%;"></div>
                  </div>
                  <span class="custom-bar-label">Fri</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Department risk breakdown -->
          <div class="chart-card glassmorphism">
            <div class="chart-header">
              <span class="chart-title">Department Attrition Risks</span>
              <i data-lucide="pie-chart" class="text-dark"></i>
            </div>
            <div class="chart-canvas" style="flex-direction:row; gap:40px;">
              <div class="gauge-chart-container">
                <svg class="gauge-circle" width="150" height="150">
                  <circle class="gauge-bg" cx="75" cy="75" r="60"></circle>
                  <circle class="gauge-fill" cx="75" cy="75" r="60" style="stroke-dashoffset: 280; stroke: var(--danger);"></circle>
                </svg>
                <div class="gauge-label">
                  <div class="gauge-value">36%</div>
                  <div class="gauge-text">Tech Dept</div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:10px; font-size:0.85rem; width: 100%;">
                <div style="display:flex; justify-content:space-between;"><span>Technology</span><strong style="color:var(--danger)">High (36%)</strong></div>
                <div style="display:flex; justify-content:space-between;"><span>Sales & Marketing</span><strong style="color:var(--warning)">Med (18%)</strong></div>
                <div style="display:flex; justify-content:space-between;"><span>Finance & HR</span><strong style="color:var(--success)">Low (4%)</strong></div>
              </div>
            </div>
          </div>

          <!-- Quick actions and logs -->
          <div class="chart-card glassmorphism">
            <div class="chart-header">
              <span class="chart-title">Recent Activity Logs</span>
              <i data-lucide="activity" class="text-dark"></i>
            </div>
            <div style="display:flex; flex-direction:column; gap:12px; font-size:0.85rem; overflow-y:auto; flex:1;">
              ${state.notifications.slice(0, 4).map(n => `
                <div style="display:flex; gap:12px; align-items:center; border-bottom:1px solid var(--glass-border); padding-bottom:8px;">
                  <div style="width:8px; height:8px; border-radius:50%; background: ${n.type === 'success' ? 'var(--success)' : n.type === 'warning' ? 'var(--warning)' : 'var(--primary)'}"></div>
                  <div style="flex:1;">${n.text}</div>
                  <div style="color:var(--text-dark); font-size:0.75rem;">${n.time}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // B. AI HR COPILOT
  renderCopilotModule() {
    const state = StateManager.get();
    return `
      <div class="copilot-container anim-slide-up">
        <aside class="copilot-sidebar">
          <button class="gradient-btn" id="copilot-clear-btn" style="width: 100%; justify-content: center; font-size:0.85rem; padding: 8px 16px;">
            <i data-lucide="trash-2"></i> Clear Conversation
          </button>
          <div class="copilot-history-panel">
            <h4 style="font-size:0.8rem; text-transform:uppercase; color:var(--text-dark); margin-bottom:10px;">Suggested Operations</h4>
            <div class="copilot-history-item suggestion-prompt"><i data-lucide="file-plus"></i> Generate HR Report</div>
            <div class="copilot-history-item suggestion-prompt"><i data-lucide="search-code"></i> Analyze Recruitment</div>
            <div class="copilot-history-item suggestion-prompt"><i data-lucide="banknote"></i> Summarize Payroll</div>
            <div class="copilot-history-item suggestion-prompt"><i data-lucide="alert-circle"></i> Find High Risk Employees</div>
            <div class="copilot-history-item suggestion-prompt"><i data-lucide="clock"></i> Show Low Attendance</div>
            <div class="copilot-history-item suggestion-prompt"><i data-lucide="git-compare"></i> Compare Departments</div>
          </div>
        </aside>
        
        <main class="copilot-chat-panel glassmorphism">
          <div class="copilot-messages" id="copilot-messages-box">
            ${state.chatHistory.map(chat => `
              <div class="chat-message ${chat.sender === 'user' ? 'user' : 'ai'}">
                <div class="chat-avatar"><i data-lucide="${chat.sender === 'user' ? 'user' : 'bot'}"></i></div>
                <div class="chat-bubble">${chat.text}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="copilot-input-area">
            <form class="copilot-form" id="copilot-chat-form">
              <input type="text" id="copilot-chat-input" class="copilot-input" placeholder="Ask WorkSphere AI anything..." required autocomplete="off">
              <button type="button" class="header-icon-btn" id="copilot-voice-btn" title="Voice Input" style="border:none; margin-right:8px;"><i data-lucide="mic"></i></button>
              <button type="submit" class="gradient-btn" style="padding: 8px 16px; font-size: 0.85rem;"><i data-lucide="send"></i> Send</button>
            </form>
          </div>
        </main>
      </div>
    `;
  },

  // C. EMPLOYEES DIRECTORY
  renderEmployeesModule() {
    const state = StateManager.get();
    return `
      <div class="glassmorphism anim-slide-up" style="padding: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="font-size:1.2rem;">Employee Directory</h3>
          <button class="gradient-btn btn-small" id="employee-add-btn"><i data-lucide="user-plus"></i> Add Employee</button>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Risk Index</th>
              </tr>
            </thead>
            <tbody>
              ${state.employees.map(emp => `
                <tr>
                  <td><code>${emp.id}</code></td>
                  <td style="font-weight:600;">${emp.name}</td>
                  <td>${emp.dept}</td>
                  <td>${emp.role}</td>
                  <td>$${emp.salary.toLocaleString()}</td>
                  <td><span class="status-indicator active">${emp.status}</span></td>
                  <td>
                    <span style="font-weight:600; color: ${emp.riskScore >= 70 ? 'var(--danger)' : emp.riskScore >= 40 ? 'var(--warning)' : 'var(--success)'}">
                      ${emp.riskScore}%
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // D. RECRUITMENT AUTOMATION (HERO FEATURE)
  renderRecruitmentModule() {
    const state = StateManager.get();
    
    // Sort candidates into pipelines
    const stages = ['Applied', 'AI Screening', 'Shortlisted', 'Interview', 'Selected', 'Onboarded'];
    
    return `
      <div class="recruitment-container anim-slide-up">
        <!-- Resume drag-and-drop parser -->
        <div class="resume-uploader-panel glassmorphism">
          <div>
            <h3 style="font-size:1.15rem; margin-bottom:12px;">Resume Vetting Parser</h3>
            <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">Drag and drop multiple PDF resumes to screen them against job profiles instantly.</p>
            <div class="dropzone-area" id="resume-dropzone">
              <i data-lucide="upload-cloud" class="dropzone-icon" style="width:40px; height:40px;"></i>
              <div>
                <strong>Drag & Drop files here</strong>
                <p style="font-size:0.75rem; color:var(--text-dark); margin-top:4px;">Supports PDF, DOCX up to 10MB each</p>
              </div>
              <input type="file" id="resume-file-input" style="display:none;" multiple accept=".pdf,.docx">
            </div>
            <div class="file-list-preview" id="uploaded-files-list"></div>
          </div>
          
          <div class="uploader-input-group">
            <div class="form-group">
              <label>Target Job Description</label>
              <textarea class="form-input" id="jd-input-box" placeholder="Principal Agentic AI Workflow Architect. Build multi-agent orchestration frameworks using LangChain, Python, PostgreSQL, and LLMs..."></textarea>
            </div>
            <div class="form-group">
              <label>Enterprise Requirements</label>
              <input type="text" class="form-input" id="req-input-box" placeholder="Minimum 3 years LLM app deployment, Docker containerization, Vector DB knowledge.">
            </div>
            <button class="gradient-btn" id="analyze-resumes-btn" style="width:100%; justify-content:center;">
              <i data-lucide="cog"></i> Run AI Resume screening
            </button>
          </div>
        </div>

        <!-- Interactive Screening Output Area (rendered after click, else blank alert summary) -->
        <div class="glassmorphism hidden" id="screening-output-panel" style="padding: 24px;">
          <h3 style="font-size:1.15rem; margin-bottom:20px; color:var(--accent-cyan);">AI ATS Analysis Results</h3>
          <div class="analysis-results-grid" id="screening-results-content"></div>
        </div>

        <!-- Kanban Board Pipeline -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
          <h3 style="font-size:1.2rem;">Hiring Stages Pipeline</h3>
          <p style="font-size:0.8rem; color:var(--text-muted);">Drag and drop cards or click buttons to update stage</p>
        </div>
        
        <div class="kanban-board-container">
          ${stages.map(stage => {
            const cols = state.candidates.filter(c => c.status.toLowerCase() === stage.toLowerCase());
            return `
              <div class="kanban-column" data-stage="${stage}">
                <div class="kanban-column-header">
                  <span>${stage}</span>
                  <span class="column-card-count">${cols.length}</span>
                </div>
                <div class="kanban-cards-wrapper" id="kanban-col-${stage.replace(' ', '-')}">
                  ${cols.map(c => `
                    <div class="kanban-card glassmorphism" draggable="true" data-id="${c.id}">
                      <div class="kanban-card-title">${c.name}</div>
                      <div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">${c.education.split('-')[0]}</div>
                      <div class="kanban-card-meta">
                        <span class="score-badge ${c.score >= 90 ? 'high' : c.score >= 80 ? 'medium' : 'low'}">Score: ${c.score}%</span>
                        <span>Rank #${c.rank}</span>
                      </div>
                      <div style="display:flex; gap:8px; margin-top:12px;">
                        <button class="outline-btn btn-small view-candidate-btn" data-id="${c.id}" style="padding:4px 8px; font-size:0.75rem; flex:1; justify-content:center;">Details</button>
                        <button class="gradient-btn btn-small promote-candidate-btn" data-id="${c.id}" style="padding:4px 8px; font-size:0.75rem; flex:1; justify-content:center;">Move</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // E. LEAVE MANAGEMENT
  renderLeaveModule(role) {
    const state = StateManager.get();
    
    // Balance cards
    const bal = state.leaveBalances['EMP002'] || { annual: 15, sick: 10, personal: 5 }; // Fallback

    let historyTable = '';
    if (role === 'hr_admin') {
      historyTable = `
        <div class="glassmorphism leave-history-section anim-slide-up">
          <h3 style="font-size:1.15rem;">Pending Staff Leave Approvals</h3>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Requested Period</th>
                  <th>Total Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${state.leaveRequests.map(r => `
                  <tr>
                    <td style="font-weight:600;">${r.name}</td>
                    <td>${r.type}</td>
                    <td>${r.startDate} to ${r.endDate}</td>
                    <td>${r.days} days</td>
                    <td style="font-size:0.85rem; color:var(--text-muted);">${r.reason}</td>
                    <td><span class="status-indicator ${r.status.toLowerCase()}">${r.status}</span></td>
                    <td>
                      ${r.status === 'Pending' ? `
                        <div style="display:flex; gap:6px;">
                          <button class="gradient-btn btn-small leave-approve-btn" data-id="${r.id}" style="background:var(--success); box-shadow:none;"><i data-lucide="check"></i></button>
                          <button class="outline-btn btn-small leave-reject-btn" data-id="${r.id}" style="color:var(--danger); border-color:var(--danger);"><i data-lucide="x"></i></button>
                        </div>
                      ` : '-'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      // Employee view history
      const myRequests = state.leaveRequests.filter(r => r.empId === 'EMP002');
      historyTable = `
        <div class="glassmorphism leave-history-section anim-slide-up">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-size:1.15rem;">My Leave Request History</h3>
            <button class="gradient-btn btn-small" id="apply-leave-btn-open"><i data-lucide="plus"></i> Request Leave</button>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Requested Period</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${myRequests.map(r => `
                  <tr>
                    <td>${r.type}</td>
                    <td>${r.startDate} to ${r.endDate}</td>
                    <td>${r.days}</td>
                    <td>${r.reason}</td>
                    <td><span class="status-indicator ${r.status.toLowerCase()}">${r.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return `
      <div class="anim-slide-up" style="display:flex; flex-direction:column; gap:30px;">
        <div class="leave-balance-container">
          <div class="balance-card glassmorphism">
            <div class="balance-number" style="color: var(--primary);">${bal.annual}</div>
            <div class="balance-type">Annual Leave Remaining</div>
          </div>
          <div class="balance-card glassmorphism">
            <div class="balance-number" style="color: var(--success);">${bal.sick}</div>
            <div class="balance-type">Sick Leave Remaining</div>
          </div>
          <div class="balance-card glassmorphism">
            <div class="balance-number" style="color: var(--warning);">${bal.personal}</div>
            <div class="balance-type">Personal Leave Remaining</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 2fr 1fr; gap:30px;">
          ${historyTable}
          
          <!-- Leave Calendar -->
          <div class="calendar-view-box glassmorphism">
            <div class="calendar-header">
              <h4 style="font-size: 0.95rem;">Calendar &bull; July 2026</h4>
              <i data-lucide="chevron-right" style="width:16px; height:16px;"></i>
            </div>
            <div class="calendar-grid">
              <span class="calendar-day-label">S</span>
              <span class="calendar-day-label">M</span>
              <span class="calendar-day-label">T</span>
              <span class="calendar-day-label">W</span>
              <span class="calendar-day-label">T</span>
              <span class="calendar-day-label">F</span>
              <span class="calendar-day-label">S</span>
              
              <!-- First row spacing -->
              <div class="calendar-cell inactive">28</div>
              <div class="calendar-cell inactive">29</div>
              <div class="calendar-cell inactive">30</div>
              <div class="calendar-cell">1</div>
              <div class="calendar-cell">2</div>
              <div class="calendar-cell">3</div>
              <div class="calendar-cell">4</div>
              
              <div class="calendar-cell">5</div>
              <div class="calendar-cell has-event" title="David Kim Leave">6</div>
              <div class="calendar-cell has-event" title="David Kim Leave">7</div>
              <div class="calendar-cell">8</div>
              <div class="calendar-cell">9</div>
              <div class="calendar-cell">10</div>
              <div class="calendar-cell">11</div>
              
              <div class="calendar-cell">12</div>
              <div class="calendar-cell">13</div>
              <div class="calendar-cell">14</div>
              <div class="calendar-cell">15</div>
              <div class="calendar-cell">16</div>
              <div class="calendar-cell">17</div>
              <div class="calendar-cell">18</div>
              
              <div class="calendar-cell">19</div>
              <div class="calendar-cell">20</div>
              <div class="calendar-cell">21</div>
              <div class="calendar-cell">22</div>
              <div class="calendar-cell">23</div>
              <div class="calendar-cell">24</div>
              <div class="calendar-cell">25</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // F. PAYROLL & COMPENSATION
  renderPayrollModule(role) {
    const state = StateManager.get();
    
    if (role === 'hr_admin') {
      return `
        <div class="glassmorphism anim-slide-up" style="padding: 24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h3 style="font-size:1.2rem;">Enterprise Payroll Register</h3>
            <button class="gradient-btn btn-small" id="payroll-run-all-btn">Process All Pending Payments</button>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Base Salary</th>
                  <th>Bonus</th>
                  <th>Reimbursement</th>
                  <th>Tax Liability</th>
                  <th>Net Wages</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${state.payroll.map(p => `
                  <tr>
                    <td style="font-weight:600;">${p.name}</td>
                    <td>$${(p.salary/12).toLocaleString(undefined, {maximumFractionDigits:0})}/mo</td>
                    <td>$${p.bonus.toLocaleString()}</td>
                    <td>$${p.reimburse.toLocaleString()}</td>
                    <td style="color:var(--danger)">-$${p.tax.toLocaleString()}</td>
                    <td style="font-weight:700; color:var(--accent-cyan)">$${p.net.toLocaleString()}</td>
                    <td><span class="status-indicator ${p.status === 'Paid' ? 'approved' : 'pending'}">${p.status}</span></td>
                    <td>
                      ${p.status !== 'Paid' ? `
                        <button class="gradient-btn btn-small payroll-process-btn" data-id="${p.id}" style="padding:4px 8px; font-size:0.75rem;">Disburse</button>
                      ` : `
                        <button class="outline-btn btn-small payroll-download-payslip" data-id="${p.id}" style="padding:4px 8px; font-size:0.75rem;"><i data-lucide="download" style="width:12px; height:12px;"></i> Slip</button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      // Employee View - Retrieve payslips
      const myPayroll = state.payroll.filter(p => p.empId === 'EMP002');
      return `
        <div class="glassmorphism anim-slide-up" style="padding:24px;">
          <h3 style="font-size:1.2rem; margin-bottom:16px;">My Compensation & Payslips</h3>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Pay Period</th>
                  <th>Base Wages</th>
                  <th>Bonus Paid</th>
                  <th>Reimbursements</th>
                  <th>Tax Paid</th>
                  <th>Net Salary Distributed</th>
                  <th>Status</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                ${myPayroll.map(p => `
                  <tr>
                    <td>${p.period}</td>
                    <td>$${(p.salary/12).toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                    <td>$${p.bonus}</td>
                    <td>$${p.reimburse}</td>
                    <td style="color:var(--danger)">-$${p.tax}</td>
                    <td style="font-weight:700; color:var(--accent-cyan)">$${p.net.toLocaleString()}</td>
                    <td><span class="status-indicator ${p.status === 'Paid' ? 'approved' : 'pending'}">${p.status}</span></td>
                    <td>
                      <button class="outline-btn btn-small payroll-download-payslip" data-id="${p.id}"><i data-lucide="download" style="width:14px; height:14px;"></i> Payslip PDF</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  // G. ATTENDANCE & TIMESHEETS
  renderAttendanceModule(role) {
    const state = StateManager.get();
    
    // Summary values
    const presentCount = 5;
    const absentCount = 1;
    const avgHours = 8.8;

    if (role === 'hr_admin') {
      return `
        <div class="attendance-layout anim-slide-up">
          <div class="glassmorphism" style="padding:24px;">
            <h3 style="font-size:1.15rem; margin-bottom:16px;">Timesheet Log &bull; Today</h3>
            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Status</th>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                    <th>Total Hours</th>
                    <th>Late Entry</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(state.attendance[0].records).map(([empId, r]) => {
                    const emp = state.employees.find(e => e.id === empId);
                    return `
                      <tr>
                        <td style="font-weight:600;">${emp ? emp.name : empId}</td>
                        <td><span class="status-indicator ${r.status === 'Present' ? 'approved' : 'rejected'}">${r.status}</span></td>
                        <td>${r.clockIn}</td>
                        <td>${r.clockOut}</td>
                        <td>${r.hours} hrs</td>
                        <td style="color: ${r.late ? 'var(--warning)' : 'var(--success)'};">${r.late ? 'Yes' : 'No'}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="glassmorphism" style="padding:24px; display:flex; flex-direction:column; gap:20px;">
            <h3 style="font-size:1.15rem;">Attendance Analytics</h3>
            <div class="leave-balance-container" style="grid-template-columns: 1fr 1fr; margin-bottom: 0;">
              <div class="balance-card glassmorphism">
                <div class="balance-number" style="color: var(--success);">${presentCount}</div>
                <div class="balance-type">Present Today</div>
              </div>
              <div class="balance-card glassmorphism">
                <div class="balance-number" style="color: var(--danger);">${absentCount}</div>
                <div class="balance-type">Absent Today</div>
              </div>
            </div>
            
            <div style="flex:1; display:flex; align-items:center; justify-content:center;">
              <div class="custom-bar-chart" style="height:150px;">
                <div class="custom-bar-col">
                  <div class="custom-bar-track"><div class="custom-bar-fill" style="height: 98%;"></div></div>
                  <span class="custom-bar-label">Mon</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track"><div class="custom-bar-fill" style="height: 96%;"></div></div>
                  <span class="custom-bar-label">Tue</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track"><div class="custom-bar-fill" style="height: 83%;"></div></div>
                  <span class="custom-bar-label">Wed</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track"><div class="custom-bar-fill" style="height: 91%;"></div></div>
                  <span class="custom-bar-label">Thu</span>
                </div>
                <div class="custom-bar-col">
                  <div class="custom-bar-track"><div class="custom-bar-fill" style="height: 95%;"></div></div>
                  <span class="custom-bar-label">Fri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Employee view
      return `
        <div class="glassmorphism anim-slide-up" style="padding:24px; max-width:800px; margin: 0 auto;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h3 style="font-size:1.2rem;">My Attendance Timesheet</h3>
            <button class="gradient-btn btn-small" id="attendance-clock-btn"><i data-lucide="clock"></i> Clock In/Out</button>
          </div>
          
          <div class="leave-balance-container">
            <div class="balance-card glassmorphism">
              <div class="balance-number" style="color:var(--success)">98%</div>
              <div class="balance-type">Present Rate</div>
            </div>
            <div class="balance-card glassmorphism">
              <div class="balance-number" style="color:var(--primary)">176 hrs</div>
              <div class="balance-type">Working Hours</div>
            </div>
            <div class="balance-card glassmorphism">
              <div class="balance-number" style="color:var(--warning)">2</div>
              <div class="balance-type">Late Entries</div>
            </div>
          </div>
          
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Clock In</th>
                  <th>Clock Out</th>
                  <th>Total Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2026-07-06</td><td>09:05 AM</td><td>06:15 PM</td><td>9.15 hrs</td><td><span class="status-indicator approved">Present</span></td></tr>
                <tr><td>2026-07-05</td><td>09:12 AM</td><td>06:00 PM</td><td>8.80 hrs</td><td><span class="status-indicator approved">Present</span></td></tr>
                <tr><td>2026-07-04</td><td>08:55 AM</td><td>05:30 PM</td><td>8.58 hrs</td><td><span class="status-indicator approved">Present</span></td></tr>
                <tr><td>2026-07-03</td><td>08:50 AM</td><td>05:45 PM</td><td>8.92 hrs</td><td><span class="status-indicator approved">Present</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  // H. PERFORMANCE
  renderPerformanceModule(role) {
    const state = StateManager.get();
    
    if (role === 'hr_admin') {
      return `
        <div class="glassmorphism anim-slide-up" style="padding:24px;">
          <h3 style="font-size:1.2rem; margin-bottom:20px;">Staff Performance Ratings</h3>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Performance Index</th>
                  <th>Completed Goals</th>
                  <th>Feedback Summary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${state.employees.map(emp => {
                  const perf = state.performance[emp.id] || { score: 80, goals: [], feedback: '' };
                  const compGoals = perf.goals.filter(g => g.status === 'Completed').length;
                  return `
                    <tr>
                      <td style="font-weight:600;">${emp.name}</td>
                      <td>
                        <span style="font-weight:700; color: ${perf.score >= 90 ? 'var(--success)' : perf.score >= 80 ? 'var(--primary)' : 'var(--warning)'}">
                          ${perf.score}%
                        </span>
                      </td>
                      <td>${compGoals}/${perf.goals.length} goals</td>
                      <td style="font-size:0.85rem; color:var(--text-muted);">${perf.feedback}</td>
                      <td>
                        <button class="outline-btn btn-small view-performance-btn" data-id="${emp.id}">Manage Goals</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      // Employee view
      const perf = state.performance['EMP002'] || { score: 90, feedback: '', goals: [], achievements: [], suggestions: '' };
      return `
        <div class="anim-slide-up" style="display:flex; flex-direction:column; gap:30px; max-width:850px; margin: 0 auto;">
          <div class="glassmorphism" style="padding:30px; text-align:center; background:linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(99,102,241,0.06) 100%)">
            <span style="color:var(--accent-purple); font-weight:600; text-transform:uppercase; font-size:0.85rem; letter-spacing:0.05em;">Performance Index</span>
            <div style="font-size:3.5rem; font-family:var(--font-heading); font-weight:800; color:var(--accent-purple); margin:10px 0;">${perf.score}%</div>
            <p style="font-style:italic; color:var(--text-muted); max-width:600px; margin: 0 auto;">"${perf.feedback}"</p>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">
            <!-- My Goals -->
            <div class="glassmorphism" style="padding:24px;">
              <h4 style="font-size:1.05rem; margin-bottom:16px;">My Operational Goals</h4>
              <div style="display:flex; flex-direction:column; gap:12px;">
                ${perf.goals.map(g => `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:var(--radius-sm); background:var(--bg-tertiary);">
                    <span style="font-size:0.9rem;">${g.name}</span>
                    <span class="status-indicator ${g.status === 'Completed' ? 'approved' : 'pending'}">${g.status}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- AI Improvement Suggestions -->
            <div class="glassmorphism" style="padding:24px; border-left: 4px solid var(--accent-cyan);">
              <h4 style="font-size:1.05rem; margin-bottom:16px; color:var(--accent-cyan);"><i data-lucide="sparkles"></i> AI Growth Suggestions</h4>
              <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:16px;">${perf.suggestions}</p>
              <div style="background:rgba(6,182,212,0.05); padding:12px; border-radius:var(--radius-sm); font-size:0.8rem; color:var(--text-muted);">
                <strong>Recent Achievement:</strong> ${perf.achievements[0] || 'None logged.'}
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // I. ATTRITION ANALYTICS
  renderAttritionModule() {
    const state = StateManager.get();
    const highRiskStaff = state.employees.filter(e => e.riskScore >= 50);
    
    return `
      <div class="anim-slide-up" style="display:flex; flex-direction:column; gap:30px;">
        <div class="glassmorphism" style="padding:24px; border-left:4px solid var(--danger); background:rgba(239,68,68,0.03);">
          <h3 style="font-size:1.15rem; color:var(--danger); margin-bottom:6px;"><i data-lucide="alert-octagon"></i> Predictive Turnover Insights</h3>
          <p style="color:var(--text-muted); font-size:0.95rem;">Our AI Agent audits hours, workloads, tenure, and feedback to flag high risk employees before resignation events occur.</p>
        </div>

        <div class="attrition-grid">
          ${highRiskStaff.map(emp => `
            <div class="risk-card glassmorphism" style="border-top: 4px solid ${emp.riskScore >= 70 ? 'var(--danger)' : 'var(--warning)'};">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="font-size:1.1rem; font-weight:600;">${emp.name}</h4>
                <span style="font-size:1.4rem; font-family:var(--font-heading); font-weight:700; color:${emp.riskScore >= 70 ? 'var(--danger)' : 'var(--warning)'}">
                  ${emp.riskScore}%
                </span>
              </div>
              <div style="font-size:0.85rem; color:var(--text-dark);">${emp.role} &bull; ${emp.dept}</div>
              <div style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">
                <strong>AI Diagnostics:</strong> ${emp.riskText}
              </div>
              <div style="margin-top:10px; display:flex; gap:8px;">
                <button class="gradient-btn btn-small retain-retention-btn" data-id="${emp.id}" style="flex:1; justify-content:center;">Generate Retention Plan</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // J. EMPLOYEE LIFECYCLE
  renderLifecycleModule() {
    const state = StateManager.get();
    return `
      <div class="glassmorphism anim-slide-up" style="padding:24px;">
        <h3 style="font-size:1.2rem; margin-bottom:20px;">Employee Lifecycle Management</h3>
        
        <div style="display:flex; flex-direction:column; gap:24px;">
          ${state.lifecycle.map(life => `
            <div class="glassmorphism" style="padding:20px; display:grid; grid-template-columns: 200px 1fr 100px; gap:20px; align-items:center;">
              <div>
                <strong style="font-size:1rem;">${life.name}</strong>
                <div style="font-size:0.8rem; color:var(--text-dark); margin-top:4px;">Stage: ${life.stage}</div>
              </div>
              <div>
                <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:8px;">${life.details}</p>
                <div style="width:100%; height:6px; background:var(--bg-tertiary); border-radius:3px; overflow:hidden;">
                  <div style="width:${life.progress}%; height:100%; background:var(--primary); border-radius:3px;"></div>
                </div>
              </div>
              <div style="text-align:right;">
                <button class="outline-btn btn-small lifecycle-update-btn" data-id="${life.id || life.empId}">Advance</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // K. REPORTS
  renderReportsModule() {
    return `
      <div class="glassmorphism anim-slide-up" style="padding:24px; max-width:800px;">
        <h3 style="font-size:1.2rem; margin-bottom:16px;">Generate HR Intelligence Reports</h3>
        <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:24px;">Select reporting modules to download structured analytical CSV logs or trigger automated n8n data audits.</p>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
          <div class="glassmorphism" style="padding:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h4 style="font-size:0.95rem;">Attendance Reports</h4>
              <span style="font-size:0.75rem; color:var(--text-dark);">Daily and monthly timesheet logs</span>
            </div>
            <button class="gradient-btn btn-small report-download-btn" data-type="attendance"><i data-lucide="download"></i></button>
          </div>
          
          <div class="glassmorphism" style="padding:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h4 style="font-size:0.95rem;">Payroll Reports</h4>
              <span style="font-size:0.75rem; color:var(--text-dark);">Tax liabilities and wages ledgers</span>
            </div>
            <button class="gradient-btn btn-small report-download-btn" data-type="payroll"><i data-lucide="download"></i></button>
          </div>

          <div class="glassmorphism" style="padding:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h4 style="font-size:0.95rem;">Recruitment Reports</h4>
              <span style="font-size:0.75rem; color:var(--text-dark);">ATS parser index scores & pipelines</span>
            </div>
            <button class="gradient-btn btn-small report-download-btn" data-type="recruitment"><i data-lucide="download"></i></button>
          </div>

          <div class="glassmorphism" style="padding:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h4 style="font-size:0.95rem;">Performance Reports</h4>
              <span style="font-size:0.75rem; color:var(--text-dark);">Goals tracking index datasets</span>
            </div>
            <button class="gradient-btn btn-small report-download-btn" data-type="performance"><i data-lucide="download"></i></button>
          </div>

          <div class="glassmorphism" style="padding:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h4 style="font-size:0.95rem;">Attrition Risk Reports</h4>
              <span style="font-size:0.75rem; color:var(--text-dark);">Turnover risks lists and suggestions</span>
            </div>
            <button class="gradient-btn btn-small report-download-btn" data-type="attrition"><i data-lucide="download"></i></button>
          </div>
        </div>
      </div>
    `;
  },

  // L. NOTIFICATIONS MODULE
  renderNotificationsModule() {
    const state = StateManager.get();
    return `
      <div class="glassmorphism anim-slide-up" style="padding:24px; max-width:800px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="font-size:1.2rem;">Notifications Log</h3>
          <button class="outline-btn btn-small" id="notif-clear-btn">Mark all as read</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${state.notifications.map(n => `
            <div class="glassmorphism" style="padding:16px; border-left:4px solid ${n.type === 'success' ? 'var(--success)' : n.type === 'warning' ? 'var(--warning)' : n.type === 'error' ? 'var(--danger)' : 'var(--primary)'}; opacity: ${n.read ? '0.7' : '1'}; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <p style="font-size:0.95rem; font-weight: ${n.read ? '400' : '600'};">${n.text}</p>
                <span style="font-size:0.75rem; color:var(--text-dark);">${n.time}</span>
              </div>
              ${!n.read ? `<div style="width:8px; height:8px; border-radius:50%; background:var(--primary);"></div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // M. SETTINGS MODULE
  renderSettingsModule() {
    const state = StateManager.get();
    return `
      <div class="glassmorphism anim-slide-up" style="padding:24px; max-width:700px;">
        <h3 style="font-size:1.2rem; margin-bottom:20px;">System Settings</h3>
        <form id="settings-form" style="display:flex; flex-direction:column; gap:20px;">
          <div class="form-group">
            <label>n8n REST Webhook Endpoint</label>
            <input type="url" id="settings-webhook" class="form-input" value="${state.settings.webhookUrl}" required>
            <span style="font-size:0.75rem; color:var(--text-dark); margin-top:4px;">WorkSphere AI routes all events, scores, and updates to this URL endpoint.</span>
          </div>
          
          <div class="form-group">
            <label>Enterprise Company Name</label>
            <input type="text" id="settings-company" class="form-input" value="${state.settings.companyName}">
          </div>

          <div style="display:flex; gap:20px; align-items:center; border-top:1px solid var(--glass-border); padding-top:20px;">
            <div style="flex:1;">
              <h4 style="font-size:0.95rem;">Multi-Factor Authentication</h4>
              <p style="font-size:0.75rem; color:var(--text-dark);">Enforce password checks for payroll disbursements.</p>
            </div>
            <input type="checkbox" id="settings-mfa" style="width:20px; height:20px;" ${state.settings.securityMfa ? 'checked' : ''}>
          </div>

          <button type="submit" class="gradient-btn" style="width:fit-content; margin-top:10px;">Save Configuration</button>
        </form>
      </div>
    `;
  },

  // N. PROFILE MODULE
  renderProfileModule() {
    const state = StateManager.get();
    return `
      <div class="glassmorphism anim-slide-up" style="padding:24px; max-width:600px; margin: 0 auto;">
        <h3 style="font-size:1.2rem; margin-bottom:20px;">My Work Profile</h3>
        <div style="display:flex; align-items:center; gap:20px; margin-bottom:24px;">
          <div class="profile-avatar" style="width:72px; height:72px; font-size:1.8rem;">VK</div>
          <div>
            <h4 style="font-size:1.2rem;">${state.activeUser.name}</h4>
            <p style="color:var(--text-muted); font-size:0.9rem;">Senior AI Research Scientist &bull; Technology</p>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:12px; font-size:0.9rem;">
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--glass-border); padding-bottom:8px;">
            <span style="color:var(--text-muted)">Staff Email:</span><strong>${state.activeUser.email}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--glass-border); padding-bottom:8px;">
            <span style="color:var(--text-muted)">Hired Date:</span><strong>2024-03-10</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--glass-border); padding-bottom:8px;">
            <span style="color:var(--text-muted)">Work Location:</span><strong>Remote, California</strong>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // EVENT BINDINGS & HANDLERS
  // ==========================================
  bindEventListeners(route, subTab) {
    const state = StateManager.get();

    // 1. LANDING PAGE BINDINGS
    if (route === 'landing') {
      const loginBtn = document.getElementById('landing-login-btn');
      const launchBtn = document.getElementById('landing-launch-btn');
      const heroLaunchBtn = document.getElementById('hero-launch-btn');
      const heroDemoBtn = document.getElementById('hero-demo-btn');
      const navLinks = document.querySelectorAll('.nav-link');
      const faqItems = document.querySelectorAll('.faq-item');

      if (loginBtn) loginBtn.onclick = () => Router.navigate('login');
      if (launchBtn) launchBtn.onclick = () => Router.navigate('login');
      if (heroLaunchBtn) heroLaunchBtn.onclick = () => Router.navigate('login');
      
      if (heroDemoBtn) {
        heroDemoBtn.onclick = () => {
          this.showToast('info', 'Sandbox Demo Video initialized in background...');
        };
      }

      // Smooth scroll simulation
      navLinks.forEach(link => {
        link.onclick = (e) => {
          e.preventDefault();
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          const targetId = link.getAttribute('data-scroll');
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        };
      });

      // Accordion FAQ toggle
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
          question.onclick = () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(f => f.classList.remove('active'));
            if (!isActive) {
              item.classList.add('active');
            }
          };
        }
      });
    }

    // 2. AUTHENTICATION BINDINGS
    if (route === 'login' || route === 'signup') {
      const toggleLink = document.getElementById('auth-toggle-link');
      const authForm = document.getElementById('auth-submit-form');

      if (toggleLink) {
        toggleLink.onclick = (e) => {
          e.preventDefault();
          Router.navigate(route === 'login' ? 'signup' : 'login');
        };
      }

      if (authForm) {
        authForm.onsubmit = (e) => {
          e.preventDefault();
          const emailInput = document.getElementById('auth-email').value;
          state.activeUser.email = emailInput;
          state.activeUser.name = emailInput.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          StateManager.save();
          this.showToast('success', `Identity authenticated: welcome ${state.activeUser.name}`);
          Router.navigate('role-select');
        };
      }
    }

    // 3. ROLE SELECTION BINDINGS
    if (route === 'role-select') {
      const adminBox = document.getElementById('role-select-admin');
      const employeeBox = document.getElementById('role-select-employee');

      if (adminBox) {
        adminBox.onclick = () => {
          StateManager.changeRole('hr_admin');
          this.showToast('success', 'Admin workspace mounted.');
          Router.navigate('briefing');
        };
      }

      if (employeeBox) {
        employeeBox.onclick = () => {
          StateManager.changeRole('employee');
          this.showToast('success', 'Employee portal mounted.');
          Router.navigate('briefing');
        };
      }
    }

    // 4. DAILY BRIEFING BINDINGS
    if (route === 'briefing') {
      const launchDashboardBtn = document.getElementById('briefing-launch-dashboard-btn');
      const commandInput = document.getElementById('ai-briefing-command-input');
      const commandBtn = document.getElementById('ai-briefing-command-btn');
      const suggestions = document.querySelectorAll('.suggestion-tag');

      const handleCommandSubmit = () => {
        const cmdText = commandInput.value.trim();
        if (cmdText) {
          StateManager.addCopilotMessage('user', cmdText);
          
          // Generate simulated response
          let responseText = `Resolving action: "${cmdText}". HR Command Center launched.`;
          let targetTab = 'dashboard';

          const lowerText = cmdText.toLowerCase();
          if (lowerText.includes('resume') || lowerText.includes('candidate') || lowerText.includes('hiring')) {
            responseText = "Analyzing recruitment matches and ATS scores. Launching Recruitment module...";
            targetTab = 'recruitment';
          } else if (lowerText.includes('payroll') || lowerText.includes('salary') || lowerText.includes('wage')) {
            responseText = "Opening payroll calculators and compensation scheduler registers...";
            targetTab = 'payroll';
          } else if (lowerText.includes('leave') || lowerText.includes('vacation')) {
            responseText = "Retrieved leave request balances. Opening Leave module...";
            targetTab = 'leave';
          } else if (lowerText.includes('attrition') || lowerText.includes('risk') || lowerText.includes('turnover')) {
            responseText = "Predicting team turnovers. Opening Attrition Analytics...";
            targetTab = 'attrition';
          } else if (lowerText.includes('report') || lowerText.includes('audit')) {
            responseText = "Drafting automated employee lifecycle reports. Opening Reports module...";
            targetTab = 'reports';
          }

          StateManager.addCopilotMessage('ai', responseText);
          this.showToast('info', responseText);
          
          setTimeout(() => {
            const nextRoute = state.activeUser.role === 'hr_admin' ? 'dashboard' : 'employee-dashboard';
            Router.navigate(nextRoute, targetTab);
          }, 800);
        }
      };

      if (launchDashboardBtn) {
        launchDashboardBtn.onclick = () => {
          const nextRoute = state.activeUser.role === 'hr_admin' ? 'dashboard' : 'employee-dashboard';
          Router.navigate(nextRoute);
        };
      }

      if (commandBtn) {
        commandBtn.onclick = handleCommandSubmit;
      }

      if (commandInput) {
        commandInput.onkeydown = (e) => {
          if (e.key === 'Enter') handleCommandSubmit();
        };
      }

      suggestions.forEach(tag => {
        tag.onclick = () => {
          commandInput.value = tag.innerText;
          commandInput.focus();
        };
      });
    }

    // 5. SIDEBAR & GLOBAL DASHBOARD BINDINGS
    if (route === 'dashboard' || route === 'employee-dashboard') {
      const sidebarLinks = document.querySelectorAll('.sidebar-link');
      const logoutBtn = document.getElementById('sidebar-logout-btn');
      const themeBtn = document.getElementById('theme-toggle-btn');
      const notifBell = document.getElementById('header-notif-btn');
      const quickActionBtn = document.getElementById('header-quick-action-btn');
      const globalSearch = document.getElementById('global-search-input');

      // Floating Chat handlers
      const floatTrigger = document.getElementById('floating-ai-trigger');
      const floatClose = document.getElementById('floating-chat-close-btn');
      const floatWindow = document.getElementById('floating-chat-window');
      const floatForm = document.getElementById('floating-chat-form');
      const floatInput = document.getElementById('floating-chat-input');
      const floatMessages = document.getElementById('floating-chat-messages');

      // Navigation tabs clicks
      sidebarLinks.forEach(link => {
        link.onclick = (e) => {
          e.preventDefault();
          const targetTab = link.getAttribute('data-tab');
          Router.navigate(route, targetTab);
        };
      });

      if (logoutBtn) {
        logoutBtn.onclick = () => {
          this.showToast('info', 'Sign out successful.');
          Router.navigate('landing');
        };
      }

      if (themeBtn) {
        themeBtn.onclick = () => {
          const currentTheme = state.settings.theme;
          const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
          state.settings.theme = nextTheme;
          StateManager.save();
          
          document.body.className = `${nextTheme}-theme`;
          
          // Re-render current page immediately to update buttons/themes
          Router.navigate(route, subTab);
          this.showToast('success', `Theme switched to ${nextTheme} mode.`);
        };
      }

      if (notifBell) {
        notifBell.onclick = () => {
          Router.navigate(route, 'notifications');
        };
      }

      if (quickActionBtn) {
        quickActionBtn.onclick = () => {
          this.openModal('Quick Operations', `
            <div style="display:flex; flex-direction:column; gap:12px;">
              <button class="gradient-btn" id="modal-clock-btn" style="justify-content:center;"><i data-lucide="clock"></i> Clock In / Out timesheet</button>
              <button class="outline-btn" id="modal-leave-btn" style="justify-content:center;"><i data-lucide="calendar"></i> File Leave Request</button>
              <button class="outline-btn" id="modal-payslip-btn" style="justify-content:center;"><i data-lucide="download"></i> Download Last Payslip</button>
            </div>
          `);
          
          if (window.lucide) window.lucide.createIcons();
          
          // Modal inner bindings
          document.getElementById('modal-clock-btn').onclick = () => {
            this.closeModal();
            this.showToast('success', 'Clock In successful. Shift timer started.');
          };
          document.getElementById('modal-leave-btn').onclick = () => {
            this.closeModal();
            Router.navigate(route, 'leave');
          };
          document.getElementById('modal-payslip-btn').onclick = () => {
            this.closeModal();
            this.showToast('success', 'Wages details report downloaded successfully.');
          };
        };
      }

      if (globalSearch) {
        globalSearch.onkeydown = (e) => {
          if (e.key === 'Enter') {
            const query = globalSearch.value.trim().toLowerCase();
            if (query) {
              const matchedEmps = state.employees.filter(emp => emp.name.toLowerCase().includes(query) || emp.role.toLowerCase().includes(query));
              const matchedCands = state.candidates.filter(c => c.name.toLowerCase().includes(query) || c.skills.some(s => s.toLowerCase().includes(query)));
              
              let resultsHtml = `<div style="font-size:0.95rem;">`;
              if (matchedEmps.length > 0) {
                resultsHtml += `<h4 style="color:var(--primary); margin-bottom:8px;">Employees</h4>`;
                matchedEmps.forEach(e => {
                  resultsHtml += `<div style="padding:6px; border-bottom:1px solid var(--glass-border); display:flex; justify-content:space-between;">
                    <span>${e.name} (${e.role})</span>
                    <strong>${e.dept}</strong>
                  </div>`;
                });
              }
              if (matchedCands.length > 0) {
                resultsHtml += `<h4 style="color:var(--accent-cyan); margin-top:16px; margin-bottom:8px;">Candidates</h4>`;
                matchedCands.forEach(c => {
                  resultsHtml += `<div style="padding:6px; border-bottom:1px solid var(--glass-border); display:flex; justify-content:space-between;">
                    <span>${c.name} (ATS Compatibility: ${c.atsScore}%)</span>
                    <strong>${c.status}</strong>
                  </div>`;
                });
              }
              if (matchedEmps.length === 0 && matchedCands.length === 0) {
                resultsHtml += `<p style="color:var(--text-muted);">No records matching "${query}" were found.</p>`;
              }
              resultsHtml += `</div>`;
              
              this.openModal(`Search Results for "${query}"`, resultsHtml);
            }
          }
        };
      }

      // Floating AI Assistant toggle
      if (floatTrigger) {
        floatTrigger.onclick = () => {
          floatWindow.classList.toggle('hidden');
          floatMessages.scrollTop = floatMessages.scrollHeight;
        };
      }

      if (floatClose) {
        floatClose.onclick = () => {
          floatWindow.classList.add('hidden');
        };
      }

      if (floatForm) {
        floatForm.onsubmit = (e) => {
          e.preventDefault();
          const txt = floatInput.value.trim();
          if (txt) {
            // Append User message
            floatMessages.innerHTML += `
              <div class="chat-message user">
                <div class="chat-avatar"><i data-lucide="user"></i></div>
                <div class="chat-bubble">${txt}</div>
              </div>
            `;
            floatInput.value = '';
            floatMessages.scrollTop = floatMessages.scrollHeight;

            // Simple Response Logic
            setTimeout(() => {
              floatMessages.innerHTML += `
                <div class="chat-message ai">
                  <div class="chat-avatar"><i data-lucide="bot"></i></div>
                  <div class="chat-bubble">Processing your request for "${txt}" through n8n automation webhook... Done. Action updated successfully.</div>
                </div>
              `;
              floatMessages.scrollTop = floatMessages.scrollHeight;
              if (window.lucide) window.lucide.createIcons();
            }, 800);
            
            if (window.lucide) window.lucide.createIcons();
          }
        };
      }

      // ==========================================
      // SUB-TAB MODULE EVENTS
      // ==========================================

      // Dashboard Insight Action buttons
      const insightBtns = document.querySelectorAll('.action-insight-btn');
      insightBtns.forEach(btn => {
        btn.onclick = () => {
          const type = btn.getAttribute('data-type');
          if (type === 'risk') {
            Router.navigate(route, 'attrition');
          } else if (type === 'payroll') {
            Router.navigate(route, 'payroll');
          } else if (type === 'recruitment') {
            Router.navigate(route, 'recruitment');
          } else {
            this.showToast('success', 'Audit complete. Action resolved successfully.');
          }
        };
      });

      // Quick launch daily briefing
      const dashboardBriefingBtn = document.getElementById('dashboard-briefing-btn');
      if (dashboardBriefingBtn) {
        dashboardBriefingBtn.onclick = () => {
          Router.navigate('briefing');
        };
      }

      // Copilot chat submissions
      if (subTab === 'copilot') {
        const copilotForm = document.getElementById('copilot-chat-form');
        const copilotInput = document.getElementById('copilot-chat-input');
        const copilotMessagesBox = document.getElementById('copilot-messages-box');
        const clearBtn = document.getElementById('copilot-clear-btn');
        const voiceBtn = document.getElementById('copilot-voice-btn');
        const suggestedPrompts = document.querySelectorAll('.suggestion-prompt');

        const processCopilotText = (inputText) => {
          if (!inputText) return;
          
          StateManager.addCopilotMessage('user', inputText);
          
          // Re-render user message
          copilotMessagesBox.innerHTML += `
            <div class="chat-message user">
              <div class="chat-avatar"><i data-lucide="user"></i></div>
              <div class="chat-bubble">${inputText}</div>
            </div>
          `;
          copilotMessagesBox.scrollTop = copilotMessagesBox.scrollHeight;
          
          // Trigger n8n simulated reply
          setTimeout(() => {
            let aiText = "I have received your prompt. Let me check the databases...";
            const lower = inputText.toLowerCase();

            if (lower.includes('report')) {
              aiText = "### WorkSphere AI Automated HR Report\\n\\n- **Employee count**: 6 active staff\\n- **Payroll processing**: Processing Stage\\n- **Leave queue**: 2 requests pending audit\\n- **Attrition risk alert**: Sarah Jenkins and Marcus Vance flagged.\\n\\nWould you like me to send this summary to the n8n webhook integration?";
            } else if (lower.includes('recruitment') || lower.includes('resume')) {
              aiText = "Based on our latest ATS screening checks: Candidate **Rahul Sharma** is moving to Selected status (Score: 96%). **Amira Vance** matches 95% of job description credentials.";
            } else if (lower.includes('payroll')) {
              aiText = "June Payroll Summary:\\n- Base wages: $103,333\\n- Net wages paid: $210,000\\n- Processing review backlog: Sarah, Elena, Chloe, Marcus.";
            } else if (lower.includes('risk') || lower.includes('attrition')) {
              aiText = "### Attrition Risk Alert\\n\\n1. **Sarah Jenkins** (82% risk) - Competitor outreach metrics detected. Compensation below 45th percentile.\\n2. **Marcus Vance** (78% risk) - Alert logs indicate severe overtime hours and consecutive weekend commits.";
            } else if (lower.includes('attendance')) {
              aiText = "Marcus Vance flagged for late entries clock-in logs (9:45 AM). Finance department average attendance dipped by 8% this week.";
            } else if (lower.includes('department')) {
              aiText = "Department risk levels: Technology department holds a **36% Attrition risk index**. Finance risk index is **4%**.";
            }

            StateManager.addCopilotMessage('ai', aiText);
            
            copilotMessagesBox.innerHTML += `
              <div class="chat-message ai">
                <div class="chat-avatar"><i data-lucide="bot"></i></div>
                <div class="chat-bubble">${aiText.replace(/\\n/g, '<br>')}</div>
              </div>
            `;
            copilotMessagesBox.scrollTop = copilotMessagesBox.scrollHeight;
            if (window.lucide) window.lucide.createIcons();
          }, 1000);
          
          copilotInput.value = '';
          if (window.lucide) window.lucide.createIcons();
        };

        if (copilotForm) {
          copilotForm.onsubmit = (e) => {
            e.preventDefault();
            processCopilotText(copilotInput.value.trim());
          };
        }

        if (clearBtn) {
          clearBtn.onclick = () => {
            StateManager.clearCopilot();
            Router.navigate(route, 'copilot');
            this.showToast('info', 'Chat logs cleared.');
          };
        }

        if (voiceBtn) {
          voiceBtn.onclick = () => {
            this.showToast('info', 'Voice transcription activated... Speak now.');
            setTimeout(() => {
              copilotInput.value = "Find employees at risk";
              copilotInput.focus();
            }, 1500);
          };
        }

        suggestedPrompts.forEach(p => {
          p.onclick = () => {
            processCopilotText(p.innerText.trim());
          };
        });
      }

      // Recruitment module upload triggers
      if (subTab === 'recruitment') {
        const dropzone = document.getElementById('resume-dropzone');
        const fileInput = document.getElementById('resume-file-input');
        const uploadList = document.getElementById('uploaded-files-list');
        const analyzeBtn = document.getElementById('analyze-resumes-btn');
        const viewCandBtns = document.querySelectorAll('.view-candidate-btn');
        const promoteCandBtns = document.querySelectorAll('.promote-candidate-btn');

        // Drag events
        if (dropzone) {
          dropzone.onclick = () => fileInput.click();
          dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); };
          dropzone.ondragleave = () => dropzone.classList.remove('drag-over');
          dropzone.ondrop = (e) => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            handleFileSelection(e.dataTransfer.files);
          };
        }

        if (fileInput) {
          fileInput.onchange = () => handleFileSelection(fileInput.files);
        }

        const handleFileSelection = (files) => {
          uploadList.innerHTML = '';
          for (let file of files) {
            uploadList.innerHTML += `
              <div class="file-preview-item">
                <span><i data-lucide="file-text"></i> ${file.name}</span>
                <span style="color:var(--success)">Ready for parser</span>
              </div>
            `;
          }
          if (window.lucide) window.lucide.createIcons();
          this.showToast('success', `${files.length} resume(s) uploaded successfully.`);
        };

        if (analyzeBtn) {
          analyzeBtn.onclick = () => {
            const jd = document.getElementById('jd-input-box').value;
            this.showToast('info', 'AI engine is calculating resume scores and ATS match percentages...');
            
            // Add a new mock candidate automatically to demonstrate the parser flow
            setTimeout(() => {
              const parsedMockCandidate = {
                name: 'Karthik Rao',
                score: 93,
                atsScore: 94,
                matchPercent: 91,
                skills: ['Python', 'Django', 'PostgreSQL', 'LangChain', 'OpenAI'],
                missingSkills: ['Vite', 'GraphQL'],
                education: 'B.E. in Computer Science - Anna University',
                experience: '2 years at Cognizant building internal AI assistants',
                projects: 'Built agentic chatbot modules for database querying workflows',
                strengths: 'Solid python backend, fast learner, understands RAG architectures',
                weaknesses: 'Minimal enterprise UI development credentials',
                summary: 'Excellent candidate for immediate screening.',
                status: 'Applied',
                interviewProbability: 90,
                recommendation: 'Proceed to screen call'
              };
              
              StateManager.addCandidate(parsedMockCandidate);
              
              // Render Analysis Box output
              const resultsPanel = document.getElementById('screening-output-panel');
              const resultsContent = document.getElementById('screening-results-content');
              
              resultsPanel.classList.remove('hidden');
              resultsContent.innerHTML = `
                <div class="analysis-main-card">
                  <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                    <h4>Candidate Profile Match: <strong>${parsedMockCandidate.name}</strong></h4>
                    <span class="score-badge high">ATS Compatibility: ${parsedMockCandidate.atsScore}%</span>
                  </div>
                  <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5; margin-bottom:16px;">
                    <strong>AI Recommendation:</strong> ${parsedMockCandidate.recommendation}. ${parsedMockCandidate.summary}
                  </p>
                </div>
                <div>
                  <h4 style="font-size:0.9rem; margin-bottom:8px;">Education & Experience</h4>
                  <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">${parsedMockCandidate.education}</p>
                  <p style="font-size:0.85rem; color:var(--text-muted);">${parsedMockCandidate.experience}</p>
                </div>
                <div>
                  <h4 style="font-size:0.9rem; margin-bottom:8px;">Skills Vetting</h4>
                  <div class="skills-grid">
                    <div>
                      <span style="font-size:0.75rem; color:var(--success)">Matched:</span>
                      <div class="skills-list" style="margin-top:4px;">
                        ${parsedMockCandidate.skills.map(s => `<span class="skill-tag matched">${s}</span>`).join('')}
                      </div>
                    </div>
                    <div>
                      <span style="font-size:0.75rem; color:var(--danger)">Missing:</span>
                      <div class="skills-list" style="margin-top:4px;">
                        ${parsedMockCandidate.missingSkills.map(s => `<span class="skill-tag missing">${s}</span>`).join('')}
                      </div>
                    </div>
                  </div>
                </div>
              `;
              
              this.showToast('success', 'ATS Screening parsed successfully. Karthik Rao added to Applied Stage!');
              // Re-render complete page to populate Kanban columns with the new candidate
              setTimeout(() => {
                Router.navigate(route, 'recruitment');
              }, 1500);
            }, 1200);
          };
        }

        // View details popup
        viewCandBtns.forEach(btn => {
          btn.onclick = () => {
            const cId = btn.getAttribute('data-id');
            const cand = state.candidates.find(c => c.id === cId);
            if (cand) {
              this.openModal(`Candidate Card: ${cand.name}`, `
                <div style="display:flex; flex-direction:column; gap:16px; font-size:0.9rem;">
                  <div style="display:flex; justify-content:space-between;">
                    <strong>Rank #${cand.rank} &bull; ATS Score: ${cand.atsScore}%</strong>
                    <span class="status-indicator approved">${cand.status}</span>
                  </div>
                  <div><strong>Education:</strong> ${cand.education}</div>
                  <div><strong>Experience:</strong> ${cand.experience}</div>
                  <div><strong>Key Projects:</strong> ${cand.projects}</div>
                  <div><strong>Summary:</strong> ${cand.summary}</div>
                  <div><strong>Interview Prob:</strong> ${cand.interviewProbability}%</div>
                </div>
              `);
            }
          };
        });

        // Promote candidate flow
        promoteCandBtns.forEach(btn => {
          btn.onclick = () => {
            const cId = btn.getAttribute('data-id');
            const cand = state.candidates.find(c => c.id === cId);
            if (cand) {
              // Cycle through columns
              const order = ['Applied', 'AI Screening', 'Shortlisted', 'Interview', 'Selected', 'Onboarded'];
              const nextIndex = (order.indexOf(cand.status) + 1) % order.length;
              const nextStatus = order[nextIndex];
              
              StateManager.updateCandidateStatus(cId, nextStatus);
              
              // Handle alert confirmations based on statuses (Selected/Rejected)
              if (nextStatus === 'Selected') {
                this.openModal('Interview Invitation Generated', `
                  <div style="font-size:0.95rem;">
                    <p style="color:var(--success); font-weight:600; margin-bottom:12px;">Interview Invitation Generated Successfully!</p>
                    <textarea class="form-input" style="width:100%; min-height:120px;" readonly>Subject: Interview Invitation - WorkSphere AI\n\nDear ${cand.name},\n\nWe are pleased to invite you to a technical interview panel for the Agentic AI Architect position...</textarea>
                  </div>
                `);
              } else if (nextStatus === 'Onboarded') {
                this.showToast('success', `${cand.name} is now onboarded! Welcome card generated.`);
              }
              
              // Re-render recruitment module
              Router.navigate(route, 'recruitment');
            }
          };
        });
      }

      // Leave management approvals & requests
      if (subTab === 'leave') {
        const approveBtns = document.querySelectorAll('.leave-approve-btn');
        const rejectBtns = document.querySelectorAll('.leave-reject-btn');
        const applyOpenBtn = document.getElementById('apply-leave-btn-open');

        approveBtns.forEach(btn => {
          btn.onclick = () => {
            const reqId = btn.getAttribute('data-id');
            StateManager.resolveLeaveRequest(reqId, true);
            Router.navigate(route, 'leave');
          };
        });

        rejectBtns.forEach(btn => {
          btn.onclick = () => {
            const reqId = btn.getAttribute('data-id');
            StateManager.resolveLeaveRequest(reqId, false);
            Router.navigate(route, 'leave');
          };
        });

        if (applyOpenBtn) {
          applyOpenBtn.onclick = () => {
            this.openModal('Apply Leave Request', `
              <form id="apply-leave-modal-form" style="display:flex; flex-direction:column; gap:16px;">
                <div class="form-group">
                  <label>Leave Category</label>
                  <select class="form-input" id="leave-type-select" style="background:#07080e;">
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                  </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                  <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" class="form-input" id="leave-start-date" required>
                  </div>
                  <div class="form-group">
                    <label>End Date</label>
                    <input type="date" class="form-input" id="leave-end-date" required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Days requested</label>
                  <input type="number" class="form-input" id="leave-days" placeholder="3" min="1" required>
                </div>
                <div class="form-group">
                  <label>Reason / Details</label>
                  <textarea class="form-input" id="leave-reason" placeholder="Explain details..." required></textarea>
                </div>
                <button type="submit" class="gradient-btn" style="justify-content:center;">Submit Request</button>
              </form>
            `);

            const leaveForm = document.getElementById('apply-leave-modal-form');
            leaveForm.onsubmit = (e) => {
              e.preventDefault();
              const type = document.getElementById('leave-type-select').value;
              const start = document.getElementById('leave-start-date').value;
              const end = document.getElementById('leave-end-date').value;
              const days = document.getElementById('leave-days').value;
              const reason = document.getElementById('leave-reason').value;

              StateManager.addLeaveRequest(type, start, end, days, reason);
              this.closeModal();
              Router.navigate(route, 'leave');
            };
          };
        }
      }

      // Payroll disbursing triggers
      if (subTab === 'payroll') {
        const processBtns = document.querySelectorAll('.payroll-process-btn');
        const runAllBtn = document.getElementById('payroll-run-all-btn');
        const downloadSlips = document.querySelectorAll('.payroll-download-payslip');

        processBtns.forEach(btn => {
          btn.onclick = () => {
            const pId = btn.getAttribute('data-id');
            StateManager.processEmployeePayroll(pId);
            Router.navigate(route, 'payroll');
          };
        });

        if (runAllBtn) {
          runAllBtn.onclick = () => {
            state.payroll.forEach(p => {
              if (p.status !== 'Paid') {
                StateManager.processEmployeePayroll(p.id);
              }
            });
            Router.navigate(route, 'payroll');
            this.showToast('success', 'Payroll Processed successfully. Funds disbursed.');
          };
        }

        downloadSlips.forEach(btn => {
          btn.onclick = () => {
            const pId = btn.getAttribute('data-id');
            const item = state.payroll.find(p => p.id === pId);
            if (item) {
              this.openModal(`Payslip Document &bull; ${item.period}`, `
                <div style="font-size:0.9rem; font-family:monospace; padding:16px; border:1px solid var(--glass-border); border-radius:var(--radius-sm);">
                  <h4>WorkSphere AI Inc. - Payslip Summary</h4>
                  <hr style="border:none; border-bottom:1px dashed var(--glass-border); margin:12px 0;">
                  <div>Employee Name: ${item.name}</div>
                  <div>Base Salary Rate: $${item.salary.toLocaleString()} / year</div>
                  <hr style="border:none; border-bottom:1px dashed var(--glass-border); margin:12px 0;">
                  <div>Bonus Wages: $${item.bonus.toLocaleString()}</div>
                  <div>Reimbursements: $${item.reimburse.toLocaleString()}</div>
                  <div>Tax Ded (State/Federal): -$${item.tax.toLocaleString()}</div>
                  <hr style="border:none; border-bottom:1px dashed var(--glass-border); margin:12px 0;">
                  <strong style="color:var(--accent-cyan)">Net wage payout: $${item.net.toLocaleString()}</strong>
                  <hr style="border:none; border-bottom:1px dashed var(--glass-border); margin:12px 0;">
                  <div>Status: Paid &bull; Direct Deposit</div>
                </div>
              `);
            }
          };
        });
      }

      // Lifecycle updates
      if (subTab === 'lifecycle') {
        const advBtns = document.querySelectorAll('.lifecycle-update-btn');
        advBtns.forEach(btn => {
          btn.onclick = () => {
            const id = btn.getAttribute('data-id');
            const stages = ['Onboarding', 'Promotions', 'Transfers', 'Role Changes', 'Offboarding'];
            const item = state.lifecycle.find(l => l.id === id || l.empId === id);
            
            if (item) {
              const nextIndex = (stages.indexOf(item.stage) + 1) % stages.length;
              StateManager.updateLifecycleWorkflow(id, stages[nextIndex], `Advancing lifecycle state parameters automatically.`, 40);
              Router.navigate(route, 'lifecycle');
            }
          };
        });
      }

      // Report Downloads
      if (subTab === 'reports') {
        const downloadBtns = document.querySelectorAll('.report-download-btn');
        downloadBtns.forEach(btn => {
          btn.onclick = () => {
            const type = btn.getAttribute('data-type');
            this.showToast('success', `Exporting ${type} report to CSV file...`);
            setTimeout(() => {
              this.showToast('success', `${type.charAt(0).toUpperCase() + type.slice(1)} Report file downloaded successfully.`);
            }, 800);
          };
        });
      }

      // Notification clearing
      if (subTab === 'notifications') {
        const clearBtn = document.getElementById('notif-clear-btn');
        if (clearBtn) {
          clearBtn.onclick = () => {
            StateManager.markNotificationsAsRead();
            Router.navigate(route, 'notifications');
            this.showToast('success', 'All notifications marked as read.');
          };
        }
      }

      // Settings saving
      if (subTab === 'settings') {
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
          settingsForm.onsubmit = (e) => {
            e.preventDefault();
            const webhookUrl = document.getElementById('settings-webhook').value;
            const comp = document.getElementById('settings-company').value;
            const mfa = document.getElementById('settings-mfa').checked;

            state.settings.companyName = comp;
            state.settings.securityMfa = mfa;
            StateManager.updateWebhookUrl(webhookUrl);
            this.showToast('success', 'System configurations saved successfully.');
          };
        }
      }

      // Clock Timesheet Button Employee view
      if (subTab === 'attendance' && role === 'employee') {
        const clockBtn = document.getElementById('attendance-clock-btn');
        if (clockBtn) {
          clockBtn.onclick = () => {
            this.showToast('success', 'Clock sequence registered in timesheet log.');
          };
        }
      }
    }

    // Modal Close Trigger Bindings
    const modalClose = document.getElementById('modal-close-btn');
    if (modalClose) {
      modalClose.onclick = () => this.closeModal();
    }
  },

  // ==========================================
  // GLOBAL TOASTS & MODALS UTILITIES
  // ==========================================
  showToast(type, text) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Choose icon
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'alert-triangle';
    if (type === 'error') icon = 'alert-octagon';

    toast.innerHTML = `
      <i data-lucide="${icon}" style="width:18px; height:18px;"></i>
      <span>${text}</span>
    `;
    toastContainer.appendChild(toast);
    
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Auto remove
    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.3s reverse forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  },

  openModal(title, bodyHtml) {
    const overlay = document.getElementById('global-modal');
    const body = document.getElementById('modal-body-content');
    
    if (overlay && body) {
      body.innerHTML = `
        <h3 style="font-size: 1.3rem; font-family: var(--font-heading); margin-bottom: 20px; border-bottom:1px solid var(--glass-border); padding-bottom:10px;">${title}</h3>
        <div>${bodyHtml}</div>
      `;
      overlay.classList.remove('hidden');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  },

  closeModal() {
    const overlay = document.getElementById('global-modal');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }
};
