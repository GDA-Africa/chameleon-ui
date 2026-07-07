/**
 * RenderSpec — the ChameleonSpec v1 React runtime (F61 / Phase 11).
 *
 * Renders a validated ChameleonSpec live: template specs mount the template
 * component, block specs mount each block in order. This is the runtime half
 * of the spec contract (the engine's scaffoldSpec is the codegen half) and the
 * foundation for the /render route (F66), playground links (F68), and MCP
 * Apps widgets (F70/71).
 *
 * The component map below must contain every key in the engine registry
 * (bin/engine/registry.mjs) — enforced by scripts/check-manifest.mjs.
 */

import React from "react";
import { Button, Input, Badge, Spinner, Avatar, Toggle, Progress, Tooltip, DatePicker } from "./atoms";
import { Card, Tabs, Dialog, StatCard, PricingCard, Alert, Separator, Breadcrumb, Select, Textarea } from "./molecules";
import {
  DataTable, ThemeChart, CommandPalette, KanbanBoard, Timeline,
  FileUploader, NotificationFeed, MultiStepForm, CalendarWidget, MediaGallery,
} from "./composites";
import { AuthTemplate, SettingsTemplate, EcommerceTemplate, AnalyticsDashboardTemplate } from "./templates";
import { LandingPageTemplate, BlogArticleTemplate, PricingPageTemplate, ContactSupportTemplate } from "./comprehensive-templates";
import {
  UserProfileTemplate, AdminDashboardTemplate, EcommerceProductTemplate,
  SettingsPanelTemplate, AuthFlowTemplate, DocumentationTemplate,
} from "./comprehensive-templates-part2";

type LooseComponent = React.ComponentType<Record<string, unknown>>;
const loose = (c: unknown) => c as LooseComponent;

/** F71: spec-declared intents forwarded to the MCP host as tool calls. */
export interface ChameleonSpecAction {
  tool: string;
  args?: Record<string, unknown>;
}

export interface ChameleonSpecBlock {
  component: string;
  props?: Record<string, unknown>;
  actions?: { onClick?: ChameleonSpecAction };
}

declare global {
  interface Window { __chameleonDispatchAction?: (action: ChameleonSpecAction) => void; }
}

export interface ChameleonSpec {
  version: 1;
  name: string;
  template?: string;
  blocks?: ChameleonSpecBlock[];
  theme?: string;
  mode?: string;
  brand?: Record<string, unknown>;
}

/** Keys mirror bin/engine/registry.mjs COMPONENTS. */
export const SPEC_COMPONENTS: Record<string, LooseComponent> = {
  "button": loose(Button),
  "input": loose(Input),
  "badge": loose(Badge),
  "spinner": loose(Spinner),
  "avatar": loose(Avatar),
  "toggle": loose(Toggle),
  "progress": loose(Progress),
  "tooltip": loose(Tooltip),
  "datepicker": loose(DatePicker),
  "card": loose(Card),
  "tabs": loose(Tabs),
  "dialog": loose(Dialog),
  "stat-card": loose(StatCard),
  "pricing-card": loose(PricingCard),
  "alert": loose(Alert),
  "separator": loose(Separator),
  "breadcrumb": loose(Breadcrumb),
  "select": loose(Select),
  "textarea": loose(Textarea),
  "data-table": loose(DataTable),
  "theme-chart": loose(ThemeChart),
  "command-palette": loose(CommandPalette),
  "kanban-board": loose(KanbanBoard),
  "timeline": loose(Timeline),
  "file-uploader": loose(FileUploader),
  "notification-feed": loose(NotificationFeed),
  "multi-step-form": loose(MultiStepForm),
  "calendar-widget": loose(CalendarWidget),
  "media-gallery": loose(MediaGallery),
};

/** Keys mirror bin/engine/registry.mjs TEMPLATES. */
export const SPEC_TEMPLATES: Record<string, LooseComponent> = {
  "auth": loose(AuthTemplate),
  "settings": loose(SettingsTemplate),
  "ecommerce": loose(EcommerceTemplate),
  "analytics-dashboard": loose(AnalyticsDashboardTemplate),
  "landing-page": loose(LandingPageTemplate),
  "blog-article": loose(BlogArticleTemplate),
  "pricing-page": loose(PricingPageTemplate),
  "contact-support": loose(ContactSupportTemplate),
  "user-profile": loose(UserProfileTemplate),
  "admin-dashboard": loose(AdminDashboardTemplate),
  "ecommerce-product": loose(EcommerceProductTemplate),
  "settings-panel": loose(SettingsPanelTemplate),
  "auth-flow": loose(AuthFlowTemplate),
  "documentation": loose(DocumentationTemplate),
};

function SpecError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      style={{ border: "1px solid #f87171", borderRadius: 8, padding: 12, color: "#b91c1c", fontFamily: "monospace", fontSize: 13 }}
    >
      RenderSpec: {message}
    </div>
  );
}

export interface RenderSpecProps {
  spec: ChameleonSpec;
  className?: string;
}

/**
 * Render a ChameleonSpec v1 live. Invalid or unknown references render inline
 * error boxes instead of throwing, so agents screenshotting the result (F67)
 * can see exactly what went wrong.
 */
export function RenderSpec({ spec, className }: RenderSpecProps) {
  if (!spec || spec.version !== 1) return <SpecError message={`unsupported spec version: ${String(spec?.version)}`} />;
  const hasTemplate = spec.template !== undefined;
  const hasBlocks = Array.isArray(spec.blocks);
  if (hasTemplate === hasBlocks) return <SpecError message="spec must define exactly one of 'template' or 'blocks'" />;

  if (spec.template !== undefined) {
    const Template = SPEC_TEMPLATES[spec.template];
    if (!Template) return <SpecError message={`unknown template: '${spec.template}'`} />;
    return <Template />;
  }

  return (
    <div className={className ?? "flex flex-col gap-6 p-6"}>
      {(spec.blocks ?? []).map((block, i) => {
        const Component = SPEC_COMPONENTS[block.component];
        if (!Component) return <SpecError key={i} message={`unknown component: '${block.component}'`} />;
        const { children, ...rest } = block.props ?? {};
        const el = (
          <Component key={i} {...rest}>
            {children as React.ReactNode}
          </Component>
        );
        const onClick = block.actions?.onClick;
        if (onClick && typeof window !== "undefined") {
          return (
            <div key={i} onClick={() => window.__chameleonDispatchAction?.(onClick)} style={{ cursor: "pointer" }} data-spec-action={onClick.tool}>
              {el}
            </div>
          );
        }
        return el;
      })}
    </div>
  );
}
