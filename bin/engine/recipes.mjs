/**
 * Chameleon Engine — composition recipes (F61).
 * Recipes are stored, named ChameleonSpecs: the "no template? build from
 * blocks" fallback that makes agent composition reliable. Block props below
 * use only verified component APIs (StatCard, DataTable, KanbanBoard, Timeline).
 */

export const RECIPES = [
  {
    name: "login-form",
    description: "Login and signup forms with validation.",
    keywords: ["login", "signin", "sign-in", "signup", "auth", "form", "credentials"],
    spec: { version: 1, name: "login", template: "auth" },
  },
  {
    name: "auth-flow-2fa",
    description: "Multi-step auth flow: login, 2FA, password reset.",
    keywords: ["auth", "2fa", "two-factor", "otp", "reset", "password", "flow"],
    spec: { version: 1, name: "auth-flow", template: "auth-flow" },
  },
  {
    name: "pricing-page",
    description: "Pricing tiers with comparison table.",
    keywords: ["pricing", "plans", "tiers", "billing", "subscribe"],
    spec: { version: 1, name: "pricing", template: "pricing-page" },
  },
  {
    name: "settings-panel",
    description: "Comprehensive settings page with nested tabs.",
    keywords: ["settings", "preferences", "account", "profile", "configuration"],
    spec: { version: 1, name: "settings", template: "settings-panel" },
  },
  {
    name: "dashboard-shell",
    description: "Admin dashboard with sidebar and data tables.",
    keywords: ["dashboard", "admin", "panel", "sidebar", "shell"],
    spec: { version: 1, name: "dashboard", template: "admin-dashboard" },
  },
  {
    name: "landing-hero",
    description: "Full marketing landing page with hero section.",
    keywords: ["landing", "marketing", "hero", "homepage", "cta"],
    spec: { version: 1, name: "landing", template: "landing-page" },
  },
  {
    name: "analytics-overview",
    description: "KPI stat cards over a sortable data table.",
    keywords: ["analytics", "kpi", "metrics", "stats", "overview", "report"],
    spec: {
      version: 1,
      name: "analytics-overview",
      blocks: [
        { component: "stat-card", props: { label: "Total Users", value: "12,480", trend: "up", trendValue: "+8.1%" } },
        { component: "stat-card", props: { label: "Revenue", value: "$48,210", trend: "up", trendValue: "+12.4%" } },
        { component: "stat-card", props: { label: "Churn", value: "1.9%", trend: "down", trendValue: "-0.3%" } },
        {
          component: "data-table",
          props: {
            title: "Recent Signups",
            data: [
              { name: "Ada Lovelace", plan: "Pro", mrr: "$49" },
              { name: "Grace Hopper", plan: "Team", mrr: "$199" },
              { name: "Alan Turing", plan: "Free", mrr: "$0" },
            ],
            columns: [
              { key: "name", label: "Name", sortable: true },
              { key: "plan", label: "Plan" },
              { key: "mrr", label: "MRR", sortable: true },
            ],
          },
        },
      ],
    },
  },
  {
    name: "team-members",
    description: "Team member directory table with roles and status.",
    keywords: ["team", "members", "people", "directory", "users", "roles"],
    spec: {
      version: 1,
      name: "team-members",
      blocks: [
        { component: "stat-card", props: { label: "Team Size", value: "14" } },
        {
          component: "data-table",
          props: {
            title: "Members",
            data: [
              { name: "Ada Lovelace", role: "Engineering", status: "Active" },
              { name: "Grace Hopper", role: "Platform", status: "Active" },
              { name: "Alan Turing", role: "Research", status: "Invited" },
            ],
            columns: [
              { key: "name", label: "Name", sortable: true },
              { key: "role", label: "Role", filterable: true },
              { key: "status", label: "Status" },
            ],
          },
        },
      ],
    },
  },
  {
    name: "kanban-workspace",
    description: "Drag-and-drop kanban board with workload stats.",
    keywords: ["kanban", "board", "tasks", "project", "drag", "workflow"],
    spec: {
      version: 1,
      name: "kanban-workspace",
      blocks: [
        { component: "stat-card", props: { label: "Open Tasks", value: "23" } },
        { component: "kanban-board", props: { animated: true } },
      ],
    },
  },
  {
    name: "activity-timeline",
    description: "Vertical activity/event timeline page.",
    keywords: ["timeline", "activity", "history", "events", "log", "changelog"],
    spec: {
      version: 1,
      name: "activity-timeline",
      blocks: [
        { component: "stat-card", props: { label: "Events This Week", value: "42", trend: "up", trendValue: "+5" } },
        {
          component: "timeline",
          props: {
            events: [
              { id: "1", title: "Deployment shipped", description: "v2.4 rolled out to production", date: "Today", status: "completed" },
              { id: "2", title: "New team member", description: "Grace joined Platform", date: "Yesterday", status: "current" },
              { id: "3", title: "Q3 planning", description: "Roadmap review with stakeholders", date: "Next week", status: "pending" },
            ],
          },
        },
      ],
    },
  },
];
