import React from "react";
import { ComponentShowcase } from "./showcase";
import { Button, Input, Badge, Progress } from "./atoms";
import { Card, CardHeader, CardTitle, CardContent } from "./molecules";
import { Animated } from "./animations";
import { Zap, Heart, Download, Send } from "lucide-react";

// ─── Button Showcase Examples ────────────────────────────────────────────────

export const ButtonShowcaseExample = () => (
  <ComponentShowcase
    title="Button Component"
    description="Fully themed, accessible buttons with animation support across all 5 themes."
    examples={[
      {
        name: "Basic Variants",
        description:
          "Primary, secondary, outline, and ghost button variants that automatically adapt to the active theme.",
        code: `import { Button } from "chameleon/atoms";

<div className="flex gap-4">
  <Button animated>Primary</Button>
  <Button variant="secondary" animated>Secondary</Button>
  <Button variant="outline" animated>Outline</Button>
  <Button variant="ghost" animated>Ghost</Button>
</div>`,
        preview: (
          <div className="flex gap-4 flex-wrap">
            <Button animated>Primary</Button>
            <Button variant="secondary" animated>
              Secondary
            </Button>
            <Button variant="outline" animated>
              Outline
            </Button>
            <Button variant="ghost" animated>
              Ghost
            </Button>
          </div>
        ),
      },
      {
        name: "With Icons",
        description: "Combine buttons with Lucide icons for enhanced visual communication.",
        code: `import { Button } from "chameleon/atoms";
import { Heart, Download, Send } from "lucide-react";

<div className="flex gap-3">
  <Button animated>
    <Heart className="w-4 h-4 mr-2" />
    Favorite
  </Button>
  <Button variant="secondary" animated>
    <Download className="w-4 h-4 mr-2" />
    Download
  </Button>
  <Button variant="outline" size="sm" animated>
    <Send className="w-3 h-3 mr-1.5" />
    Send
  </Button>
</div>`,
        preview: (
          <div className="flex gap-3 flex-wrap">
            <Button animated>
              <Heart className="w-4 h-4 mr-2" />
              Favorite
            </Button>
            <Button variant="secondary" animated>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" animated>
              <Send className="w-3 h-3 mr-1.5" />
              Send
            </Button>
          </div>
        ),
      },
      {
        name: "Sizes",
        description: "Three size variants: small, medium (default), and large.",
        code: `import { Button } from "chameleon/atoms";

<div className="flex items-center gap-3">
  <Button size="sm" animated>Small</Button>
  <Button size="md" animated>Medium</Button>
  <Button size="lg" animated>Large</Button>
</div>`,
        preview: (
          <div className="flex items-center gap-3 flex-wrap">
            <Button size="sm" animated>
              Small
            </Button>
            <Button size="md" animated>
              Medium
            </Button>
            <Button size="lg" animated>
              Large
            </Button>
          </div>
        ),
      },
    ]}
    documentation={`# Button Component

The Button component is the foundational interactive element in Chameleon UI. It automatically adapts its appearance and animation behavior based on the active theme.

## Features

- **5 Theme Presets**: Looks completely different in Material, Simple, Minimalist, Glassy, and Liquid themes
- **Automatic Text Contrast**: Uses CSS variable tokens to ensure readable text on all backgrounds
- **Theme-Specific Animations**: Each theme has custom hover/tap physics when \`animated={true}\`
- **Accessibility**: Built on Radix UI primitives with full keyboard and screen reader support

## Installation

\`\`\`bash
chameleon add button
\`\`\`

## Basic Usage

\`\`\`tsx
import { Button } from "chameleon/atoms";

function MyComponent() {
  return <Button animated>Click me</Button>;
}
\`\`\`

## Theme Behavior

### Material Theme
- Elevated shadow with ripple effect
- Smooth deceleration curves
- Uppercase text with letter spacing

### Minimalist Theme
- Border-based design, no shadows
- Instant linear animations
- Sharp, precise interactions

### Glassy Theme
- Frosted glass backdrop blur
- Soft spring animations with blur transitions
- Transparent white overlays

### Liquid Theme
- Gradient backgrounds with border-radius morphing
- Organic bouncy springs
- High amplitude movements
`}
    apiReference={[
      {
        prop: "variant",
        type: '"primary" | "secondary" | "outline" | "ghost"',
        default: '"primary"',
        description: "Visual style variant of the button",
      },
      {
        prop: "size",
        type: '"sm" | "md" | "lg" | "icon"',
        default: '"md"',
        description: "Size of the button (affects padding and text size)",
      },
      {
        prop: "animated",
        type: "boolean",
        default: "false",
        description: "Enable theme-specific hover/tap animations",
      },
      {
        prop: "asChild",
        type: "boolean",
        default: "false",
        description: "Compose with Radix Slot for custom elements",
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable button interactions and reduce opacity",
      },
    ]}
    usageNotes={[
      "Always use the `animated` prop for interactive elements to provide proper visual feedback",
      "The button automatically uses the correct text color based on the theme's --primary-foreground token",
      "For icon-only buttons, use size='icon' instead of manually setting width/height",
      "Combine with Lucide React icons for consistent iconography across your app",
      "The glassy theme button uses backdrop-blur, which may impact performance on low-end devices",
    ]}
    relatedComponents={["Input", "Badge", "Card", "IconButton"]}
  />
);

// ─── Animation Showcase Examples ─────────────────────────────────────────────

export const AnimationShowcaseExample = () => (
  <ComponentShowcase
    title="Animation System"
    description="Theme-aware animations with physics-accurate motion presets for all 5 themes."
    examples={[
      {
        name: "Enter Animations",
        description: "Different entry animations: fadeUp, scaleIn, slideIn, and rotateIn.",
        code: `import { Animated } from "chameleon/animations";

<div className="space-y-4">
  <Animated type="fadeUp" delay={0}>
    <Card>Fade Up Animation</Card>
  </Animated>

  <Animated type="scaleIn" delay={0.1}>
    <Card>Scale In Animation</Card>
  </Animated>

  <Animated type="slideIn" delay={0.2}>
    <Card>Slide In Animation</Card>
  </Animated>

  <Animated type="rotateIn" delay={0.3}>
    <Card>Rotate In Animation</Card>
  </Animated>
</div>`,
        preview: (
          <div className="space-y-4 w-full">
            <Animated type="fadeUp" delay={0}>
              <Card className="p-4 text-center">
                <span className="font-bold text-sm">Fade Up Animation</span>
              </Card>
            </Animated>
            <Animated type="scaleIn" delay={0.1}>
              <Card className="p-4 text-center">
                <span className="font-bold text-sm">Scale In Animation</span>
              </Card>
            </Animated>
            <Animated type="slideIn" delay={0.2}>
              <Card className="p-4 text-center">
                <span className="font-bold text-sm">Slide In Animation</span>
              </Card>
            </Animated>
            <Animated type="rotateIn" delay={0.3}>
              <Card className="p-4 text-center">
                <span className="font-bold text-sm">Rotate In Animation</span>
              </Card>
            </Animated>
          </div>
        ),
      },
      {
        name: "Infinite Animations",
        description: "Continuous bounce and pulse animations for attention-grabbing elements.",
        code: `import { Animated } from "chameleon/animations";

<div className="flex gap-8">
  <Animated type="bounce">
    <Button>
      <Zap className="w-4 h-4 mr-2" />
      Bounce
    </Button>
  </Animated>

  <Animated type="pulse">
    <Badge>Pulse Effect</Badge>
  </Animated>
</div>`,
        preview: (
          <div className="flex gap-8 items-center">
            <Animated type="bounce">
              <Button>
                <Zap className="w-4 h-4 mr-2" />
                Bounce
              </Button>
            </Animated>
            <Animated type="pulse">
              <Badge>Pulse Effect</Badge>
            </Animated>
          </div>
        ),
      },
      {
        name: "Component Animations",
        description:
          "Use the animated prop on any Chameleon component for theme-specific hover/tap effects.",
        code: `import { Button, Badge, Card } from "chameleon";

// All Chameleon components support animated prop
<div className="flex gap-4">
  <Button animated>Hover me</Button>
  <Badge animated>Interactive Badge</Badge>
  <Card animated>
    <CardContent>Hover me too!</CardContent>
  </Card>
</div>`,
        preview: (
          <div className="flex gap-4 items-center flex-wrap">
            <Button animated>Hover me</Button>
            <Badge animated className="cursor-pointer">
              Interactive Badge
            </Badge>
            <Card animated className="cursor-pointer">
              <CardContent className="p-4">
                <span className="text-sm font-bold">Hover me too!</span>
              </CardContent>
            </Card>
          </div>
        ),
      },
    ]}
    documentation={`# Animation System

Chameleon UI features a sophisticated animation system where each theme has **completely different physics**. The same \`animated\` prop produces wildly different results depending on whether you're in Material, Glassy, or Liquid theme.

## Philosophy

- **Material**: Smooth deceleration curves (Material Design standard easing)
- **Simple**: Minimal, unobtrusive fades
- **Minimalist**: Instant linear snaps with zero easing
- **Glassy**: Blur-in transitions with soft refractive springs
- **Liquid**: Organic bouncy springs with rotation and morphing

## Installation

\`\`\`bash
chameleon add animations
\`\`\`

## Basic Usage

### Option 1: Animated Prop (Recommended)

\`\`\`tsx
import { Button, Card } from "chameleon/atoms";

// Works on any Chameleon component
<Button animated>Click me</Button>
<Card animated>Hover me</Card>
\`\`\`

### Option 2: Animated Wrapper

\`\`\`tsx
import { Animated } from "chameleon/animations";

<Animated type="fadeUp" delay={0.2}>
  <YourComponent />
</Animated>
\`\`\`

### Option 3: Raw Presets with Motion

\`\`\`tsx
import { motion } from "motion/react";
import { useAnimation } from "chameleon/animations";

const preset = useAnimation();

<motion.div
  whileHover={preset.hover}
  whileTap={preset.tap}
>
  Your content
</motion.div>
\`\`\`

## Animation Types

- **enter**: Page/element entrance with exit animation
- **fadeUp**: Fade in from bottom
- **scaleIn**: Scale and fade in
- **slideIn**: Slide in from left
- **rotateIn**: Rotate and scale in
- **bounce**: Infinite bouncing (y-axis)
- **pulse**: Infinite pulsing (scale/opacity)

## For AI Agents

When generating Chameleon UI code:
1. Add \`animated\` prop to buttons, cards, and interactive elements
2. Use \`<Animated type="fadeUp" delay={0.1}>\` for page sections
3. Stack delays: 0, 0.1, 0.2, 0.3, etc. for staggered reveals
4. Use \`bounce\` or \`pulse\` for call-to-action elements
5. The theme automatically determines the animation physics—no manual tuning needed
`}
    apiReference={[
      {
        prop: "type",
        type: '"enter" | "fadeUp" | "scaleIn" | "slideIn" | "rotateIn" | "bounce" | "pulse"',
        default: '"enter"',
        description: "Type of animation to apply",
      },
      {
        prop: "delay",
        type: "number",
        default: "0",
        description: "Delay before animation starts (in seconds)",
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable animation and render children immediately",
      },
      {
        prop: "className",
        type: "string",
        description: "Additional CSS classes to apply to the wrapper",
      },
    ]}
    usageNotes={[
      "Each theme has completely different animation physics—Material uses easing curves, Minimalist uses linear, Glassy uses springs with blur",
      "The `animated` prop on components (Button, Card, etc.) uses hover/tap animations, while <Animated> wrapper uses entrance animations",
      "For staggered animations, use AnimatedList or increment delay by 0.05-0.1 seconds per element",
      "Bounce and pulse animations are infinite by default—use them sparingly for important UI elements",
      "Animations automatically respect prefers-reduced-motion user preferences",
      "Glassy theme animations include filter blur transitions which may impact performance on low-end devices",
    ]}
    relatedComponents={["AnimatedList", "AnimatedPage", "InteractiveCard", "Button", "Card"]}
  />
);

// ─── Progress Showcase Example ───────────────────────────────────────────────

export const ProgressShowcaseExample = () => (
  <ComponentShowcase
    title="Progress Component"
    description="Animated progress bars with labels and theme-specific styling."
    examples={[
      {
        name: "Basic Progress",
        description: "Simple progress bars with different values and optional labels.",
        code: `import { Progress } from "chameleon/atoms";

<div className="space-y-4 w-full max-w-md">
  <Progress value={45} animated />
  <Progress value={72} label="Storage" showValue animated />
  <Progress value={91} label="CPU Usage" showValue animated />
</div>`,
        preview: (
          <div className="space-y-4 w-full max-w-md">
            <Progress value={45} animated />
            <Progress value={72} label="Storage" showValue animated />
            <Progress value={91} label="CPU Usage" showValue animated />
          </div>
        ),
      },
    ]}
    documentation={`# Progress Component

A progress indicator that adapts its appearance based on the active theme.

## Installation

\`\`\`bash
chameleon add progress
\`\`\`

## Usage

\`\`\`tsx
import { Progress } from "chameleon/atoms";

<Progress value={75} label="Loading" showValue animated />
\`\`\``}
    apiReference={[
      {
        prop: "value",
        type: "number",
        default: "0",
        description: "Progress value (0-100)",
      },
      {
        prop: "label",
        type: "string",
        description: "Optional label text displayed above the progress bar",
      },
      {
        prop: "showValue",
        type: "boolean",
        default: "false",
        description: "Show percentage value next to label",
      },
      {
        prop: "animated",
        type: "boolean",
        default: "false",
        description: "Animate progress bar fill",
      },
    ]}
    relatedComponents={["Spinner", "Badge", "StatCard"]}
  />
);
