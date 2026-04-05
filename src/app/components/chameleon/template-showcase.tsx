/**
 * Template Showcase - Display all 10 comprehensive templates
 */

import React from "react";
import {
  Globe,
  ShoppingCart,
  BarChart3,
  Mail,
  User,
  Shield,
  FileText,
  BookOpen,
  DollarSign,
  Settings,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./molecules";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import {
  LandingPageTemplate,
  BlogArticleTemplate,
  PricingPageTemplate,
  ContactSupportTemplate,
} from "./comprehensive-templates";
import {
  UserProfileTemplate,
  AdminDashboardTemplate,
  EcommerceProductTemplate,
  SettingsPanelTemplate,
  AuthFlowTemplate,
  DocumentationTemplate,
} from "./comprehensive-templates-part2";

export const TemplateShowcase: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();

  const templates = [
    { id: "landing", label: "Landing Page", icon: Globe, component: LandingPageTemplate },
    { id: "blog", label: "Blog/Article", icon: FileText, component: BlogArticleTemplate },
    { id: "pricing", label: "Pricing", icon: DollarSign, component: PricingPageTemplate },
    { id: "contact", label: "Contact", icon: Mail, component: ContactSupportTemplate },
    { id: "profile", label: "User Profile", icon: User, component: UserProfileTemplate },
    { id: "admin", label: "Admin Dashboard", icon: BarChart3, component: AdminDashboardTemplate },
    {
      id: "ecommerce",
      label: "E-commerce Product",
      icon: ShoppingCart,
      component: EcommerceProductTemplate,
    },
    { id: "settings", label: "Settings Panel", icon: Settings, component: SettingsPanelTemplate },
    { id: "auth", label: "Authentication", icon: Shield, component: AuthFlowTemplate },
    { id: "docs", label: "Documentation", icon: BookOpen, component: DocumentationTemplate },
  ];

  return (
    <div className="pb-20 space-y-8">
      <div>
        <h1 className={cn("text-5xl font-black tracking-tight mb-2", textPrimary)}>
          Template Library
        </h1>
        <p className={cn("text-xl", textMuted)}>
          10 production-ready templates for the most common web patterns
        </p>
      </div>

      <Tabs defaultValue="landing">
        <TabsList className="flex-wrap h-auto">
          {templates.map((template) => (
            <TabsTrigger key={template.id} value={template.id}>
              <template.icon className="w-4 h-4 mr-2" />
              {template.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {templates.map((template) => (
          <TabsContent key={template.id} value={template.id}>
            <template.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
