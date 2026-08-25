/**
 * Venkatesh Mannem — Interactive Resume & Tracer Journey Controller
 * Features: Dual View Switcher (Doc/Tracer), Deep-Dive Architectural Modals, A11y Focus Trap, Themes
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const viewDocBtn = document.getElementById('viewDocBtn');
  const viewTracerBtn = document.getElementById('viewTracerBtn');
  const resumeSheet = document.getElementById('resumeSheet');
  const tracerJourneyView = document.getElementById('tracerJourneyView');
  
  const printBtn = document.getElementById('printBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const toggleDensityBtn = document.getElementById('toggleDensityBtn');
  const densityLabel = document.getElementById('densityLabel');
  const copyMdBtn = document.getElementById('copyMdBtn');
  const toast = document.getElementById('toast');
  const liveRegion = document.getElementById('liveRegion');
  const body = document.body;

  // Modal Elements
  const modalBackdrop = document.getElementById('modalBackdrop');
  const projectModal = document.getElementById('projectModal');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');
  const modalTechPills = document.getElementById('modalTechPills');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalFooterCloseBtn = document.getElementById('modalFooterCloseBtn');

  let lastActiveElement = null;

  // =========================================================================
  // 1. Projects Deep-Dive Data Store
  // =========================================================================
  const projectsData = {
    vyapar360: {
      badge: 'Production B2B SaaS Platform',
      title: 'Vyapar360 — Multi-Tenant B2B Inventory & Retail SaaS Platform',
      subtitle: 'Lead Backend Architect & Solo Developer • 2023 – Present',
      flowNodes: [
        'Tenant Request / Webhook',
        'JwtAuthFilter / TenantResolver',
        'TenantContext (ThreadLocal)',
        'Orchestrator Service',
        '@Transactional Processor',
        'Hibernate 6 @TenantId',
        'MySQL 8 (Row-Level Isolated)'
      ],
      problem: 'Indian retail and pharma stores struggled with multi-location stock tracking, batch expiry losses, and complex GST calculations across multiple billing modes.',
      solution: 'Architected a multi-tenant B2B SaaS system with row-level data isolation, automated FEFO inventory deductions, and a decoupled Ports & Adapters billing engine.',
      deepDivePoints: [
        '<strong>Row-Level Multi-Tenancy & Session Binding:</strong> Implemented single-shared-schema multi-tenancy using Hibernate 6 <code>@TenantId</code>. Enforced strict Orchestrator/Processor transaction boundaries so <code>TenantContext</code> is bound before Hibernate Session creation, preventing accidental cross-tenant data bleed.',
        '<strong>Hub-and-Spoke Subscription Billing Engine:</strong> Built decoupled Ports & Adapters subsystem supporting <strong>Razorpay UPI Autopay</strong> and <strong>Stripe</strong> webhooks. Integrated constant-time HMAC signature verification, inbox idempotency (<code>UNIQUE(provider, provider_event_id)</code>), out-of-order event rejection, and a background retry/dead-letter queue.',
        '<strong>Append-Only Financial Ledger:</strong> Decomposed Indian processor fees (<code>gross = provider_fee + fee_tax (18% GST) + net_amount</code> in paise) for tax auditability and input credit reclaim.',
        '<strong>POS & FEFO Inventory Engine:</strong> Built barcode and GS1 QR batch scanning, First-Expired-First-Out (FEFO) automated stock deduction, and multi-godown Delivery Challan transfers.',
        '<strong>60+ Flyway Schema Migrations:</strong> Managed database evolution in production with <code>ddl-auto=validate</code> and Testcontainers MySQL integration testing.'
      ],
      techStack: ['Java 17/25', 'Spring Boot 3.2', 'Hibernate 6', 'MySQL 8', 'Flyway', 'Razorpay', 'Stripe', 'React 19', 'Docker', 'ShedLock']
    },

    paws: {
      badge: 'Enterprise Platform',
      title: 'PAWS — Projects And Workers System',
      subtitle: 'Full-Stack Backend Architect • 2023 – Present',
      flowNodes: [
        'React 19 SPA (Nginx Proxy)',
        'Spring Security (JWT + OTP)',
        'TenantRoutingDataSource',
        'Muster Roll & Wage Engine',
        'Payment Gateway Callbacks',
        'MySQL 8 & Audit Trails'
      ],
      problem: 'Contractors and project owners faced severe discrepancies in site labor allocations, manual muster rolls, daily wage calculations, and multi-site project budgeting.',
      solution: 'Engineered a unified project and labor platform featuring automated attendance tracking, skill matching recommendation algorithms, and automated wage disbursement.',
      deepDivePoints: [
        '<strong>Workforce & Costing Engine:</strong> Architected domain services for contractor/labor lifecycle tracking, skill-based worker recommendations, project budgeting, and real-time expenditure estimation across active job sites.',
        '<strong>Automated Muster Roll & Wage Computation:</strong> Built automated attendance pipelines with state machines (<code>PENDING</code>, <code>APPROVED</code>, <code>DISBURSED</code>), daily wage calculation rules, and payment gateway callback reconciliation.',
        '<strong>Dynamic Multi-Tenancy Routing:</strong> Configured dynamic multi-tenant datasource routing (<code>TenantRoutingDataSource</code>), OTP verification services, and custom login rate limiters to protect against brute-force attacks.',
        '<strong>Entity-Level Audit Logging:</strong> Built automated entity audit trails (<code>AuditLog</code>) tracking wage modifications, labor allocations, and administrative state transitions.'
      ],
      techStack: ['Java 21', 'Spring Boot', 'Spring Security', 'JPA/Hibernate', 'MySQL', 'React 19 + Vite', 'Docker', 'Nginx']
    },

    techmojo_fintech: {
      badge: 'FinTech & High-Throughput Microservices',
      title: 'Merchant Payment Processing Gateways & Card Limit Engine',
      subtitle: 'Senior Backend Developer • Techmojo Solutions • 11/2019 – Present',
      flowNodes: [
        'Merchant Checkout API',
        'API Gateway & Rate Limiter',
        'Payment Orchestrator',
        'Apple Pay / Bank Connectors',
        'Redis Distributed Cache & Locks',
        'Card Authorization Engine',
        'MySQL / Reconciliation'
      ],
      problem: 'High peak checkout volumes created severe database contention, high API response latency, and risk of duplicate authorization submissions.',
      solution: 'Overhauled query pipelines, introduced distributed Redis caching and locks, and built zero-trust device binding to secure transactions with 99.9% uptime.',
      deepDivePoints: [
        '<strong>40% API Latency Reduction:</strong> Analyzed slow SQL query bottlenecks and integrated distributed Redis caching across transaction history APIs, cutting response latency under peak load.',
        '<strong>Resilient Payment Gateway Integrations:</strong> Built merchant payment processing gateways integrating <strong>Apple Pay, Direct Bank Connectors, and Proxy Aggregators</strong> with automated failure retries and webhooks.',
        '<strong>Real-Time Card Authorization Engine:</strong> Engineered card limit microservices evaluating user limits, daily caps, and velocity rules before transaction capture.',
        '<strong>Zero-Trust Device Binding:</strong> Implemented hardware-bound device fingerprints, JWT token validation, and OAuth2 scopes to eliminate account takeover and replay attacks.',
        '<strong>Operational Backoffice:</strong> Built internal backoffice modules for transaction lifecycle tracking, automated reconciliation, and role-based access control.'
      ],
      techStack: ['Java 17/21', 'Spring Boot 3', 'Spring Cloud', 'Redis', 'MySQL', 'Kafka', 'OAuth2 / JWT', 'Prometheus', 'Grafana']
    },

    techmojo_gaming: {
      badge: 'Gaming Platforms & SWAT Leadership',
      title: 'High-Throughput Gaming Microservices & Production SWAT Triage',
      subtitle: 'Senior Backend Engineer & Incident Lead • Techmojo Solutions • 2021 – Present',
      flowNodes: [
        'Multi-Brand Player Traffic',
        '10+ Vendor Microservices',
        'Apache Kafka Event Bus',
        'VIP Player Sync Engine',
        'Bonus Calculation Pipeline',
        'Grafana / Prometheus Alerting'
      ],
      problem: 'Expanding multi-brand gaming catalogs required onboarding diverse third-party game providers with zero downtime while keeping player VIP state in sync.',
      solution: 'Architected 10+ isolated vendor microservices, event-driven player sync pipelines with Kafka, and led SWAT on-call production incident triage.',
      deepDivePoints: [
        '<strong>10+ Vendor Integrations:</strong> Architected and deployed 10+ independent vendor integration microservices, standardizing data contracts across multi-brand gaming catalogs.',
        '<strong>Event-Driven VIP Synchronization:</strong> Built Kafka-based event pipelines keeping player VIP tiers, loyalty points, and cross-brand state synchronized in real-time.',
        '<strong>SWAT Incident Leadership & RCA:</strong> Served on the primary SWAT on-call rotation for production escalations, analyzing JVM thread/heap dumps and root causes (RCA) to remediate live issues with zero downtime.',
        '<strong>Agile Pod Leadership:</strong> Led a team of 5 backend engineers through sprint planning, technical design reviews, code reviews, and on-time sprint deliverables.'
      ],
      techStack: ['Apache Kafka', 'Java', 'Spring Boot', 'Redis', 'Docker', 'Kubernetes', 'Testcontainers', 'Prometheus', 'Splunk']
    },

    scrum_automation: {
      badge: 'Hackathon Award Winner',
      title: 'Developer Sprint Automation Tooling (60% Time Savings)',
      subtitle: 'Creator & Lead Engineer • Internal Coding Competition Winner • 2022',
      flowNodes: [
        'Developer Git Commits',
        'Jira Ticket Status APIs',
        'CLI Rollup Engine',
        'Automated Standup Brief',
        'Slack / Team Notification'
      ],
      problem: 'Engineering teams spent excessive time in daily standups manually compiling commit logs, Jira tickets, and blockers across multiple repositories.',
      solution: 'Created a developer CLI automation tool that aggregates Git diffs, Jira statuses, and blockers into structured daily briefs in seconds.',
      deepDivePoints: [
        '<strong>60% Standup Duration Reduction:</strong> Reduced daily Scrum standup time from 20+ minutes to under 8 minutes across engineering pods.',
        '<strong>Internal Coding Competition Winner:</strong> Recognized and awarded first prize across the company for engineering productivity tooling.',
        '<strong>Cross-Team Adoption:</strong> Integrated into daily workflows across multiple development pods.'
      ],
      techStack: ['Java', 'Spring Boot CLI', 'Git APIs', 'Jira REST APIs', 'Developer Productivity']
    }
  };

  // Screen Reader Announcer
  function announceToScreenReader(message) {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  // =========================================================================
  // 2. View Mode Switcher (Document Resume ⇄ Tracer Journey Map)
  // =========================================================================
  function setViewMode(mode) {
    if (mode === 'tracer') {
      resumeSheet.classList.remove('active-view');
      tracerJourneyView.classList.add('active-view');
      viewDocBtn.classList.remove('active');
      viewDocBtn.setAttribute('aria-pressed', 'false');
      viewTracerBtn.classList.add('active');
      viewTracerBtn.setAttribute('aria-pressed', 'true');
      announceToScreenReader('Switched to Interactive Career Tracer Map view');
      showToast('Career Tracer Journey Map enabled 🗺️');
    } else {
      tracerJourneyView.classList.remove('active-view');
      resumeSheet.classList.add('active-view');
      viewTracerBtn.classList.remove('active');
      viewTracerBtn.setAttribute('aria-pressed', 'false');
      viewDocBtn.classList.add('active');
      viewDocBtn.setAttribute('aria-pressed', 'true');
      announceToScreenReader('Switched to Classic Document Resume view');
      showToast('Classic Document Resume enabled 📄');
    }
    localStorage.setItem('resume-view-mode', mode);
  }

  viewDocBtn.addEventListener('click', () => setViewMode('doc'));
  viewTracerBtn.addEventListener('click', () => setViewMode('tracer'));

  // Restore saved view mode if present
  const savedView = localStorage.getItem('resume-view-mode') || 'doc';
  if (savedView === 'tracer') {
    setViewMode('tracer');
  }

  // =========================================================================
  // 3. Interactive Deep-Dive Modal Controller
  // =========================================================================
  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    lastActiveElement = document.activeElement;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;

    // Render Architecture Flow Diagram
    let flowHtml = `
      <div class="arch-diagram-card">
        <h4 class="arch-card-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          System Architecture & Data Flow Pipeline
        </h4>
        <div class="arch-flow-diagram">
          ${data.flowNodes.map((node, i) => `
            <span class="arch-node ${i === 0 ? 'highlight' : ''}">${node}</span>
            ${i < data.flowNodes.length - 1 ? '<span class="arch-arrow" aria-hidden="true">➔</span>' : ''}
          `).join('')}
        </div>
      </div>
    `;

    // Render Problem / Solution
    let probSolHtml = `
      <div class="prob-sol-grid">
        <div class="prob-card">
          <h5 class="prob-title">🎯 Engineering Challenge</h5>
          <p class="prob-desc">${data.problem}</p>
        </div>
        <div class="sol-card">
          <h5 class="sol-title">⚡ Solution & Architecture</h5>
          <p class="sol-desc">${data.solution}</p>
        </div>
      </div>
    `;

    // Render Deep Dive Highlights
    let pointsHtml = `
      <div class="arch-section-card">
        <h4 class="arch-card-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Key Technical Accomplishments & Implementation Details
        </h4>
        <ul class="deep-dive-points">
          ${data.deepDivePoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>
    `;

    modalBody.innerHTML = flowHtml + probSolHtml + pointsHtml;

    // Render Tech Pills
    modalTechPills.innerHTML = data.techStack.map(tech => `<span class="modal-pill">${tech}</span>`).join('');

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    projectModal.focus();
    body.style.overflow = 'hidden';

    announceToScreenReader(`Opened architecture deep dive for ${data.title}`);
  }

  function closeProjectModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
    announceToScreenReader('Closed architecture deep dive modal');
  }

  modalCloseBtn.addEventListener('click', closeProjectModal);
  modalFooterCloseBtn.addEventListener('click', closeProjectModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeProjectModal();
    }
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // Attach click & enter triggers for all interactive items
  function attachDeepDiveTriggers() {
    const triggerElements = document.querySelectorAll('[data-project-id]');
    triggerElements.forEach(el => {
      const projectId = el.getAttribute('data-project-id');
      if (!projectId) return;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(projectId);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(projectId);
        }
      });
    });
  }

  attachDeepDiveTriggers();

  // =========================================================================
  // 4. Toolbar Controls (Print, Themes, Density, Copy Markdown)
  // =========================================================================

  // Print / Save as PDF (Forces Document View & closes any modal for clean print)
  printBtn.addEventListener('click', () => {
    closeProjectModal();
    setViewMode('doc');
    body.classList.add('compact-mode');
    densityLabel.textContent = '1-Page Fit';
    toggleDensityBtn.setAttribute('aria-pressed', 'true');
    announceToScreenReader('Opening system print dialog for 1-page PDF export');
    setTimeout(() => {
      window.print();
    }, 60);
  });

  // Theme Toggle (Dark / Light)
  const savedTheme = localStorage.getItem('resume-theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    themeToggleBtn.setAttribute('aria-pressed', 'false');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.setAttribute('aria-pressed', 'true');
      announceToScreenReader('Dark theme activated');
      showToast('Dark Mode enabled 🌙');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.setAttribute('aria-pressed', 'false');
      announceToScreenReader('Light theme activated');
      showToast('Light Mode enabled ☀️');
    }
    localStorage.setItem('resume-theme', newTheme);
  });

  // Density Toggle (Compact 1-Page vs Comfortable)
  let isCompact = true;
  body.classList.add('compact-mode');
  densityLabel.textContent = '1-Page Fit';
  toggleDensityBtn.setAttribute('aria-pressed', 'true');

  toggleDensityBtn.addEventListener('click', () => {
    isCompact = !isCompact;
    if (isCompact) {
      body.classList.add('compact-mode');
      densityLabel.textContent = '1-Page Fit';
      toggleDensityBtn.setAttribute('aria-pressed', 'true');
      announceToScreenReader('Compact 1-Page Mode enabled');
      showToast('Compact 1-Page Mode enabled 📄');
    } else {
      body.classList.remove('compact-mode');
      densityLabel.textContent = 'Expanded View';
      toggleDensityBtn.setAttribute('aria-pressed', 'false');
      announceToScreenReader('Expanded View enabled');
      showToast('Expanded View enabled 📖');
    }
  });

  // Raw ATS Markdown Content & Copy Feature
  const rawMarkdown = `# VENKATESH MANNEM
Senior Backend Engineer | Java & Distributed Systems Specialist
Hyderabad, India | +91-9493721465 | m.venkatesh0109@gmail.com
LinkedIn: linkedin.com/in/venkatesh-mannem | GitHub: github.com/MannemVenkatesh

---

## PROFESSIONAL SUMMARY
Senior Backend Engineer with 6+ years of experience designing, building, and maintaining high-throughput distributed systems in FinTech, Payment Processing, Gaming, and B2B SaaS. Strong hands-on background in Java (8 through 21), Spring Boot, MySQL query and schema optimization, and event-driven architectures with Kafka and Redis. Experienced in leading 5-engineer pods, handling critical production incidents on SWAT rotations, and driving projects end-to-end from architectural design to containerized cloud deployments.

---

## TECHNICAL SKILLS MATRIX
- Languages & Frameworks: Java (8, 11, 17, 21), SQL, Spring Boot 3.2, Spring Cloud, Spring Security, Hibernate 6 / JPA, RESTful APIs, gRPC
- Distributed Architecture: Microservices, Apache Kafka, RabbitMQ, Redis (Caching & Distributed Locks), Event-Driven Systems, API Gateway, ShedLock
- Databases & Cloud: MySQL 8 (Indexing, Execution Plans, Performance Tuning), HikariCP, Flyway, AWS (EC2, S3, RDS, Lambda), Docker, Kubernetes
- Testing & Observability: JUnit 5, Mockito, Testcontainers, TDD, Prometheus, Grafana, ELK Stack, Splunk, Micrometer, Log4j2 Disruptor
- Domain & Security: Payment Gateways (Apple Pay, Bank Connectors), Webhook Ingestion, Row-Level Multi-Tenancy, Card Limits, PCI-DSS

---

## PROFESSIONAL EXPERIENCE

Techmojo Solutions Pvt. Ltd. | Hyderabad, India
Senior Backend Developer (Backend Java Engineer) | 11/2019 – Present

FinTech & Payment Gateway Systems
- Payment Gateway Integration: Built backend payment services integrating Apple Pay, direct bank connectors, and merchant aggregators, handling high-volume transaction routing and callback processing with 99.9% uptime.
- Database & Cache Optimization: Identified SQL query bottlenecks and introduced Redis caching layers across transaction history APIs, cutting average latency by 40% under peak traffic.
- Card Authorization & Risk Rules: Developed card limit evaluation and transaction authorization microservices to process real-time spend checks against custom cardholder limits.
- Security & Authentication: Implemented device-binding flows, JWT-based session security, and OAuth2 authorization checks to protect payment APIs against unauthorized device switching and replay attempts.
- Backoffice & Settlement Workflows: Developed internal backoffice APIs for operations teams to track payment lifecycles, review disputed transactions, and run reconciliation batches.

High-Throughput Gaming Platforms
- Vendor Integration Services: Designed and deployed 10+ isolated microservices to onboard third-party game providers, standardizing data contracts across multi-brand gaming catalogs.
- Player Account & VIP Sync: Built event-driven synchronization services to handle real-time player profile updates, VIP tier migrations, and seamless cross-brand account state.
- Production SWAT & Incident Triage: Served on the primary SWAT on-call rotation for production escalations, analyzing thread/heap dumps and root causes (RCA) to resolve critical live issues with minimal downtime.

Leadership & Engineering Practices
- Pod Leadership & Mentorship: Led a team of 5 backend engineers through sprint planning, technical design reviews, code reviews, and on-time sprint deliverables.
- System Monitoring & Reliability: Configured Prometheus metrics, Grafana dashboards, and health alerts, maintaining platform reliability above 99.9%.
- Test Automation: Improved unit and integration testing standards using JUnit 5, Mockito, and Testcontainers, bringing test coverage to ~85% across core modules.
- Team Productivity Tooling: Built a developer automation tool that streamlined daily status rollups and reduced standup time by 60%, winning the company's internal hackathon.

---

## KEY ENGINEERING PROJECTS

Vyapar360 — Multi-Tenant B2B Inventory & Retail SaaS Platform
Stack: Java 17/25, Spring Boot 3.2, Hibernate 6, MySQL 8, Flyway, Razorpay / Stripe, React 19, Docker
- Row-Level Multi-Tenancy: Built tenant data isolation using Hibernate 6 @TenantId and ThreadLocal context; separated non-transactional tenant resolution from @Transactional service logic to prevent tenant ID leakage across pooled database connections.
- Subscription Billing & Webhooks: Implemented a Ports & Adapters billing subsystem for Razorpay UPI Autopay and Stripe; built HMAC signature validation, idempotent event ingestion (UNIQUE provider event inbox), and a 6-hour watchdog service to detect subscription drift.
- Inventory & POS Operations: Developed barcode/GS1 QR batch scanning, First-Expired-First-Out (FEFO) automated stock depletion, multi-godown Delivery Challans, and GST-compliant invoice calculation (CGST/SGST/IGST).

PAWS — Projects And Workers System
Stack: Java 21, Spring Boot, Spring Security, JPA/Hibernate, MySQL, React 19 + Vite, Docker, Nginx
- Workforce & Project Management: Designed full-stack platform to manage contractor profiles, skill-based worker allocation, site assignments, and real-time project expenditure tracking.
- Attendance & Wage Payouts: Built daily Muster Roll attendance tracking, wage computation rules, and payment disbursement flows with automated entity audit logs (AuditLog) for tracking wage adjustments.
- Security & Multi-Tenancy: Added dynamic tenant datasource routing, OTP verification flows, and login rate limiting to secure administrative endpoints against brute-force attacks.

---

## KEY ACHIEVEMENTS & AWARDS
- Winner, Internal Coding Competition: Built a sprint automation tool that reduced daily Scrum duration by 60%, adopted across engineering teams.
- SWAT MVP Recognition: Recognized for exceptional debugging and rapid triage in stabilizing payment components during peak traffic events.

---

## EDUCATION
- Master of Technology (M.Tech) in Computer Science (ML & Computing) | Koneru Lakshmaiah University (2018 – 2020)
- Bachelor of Technology (B.Tech) in Computer Science Engineering | Koneru Lakshmaiah University (2012 – 2016)
`;

  copyMdBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(rawMarkdown);
      announceToScreenReader('ATS Markdown copied to clipboard');
      showToast('ATS Markdown copied to clipboard! 📋');
    } catch (err) {
      announceToScreenReader('Failed to copy to clipboard');
      showToast('Failed to copy to clipboard');
    }
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
