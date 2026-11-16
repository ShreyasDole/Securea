# SECUREA: Institutional Financial Intelligence Platform

> Design Project Minor (CPT 401), Final Year B.Tech (CS, AI & ML), Semester VII, AY 2026-27
> uGDX School of Technology · Supervisor: Dr Suman Madan

| Team member | Roll no. |
|---|---|
| Shreyas Dole | 2308901 |
| Yash Navani | 2306837 |
| Niyati Sardana | 2307808 |

SECUREA is an **integration-first, AI-native financial intelligence platform** for institutional finance. It does not replace the systems an institution already uses. It connects to them and builds a governed layer of context, the **Financial Twin**. Authorised professionals can then ask for research, analysis, deliverables and approved actions in natural language, with source evidence, calculation correctness, permission enforcement and auditability.

> **Project status.** The accompanying project report covers the *design and architecture* of the full platform. This repository currently holds the **front-end prototype** (Next.js, mock data only). There is no backend, no live connectors and no LLM yet. See [What is in this repository](#what-is-in-this-repository) and [Report vs. prototype](#report-vs-prototype) for what is built and what is planned. The report claims no performance figures. Measurements are deferred to a pilot with a design-partner institution.

---

## Table of contents

1. [Problem](#1-problem)
2. [Aims and objectives](#2-aims-and-objectives)
3. [Scope](#3-scope)
4. [Industry workspaces](#4-industry-workspaces)
5. [Literature review and research gap](#5-literature-review-and-research-gap)
6. [System analysis](#6-system-analysis)
7. [Design](#7-design)
8. [Implementation methodology](#8-implementation-methodology)
9. [Technology stack and deployment](#9-technology-stack-and-deployment)
10. [MVP demonstration and evaluation](#10-mvp-demonstration-and-evaluation)
11. [Risks and limitations](#11-risks-and-limitations)
12. [Future work](#12-future-work)
13. [What is in this repository](#what-is-in-this-repository)
14. [Running the prototype](#running-the-prototype)
15. [Report vs. prototype](#report-vs-prototype)
16. [Glossary](#glossary)
17. [References](#references)

---

## 1. Problem

Investment banking, private equity, venture capital, asset management and hedge funds all depend on combining information from many systems: market-data terminals, CRMs, portfolio and order systems, data rooms, spreadsheets and email. The facts live in different places, formats and definitions, under different access rules.

Industry evidence, treated in the report as **directional**, because the surveys are vendor-sponsored or self-reported:

- 95% of 325 buy-side teams use four or more tools every day [1].
- Junior bankers can spend up to 40% of their week on manual tasks [2], [3].
- 60% of asset managers struggle to view multiple asset classes in one place, and 58% struggle with data-model maintenance [5].
- Data governance and ownership is the top challenge (40%), followed by manual processes (36%) and legacy technology (27%) [6].
- General-purpose AI is held back by hallucinated output and by privacy or permission risk when sensitive data reaches a model [7].

**Problem statement.** How can one configurable platform connect the systems an institution already uses, understand the financial context across them, and let authorised professionals request research, analysis, deliverables and approved actions in natural language, while guaranteeing source evidence, calculation correctness, permission enforcement and auditability?

## 2. Aims and objectives

The aim is to design SECUREA and to define a buildable MVP that proves its value on one real workflow. The objectives are:

1. Analyse the pain points of the five target segments and find the workflows with the most manual effort.
2. Design one shared platform with five configurable industry workspaces, not five applications.
3. Specify the **Financial Twin**, a governed data model that keeps provenance, period, currency, accounting basis and access policy for every metric.
4. Define an orchestration model in which the LLM plans and explains, deterministic services calculate, a policy engine authorises, and a verifier checks results.
5. Specify a connector framework and a prioritised integration roadmap that respects vendor licensing and customer entitlements.
6. Define security, governance and human-oversight controls suitable for regulated institutions.
7. Define the MVP, demo script, delivery roadmap and success metrics so ROI can be measured with a design-partner customer.

## 3. Scope

The platform has **five shared destinations**: Ask SECUREA, Workspaces, Financial Twin, Tasks & Intelligence, and Connections. It has **five industry workspaces**. The first implementation targets **Investment Banking or Private Equity**. Venture Capital comes next. Asset Management and Hedge Funds follow once the data model and pilot demand are validated.

**Out of scope for the first release:**

- Replacing market-data terminals, CRMs, portfolio or order systems, fund accounting or data rooms.
- Autonomous trade placement, portfolio rebalancing or investment decision-making.
- Full multi-asset performance attribution and regulatory reporting.
- Unrestricted copying of licensed provider data.
- A custom financial-modelling engine intended to replace Excel.
- Bespoke per-customer deployments before a repeatable architecture is proven.

Vendor integrations depend on customer contracts, entitlements, API access and security approval.

## 4. Industry workspaces

| Workspace | Primary users | Core job to be done |
|---|---|---|
| Investment Banking | Analysts, associates, VPs, directors, coverage and M&A teams | Win and execute mandates faster: research, comps, valuation support, pitchbooks, execution, diligence |
| Private Equity | Deal teams, operating partners, portfolio teams, IC, investor relations | Source, evaluate, acquire, monitor and exit; link diligence to value creation and fund reporting |
| Venture Capital | Partners, principals, associates, platform teams | Source and assess start-ups; manage pipeline and rounds; track ownership, follow-ons, exits |
| Asset Management | Portfolio managers, research analysts, risk, performance, operations | Understand holdings, performance, attribution, exposure, liquidity and risk; support reporting |
| Hedge Funds | Portfolio managers, analysts, traders, risk, operations | Connect research and market signals to positions, exposures, catalysts, risk and controlled trade workflows |

The workspaces feel purpose-built because their metrics, objects, workflows and deliverables differ. They stay unified because orchestration, identity, the connector fabric, the Financial Twin, the task engine, calculation services and governance are shared.

## 5. Literature review and research gap

**Pain points and product implications** (report Table 2.1):

| Issue | Product implication |
|---|---|
| Fragmented tools [1] | Universal search, connector fabric, shared entity context |
| Manual analyst work [2], [3] | Automate gathering, comps, model checks, recurring reports |
| Fragmented PE data [4] | Connect pipeline, diligence, monitoring and LP reporting |
| Multi-asset complexity [5] | Canonical position model and reconciliation |
| Governance gaps [6] | Ownership, quality rules, lineage, workflow automation |
| AI scaling barriers [7] | Private connectivity, evidence-linked output, approval gates, audit |
| Infrastructure pressure [8] | Treat integration and governed data as core value |
| VC liquidity pressure [9] | Runway, follow-on, ownership and exit-readiness views |

**Competitor landscape** (report Table 2.2): Bloomberg, LSEG Workspace [17], FactSet, S&P Capital IQ Pro [10], AlphaSense [11], [12], Hebbia [13], [14], BlackRock Aladdin [15], [16], and DealCloud/Intapp [20], [21]. Each is strong in its own data boundary and is adding AI inside it. SECUREA treats them as **sources to connect to**, not products to replace. It does not scrape terminals or redistribute data.

**Positioning hypothesis.** Competing on generic financial chat is unattractive. A defensible position sits *across* systems, in the combination of four properties:

1. cross-system financial context,
2. source and model lineage,
3. institutional decision memory,
4. approved workflow execution.

This is a hypothesis to test with customers, not a claim that no competitor offers any of these.

**Research gap.** Nothing today provides a governed layer that:

- (i) spans vendor, internal and office systems,
- (ii) attaches period, currency, basis, source and approval context to every number,
- (iii) enforces information barriers and source permissions on AI-generated summaries,
- (iv) completes approved actions in the original system with read-back verification.

The report validates this through 15 to 25 structured interviews with analysts, associates, portfolio managers, operations, risk, compliance, IT and administrators.

## 6. System analysis

### Functional requirements

- Accept text and voice requests and route them to the right workspace and capability without asking the user to pick an agent.
- Resolve companies, funds, securities, portfolios, deals, periods and currencies, and ask a clarifying question when a request is ambiguous.
- Search and retrieve from connected systems according to the caller's entitlements.
- Extract, normalise and reconcile metrics across sources, **showing conflicts rather than silently choosing one**.
- Inspect Excel models for formula inconsistencies, hardcodes, stale inputs and broken links, and propose changes as a reviewable diff.
- Generate cited outputs (company briefs, diligence summaries, IC and pitchbook input packs).
- Support **Read / Prepare / Execute** tiers, human approval and verified write-back.
- Record every task, source, calculation, approval and error in an audit trail.

### Non-functional requirements

| Property | Requirement |
|---|---|
| Financial correctness | All material arithmetic is done by tested deterministic services |
| Security | Tenant isolation, SSO, RBAC and ABAC, encryption in transit and at rest, information-barrier support |
| Traceability | Every material numeric claim links to a source, timestamp and calculation lineage |
| Reliability | Idempotent actions, retries, circuit breakers, connector health monitoring |
| Configurability | New domain packs and connectors are added via manifests and extension contracts, not code forks |

### Actors

Role archetypes set the default emphasis of each home screen:

- analysts and associates: research and drafting
- VPs, directors, principals and partners: review, approval and decisions
- operations and finance: reconciliation and reporting
- risk and compliance: policy and exceptions
- administrators: connections and configuration

### The Financial Twin and the metric contract

The Financial Twin is a canonical entity model shared by all workspaces, with workspace-specific extensions. For example, *Organisation* is extended as issuer, target, portfolio company, borrower, start-up or client. It is **not** a blind copy of every source and is **not** a book of record.

A bare value such as "EBITDA = 500" is never stored. Every metric carries:

| Group | Fields |
|---|---|
| Identity and value | `canonical_entity_id`, `metric_definition_id`, `value`, `currency`, `unit` |
| Period | `period_start`, `period_end`, `fiscal_period_label` |
| Basis | `accounting_basis` (reported, adjusted, management, consensus), methodology, actual or forecast, scenario, consolidation scope |
| Source and lineage | `source_system`, `source_object_id`, `document_id`, page/sheet/cell/range, `source_timestamp`, `retrieved_at`, `effective_at` |
| Governance | `validation_status`, `confidence`, `approval_status`, `owner`, `version`, `supersedes_metric_id`, `access_policy_id` |

### Data flow (Level 1)

A request enters through intent and entity resolution. The plan is authorised against the policy store. Data is retrieved from external sources and normalised into the Financial Twin. Deterministic services calculate and validate. The output is returned as a **cited draft**. Approved actions are executed, verified and written to the audit store.

### Hybrid data access patterns

| Data class | Preferred pattern | Reason |
|---|---|---|
| Licensed market data | Federated query, or licensed cache only where the contract permits | Entitlement, redistribution, retention limits |
| Live positions and orders | Live API or approved event stream; cache with explicit as-of time | Time sensitivity; book-of-record status |
| Internal documents | Index metadata and authorised extracted content; keep original reference | Search while preserving source permissions |
| Financial metrics | Governed canonical representation with lineage and version history | Cross-source comparison and history |
| Models and workbooks | Read structure and formulas; store dependency metadata and approved snapshots | Lineage without silently replacing the original |
| Decisions and tasks | Store in SECUREA as workflow and institutional memory | Traceable execution and decision history |

## 7. Design

### System architecture

One shared platform with configurable **domain packs**. The SaaS control plane hosts:

- the experience layer
- identity and tenant services
- AI orchestration
- calculation services
- the Financial Twin
- document intelligence
- the policy and approval engine
- the verifier
- task and monitoring services

Connectors reach private systems through a **customer-managed gateway** inside the customer's network. The gateway makes only outbound TLS connections.

The LLM is deliberately one component among several:

| Component | Responsibility | Must not |
|---|---|---|
| Conversation / intent layer | Understand request, context, entities, period, output | Assume an ambiguous company, metric, period or permission |
| Planner / orchestrator | Create plan, select tools, sequence work, handle retries | Invent tool capabilities or bypass permission checks |
| Financial calculation engine | Deterministic formulas, valuation, reconciliation, scenarios | Rely on LLM arithmetic for material results |
| Financial Twin retrieval | Resolve entities, relationships, metric history, access context | Return data outside the caller's entitlements |
| Policy / approval engine | Enforce read/prepare/execute tiers, thresholds, dual approval | Treat a user prompt as authority to override policy |
| Verifier | Check schema, arithmetic, source coverage, freshness, post-write state | Mark a task complete before execution is verified |

### Task lifecycle and execution tiers

Every request keeps one task ID and audit trail, whether it starts from chat, a workspace record, a document or an alert.

| Tier | What it may do |
|---|---|
| **Read** | Search, retrieve, explain |
| **Prepare** | Create drafts, proposed workbook changes or order proposals that stay unofficial until reviewed |
| **Execute** | Write to a source system. Requires explicit permission, policy validation, approval, idempotency and read-back verification |

No autonomous trading is permitted.

### User interface

- ChatGPT-like composer with text, voice, file attachment and recent work.
- Organisation, workspace, deal or fund, and as-of date are always visible.
- **Progressive disclosure:** a simple answer first, with expandable evidence, calculations, assumptions and the execution plan.
- Every generated metric shows value, unit, currency, period, basis, source and freshness.

### Security and governance

- **Tenant isolation:** `tenant_id` on every business object, separate encryption boundaries, optional dedicated deployments.
- **Identity:** SSO via OIDC or SAML, SCIM provisioning, MFA through the customer IdP, service identities for connectors.
- **Authorisation:** RBAC plus ABAC over tenant, user, role, team, deal/fund/portfolio membership, source ACL, document classification, geography and purpose. Workspace membership does not grant access to every deal, fund or source.
- **Information barriers:** restricted deal teams, wall-crossing status, restricted lists, MNPI handling, cross-fund segregation.
- **Permission propagation:** retrieved content keeps its original ACL, and AI summaries must not reveal restricted content to unauthorised users.
- **Audit:** tamper-evident records of access, retrieval, model invocation, outputs, approvals, writes and read-back.
- **Human oversight:** investment decisions, valuations, compliance outcomes, credit decisions and trading stay with authorised people.

## 8. Implementation methodology

**Approach.** Build one convincing end-to-end workflow, not a broad demo with dozens of integrations. The first workflow is **Company / Deal Intelligence plus Financial Model Review** for the Investment Banking or Private Equity workspace.

### Algorithms and processing steps

| Step | Description |
|---|---|
| Entity resolution | Map provider, internal, legal and security identifiers and aliases to a canonical SECUREA ID. Low-confidence matches go to a human review queue |
| Retrieval | Metadata filtering, keyword search and vector similarity (pgvector) over authorised content. Entitlements are applied **before** ranking |
| Normalisation and reconciliation | Align fiscal and calendar periods, currencies, reported and adjusted values, actual and forecast, consolidated and segment scope. Conflicts are shown with their basis differences. A source hierarchy applies only where the institution has configured one |
| Workbook intelligence | Parse sheets, named ranges, formulas, dependencies, hidden sheets, external links and calc settings. Build a cell-level provenance map. Detect inconsistent formulas, broken references, stale inputs, hardcoded overrides and period or currency mismatches |
| Deterministic calculation | Multiples, EV bridges, IRR and MOIC sensitivities and scenarios in versioned, tested Python services |
| Proposed edits | Each change is a diff (old value, new value, rationale, source, dependent formulas). Writes go to a new version or controlled session, never over an official model without approval |
| Verification and write-back | After approval, execute via the source API with an idempotency key, read the result back, compare with the intended state, record the outcome |

### Connector framework

One connector SDK. Each connector declares its authentication method, supported objects, operations, rate limits, pagination, event support, data classification, entitlements and read/write capabilities. Lifecycle:

1. Register and verify vendor support.
2. Authenticate.
3. Discover schema and obtain administrator approval of scopes.
4. Map fields to canonical entities and metrics.
5. Run an initial backfill under rate-limit and entitlement controls.
6. Synchronise incrementally.
7. Propagate source permissions.
8. Expose tools to the orchestrator via a capability registry.
9. Validate, approve, execute and read back any writes.
10. Monitor health, latency, token expiry, failures and schema drift.

### Priority integrations for the MVP

| Priority | Integration | MVP approach |
|---|---|---|
| P0 | Microsoft 365 (SharePoint, OneDrive, Outlook, Excel) | Microsoft Graph OAuth with scoped permissions [18], [19] |
| P0 | One licensed financial data provider | Chosen from the pilot customer's existing licence |
| P0 | One CRM or deal source | DealCloud or Salesforce if used, otherwise CSV or API adapter [20] |
| P0 | Customer data store | Read-only SQL or customer-managed API gateway |
| P1 | One data room | Vendor API if available, otherwise controlled upload |
| P1 | PMS / portfolio system | One customer system or governed sample feed |
| P2 | Additional sources, OMS/EMS, fund accounting | Connector SDK and implementation playbook |

### Delivery roadmap (indicative 20 weeks)

Vendor API procurement, data-access reviews and security approval can extend this.

| Phase | Weeks | Deliverables and exit criteria |
|---|---|---|
| 0. Discovery and validation | 1–2 | 15–25 interviews; target customer profile; workflow baselines; pilot sponsor; API access validation; signed MVP scope |
| 1. Platform foundation | 3–6 | Tenant and identity; role policies; connector framework; task engine; audit events; base UI; CI/CD; observability |
| 2. Financial Twin core | 7–10 | Canonical objects; entity resolution; lineage; document ingestion; hybrid retrieval |
| 3. First integrations | 9–12 | Microsoft 365; one data provider; one CRM or internal API; permission propagation; sync health |
| 4. AI workflows | 11–14 | Company research; extraction; reconciliation; workbook inspection; calculations; cited outputs |
| 5. Approval and write-back | 13–16 | Task control centre; prepare, approve, execute; safe write-back to one target; read-back verification |
| 6. Pilot and hardening | 17–20 | Customer UAT; security review; evaluations; performance; training; measured ROI; backlog |

## 9. Technology stack and deployment

The stack favours a mature ecosystem for data, finance and AI. It avoids extra infrastructure (a separate vector or graph database) until scale justifies it.

| Area | Starting point | Rationale and caveat |
|---|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind | Fast enterprise web UI, reusable workspace components |
| Backend | Python, FastAPI | Strong ecosystem for data, finance, AI and connectors |
| Relational data | PostgreSQL | Tenant-aware metadata, task state, canonical entities, audit references |
| Vector search | pgvector | No separate vector infrastructure until scale demands it |
| Graph | PostgreSQL relationships, Apache AGE; evaluate Neo4j later | Add graph operations only when queries demand them |
| Object storage | S3-compatible | Original documents, extracted artefacts, generated outputs; encryption and retention |
| Jobs / workflow | Celery and Redis; evaluate Temporal | Approvals, retries and multi-day tasks may outgrow simple queues |
| LLM gateway | Model-agnostic gateway with approved routing | Model choice by tenant, sensitivity, cost and latency policy |
| Calculation | Typed Python services, Pandas, NumPy | Deterministic, tested financial arithmetic |
| Identity | Keycloak or enterprise IdP | OIDC/SAML, SCIM, RBAC and ABAC |
| Observability | OpenTelemetry with central logs, metrics, traces | End-to-end task tracing and connector health |

**Deployment.**

- A SaaS control plane manages tenants, UI, orchestration metadata, the connector registry, policy and task coordination.
- A customer-managed **connector gateway** runs in the customer's VPC or on premises and initiates outbound TLS only.
- Three data-plane options: shared multi-tenant SaaS with strict isolation, a dedicated tenant, or customer private cloud or on-premises where commercially justified.
- Secrets live in a managed vault and are never stored in prompts, logs or plain tables.
- Services use mutual TLS and private endpoints, with no public inbound database access.

**Hardware.** No specialised hardware is needed for the MVP. Standard cloud compute hosts the app, database and workers. LLM inference goes through the model gateway, or through a customer-hosted endpoint where data residency requires it. Parsing and OCR run on horizontally scalable CPU workers. End users need only a modern browser. Excel and Office integration uses Office add-ins and Microsoft Graph.

## 10. MVP demonstration and evaluation

### Demonstration scenario

The user asks: *"Prepare an investment brief for Company X using our connected sources and latest model."*

| Step | What is shown | Proof point |
|---|---|---|
| 1. Ask | One natural-language prompt on the home screen | No agent selection or module navigation |
| 2. Connect | Connected sources and permission-aware retrieval | Works with existing tools |
| 3. Investigate | Source citations and entity resolution | Every important claim has evidence |
| 4. Reconcile | Two conflicting EBITDA values with period and basis explanation | Financial context and quality control |
| 5. Analyse | Workbook formula and dependency checks; deterministic scenario calculation | AI supported by calculation services |
| 6. Create | Investment brief with tables and cited metrics | Research becomes a usable deliverable |
| 7. Approve | Proposed workbook or CRM change and approval step | AI does not bypass governance |
| 8. Verify | Safe write-back, read-back and audit history | End-to-end completion |

### Pilot scorecard

| Metric | Baseline method |
|---|---|
| Research turnaround | Request-to-reviewed-brief time across recent comparable tasks (median and P90) |
| Diligence review time | Analyst hours to review a defined document set |
| Model review time | Time to find agreed issues in a benchmark workbook; precision, recall, reviewer time |
| Reconciliation effort | Manual hours and breaks for selected metrics; false positives; time to resolve |
| Evidence coverage | Share of material claims linked to a source (target 100% for required numeric claims) |
| Task completion | Workflows completed without engineering intervention |
| User adoption | Weekly active users, repeat use, workflow starts, by role and workspace |

**Annual time value** = (baseline hours per task − SECUREA-assisted hours per task) × annual task volume × loaded hourly cost, minus platform, implementation, connector, data and change-management costs. Savings are not claimed without measured evidence.

**Guardrail metrics:**

- financial calculation error rate and severity
- unsupported or uncited material claims
- permission leakage or unauthorised retrieval (**target zero**)
- incorrect entity resolution or metric mapping
- stale-data incidents and failed syncs
- write-back failures, duplicate actions and rollback incidents
- user override and unresolved exception rates

## 11. Risks and limitations

| Risk | Mitigation |
|---|---|
| Vendor API access and licensing | Validate with the pilot customer; use official APIs; keep entitlements and provenance |
| Overbuilding five verticals | Shared platform and two demo-ready packs; validate others in discovery |
| Financial hallucination or arithmetic error | Deterministic calculation, citations, validation, human review, test suites |
| Permission leakage | ACL propagation, ABAC, information barriers, red-team tests, audit |
| Data quality and entity matching | Canonical IDs, confidence thresholds, review queue, lineage |
| Long enterprise sales cycle | Design partner, narrow read-only pilot, security pack, measured ROI |
| Incumbent competition | Differentiate on cross-system orchestration, lineage and execution |
| Workflow fragility | Idempotency, retries, dead-letter queue, read-back, health monitoring |

**Limitations:**

- Competitive differentiation is still a hypothesis.
- Integration availability depends on customer contracts and entitlements.
- Survey evidence is directional.
- Regulatory obligations vary by jurisdiction and need specialist legal and compliance review before production use.

## 12. Future work

- **Domain packs:** production-grade Venture Capital (dealflow triage, founder and relationship graph, cap-table scenarios, portfolio runway), then Asset Management (holdings reconciliation, attribution, risk and scenarios), then Hedge Funds (catalyst monitoring, research-to-position linkage, exposure and risk investigation).
- **Connectors:** more market-data, data-room, fund-accounting, PMS, OMS/EMS and prime-broker connectors through the SDK.
- **Financial Twin:** full multi-asset graph, complex ownership and cap-table structures, event-driven position and risk history.
- **Research:** advanced research agents, sector monitoring, multi-hop research with stronger evaluation sets.
- **Excel and Office:** fuller modelling co-pilot, broader controlled write-back, add-in marketplace.
- **Execution:** multi-system workflows and, only after proven controls, higher-risk transaction workflows that stay inside the customer's OMS/EMS and approval policies.
- **Monitoring:** real-time event mesh and predictive monitoring.
- **Voice:** live voice, meeting participation, multilingual workflows.
- **Deployment:** dedicated tenant and private-cloud options once the architecture is repeatable.
- **Governance:** formal model inventory, per-workflow evaluation pipelines, jurisdiction-specific regulatory and legal review.

---

## What is in this repository

```
Securea/
├── Readme.md                      this file
├── SECUREA_Project_Report.docx    full project report (design, analysis, references)
└── frontend/                      Next.js front-end prototype (mock data only)
    ├── app/
    │   ├── page.tsx               Overview dashboard
    │   ├── login/                 Demo sign-in (pick a firm and user)
    │   ├── monitor/               Monitor: segment → [groupId] → [customerId] drill-down
    │   ├── intelligence/          Intelligence: signals and insights
    │   ├── decisions/             Decisions: recommendations, policy constraints, approvals
    │   ├── knowledge-graph/       Knowledge Graph (force-directed relationship view)
    │   ├── explore/               Explore: search and filter
    │   └── ask/                   Ask SECUREA: conversational interface
    ├── components/
    │   ├── layout/                Shell, Sidebar (collapsible), TopBar
    │   ├── charts/                AllocationChart, PerformanceChart (Recharts)
    │   ├── knowledge-graph/       ForceGraph (react-force-graph-2d)
    │   └── shared/                GlassCard, StatusPill
    ├── lib/
    │   ├── firm-context.tsx       Session / firm context (stored in localStorage)
    │   ├── theme-context.tsx      Theme context
    │   ├── mock-firms.ts          Demo firms and demo users
    │   ├── mock-customers.ts      Mock client / relationship data
    │   ├── mock-portfolio.ts      Mock portfolio data
    │   └── mock-data.ts           Mock signals, decisions, answers
    └── types/index.ts             Shared TypeScript types
```

**Prototype stack:** Next.js 15, React 18, TypeScript, Tailwind CSS 3, Recharts, react-force-graph-2d, framer-motion, lucide-react.

The prototype demonstrates the *experience layer* described in the report: a persistent firm and user context, progressive-disclosure views, status signals, a decision queue with policy constraints and approval, a knowledge graph, and a conversational "Ask SECUREA" screen. **All data is hard-coded mock data. Nothing is connected to a real system, and the demo logins are not real authentication.**

## Running the prototype

Requires Node.js 18.18 or later.

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |

Sign in from `/login` by choosing a demo firm and user. Demo credentials are defined in [`frontend/lib/mock-firms.ts`](frontend/lib/mock-firms.ts).

## Report vs. prototype

| Area | Report (design target) | Prototype today |
|---|---|---|
| Navigation | Ask SECUREA, Workspaces, Financial Twin, Tasks & Intelligence, Connections | Overview, Monitor, Intelligence, Knowledge Graph, Explore, Ask SECUREA, Decisions |
| Workspaces | IB, PE, VC, Asset Mgmt, Hedge Funds | Firm-level demo views (wealth and broking style firms) with mock clients |
| Financial Twin | Governed metric contract with lineage | Not implemented; the Knowledge Graph view is illustrative |
| Orchestration, LLM, calc engine, verifier | Planner + deterministic services + verifier | Not implemented; Ask SECUREA uses scripted mock answers |
| Policy and approvals | Read / Prepare / Execute, dual approval, audit | UI shows policy constraints and approval actions on mock data only |
| Connectors | M365, data provider, CRM, data store, data room, PMS | None |
| Identity and security | SSO, RBAC and ABAC, tenant isolation | Demo login only |
| Backend and data | FastAPI, PostgreSQL, pgvector, Celery/Redis | None |

The next build steps follow the report's roadmap (Phases 1 to 5): backend foundation and identity, the Financial Twin core, first integrations, AI workflows and approval with write-back.

## Glossary

| Term | Meaning |
|---|---|
| ABAC / RBAC | Attribute-based / role-based access control |
| Canonical entity | SECUREA's stable internal representation of a company, person, fund, security, deal or other object |
| Financial Twin | Governed connected representation of financial entities, metrics, documents, models, decisions and history |
| Federated query | Retrieving from the original system at query time instead of copying |
| Lineage / provenance | Evidence of where a metric or claim came from, when it was retrieved and how it was transformed |
| MNPI | Material non-public information |
| PMS / OMS / EMS | Portfolio / order / execution management systems |
| IRR / MOIC / DPI / RVPI / TVPI | Private-market return and fund-performance metrics; conventions must be configured and documented |
| TWR / MWR | Time-weighted / money-weighted return |
| VDR | Virtual data room |
| IC | Investment committee |
| LP / GP | Limited partner / general partner |

## References

1. FactSet, "325 buy-side firms reveal their tech pain points," Nov. 24, 2025. <https://insight.factset.com/325-buy-side-firms-reveal-their-tech-pain-points>
2. FactSet, "Research-backed tech insights to unlock junior banker productivity," 2025. <https://insight.factset.com/research-backed-tech-insights-to-unlock-junior-banker-productivity>
3. FactSet, "What investment bankers say about eliminating productivity barriers," 2025. <https://insight.factset.com/what-investment-bankers-say-about-eliminating-productivity-barriers>
4. MSCI, "The 2025 General Partner Survey," Jun. 12, 2025. <https://www.msci.com/research-and-insights/paper/the-2025-general-partner-survey>
5. SimCorp, "2025 Global InvestOps Report," 2025. <https://www.simcorp.com/resources/insights/white-papers-and-reports/2025-global-investops-report>
6. Cutter Associates, "Cutter releases findings of data management benchmarking survey," Feb. 5, 2026. <https://www.cutterassociates.com/news/cutter-releases-findings-of-data-management-benchmarking-survey>
7. Cambridge Centre for Alternative Finance, "2026 Global AI in Financial Services Report," 2026. <https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/2026-global-ai-in-financial-services-report/>
8. FE fundinfo, "Asset Managers Report 2025," 2025. <https://www.fefundinfo.com/landing-pages/inst/fe-fundinfo-asset-managers-report-2025>
9. NVCA, "NVCA releases 2026 Yearbook, charts a venture industry in transition," Apr. 13, 2026. <https://nvca.org/press_releases/nvca-releases-2026-yearbook-charts-a-venture-industry-in-transition/>
10. S&P Global, "S&P Capital IQ Pro." <https://www.spglobal.com/market-intelligence/en/solutions/products/sp-capital-iq-pro>
11. AlphaSense, "Platform." <https://www.alpha-sense.com/platform/>
12. AlphaSense, "Financial research platform." <https://www.alpha-sense.com/solutions/financial-research-platform/>
13. Hebbia, "Investment banking." <https://www.hebbia.com/investment-banking/>
14. Hebbia, "Product." <https://www.hebbia.com/product>
15. BlackRock, "Aladdin Studio APIs." <https://www.blackrock.com/aladdin/platforms/products/apis>
16. BlackRock, "Aladdin Studio." <https://www.blackrock.com/aladdin/platforms/products/aladdin-studio>
17. LSEG, "Workspace SDK." <https://developers.lseg.com/en/api-catalog/workspace-sdk/workspace-sdk>
18. Microsoft, "Excel workbooks and charts API overview." <https://learn.microsoft.com/graph/excel-concept-overview>
19. Microsoft, "Working with Excel in Microsoft Graph." <https://learn.microsoft.com/graph/api/resources/excel?view=graph-rest-1.0>
20. DealCloud, "DealCloud API documentation." <https://api.docs.dealcloud.com/docs>
21. DealCloud, "DealCloud API guides." <https://api.docs.dealcloud.com/guides>
