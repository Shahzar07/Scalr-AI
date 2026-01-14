
import { LucideIcon } from 'lucide-react';

export interface AdVariation {
  type: string;
  headline: string;
  primaryText: string;
  cta: string;
}

export interface LandingPageContent {
  preHeadline: string;
  headline: string;
  subHeadline: string;
  vslScript: string[];
}

export interface EmailContent {
  day: string;
  type: string;
  subject: string;
  body: string;
}

export interface FunnelData {
  ads: AdVariation[];
  landingPage: LandingPageContent;
  emails: EmailContent[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  FUNNEL = 'FUNNEL',
  PROFILE_OPTIMIZER = 'PROFILE_OPTIMIZER',
  PROMPT_ARCHITECT = 'PROMPT_ARCHITECT',
  TOOL = 'TOOL'
}

export interface FunnelInputState {
  productName: string;
  audience: string;
  coreProblem: string;
}

// Tooling System Types

export type ToolCategory = 'Blog' | 'Social' | 'Ads' | 'Email' | 'Business' | 'Video' | 'Website' | 'Profile' | 'Shadow Ops' | 'All';

export interface ToolInput {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  helperText?: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  iconName: string; 
  category: ToolCategory;
  inputs: ToolInput[];
  systemInstruction?: string;
  promptTemplate: string;
  supportsImageGeneration?: boolean;
  supportsCreatorCloning?: boolean;
}
