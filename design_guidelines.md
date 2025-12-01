# Design Guidelines: Adaptive Motivation Task Manager

## Design Approach

**Reference-Based Approach** drawing from:
- **Linear**: Clean task management, refined typography, subtle interactions
- **Calm/Headspace**: Soothing aesthetics, gentle animations, stress-reducing design
- **Notion**: Flexible layouts, clear hierarchy, productivity focus

**Core Principle**: Create a calming, non-overwhelming experience that adapts visually to user's emotional state while maintaining clarity and functionality.

## Typography System

**Font Stack**: 
- Primary: Inter (Google Fonts) - clean, readable, modern
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Hierarchy**:
- Hero/Main headings: text-4xl to text-5xl, font-bold
- Section headings: text-2xl to text-3xl, font-semibold
- Task titles: text-lg, font-medium
- Body text: text-base, font-normal
- Helper text: text-sm, font-normal
- Micro text: text-xs, font-normal

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistency
- Tight spacing: p-2, gap-2 (between related elements)
- Standard spacing: p-4, gap-4 (card padding, form fields)
- Comfortable spacing: p-6, gap-6 (section padding)
- Generous spacing: p-8, gap-8, py-12, py-16 (major sections)

**Grid System**:
- Single column mobile: max-w-md to max-w-2xl centered
- Desktop: max-w-6xl with sidebar + main content (280px sidebar, flexible main)

## Component Library

### Navigation & Structure
**Top Bar**: Fixed header with app logo, current motivation indicator, dark mode toggle, profile
- Height: h-16
- Padding: px-6
- Items: flex justify-between

**Sidebar (Desktop)**: Fixed left panel with navigation
- Width: w-70 (280px)
- Sections: Today, My Tasks, Categories, Insights
- Item padding: px-4 py-2

### Core Components

**Motivation Slider (Hero Component)**:
- Large, interactive range input with custom styling
- Visual feedback: smooth gradient track, animated thumb
- Emoji/icon indicators at scale points (1=😴, 5=😐, 10=🚀)
- Real-time value display: large (text-6xl), centered
- Encouraging message below slider based on selection
- Container: max-w-2xl, py-16

**Task Cards**:
- Clean cards with rounded-2xl borders
- Padding: p-6
- Structure: checkbox + title + difficulty badge + metadata row
- Difficulty badges: pill-shaped, text-xs, px-3, py-1, rounded-full
- Hover state: subtle lift (shadow increase)
- Completed state: reduced opacity with strikethrough

**Task Input Form**:
- Inline creation: borderless input that expands on focus
- Difficulty selector: segmented control (Easy/Medium/Hard)
- Auto-submit on Enter
- Padding: p-4

**Progress Visualization**:
- Circular progress rings for daily/weekly streaks
- Size: w-24 h-24 to w-32 h-32
- Thick stroke (8-10px)
- Animated on load
- Percentage centered inside

**Motivational Message Cards**:
- Soft backgrounds, rounded-xl
- Padding: p-6
- Icon/emoji left, message text, subtle animation entrance
- Appear contextually based on actions

### Dark Mode Implementation
- Toggle: Smooth icon transition (sun/moon), top-right header
- Transitions: all elements transition-colors duration-200
- Maintain consistent spacing and layout between modes
- Increase contrast ratios in dark mode for readability
- Slightly increase border thickness/visibility in dark mode

### Interactive States
**Buttons**:
- Primary: px-6 py-3, rounded-lg, font-medium
- Secondary: px-4 py-2, rounded-md, font-normal
- Icon buttons: w-10 h-10, rounded-full
- Glass effect on hero buttons over images

**Form Inputs**:
- Height: h-12 for text inputs
- Padding: px-4
- Border radius: rounded-lg
- Focus: ring-2 offset-2

## Animations (Minimal)
- Motivation slider: smooth drag with spring physics
- Task completion: gentle fade + checkmark animation (300ms)
- Dark mode toggle: 200ms ease transition
- Card hover: transform scale(1.01) + shadow (150ms)
- NO scroll animations, parallax, or autoplay elements

## Images
**Hero Section Image**: Yes - Include a calming, abstract gradient or soft nature scene
- Placement: Behind motivation slider as subtle background
- Treatment: Blur overlay, reduced opacity (30-40%)
- Size: Full viewport width, h-96 to h-screen/2
- Purpose: Set calm, encouraging tone without distraction

**Empty State Illustrations**: Simple, encouraging graphics when no tasks exist
- Style: Minimal line art or abstract shapes
- Placement: Center of task list area
- Size: w-48 h-48

## Responsive Behavior
- Mobile: Stack sidebar as bottom navigation tabs (h-16, fixed bottom)
- Mobile: Motivation slider full-width with increased touch targets
- Mobile: Task cards full-width, simplified metadata
- Desktop: Sidebar + main content, floating task input
- Tablet: Collapsible sidebar, medium-sized components

## Accessibility
- Slider: Keyboard navigable, ARIA labels, value announcements
- Tasks: Full keyboard support, screen reader friendly checkboxes
- Dark mode: Respects prefers-color-scheme, manual override persists
- Focus indicators: Clear, 2px ring with offset
- Touch targets: Minimum 44x44px for all interactive elements