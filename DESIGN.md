---
name: Editorial Brutalism
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#5b403e'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#8f6f6d'
  outline-variant: '#e4beba'
  surface-tint: '#b91a24'
  primary: '#b61722'
  on-primary: '#ffffff'
  primary-container: '#da3437'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3ad'
  secondary: '#5f5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e4e1e6'
  on-secondary-container: '#656467'
  tertiary: '#5a5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#737575'
  on-tertiary-container: '#fcfcfc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930013'
  secondary-fixed: '#e4e1e6'
  secondary-fixed-dim: '#c8c5ca'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  display-2xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 110px
    letterSpacing: -0.05em
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  grid-margin: 40px
  grid-gutter: 1px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 64px
  stack-xl: 128px
---

## Brand & Style
The design system embodies an **Editorial Brutalist** aesthetic, merging the raw structural honesty of architectural brutalism with the refined precision of high-end print typography. It is designed for a prestige design studio, prioritizing high-impact visual hierarchies and uncompromising clarity.

The interface evokes a sense of "digital paper"—tangible, authoritative, and sophisticated. The emotional response is one of confidence and avant-garde professionalism. Key stylistic hallmarks include:
- **Massive Contrast:** Aggressive shifts between oversized headings and microscopic utility text.
- **Structural Integrity:** Heavy reliance on visible grids and sharp, unyielding borders.
- **Minimal Glassmorphism:** Reserved exclusively for top-level navigation to provide a singular layer of depth against the flat, high-contrast canvas.

## Colors
The palette is intentionally restricted to amplify impact. 

- **Primary (Red-500):** Used sparingly for calls to action, active states, and critical highlights. It acts as a visual "strobe" against the monochrome base.
- **Surface (Cream/Off-white):** The default background (#FAFAFA) provides a warmer, more "editorial" feel than pure white, reducing eye strain while maintaining high contrast.
- **Ink (Zinc-900):** Used for primary text and structural borders. In dark mode, this flips to a Zinc-950 background with Zinc-50 text.
- **Accent Glass:** Navigation elements utilize a 70% opacity version of the background color with a 20px backdrop blur to create a subtle "lens" effect over the brutalist content.

## Typography
Typography is the primary engine of the design system. **Plus Jakarta Sans** is used for display and headline roles, set with extremely tight tracking to mimic mid-century editorial layouts. **Inter** provides a systematic, neutral counterpoint for body copy and functional labels.

For mobile, "Display" sizes must scale aggressively to ensure words don't break awkwardly while maintaining the "oversized" personality. All headlines should be set with `opticalSizing: auto` and `font-feature-settings: "ss01", "ss02"` to maximize the geometric character of the letterforms.

## Layout & Spacing
The system utilizes a **Fixed 12-Column Grid** on desktop and a **4-Column Grid** on mobile. Unlike traditional fluid layouts, this system uses "Hard Lines"—visible 1px Zinc-900 borders—to define gutters and sections.

- **The 1px Rule:** Layout divisions are marked by actual borders rather than whitespace alone.
- **The "Big Gap":** Vertical rhythm alternates between extremely tight spacing (stack-sm) for related meta-data and massive "breaks" (stack-xl) between content sections.
- **Margins:** Consistent 40px margins on all viewports provide a frame for the internal brutalist structure.

## Elevation & Depth
This design system rejects traditional shadows. Hierarchy is achieved through **Tonal Layering** and **Line Weight**.

- **Level 0:** Base surface (#FAFAFA).
- **Level 1:** Inset containers using 1px Zinc-900 borders.
- **Floating:** Only the Navigation Bar uses depth, implemented via a `backdrop-filter: blur(20px)` and a 1px border. There are no ambient shadows; elements are either flush or physically separated by borders.
- **Active State:** When an element is clicked or "lifted," it may use a solid 4px black offset (Brutalist shadow) rather than a soft blur.

## Shapes
Shapes are strictly **Sharp (0px)**. There are no rounded corners in this design system. This reinforces the architectural, unyielding nature of the brand. This applies to buttons, input fields, cards, and even image containers. 

The only exception to the "square" rule is the use of circular "Pill" shapes for specific status indicators or tags, but only if they contain text set in `label-caps`.

## Components
- **Buttons:** Rectangular, sharp corners. Primary buttons are solid Zinc-900 with #FAFAFA text. Secondary buttons are outlined 1px Zinc-900. Hover states flip the colors instantly (no transition) or shift to Red-500.
- **Input Fields:** Bottom-border only or full 1px box. Labels sit above the field in `label-caps`. Focus state changes the border weight to 2px or color to Red-500.
- **Cards:** Defined by 1px borders. Images inside cards should be greyscale by default, switching to full color on hover.
- **Navigation:** A fixed-top bar with a frosted glass effect. Links are set in `label-caps`.
- **Lists:** Separated by horizontal 1px lines. Items use a "hover-reveal" pattern where the Red-500 highlight appears on the far left of the list item.
- **Chips/Tags:** Small, sharp-edged boxes with 1px borders. Text is always uppercase.