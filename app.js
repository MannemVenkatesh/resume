/**
 * Modern Resume Interactive Controller
 * Author: Venkatesh Mannem Resume Modernization
 */

document.addEventListener('DOMContentLoaded', () => {
  const printBtn = document.getElementById('printBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const toggleDensityBtn = document.getElementById('toggleDensityBtn');
  const densityLabel = document.getElementById('densityLabel');
  const copyMdBtn = document.getElementById('copyMdBtn');
  const toast = document.getElementById('toast');
  const body = document.body;

  // 1. Print / Save as PDF
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // 2. Theme Toggle (Dark / Light)
  const savedTheme = localStorage.getItem('resume-theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('resume-theme', newTheme);
  });

  // 3. Density Toggle (Compact 1-Page vs Comfortable)
  let isCompact = true; // Default to compact 1-page fit
  body.classList.add('compact-mode');
  densityLabel.textContent = '1-Page Fit';

  toggleDensityBtn.addEventListener('click', () => {
    isCompact = !isCompact;
    if (isCompact) {
      body.classList.add('compact-mode');
      densityLabel.textContent = '1-Page Fit';
      showToast('Compact 1-Page Mode enabled');
    } else {
      body.classList.remove('compact-mode');
      densityLabel.textContent = 'Expanded View';
      showToast('Expanded View enabled');
    }
  });

  // 4. Raw ATS Markdown Content & Copy Feature
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
      showToast('ATS Markdown copied to clipboard! 📋');
    } catch (err) {
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
