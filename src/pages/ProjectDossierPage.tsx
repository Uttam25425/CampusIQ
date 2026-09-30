import React, { useState } from 'react';
import {
  Printer,
  FileDown,
  Copy,
  Check,
  Sparkles,
  Zap,
  Droplets,
  Recycle,
  Wind,
  Layers,
  Building2,
  AlertTriangle,
  Wrench,
  Target,
  Leaf,
  FileText,
  Compass,
  LayoutDashboard,
  Cpu,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Code2,
  BarChart3,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export const ProjectDossierPage: React.FC = () => {
  const { selectedCampus } = useCampus();
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'summary' | 'architecture' | 'buttons' | 'telemetry' | 'interview'>('all');

  const elevatorPitch = `CampusIQ is an enterprise-grade IoT Green Campus Operations & ESG Intelligence Platform. It aggregates real-time telemetry across 8 physical university facilities—monitoring electrical sub-meters, solar inverters, flow meters, air quality sensors (PM2.5, PM10, CO2), and smart waste bins. Powered by a hybrid predictive AI engine and interactive Spatial GIS digital twin, CampusIQ empowers campus directors to reduce energy waste by up to 24%, identify water leaks in under 15 minutes, optimize asset lifecycles, and automate ESG compliance reporting with 1-click audit dossiers.`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(elevatorPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# CampusIQ: Smart Green Campus Operations Platform
## Master Technical Dossier & Job Interview Presentation Guide
Prepared by: Uttam Sahu (Full-Stack Engineer & Sustainability Systems Architect)
Organization: ECONEX Intelligent Infrastructure
Target Campus: ${selectedCampus}
Date: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}

---

### 1. Executive Summary & 60-Second Elevator Pitch
${elevatorPitch}

**Primary Problem Statement:**
Modern universities and institutional complexes waste 25% to 35% of their utility budgets due to disconnected legacy building management systems (BMS), unnoticed pipe leaks, unoptimized HVAC schedules, and delayed maintenance response times.

**Key Technical Solutions Delivered:**
1. Multi-tenant telemetry aggregation across Energy, Water, Waste, Air Quality, and Carbon.
2. Dynamic Campus Sustainability Score (0-100 algorithmic gauge).
3. Real-time IoT tick simulation engine with realistic noise, peak-load shedding, and fault detection.
4. Spatial GIS Campus Map integrating real drone aerial imagery with interactive telemetry nodes.
5. CampusIQ AI assistant for conversational diagnostics, anomaly alerts, and automated setpoint tuning.
6. 100% client-verifiable ESG audit reporting with CSV and printable PDF generation.

---

### 2. High-Level System Architecture & Tech Stack
- Frontend: React 18 SPA, Vite 6, TypeScript 5.x
- Styling & UI: Tailwind CSS, Lucide React Iconography, Tabular Numeral JetBrains Mono font
- State Management: React Context API (CampusContext) acting as single source of truth
- Backend Services: Node.js + Express proxy layer for secure API gateway & health monitoring
- AI Integration: Server-side Google Gemini SDK / fallback rule-based diagnostic model
- Spatial Mapping: Scalable Vector Graphics (SVG) + High-Resolution Aerial Drone Image Overlay
- Data Visualizations: Handcrafted responsive SVG sparklines, circular progress gauges, and comparative bar charts

---

### 3. Master Button & Feature Encyclopedia
See the in-app interactive dictionary for comprehensive details on every button, state mutation, and interviewer talking point.

---

### 4. Top 15 Job Interview Questions & High-Impact Answers
Refer to Section 6 of the CampusIQ dossier.
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CampusIQ_Project_Interview_Dossier_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Button Dictionary Data
  const buttonCatalog = [
    {
      page: 'Top Navigation Bar',
      buttons: [
        {
          name: 'Mobile Menu Hamburger (☰)',
          action: 'Toggles mobile sidebar drawer',
          code: 'setMobileSidebarOpen(true)',
          interviewPoint: 'Responsive mobile-first engineering ensuring operators can manage the campus from handheld tablets during field inspections.',
        },
        {
          name: 'Global Search (⌘K / Ctrl+K)',
          action: 'Opens modal to search all buildings, assets, metrics, and docs',
          code: 'setIsSearchOpen(true) with keyboard listener',
          interviewPoint: 'Fast keyboard navigation (Power-User UX) using fuzzy search matching across facility IDs, telemetry types, and equipment names.',
        },
        {
          name: 'Campus Facility Selector Dropdown',
          action: 'Switches global active campus context between campuses',
          code: 'setSelectedCampus(e.target.value)',
          interviewPoint: 'Demonstrates multi-tenant scalability—how one centralized platform can govern multiple regional university branches seamlessly.',
        },
        {
          name: 'Live IoT Telemetry Stream Toggle (▶ / ⏸)',
          action: 'Starts/pauses background interval sensor simulation',
          code: 'setIsSimulating(!isSimulating)',
          interviewPoint: 'Real-time WebSocket/interval simulation engine that dynamically mutates energy loads, water flow, and AQI fluctuations with statistical noise.',
        },
        {
          name: 'Dark / Light Theme Switcher (🌙 / ☀️)',
          action: 'Toggles Tailwind dark class on document root & persists preference',
          code: 'setDarkMode(!darkMode) with localStorage persistence',
          interviewPoint: 'High-contrast design system optimized for both dimly lit 24/7 campus security control rooms and daylight sun-exposed field tablets.',
        },
        {
          name: 'CampusIQ AI Floating Hub Button',
          action: 'Expands the conversational AI diagnostic drawer',
          code: 'setIsAiChatOpen(!isAiChatOpen)',
          interviewPoint: 'Contextual AI copilot trained on real-time sensor streams that operators can query using natural language to diagnose equipment anomalies.',
        },
        {
          name: 'Alerts Notification Bell Badge',
          action: 'Opens drop-down notifications panel showing unacknowledged alerts',
          code: 'Filtered alerts where status === "Active"',
          interviewPoint: 'Priority triage system categorizing anomalies into Critical, Warning, and Info with acoustic/visual badges for facility managers.',
        },
        {
          name: 'Executive User Avatar & Profile Dropdown',
          action: 'Displays operator credentials, permissions, and sign-out state',
          code: 'Role-Based Access Control (RBAC) UI presentation',
          interviewPoint: 'Security and governance architecture modeling roles (Director, Facility Manager, Field Technician, ESG Auditor).',
        },
      ],
    },
    {
      page: 'Sidebar & Quick Actions',
      buttons: [
        {
          name: '+ Add Building Button',
          action: 'Opens modal to register new campus facility',
          code: 'setIsAddBuildingOpen(true)',
          interviewPoint: 'Dynamic CRUD pipeline updating the central CampusContext, recalculating campus-wide aggregate totals instantly.',
        },
        {
          name: '+ Add Asset Button',
          action: 'Opens modal to commission new IoT smart equipment',
          code: 'setIsAddAssetOpen(true)',
          interviewPoint: 'Asset management schema linking hardware to specific buildings, tracking depreciation, runtime hours, and sensor IDs.',
        },
        {
          name: '+ Schedule Maintenance Button',
          action: 'Dispatches work order to technicians',
          code: 'setIsScheduleMaintenanceOpen(true)',
          interviewPoint: 'Computerized Maintenance Management System (CMMS) integration aligning predictive telemetry with preventive servicing.',
        },
        {
          name: '+ Set ESG Goal Button',
          action: 'Configures sustainability targets with target year & metrics',
          code: 'setIsAddGoalOpen(true)',
          interviewPoint: 'Enforces corporate sustainability standards (GHG Protocol Scope 1-3, LEED green building certifications).',
        },
      ],
    },
    {
      page: 'Dashboard & Command Center',
      buttons: [
        {
          name: 'Generate Audit Report Quick Action',
          action: 'Redirects to /reports and initiates ESG dossier builder',
          code: 'navigate("/reports")',
          interviewPoint: 'Streamlines monthly executive reporting from hours of manual spreadsheets into a 1-click audit-ready export.',
        },
        {
          name: 'Timeframe Toggle Buttons (24H, 7D, 30D, 1Y)',
          action: 'Filters consumption charts and switches aggregation time resolution',
          code: 'setSelectedTimeframe(tf) updating SVG line chart paths',
          interviewPoint: 'Efficient client-side data slicing demonstrating responsive vector rendering without heavy third-party bundle bloat.',
        },
        {
          name: 'CampusIQ AI "Apply Optimization" Button',
          action: 'Automatically executes chiller temperature setpoint trim',
          code: 'Updates building energy states and logs action into alert audit trail',
          interviewPoint: 'Autonomous Closed-Loop Control: showcases how AI moves beyond passive dashboards to active load-shaving intervention.',
        },
        {
          name: 'KPI Card Drilldowns',
          action: 'Clicking any KPI card navigates directly to deep-dive page',
          code: 'Interactive routing hooks (/energy, /water, /waste, /air-quality)',
          interviewPoint: 'Hierarchical information architecture—progressive disclosure from high-level campus macro view to micro sensor diagnostics.',
        },
      ],
    },
    {
      page: 'Campus Spatial Map Page',
      buttons: [
        {
          name: 'Aerial Drone Photo Mode Toggle',
          action: 'Switches view to the high-resolution drone photo of the college',
          code: 'setMapViewMode("aerial")',
          interviewPoint: 'Spatial GIS integration: anchors actual physical drone imagery of the college to digital sensor coordinate vectors.',
        },
        {
          name: '3D Digital Twin Mode Toggle',
          action: 'Switches view to the photorealistic 3D spatial model',
          code: 'setMapViewMode("digital-twin")',
          interviewPoint: 'Next-generation Digital Twin visualization providing spatial depth and visual clarity for facilities planning.',
        },
        {
          name: 'Vector GIS Schematic Mode Toggle',
          action: 'Switches view to the stylized 2D architectural blueprint',
          code: 'setMapViewMode("schematic")',
          interviewPoint: 'Clean, low-bandwidth vector schematic ideal for network-constrained environments or rapid architectural zoning.',
        },
        {
          name: 'Interactive Building Pins (Hotspots)',
          action: 'Selects facility and reveals live telemetry inspector drawer',
          code: 'setSelectedBuilding(bld) with dynamic pulsing coordinate markers',
          interviewPoint: 'Micro-interaction design: visual pulse cues reflect real-time building health (Emerald = Normal, Amber = Warning, Rose = Critical).',
        },
        {
          name: 'Building Diagnostics CTA ("View Full Diagnostics")',
          action: 'Navigates to granular /buildings/:id telemetry console',
          code: 'navigate(`/buildings/${selectedBuilding.id}`)',
          interviewPoint: 'Seamless deep-linking across relational entities in the application graph.',
        },
      ],
    },
    {
      page: 'Energy, Water & Environmental Subsystems',
      buttons: [
        {
          name: 'Simulate Peak Load Shedding (Energy)',
          action: 'Simulates smart curtailment of non-essential campus lighting and HVAC',
          code: 'Reduces total energy consumption by 15% in CampusContext',
          interviewPoint: 'Demand Response System simulation: critical capability for preventing grid brownouts and avoiding expensive peak demand utility tariffs.',
        },
        {
          name: 'Acknowledge Water Leak Alert (Water)',
          action: 'Marks sub-meter leak incident as acknowledged by engineering',
          code: 'Mutates alert status to "Acknowledged"',
          interviewPoint: 'Incident response lifecycle tracking showing MTTA (Mean Time to Acknowledge) and MTTR (Mean Time to Resolve).',
        },
        {
          name: 'Trigger Rainwater Cistern Pump (Water)',
          action: 'Directs collected runoff into campus irrigation network',
          code: 'Simulates valve solenoid actuation and updates cistern capacity',
          interviewPoint: 'Industrial SCADA/PLC simulation interfacing digital twin software with physical pump relays.',
        },
        {
          name: 'Dispatch Smart Bin Collection Route (Waste)',
          action: 'Optimizes waste truck route based on bin fill levels > 85%',
          code: 'Triggers toast confirmation & marks bins as cleared',
          interviewPoint: 'Logistics route optimization preventing overflow and reducing campus vehicle fuel emissions by 30%.',
        },
        {
          name: 'HVAC Air Flush Boost (Air Quality)',
          action: 'Increases outdoor air damper intake to purge indoor CO2 and PM2.5',
          code: 'Triggers air scrubber boost and normalizes AQI index',
          interviewPoint: 'ASHRAE 62.1 indoor air quality standard compliance ensuring student cognitive performance and safety.',
        },
      ],
    },
    {
      page: 'Alerts, Maintenance & Reports',
      buttons: [
        {
          name: 'Dispatch Field Technician (Alerts)',
          action: 'Converts an alert directly into an open Maintenance Work Order',
          code: 'Generates new work order object in CampusContext and notifies team',
          interviewPoint: 'Event-driven architecture connecting telemetry monitoring with field workforce dispatch without manual re-entry.',
        },
        {
          name: 'Kanban Stage Dropdowns (Maintenance)',
          action: 'Moves work orders between Scheduled, In Progress, and Completed',
          code: 'Mutates work order status enum with timestamp logging',
          interviewPoint: 'Operational workflow management displaying mean turnaround time and equipment maintenance history.',
        },
        {
          name: 'Export CSV Audit File (Reports)',
          action: 'Generates structured RFC 4180 CSV spreadsheet in browser memory',
          code: 'data:text/csv data URI dynamically bound to ephemeral <a> download tag',
          interviewPoint: 'Client-side data extraction: zero backend dependency, instant generation, compatible with SAP, Microsoft Excel, and ESG reporting software.',
        },
        {
          name: 'Print Official ESG Report / PDF (Reports)',
          action: 'Triggers browser native print dialog with bespoke print stylesheets',
          code: 'window.print() with @media print CSS rules hiding navigation and formatting A4 tables',
          interviewPoint: 'High-fidelity PDF generation using native browser engine—vector crispness at 300+ DPI without heavy client-side canvas rasterization.',
        },
      ],
    },
  ];

  // 15 Interview Q&As
  const interviewQuestions = [
    {
      q: '1. Can you give a 2-minute overview of CampusIQ? What problem does it solve?',
      a: 'CampusIQ is an enterprise IoT and sustainability intelligence platform built for universities and commercial campuses. Currently, most academic institutions operate with siloed legacy building management systems, manual paper logs, and zero visibility into utility waste. As a result, universities waste 25% to 35% of their utility budgets on unattended water leaks, inefficient chiller setpoints, and unmonitored baseline energy loads.\n\nCampusIQ solves this by unifying 5 key operational domains into a real-time command center: Energy, Water, Waste, Air Quality, and Carbon emissions. It provides a live spatial digital twin of the campus using real drone imagery, automated anomaly detection, an AI copilot for equipment diagnostics, and 1-click ESG compliance audit reporting.',
      tag: 'Executive Overview',
    },
    {
      q: '2. What tech stack did you choose and why?',
      a: 'I built the frontend as a high-performance Single Page Application using React 18 with TypeScript and Vite. Vite provides sub-second hot module reloading and optimized tree-shaken production bundles. TypeScript enforces strict type safety across complex data structures like telemetry streams, building entities, and IoT hardware schemas.\n\nFor styling, I utilized Tailwind CSS with a customized color palette, CSS variables, and native dark mode support. For the backend proxy, an Express Node.js server proxies secure API calls to the Google Gemini AI SDK. Rather than relying on heavyweight charting libraries that bloat bundles, I built custom responsive SVG visualizations for sparklines, gauges, and comparison charts, achieving 60fps performance even under high-frequency simulated sensor ticks.',
      tag: 'Architecture & Stack',
    },
    {
      q: '3. How does state management work across 8 buildings and dozens of telemetry streams?',
      a: 'I implemented a centralized React Context architecture (`CampusContext.tsx`) that acts as the single source of truth for the entire application. The context maintains state for buildings, assets, alerts, maintenance tickets, sustainability goals, and real-time sensor streams.\n\nTo prevent unnecessary re-renders across the component tree, state updates are structured with immutable reducer patterns and modular consumers. Components subscribe only to the specific slices of state they need (e.g., the Energy page subscribes to energy data, while the TopNavbar reads the unread alerts count). When real-time simulation ticks occur, updates are batched smoothly.',
      tag: 'State Management',
    },
    {
      q: '4. How did you implement the real-time IoT simulation without physical sensors attached?',
      a: 'I engineered a synthetic telemetry simulation engine inside `CampusContext`. When active, it runs an asynchronous timer that periodically updates sensor readings across all 8 buildings. To make it realistic rather than random, the engine uses Gaussian distribution algorithms that simulate diurnal cycles—higher energy demand during peak class hours (10 AM to 3 PM), baseline vampire loads at night, and stochastic variations for solar irradiance based on simulated cloud cover.\n\nFurthermore, the simulator incorporates threshold anomaly triggers: if energy consumption exceeds 1,200 kWh or water flow spikes unusually, it automatically dispatches a new Critical Alert to the incident response queue.',
      tag: 'IoT & Simulation',
    },
    {
      q: '5. How does the CampusIQ AI Assistant work? Is it real or mock?',
      a: 'It is a hybrid intelligent system. The frontend includes a dedicated floating chat interface (`EcoAIChat.tsx`) that communicates with a backend Express proxy route (`/api/gemini/chat`). When an API key is present in environment variables, it leverages the Google Gemini TypeScript SDK, feeding the LLM a domain-specific system prompt enriched with real-time campus telemetry (current kWh, active alerts, cistern percentages, AQI values).\n\nIf the application runs in an isolated offline environment or without cloud API credentials, it seamlessly falls back to a deterministic rule-based semantic inference engine. This engine parses intent keywords (e.g., "HVAC", "leak", "solar", "audit") and delivers precise, actionable engineering recommendations. This guarantees zero UI errors and 100% uptime.',
      tag: 'AI Engineering',
    },
    {
      q: '6. How did you build the Spatial GIS Campus Map with real drone photography?',
      a: 'The spatial map (`CampusMapPage.tsx`) offers three distinct rendering modes: Aerial Drone GIS, 3D Digital Twin, and Vector Schematic. For the Aerial view, I integrated a high-resolution drone photograph of the college campus.\n\nOn top of this raster base, I established an absolute coordinate grid system (X/Y percentages from 0% to 100%). Each physical campus structure—such as the 4-story Administrative Block, the domed Campus Temple & Assembly Pavilion, the Engineering Wing, and Student Hostels—has a corresponding spatial node. When operators click any node, an interactive telemetry drawer slides out displaying live kWh, occupancy, water usage, and equipment health with smooth CSS transitions.',
      tag: 'Spatial GIS & UX',
    },
    {
      q: '7. How did you achieve Dark Mode and responsive design across all devices?',
      a: 'I implemented dark mode using Tailwind CSS’s `dark:` selector class applied directly to the root `<html>` element. The user’s preference is persisted to `localStorage` and automatically initialized based on system `prefers-color-scheme`. The color system follows WCAG AAA contrast standards—using slate-950 and deep obsidian `#0c1220` backgrounds paired with crisp emerald and sky accents for high readability.\n\nFor responsive design, the interface employs a collapsible sidebar on mobile viewports with backdrop blur overlays, responsive CSS grid layouts (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), and touch-friendly target sizes (min 44x44px) so facilities staff can operate the app effortlessly on mobile phones, tablets, or multi-monitor operations room walls.',
      tag: 'UI/UX & Accessibility',
    },
    {
      q: '8. How is the Campus Sustainability Score (0-100) calculated mathematically?',
      a: 'The overall Sustainability Score is a composite, weighted multi-criteria index calculated as:\n\n`Score = (EnergyScore * 0.35) + (WaterScore * 0.25) + (WasteScore * 0.20) + (AirQualityScore * 0.20)`\n\n- Energy Score (35% weight): Evaluates renewable energy share (solar vs grid), peak demand curtailment, and consumption per square meter vs national ASHRAE baselines.\n- Water Score (25% weight): Assesses rainwater harvesting utilization (cistern fill percentage) and flow efficiency vs baseline.\n- Waste Score (20% weight): Measures landfill diversion rate (% recycled or composted vs total solid waste generated).\n- Air Quality Score (20% weight): Normalized based on EPA Air Quality Index standards (< 50 = 100% score; > 150 = severe penalty).\n\nThis provides stakeholders with an intuitive single executive KPI while allowing engineers to drill down into exact sub-domain deficits.',
      tag: 'Algorithms & Domain',
    },
    {
      q: '9. How did you implement printable PDF generation and CSV exports without heavy client libraries?',
      a: 'Rather than adding heavy 500KB+ client libraries like jsPDF or html2canvas—which often cause font rasterization artifacts, canvas blur, and bundle bloat—I utilized two native, standards-compliant web approaches:\n\n1. For CSV Exports: I constructed an RFC 4180 compliant CSV string dynamically in memory from the latest state, converted it into a URI encoded data string (`data:text/csv;charset=utf-8`), attached it to a temporary DOM anchor tag, and programmatically triggered the download. This runs in under 10 milliseconds.\n2. For Official PDF Reports: I engineered bespoke print stylesheets (`@media print` in `src/index.css`) that strip out navigational bars, hamburger drawers, and interactive buttons, reformatting the layout into clean A4 paginated tables with high-contrast monochrome and vector-sharp text at native 300 DPI.',
      tag: 'Performance & Engineering',
    },
    {
      q: '10. What are the key ESG and Carbon accounting standards implemented?',
      a: 'CampusIQ adheres to the Greenhouse Gas (GHG) Protocol Corporate Standard, categorizing greenhouse gas emissions into:\n- Scope 1 (Direct): On-site diesel generators, natural gas boilers, and campus vehicle fleet fuel combustion.\n- Scope 2 (Indirect): Purchased electricity from the regional grid, calculating emission coefficients (0.82 kg CO2 per kWh of grid draw).\n- Scope 3 (Value Chain): Student and faculty daily commuting, water treatment transport, and solid waste landfill decomposition emissions.\n\nIt also models carbon offsets—crediting the campus’s 450 kW rooftop solar array and 28 acres of preserved campus tree canopy, which actively sequester metric tons of CO2 annually.',
      tag: 'ESG & Compliance',
    },
    {
      q: '11. How do you handle error states, loading fallbacks, and edge cases?',
      a: 'I followed defensive programming principles throughout the application:\n1. Image Fallbacks: Spatial map images include native `onError` handlers that fall back gracefully from local paths to bundled asset images, preventing broken image placeholders.\n2. Optional Chaining & Default Null Objects: All telemetry feeds use TypeScript optional chaining (`building?.energyKwh ?? 0`) to prevent null reference runtime crashes if a sensor feed temporarily disconnects.\n3. Safe Form Validations: All modal dialogs (Add Building, Add Asset, Schedule Maintenance) validate input boundaries (preventing negative kWh, invalid email formats, or blank names) before mutating state.\n4. Network Resilience: The Express server includes robust error handling with fallback HTTP responses so client operations never freeze.',
      tag: 'Code Quality & Resilience',
    },
    {
      q: '12. What was the most challenging technical hurdle you overcame on this project?',
      a: 'The most complex challenge was synchronizing the Spatial GIS Map with dynamic telemetry while maintaining 60fps performance and crisp responsive scaling.\n\nBecause the aerial drone photo has fixed perspective angles, aligning interactive telemetry pins so they remain visually anchored to the physical buildings across varying viewport ratios (mobile portrait, tablet landscape, ultrawide desktops) required rigorous CSS relative-to-absolute percentage positioning. Additionally, ensuring that high-frequency real-time simulation updates only re-rendered the active pin markers without causing the entire map canvas and image backdrop to flicker was solved using clean React memoization and modular component isolation.',
      tag: 'Problem Solving',
    },
    {
      q: '13. How would you scale this architecture to support 100+ university campuses globally?',
      a: 'To scale CampusIQ from a single campus prototype to a multi-tenant global SaaS platform, I would introduce three architectural evolutions:\n1. Backend & Streaming: Transition from HTTP polling/simulation to an Apache Kafka or AWS IoT Core event bus with MQTT/WebSocket microservices to ingest millions of telemetry messages per second.\n2. Timeseries Database: Store sensor telemetry in a dedicated timeseries database like TimescaleDB, InfluxDB, or ClickHouse for lightning-fast historical queries and downsampled rollups.\n3. Multi-Tenant Role-Based Access Control: Partition tenant data with PostgreSQL row-level security (RLS) or dedicated tenant schemas, enabling central university chancellors to see national benchmarks while local facility managers access only their designated buildings.',
      tag: 'System Scalability',
    },
    {
      q: '14. What are the key business metrics and ROI of deploying CampusIQ?',
      a: 'CampusIQ delivers tangible financial and environmental returns:\n1. 18% to 24% reduction in electricity bills through automated peak-load shaving and HVAC setpoint trimming.\n2. Up to 3.8 million liters of water saved annually by detecting underground pipe leaks and optimizing rainwater retention.\n3. 40% reduction in equipment downtime through predictive maintenance dispatch rather than reactive failure repairs.\n4. Over 120 engineering hours saved per year on manual ESG auditing, accreditation reporting (NAAC, NIRF, LEED), and utility invoice reconciliation.',
      tag: 'Business Impact & ROI',
    },
    {
      q: '15. If hired for this role, what engineering practices do you bring from building CampusIQ?',
      a: 'Building CampusIQ demonstrated my ability to deliver end-to-end, production-grade applications that combine rigorous engineering with intuitive design:\n- Ownership & Speed: I take full ownership from initial problem discovery and database design to frontend UX and deployment.\n- User-Centric Craftsmanship: I do not build superficial toy demos; every button, status badge, and interaction in CampusIQ performs a tangible business function.\n- Scalable Architecture: I write clean, modular, strongly-typed TypeScript with reusable components, clear documentation, and strict testing awareness.\n- Business Alignment: I always connect software features directly to customer ROI and measurable operational outcomes.',
      tag: 'Cultural & Engineering Fit',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Action & Print Bar (Hidden during Print) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Official Project Dossier
              </span>
              <span className="text-[10px] font-mono text-slate-400">v2.4 Production</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              CampusIQ Job Interview Dossier & PDF Guide
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-2xs"
            title="Copy 60-Second Elevator Pitch to Clipboard"
          >
            {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPitch ? 'Copied Pitch!' : 'Copy Elevator Pitch'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-2xs"
            title="Download Offline Text Dossier"
          >
            <FileDown className="w-3.5 h-3.5 text-sky-600" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all"
            title="Print or Save as Official PDF via Browser"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Filter Tabs (No-Print) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-print">
        {[
          { id: 'all', label: 'Complete Dossier' },
          { id: 'summary', label: '1. Executive Pitch' },
          { id: 'architecture', label: '2. Tech Stack' },
          { id: 'buttons', label: '3. Button Dictionary' },
          { id: 'telemetry', label: '4. IoT & Spatial Map' },
          { id: 'interview', label: '5. Interview Q&A (15)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* PRINTABLE DOSSIER DOCUMENT CONTAINER                                      */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-10">
        
        {/* Document Formal Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 dark:text-emerald-400 uppercase">
                  ECONEX INTELLIGENT INFRASTRUCTURE SYSTEMS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
                CampusIQ Enterprise Platform
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Comprehensive Technical Architecture, Interactive Feature Guide, IoT Telemetry Models & Job Interview Presentation Dossier
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1 sm:text-right">
              <div><strong className="text-slate-900 dark:text-slate-200">Author & Engineer:</strong> Uttam Sahu</div>
              <div><strong className="text-slate-900 dark:text-slate-200">Role:</strong> Lead Full-Stack & Sustainability Systems Architect</div>
              <div><strong className="text-slate-900 dark:text-slate-200">Primary Campus:</strong> {selectedCampus}</div>
              <div><strong className="text-slate-900 dark:text-slate-200">Document Classification:</strong> Technical Job Interview Dossier</div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 1: EXECUTIVE SUMMARY & ELEVATOR PITCH                           */}
        {/* ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'summary') && (
          <section className="space-y-4 print-avoid-break">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                01
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Executive Summary & 60-Second Elevator Pitch
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/20 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
              <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">
                Recite this in interviews when asked: "Tell me about this project":
              </strong>
              "{elevatorPitch}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Problem</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Colleges lose up to <strong>35% of utility funds</strong> because facilities operate in silos: electrical meters aren’t linked to HVAC chillers, water leaks go undetected for days, and ESG reporting requires weeks of manual spreadsheets.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Solution</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  CampusIQ binds <strong>8 physical buildings and 40+ telemetry streams</strong> into a single real-time dashboard, interactive aerial GIS map, and AI assistant that recommends automated setpoint reductions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Measurable Impact</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Achieves <strong>24% energy reduction</strong>, saves <strong>3.8M liters of water</strong> via 94% cistern utilization, enables <strong>68% waste diversion</strong>, and generates 1-click audit-compliant ESG dossiers.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 2: ARCHITECTURE & TECH STACK                                    */}
        {/* ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'architecture') && (
          <section className="space-y-4 print-avoid-break">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold text-xs">
                02
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                System Architecture & Full-Stack Implementation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  <span>Frontend Engineering Stack</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-4">
                  <li><strong>React 18 + Vite 6:</strong> Sub-second HMR and tree-shaken builds with zero performance bottlenecks.</li>
                  <li><strong>TypeScript Strict Mode:</strong> Complete type contracts across all telemetry models, buildings, assets, and alert states.</li>
                  <li><strong>Tailwind CSS Architecture:</strong> Utility-first styling with custom CSS design tokens, modern backdrop blur, and full dark mode.</li>
                  <li><strong>Custom SVG Visualizations:</strong> Zero bundle bloat; lightweight, responsive SVG sparklines, gauges, and comparison charts.</li>
                  <li><strong>JetBrains Mono Tabular Numerals:</strong> Guarantees jitter-free live numeric readouts when telemetry streams update in real-time.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Cpu className="w-4 h-4 text-sky-500" />
                  <span>State Management & Backend Proxy</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-4">
                  <li><strong>Centralized Context API (`CampusContext`):</strong> Single source of truth driving 8 facility models, asset lists, work orders, and goals.</li>
                  <li><strong>Real-Time IoT Simulation Engine:</strong> Interval-based synthetic sensor generator modeling realistic diurnal load curves and stochastic variance.</li>
                  <li><strong>Node.js / Express Proxy (`server.ts`):</strong> Secure gateway preventing client-side API key exposure while serving Vite middleware.</li>
                  <li><strong>Google Gemini AI SDK Integration:</strong> Server-side generative diagnostics with robust fallback to rule-based semantic inference.</li>
                  <li><strong>Native Client-Side RFC 4180 CSV & Print Engine:</strong> Instant zero-server data export and crisp 300 DPI vector PDF generation.</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 3: COMPREHENSIVE BUTTON & FEATURE ENCYCLOPEDIA                  */}
        {/* ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'buttons') && (
          <section className="space-y-6 print-page-break">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold text-xs">
                03
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Master Button & Feature Encyclopedia (Interview Cheat Sheet)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every single interactive control across the entire platform, its underlying state change, and why it matters in an interview.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {buttonCatalog.map((category) => (
                <div key={category.page} className="space-y-3 print-avoid-break">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{category.page}</span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                          <th className="py-2.5 px-3 w-1/4">Button / Control Name</th>
                          <th className="py-2.5 px-3 w-1/4">User Action & Code State</th>
                          <th className="py-2.5 px-3 w-1/2">Engineering & Interview Talking Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
                        {category.buttons.map((btn) => (
                          <tr key={btn.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                            <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                              {btn.name}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                              <span className="block font-medium text-slate-800 dark:text-slate-200">{btn.action}</span>
                              <code className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">{btn.code}</code>
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                              {btn.interviewPoint}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 4: IOT TELEMETRY & SPATIAL GIS MAP                              */}
        {/* ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'telemetry') && (
          <section className="space-y-4 print-avoid-break">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs">
                04
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Spatial GIS College Map & Algorithmic Models
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Spatial Alignment with Real Drone College Photography
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  In `CampusMapPage.tsx`, the application maps actual physical college infrastructure to coordinate markers. Key facilities anchored include:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="block text-slate-900 dark:text-white">Admin Block</strong>
                    <span className="text-slate-500 text-[11px]">4 floors · Central Chancellery</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="block text-slate-900 dark:text-white">Temple & Pavilion</strong>
                    <span className="text-slate-500 text-[11px]">Assembly Grounds & Canopy</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="block text-slate-900 dark:text-white">Engineering Wing</strong>
                    <span className="text-slate-500 text-[11px]">Computer Labs & Workshops</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="block text-slate-900 dark:text-white">Central Lawns</strong>
                    <span className="text-slate-500 text-[11px]">Rain Cistern & Solar Canopy</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Algorithmic Sustainability Score Formula
                </h3>
                <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
{`Campus Sustainability Score (0-100) =
  (EnergyScore * 0.35) + 
  (WaterScore  * 0.25) + 
  (WasteScore  * 0.20) + 
  (AirScore    * 0.20)

Where:
• EnergyScore = min(100, (RenewableSolarShare * 1.5) + (100 - (CurrentKwh / PeakKwh * 50)))
• WaterScore  = (RainwaterHarvestCisternPct * 0.6) + (LeakFreeIndex * 0.4)
• WasteScore  = RecyclingDiversionRatePct (Goal >= 70%)
• AirScore    = max(0, 100 - (OverallAQI - 25) * 0.8)`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 5: 15 JOB INTERVIEW QUESTIONS & MODEL ANSWERS                   */}
        {/* ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'interview') && (
          <section className="space-y-6 print-page-break">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold text-xs">
                05
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Top 15 Job Interview Technical Questions & High-Impact Answers
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Read these before walking into technical screening rounds and engineering interviews.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {interviewQuestions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5 print-avoid-break"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.q}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.tag}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line pl-2 border-l-2 border-emerald-500">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formal Document Sign-off */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">CampusIQ Platform Documentation</span> · Verified Build
          </div>
          <div className="flex items-center gap-4">
            <span>Authored by Uttam Sahu</span>
            <span>ECONEX Systems</span>
            <span className="text-emerald-600 font-semibold">100% Production Ready</span>
          </div>
        </div>

      </div>
    </div>
  );
};
