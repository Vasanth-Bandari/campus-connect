/* WorkSphere AI - Global State Management & Mock Datasets */

const STORAGE_KEY = 'worksphere_ai_state';

// Initial state template with realistic enterprise data
const DEFAULT_STATE = {
  activeUser: {
    name: 'Vasanth Kumar',
    email: 'vasanth@worksphere.ai',
    avatar: 'VK',
    role: 'hr_admin' // default active role, can be toggled to 'employee'
  },
  settings: {
    webhookUrl: 'https://n8n.worksphere.ai/webhook/v1/hr-intelligence',
    theme: 'dark',
    companyName: 'WorkSphere AI Inc.',
    securityMfa: true,
    notifyOnResume: true,
    notifyOnPayroll: true
  },
  employees: [
    { id: 'EMP001', name: 'Vasanth Kumar', role: 'Chief Human Resources Officer', dept: 'HR & Operations', salary: 145000, email: 'vasanth@worksphere.ai', avatar: 'VK', riskScore: 5, riskText: 'Negligible risk. Highly engaged.', status: 'Active', hireDate: '2023-01-15' },
    { id: 'EMP002', name: 'Sarah Jenkins', role: 'Senior AI Research Scientist', dept: 'Technology', salary: 185000, email: 'sarah.j@worksphere.ai', avatar: 'SJ', riskScore: 82, riskText: 'High Attrition Risk. Competitor outreach detected, compensation below market percentile for level.', status: 'Active', hireDate: '2024-03-10' },
    { id: 'EMP003', name: 'Elena Rostova', role: 'Lead UI/UX Designer', dept: 'Product Design', salary: 115000, email: 'elena.r@worksphere.ai', avatar: 'ER', riskScore: 18, riskText: 'Low Risk. Highly collaborative, active contributor.', status: 'Active', hireDate: '2023-08-20' },
    { id: 'EMP004', name: 'David Kim', role: 'Enterprise Account Executive', dept: 'Sales', salary: 95000, email: 'david.k@worksphere.ai', avatar: 'DK', riskScore: 54, riskText: 'Medium Risk. High target pressure, low team interaction scores this quarter.', status: 'Active', hireDate: '2022-11-01' },
    { id: 'EMP005', name: 'Chloe Ma', role: 'Financial Controller', dept: 'Finance', salary: 125000, email: 'chloe.m@worksphere.ai', avatar: 'CM', riskScore: 12, riskText: 'Low Risk. Solid attendance, stable performance trends.', status: 'Active', hireDate: '2023-05-14' },
    { id: 'EMP006', name: 'Marcus Vance', role: 'DevOps Engineer', dept: 'Technology', salary: 130000, email: 'marcus.v@worksphere.ai', avatar: 'MV', riskScore: 78, riskText: 'High Attrition Risk. Extreme working hours, high alert fatigue, consecutive weekend commits.', status: 'Active', hireDate: '2024-01-18' }
  ],
  candidates: [
    {
      id: 'CAN001',
      name: 'Michael Chen',
      score: 92,
      atsScore: 95,
      matchPercent: 90,
      skills: ['Python', 'PyTorch', 'LLMs', 'NLP', 'TensorFlow', 'Vector Databases'],
      missingSkills: ['Kubernetes', 'Go'],
      education: 'M.S. in Computer Science - Stanford University',
      experience: '3 years as Machine Learning Engineer at Anthropic',
      projects: 'Fine-tuned custom LLaMA-3 models for legal analysis agent workflows',
      strengths: 'Exceptional deep learning theory, hands-on LLM pretraining expertise',
      weaknesses: 'Minimal enterprise frontend development experience',
      summary: 'Strong technical fit for our core Agentic AI workflow squad. Recommending immediate technical panel interview.',
      rank: 1,
      status: 'Applied',
      interviewProbability: 95,
      recommendation: 'Interview Immediately'
    },
    {
      id: 'CAN002',
      name: 'Priya Nair',
      score: 88,
      atsScore: 90,
      matchPercent: 85,
      skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'TypeScript', 'Docker'],
      missingSkills: ['GraphQL', 'AWS CloudFormation'],
      education: 'B.S. in Software Engineering - Georgia Tech',
      experience: '4 years as Full Stack Engineer at Rippling',
      projects: 'Re-architected employee dashboard widgets leading to 40% performance gain',
      strengths: 'Clean modular code author, understands HR platforms and databases deeply',
      weaknesses: 'Fewer credentials in Python AI toolkits',
      summary: 'Solid full-stack developer with direct HR tech experience. Matches profile requirements very closely.',
      rank: 2,
      status: 'AI Screening',
      interviewProbability: 88,
      recommendation: 'Shortlist for screening'
    },
    {
      id: 'CAN003',
      name: 'John Smith',
      score: 75,
      atsScore: 80,
      matchPercent: 70,
      skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Pandas'],
      missingSkills: ['PyTorch', 'HuggingFace', 'Transformers'],
      education: 'B.A. in Economics - NYU',
      experience: '2 years as HR Data Analyst at Mercer',
      projects: 'Created regional attrition analytics spreadsheets for Fortune 100 client audits',
      strengths: 'Analytical, familiar with HR reporting paradigms',
      weaknesses: 'Lacks actual engineering/AI coding credentials',
      summary: 'Strong general analyst but may lack the core engineering depth required for the AI architect position.',
      rank: 3,
      status: 'Shortlisted',
      interviewProbability: 60,
      recommendation: 'Hold for feedback'
    },
    {
      id: 'CAN004',
      name: 'Amira Vance',
      score: 94,
      atsScore: 96,
      matchPercent: 95,
      skills: ['Python', 'FastAPI', 'LangChain', 'OpenAI APIs', 'PostgreSQL', 'Redis'],
      missingSkills: ['PyTorch'],
      education: 'B.S. in CS - UC Berkeley',
      experience: '3 years as backend developer at Retool; built drag-and-drop workflow features',
      projects: 'Integrated OpenAI assistants into enterprise scheduling applications',
      strengths: 'Excellent system integration capabilities, very high velocity developer',
      weaknesses: 'Less experience with training custom open-weights models',
      summary: 'Phenomenal candidate for integrating LLMs into our HR command workflows. Exceptional engineering test results.',
      rank: 4,
      status: 'Interview',
      interviewProbability: 92,
      recommendation: 'Schedule Panel Interview'
    },
    {
      id: 'CAN005',
      name: 'Rahul Sharma',
      score: 96,
      atsScore: 98,
      matchPercent: 97,
      skills: ['Python', 'TypeScript', 'LangChain', 'n8n Developer', 'PostgreSQL', 'Docker', 'React'],
      missingSkills: [],
      education: 'B.Tech in Computer Science - IIT Bombay',
      experience: '5 years as Lead Integration Engineer at Deel',
      projects: 'Automated cross-border compliance checks using LLMs and automated visual agents',
      strengths: 'Complete expertise in automated n8n pipelines, LLM fine-tuning, and scalable HR architecture',
      weaknesses: 'None identified',
      summary: 'Ideal match for the platform architect role. AI Agent recommends hiring him immediately.',
      rank: 5,
      status: 'Selected',
      interviewProbability: 99,
      recommendation: 'Offer Approved'
    }
  ],
  leaveRequests: [
    { id: 'LR001', empId: 'EMP002', name: 'Sarah Jenkins', type: 'Annual Leave', startDate: '2026-07-10', endDate: '2026-07-15', days: 5, reason: 'Family vacation and rest', status: 'Pending', dateRequested: '2026-07-04' },
    { id: 'LR002', empId: 'EMP004', name: 'David Kim', type: 'Sick Leave', startDate: '2026-07-06', endDate: '2026-07-07', days: 2, reason: 'Severe flu symptoms', status: 'Approved', dateRequested: '2026-07-05' },
    { id: 'LR003', empId: 'EMP003', name: 'Elena Rostova', type: 'Personal Leave', startDate: '2026-07-12', endDate: '2026-07-13', days: 1, reason: 'Apartment relocation requirements', status: 'Pending', dateRequested: '2026-07-05' },
    { id: 'LR004', empId: 'EMP005', name: 'Chloe Ma', type: 'Maternity Leave', startDate: '2026-09-01', endDate: '2026-11-30', days: 90, reason: 'Maternity leave prep', status: 'Approved', dateRequested: '2026-06-25' }
  ],
  leaveBalances: {
    'EMP001': { annual: 25, sick: 10, personal: 5 },
    'EMP002': { annual: 12, sick: 7, personal: 3 },
    'EMP003': { annual: 18, sick: 8, personal: 4 },
    'EMP004': { annual: 8, sick: 2, personal: 2 },
    'EMP005': { annual: 22, sick: 9, personal: 5 },
    'EMP006': { annual: 15, sick: 8, personal: 4 }
  },
  payroll: [
    { id: 'PAY001', empId: 'EMP001', name: 'Vasanth Kumar', salary: 145000, bonus: 12000, tax: 35000, reimburse: 1200, net: 123200, status: 'Paid', period: 'June 2026' },
    { id: 'PAY002', empId: 'EMP002', name: 'Sarah Jenkins', salary: 185000, bonus: 0, tax: 45000, reimburse: 0, net: 140000, status: 'Processing', period: 'June 2026' },
    { id: 'PAY003', empId: 'EMP003', name: 'Elena Rostova', salary: 115000, bonus: 5000, tax: 28000, reimburse: 450, net: 92450, status: 'Processing', period: 'June 2026' },
    { id: 'PAY004', empId: 'EMP004', name: 'David Kim', salary: 95000, bonus: 15000, tax: 24000, reimburse: 800, net: 86800, status: 'Paid', period: 'June 2026' },
    { id: 'PAY005', empId: 'EMP005', name: 'Chloe Ma', salary: 125000, bonus: 0, tax: 30000, reimburse: 0, net: 95000, status: 'Processing', period: 'June 2026' },
    { id: 'PAY006', empId: 'EMP006', name: 'Marcus Vance', salary: 130000, bonus: 2000, tax: 31000, reimburse: 100, net: 101100, status: 'Processing', period: 'June 2026' }
  ],
  attendance: [
    { date: '2026-07-06', records: {
      'EMP001': { status: 'Present', clockIn: '08:45 AM', clockOut: '05:30 PM', hours: 8.75, late: false },
      'EMP002': { status: 'Present', clockIn: '09:05 AM', clockOut: '06:15 PM', hours: 9.15, late: true },
      'EMP003': { status: 'Present', clockIn: '08:55 AM', clockOut: '05:45 PM', hours: 8.80, late: false },
      'EMP004': { status: 'Absent', clockIn: '-', clockOut: '-', hours: 0, late: false }, // Sick Leave
      'EMP005': { status: 'Present', clockIn: '08:30 AM', clockOut: '05:00 PM', hours: 8.50, late: false },
      'EMP006': { status: 'Present', clockIn: '09:45 AM', clockOut: '08:30 PM', hours: 10.75, late: true } // Late & Overtime
    }},
    { date: '2026-07-05', records: {
      'EMP001': { status: 'Present', clockIn: '08:50 AM', clockOut: '05:30 PM', hours: 8.65, late: false },
      'EMP002': { status: 'Present', clockIn: '09:12 AM', clockOut: '06:00 PM', hours: 8.80, late: true },
      'EMP003': { status: 'Present', clockIn: '08:40 AM', clockOut: '05:30 PM', hours: 8.90, late: false },
      'EMP004': { status: 'Present', clockIn: '08:50 AM', clockOut: '06:30 PM', hours: 9.65, late: false },
      'EMP005': { status: 'Present', clockIn: '08:30 AM', clockOut: '05:00 PM', hours: 8.50, late: false },
      'EMP006': { status: 'Present', clockIn: '09:30 AM', clockOut: '09:00 PM', hours: 11.50, late: true }
    }}
  ],
  performance: {
    'EMP001': { score: 95, feedback: 'Vasanth manages operations flawlessly. Excellent team feedback.', goals: [{ name: 'Scale recruiting pipeline automation', status: 'In Progress' }, { name: 'Reduce time-to-hire by 15%', status: 'Completed' }], achievements: ['Implemented AI Copilot screening engine'], suggestions: 'Focus on strategic international hiring framework.' },
    'EMP002': { score: 98, feedback: 'Sarah is an outstanding AI scientist. Key models deployed successfully.', goals: [{ name: 'Train custom model workflows', status: 'In Progress' }, { name: 'Publish corporate AI research paper', status: 'Completed' }], achievements: ['Fine-tuned proprietary LLMs on HR operations data'], suggestions: 'Provide team lead guidance and mentorship opportunities.' },
    'EMP003': { score: 91, feedback: 'Elena exhibits phenomenal product aesthetic designs.', goals: [{ name: 'Redesign candidate lifecycle portal UI', status: 'Completed' }, { name: 'Create global design token stylesheet', status: 'In Progress' }], achievements: ['Standardized glassmorphism design system specs'], suggestions: 'Engage with developer teams early during design phase integrations.' },
    'EMP004': { score: 72, feedback: 'David met quotas, but quarter team-involvement was sub-par.', goals: [{ name: 'Close 3 enterprise HR packages', status: 'In Progress' }, { name: 'Support partner webinars', status: 'Not Started' }], achievements: ['Closed $120k ARR deal with Global Corp'], suggestions: 'Focus on cooperative sales techniques and client feedback follow-ups.' },
    'EMP005': { score: 88, feedback: 'Chloe coordinates financial calculations with pinpoint accuracy.', goals: [{ name: 'Finalize audits for fiscal Q2', status: 'Completed' }, { name: 'Establish secure payroll systems integration', status: 'In Progress' }], achievements: ['Drafted budget forecasts for FY27 global payroll'], suggestions: 'Recommend formal documentation review tools for audits.' },
    'EMP006': { score: 85, feedback: 'Marcus has handled system load perfectly but is severely overworking.', goals: [{ name: 'Deploy multi-region cloud clusters', status: 'In Progress' }, { name: 'Reduce build times by 20%', status: 'Completed' }], achievements: ['Integrated system alerts with webhooks'], suggestions: 'Strong recommendation to schedule mandatory leave to avoid severe burnout.' }
  },
  lifecycle: [
    { empId: 'EMP002', name: 'Sarah Jenkins', stage: 'Promotions', details: 'Promoted to Senior AI Research Scientist (Grade 9)', date: '2026-05-10', progress: 100 },
    { id: 'LC001', name: 'Michael Chen', stage: 'Onboarding', details: 'Awaiting signature of offer letter, background checks initiated.', date: '2026-07-06', progress: 35 },
    { id: 'LC002', name: 'Rahul Sharma', stage: 'Onboarding', details: 'Onboarding checklist generated. Hardware shipped.', date: '2026-07-06', progress: 65 },
    { empId: 'EMP004', name: 'David Kim', stage: 'Transfers', details: 'Transferred from APAC sales support to US Enterprise Sales Squad.', date: '2026-04-12', progress: 100 }
  ],
  notifications: [
    { id: 'N1', type: 'success', text: 'Resume Uploaded: Michael Chen (ML Specialist)', time: '10 mins ago', read: false },
    { id: 'N2', type: 'info', text: 'Resume Shortlisted: Priya Nair is moving to AI Screening', time: '1 hour ago', read: false },
    { id: 'N3', type: 'warning', text: 'Leave Request Pending: 5-day annual leave requested by Sarah Jenkins', time: '3 hours ago', read: false },
    { id: 'N4', type: 'success', text: 'Interview Scheduled: Amira Vance for July 8th at 2 PM', time: '5 hours ago', read: true },
    { id: 'N5', type: 'info', text: 'Payroll Processing: June payroll computations are ready for audit review', time: '1 day ago', read: true }
  ],
  chatHistory: [
    { sender: 'ai', text: 'Hello! I am your WorkSphere AI HR Copilot. How can I help you analyze, optimize, or recruit for your workforce today?', time: 'Just now' }
  ],
  aiInsights: [
    { id: 'ins-1', title: 'Recruitment efficiency increased', desc: 'Our ATS automation pipeline reduced candidate vetting time by 42% this week.', type: 'recruitment' },
    { id: 'ins-2', title: 'Payroll is ready for audit', desc: 'All June salary, tax computations, and reimbursement reports are processed.', type: 'payroll' },
    { id: 'ins-3', title: 'High Attrition Risk Employees', desc: 'Marcus Vance and Sarah Jenkins are flagged as high risk. Compensation reviews recommended.', type: 'risk' },
    { id: 'ins-4', title: 'Department attendance trends', desc: 'Finance department average attendance hours decreased by 8% this month.', type: 'attendance' }
  ]
};

// Global state object
let state = null;

// Synchronous REST API logger for n8n Webhook connection
async function sendToN8NWebhook(action, payload) {
  const webhookUrl = state.settings.webhookUrl;
  console.log(`[n8n-REST-API-Simulator] Sending action: "${action}" to endpoint: ${webhookUrl}`);
  console.log('[n8n-REST-API-Simulator] Payload Data:', payload);
  
  // Create virtual network request log in console
  try {
    // If the browser is connected to a real webhook later, this will execute.
    // For now, we mock a fetch call check to show it is API-ready.
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          statusText: 'OK',
          json: async () => ({ success: true, message: `Action "${action}" processed by n8n.`, payload })
        });
      }, 800);
    });
    
    const response = await promise;
    const responseData = await response.json();
    console.log('[n8n-REST-API-Simulator] Received response:', responseData);
    return responseData;
  } catch (err) {
    console.warn('[n8n-REST-API-Simulator] Failed to execute mock endpoint:', err);
    return { success: false, error: err.message };
  }
}

export const StateManager = {
  init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        state = JSON.parse(stored);
      } else {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (e) {
      console.error("Failed to load local storage state:", e);
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  },

  get() {
    if (!state) this.init();
    return state;
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to write to local storage state:", e);
    }
  },

  // State modifying functions
  changeRole(newRole) {
    state.activeUser.role = newRole;
    this.save();
    console.log(`Switched user role to: ${newRole}`);
  },

  updateWebhookUrl(url) {
    state.settings.webhookUrl = url;
    this.save();
    sendToN8NWebhook('update_webhook_url', { url });
  },

  // Recruitment
  addCandidate(candidateData) {
    const newId = `CAN00${state.candidates.length + 1}`;
    const newCandidate = {
      id: newId,
      name: candidateData.name || 'Jane Doe',
      score: candidateData.score || 85,
      atsScore: candidateData.atsScore || 85,
      matchPercent: candidateData.matchPercent || 80,
      skills: candidateData.skills || ['JavaScript', 'HTML', 'CSS'],
      missingSkills: candidateData.missingSkills || [],
      education: candidateData.education || 'Self-Taught',
      experience: candidateData.experience || '1 year experience',
      projects: candidateData.projects || 'Personal Projects',
      strengths: candidateData.strengths || 'Motivated self-starter',
      weaknesses: candidateData.weaknesses || 'Lacks deep backend systems insight',
      summary: candidateData.summary || 'Solid candidate for general frontend roles.',
      rank: state.candidates.length + 1,
      status: candidateData.status || 'Applied',
      interviewProbability: candidateData.interviewProbability || 75,
      recommendation: candidateData.recommendation || 'Proceed with screening'
    };
    state.candidates.push(newCandidate);
    this.save();
    
    // Add Notification
    this.addNotification('success', `Resume Uploaded & Parsed: ${newCandidate.name} (Score: ${newCandidate.score}%)`);
    sendToN8NWebhook('resume_uploaded', newCandidate);
    return newCandidate;
  },

  updateCandidateStatus(id, newStatus) {
    const candidate = state.candidates.find(c => c.id === id);
    if (candidate) {
      const oldStatus = candidate.status;
      candidate.status = newStatus;
      this.save();
      
      let text = `Candidate ${candidate.name} moved from ${oldStatus} to ${newStatus}`;
      if (newStatus === 'Selected') {
        text = `Candidate ${candidate.name} is SELECTED. Interview Invitation Generated Successfully!`;
        this.addNotification('success', text);
      } else if (newStatus === 'Rejected') {
        text = `Candidate ${candidate.name} is REJECTED. Rejection Email Generated Successfully!`;
        this.addNotification('error', text);
      } else {
        this.addNotification('info', text);
      }

      sendToN8NWebhook('candidate_status_changed', { id, name: candidate.name, status: newStatus });
      return true;
    }
    return false;
  },

  // Leave Requests
  addLeaveRequest(type, startDate, endDate, days, reason) {
    const request = {
      id: `LR00${state.leaveRequests.length + 1}`,
      empId: state.activeUser.role === 'hr_admin' ? 'EMP001' : 'EMP002', // Simulate active employee requesting
      name: state.activeUser.name,
      type,
      startDate,
      endDate,
      days: parseInt(days),
      reason,
      status: 'Pending',
      dateRequested: new Date().toISOString().split('T')[0]
    };
    state.leaveRequests.unshift(request); // Add to top
    this.save();
    
    this.addNotification('warning', `New Leave Request: ${request.name} requested ${days} days for ${type}`);
    sendToN8NWebhook('leave_requested', request);
    return request;
  },

  resolveLeaveRequest(id, isApproved) {
    const req = state.leaveRequests.find(r => r.id === id);
    if (req) {
      req.status = isApproved ? 'Approved' : 'Rejected';
      
      // Update balance if approved
      if (isApproved && state.leaveBalances[req.empId]) {
        const typeKey = req.type.split(' ')[0].toLowerCase(); // e.g. "Annual Leave" -> "annual"
        if (state.leaveBalances[req.empId][typeKey] !== undefined) {
          state.leaveBalances[req.empId][typeKey] = Math.max(0, state.leaveBalances[req.empId][typeKey] - req.days);
        }
      }
      
      this.save();
      
      const typeStr = isApproved ? 'Approved' : 'Rejected';
      const notifType = isApproved ? 'success' : 'error';
      this.addNotification(notifType, `Leave Request ${typeStr}: ${req.name}'s leave request for ${req.days} days was ${typeStr.toLowerCase()}`);
      
      sendToN8NWebhook('leave_request_resolved', { id, name: req.name, status: req.status });
      return true;
    }
    return false;
  },

  // Payroll
  processEmployeePayroll(id, bonus = 0, reimburse = 0) {
    const record = state.payroll.find(p => p.id === id || p.empId === id);
    if (record) {
      record.bonus = parseFloat(bonus) || 0;
      record.reimburse = parseFloat(reimburse) || 0;
      record.net = record.salary + record.bonus + record.reimburse - record.tax;
      record.status = 'Paid';
      this.save();
      
      this.addNotification('success', `Payroll Completed: Paid net salary of $${record.net.toLocaleString()} to ${record.name}`);
      sendToN8NWebhook('payroll_processed', record);
      return record;
    }
    return null;
  },

  // AI Copilot
  addCopilotMessage(sender, text) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageObj = { sender, text, time: timestamp };
    state.chatHistory.push(messageObj);
    this.save();
    
    if (sender === 'user') {
      sendToN8NWebhook('copilot_user_message', { message: text });
    }
    return messageObj;
  },

  clearCopilot() {
    state.chatHistory = [
      { sender: 'ai', text: 'Hello! Conversation cleared. How can I assist you with HR data operations today?', time: 'Just now' }
    ];
    this.save();
  },

  // Lifecycle Manage
  updateLifecycleWorkflow(id, stage, details, progress) {
    const emp = state.lifecycle.find(l => l.id === id || l.empId === id);
    if (emp) {
      emp.stage = stage;
      emp.details = details;
      emp.progress = progress;
    } else {
      state.lifecycle.push({ id, name: id, stage, details, progress, date: new Date().toISOString().split('T')[0] });
    }
    this.save();
    this.addNotification('info', `Lifecycle Update: ${emp ? emp.name : id} moved to ${stage}`);
    sendToN8NWebhook('lifecycle_workflow_updated', { id, stage, progress });
  },

  // Notifications
  addNotification(type, text) {
    const newNotif = {
      id: `N${Date.now()}`,
      type, // 'success', 'info', 'warning', 'danger'
      text,
      time: 'Just now',
      read: false
    };
    state.notifications.unshift(newNotif);
    this.save();
    return newNotif;
  },

  markNotificationsAsRead() {
    state.notifications.forEach(n => n.read = true);
    this.save();
  }
};
