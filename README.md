# portalcam-marketing-site
# Immersa 3D Website - Style & Tone Guide

## Brand Overview
**Service:** Photorealistic 3D virtual tours using PortalCam walk-through capture and Gaussian splat processing  
**Parent Company:** Drone Services Canada Inc.  
**Target Market:** Real estate, tourism/hospitality, construction, industrial training across Canada and internationally  
**Primary Location:** Greater Toronto & Hamilton Area, Ontario, Canada  
**Key Differentiator:** 15-minute capture, 24-48 hour delivery, end-to-end service (capture + processing + hosting)

***

## Visual Design System

### Color Palette
**Primary Colors:**
- Accent Cyan: `#00D4FF` (`var(--color-accent-cyan)`) - used for CTAs, highlights, headings
- Dark Background: `#020617` (`var(--color-bg-main)`) - solid backgrounds
- Deep Black: `#000` - video background base

**Text Colors:**
- Primary Text: `#FFFFFF` (`var(--color-text-primary)`)
- Muted Text: `rgba(255,255,255,0.72)` (`var(--color-text-muted)`)
- Soft Text: `rgba(255,255,255,0.6)` (`var(--color-text-soft)`)

**Borders & Accents:**
- Subtle Border: `rgba(148,163,184,0.32)` (`var(--color-border-subtle)`)

### Background Video
**All pages except homepage use:**
- YouTube embed: `https://www.youtube-nocookie.com/embed/vpjOaInpFJ4` (homepage intro)
- YouTube embed: `https://www.youtube-nocookie.com/embed/nd9gB09fYP4` (How It Works page)
- Settings: `autoplay=1&mute=1&loop=1&controls=0&playsinline=1&showinfo=0&playlist=[ID]`
- Fixed position, z-index: -2
- Dark overlay with radial gradients for readability

**Homepage intro animation:**
- Mobile: No intro, skip directly to content
- Desktop: Scroll-controlled logo zoom animation (scale 1.5 → 0.7) with fade out
- JavaScript detects mobile via user agent or viewport width < 768px

### Transparency & Depth
**All content sections use semi-transparent backgrounds (0.75-0.85 opacity) to show video through:**
- Hero sections: `rgba(2, 6, 23, 0.75)`
- Cards/Industry boxes: `rgba(3, 7, 18, 0.85)` with radial gradients
- Header: `rgba(2, 6, 23, 0.85)`

**Gradient overlays on cards:**
```css
radial-gradient(circle at 0% 0%, rgba(0, 212, 255, 0.12) 0, transparent 55%),
radial-gradient(circle at 100% 100%, rgba(124, 58, 237, 0.12) 0, transparent 55%)
```

### Typography
**Font Stack:** `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

**Hierarchy:**
- H1 (Page Headers): 26-48px, font-weight 650-750, letter-spacing -0.03em
- H2 (Section Headers): 18-26px, font-weight 650, letter-spacing -0.02em
- H3 (Card Titles): 15-18px, font-weight 600, color: cyan
- Body Text: 13-14px, color: soft/muted
- Meta Text (subtitles): 12-13px, italic or muted color

**Text Shadows (on video backgrounds):**
- Large headings: `text-shadow: 0 4px 12px rgba(0,0,0,0.6)`
- Body text on hero: `text-shadow: 0 2px 8px rgba(0,0,0,0.5)`

### Layout Components

#### Header/Navigation
- Sticky header, `position: sticky; top: 0; z-index: 50`
- Logo: `height: 32px` (splatcap-logo-horizontal.svg)
- Nav links: uppercase, 13px, letter-spacing 0.08em, opacity 0.9
- Hidden on mobile (< 768px)
- `.header-hidden` class for intro animation (opacity: 0, pointer-events: none)

#### Container
- Max-width: 1200px
- Padding: 0 20px
- Centered with `margin: 0 auto`

#### Cards (`.industry`, `.plan`)
**Standard card styling:**
```css
background:
  radial-gradient(circle at 0% 0%, rgba(0, 212, 255, 0.12) 0, transparent 55%),
  radial-gradient(circle at 100% 100%, rgba(124, 58, 237, 0.12) 0, transparent 55%),
  rgba(3, 7, 18, 0.85);
border-radius: 16px;
border: 1px solid rgba(148, 163, 184, 0.32);
padding: 20px 18px 22px;
box-shadow: 0 16px 40px rgba(15, 23, 42, 0.75);
```

**Grid layouts:**
- `.industry-grid`: `repeat(auto-fit, minmax(260px, 1fr))`
- `.plans`: Same as industry-grid for pricing cards

#### Buttons
**Primary CTA (`.cta-button`):**
- Background: cyan (`#00D4FF`)
- Text: `#00111a` (dark blue-black)
- Border-radius: 999px (pill shape)
- Padding: 11px 28px
- Font-size: 14px, font-weight: 600
- Hover: `transform: translateY(-1px)`

**Secondary CTA (`.cta-button-secondary`):**
- Background: transparent
- Border: 1px solid `rgba(148, 163, 184, 0.6)`
- Text: white
- Hover: border and text change to cyan

#### Pills (`.pill`)
- Small rounded badges: `border-radius: 999px`
- Background: `rgba(3, 7, 18, 0.85)`
- Border: 1px solid `rgba(148, 163, 184, 0.5)`
- Font-size: 11px, padding: 3px 10px
- Used for features, tags, metadata

#### Media Placeholders
**For future photo/video content:**
```css
border-radius: 14px;
border: 1px solid rgba(148,163,184,0.45);
background: gradients + #020617;
display: flex; align-items: center; justify-content: center;
```
**Inner dashed box:**
```css
height: 150px;
border-radius: 10px;
border: 1px dashed rgba(148,163,184,0.7);
```

***

## Page Structure Patterns

### Two-Column Card Layout (Services, How It Works)
```html
<article class="industry" style="display:flex; flex-direction:column; gap:14px;">
  <div>
    <h2>Section Title</h2>
    <p class="meta">Subtitle description</p>
  </div>

  <div style="display:grid; grid-template-columns:minmax(0,3fr) minmax(0,2fr); gap:18px;">
    <div>
      <!-- Text content: paragraphs, lists, pills -->
    </div>
    <div>
      <!-- Media placeholder or actual image/video -->
    </div>
  </div>
</article>
```

### Standard Section
```html
<section class="section">
  <h2>Section Title</h2>
  <p class="meta">Optional subtitle</p>
  <ul>
    <li>Bullet point content</li>
  </ul>
</section>
```

### Grid of Cards
```html
<section class="section">
  <div class="industry-grid">
    <article class="industry">
      <h3>Card Title</h3>
      <ul>
        <li>Feature point</li>
      </ul>
    </article>
    <!-- More cards -->
  </div>
</section>
```

***

## Content Tone & Voice

### Writing Style
**Professional but approachable:**
- Direct, confident statements
- No fluff or marketing hyperbole
- Technical terms explained simply
- Focus on outcomes and value

**Examples:**
- ✅ "Walk-through capture at natural speed with PortalCam—no tripods, no waiting."
- ✅ "24–48 hour delivery for most single-site projects."
- ❌ "Revolutionary cutting-edge technology transforms spaces!"
- ❌ "Experience the future of virtual tours today!"

### Key Messaging Themes
1. **Speed:** "15-minute capture", "24-48 hour delivery"
2. **Simplicity:** "Single vendor", "End-to-end service", "No stitching tools"
3. **Trust:** "8+ years experience", "RPAS certified", "Proven results"
4. **Transparency:** Clear pricing ranges, honest timelines, straightforward process
5. **Technical credibility:** PortalCam, Gaussian splats, Lixel CyberColor Studio

### Industry-Specific Language
**Real Estate:** "Listings", "Showings", "Remote tours", "Marketing-ready"  
**Tourism/Hospitality:** "Attractions", "Wineries", "Venues", "Virtual exploration"  
**Construction:** "Progress documentation", "RFIs", "Stakeholder updates", "As-built records"  
**Industrial:** "Safety walkthroughs", "Training", "Familiarization", "Compliance"

***

## Technical Specifications

### File Structure
```
/assets/
  /css/
    styles.css (main stylesheet)
  /js/
    intro.js (homepage scroll animation)
  /img/
    /brand/
      splatcap-logo-horizontal.svg

/pages/
  services-9.html
  how-it-works-6.html
  pricing-7.html
  case-studies-3.html
  about-2.html
  contact-4.html
  faq-5.html
  privacy-8.html
  terms-10.html

index.html (homepage with intro animation)
```

### CSS Classes Reference
**Layout:**
- `.container` - max-width wrapper
- `.inner` - main content area with padding
- `.section` - content section with margin-top

**Components:**
- `.industry`, `.plan` - card components
- `.industry-grid`, `.plans` - grid layouts
- `.pill`, `.pill-row` - badge tags
- `.cta-button`, `.cta-button-secondary` - call-to-action buttons

**Typography:**
- `.page-header` - page title section
- `.section-header` - section title with centered text
- `.meta` - subtitle/metadata text
- `.tagline`, `.price`, `.range`, `.note` - pricing card elements

**Navigation:**
- `.site-nav` - header navigation
- `.logo-wrap`, `.logo-img` - logo components
- `.nav-links` - navigation list

**Background:**
- `.bg-video-wrapper`, `.bg-video-iframe`, `.bg-video-overlay` - video background system

**Intro Animation (homepage only):**
- `.intro`, `.intro-inner`, `.intro-layers` - intro section structure
- `.intro-logo-wrap`, `.intro-logo` - animated logo
- `.intro--hidden` - hidden state after scroll

### JavaScript Behavior
**intro.js (homepage only):**
- Detects mobile: `/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768`
- Mobile: Skip intro entirely, show header immediately
- Desktop: Scroll-controlled zoom animation (wheel/keyboard events)
- Locks scroll during intro
- Progress system: 0 (full intro) to 1 (gone)
- Fade out + zoom effect on scroll down

***

## Contact Information
**Email:** hello@immersa3d.com  
**Parent Company:** Drone Services Canada Inc. (droneservicescanadainc.com)  
**Service Area:** All of Canada + International projects  
**Primary Hub:** Greater Toronto & Hamilton Area, Ontario

***

## Key Service Details
**Equipment:** PortalCam (4 cameras + LiDAR)  
**Processing:** Lixel CyberColor Studio, Gaussian splat technology  
**Hosting:** Splat Labs viewer with embeds, access controls, VR support  
**Turnaround:** 24-48 hours typical  
**Capture Speed:** ~15 min per ~3,000 sq ft interior  

**Pricing Tiers:**
- Single-Site Tour: $1,250-$2,250
- Branded Experience: $3,500-$7,500 (most popular)
- Multi-Zone Digital Twin: $10,000-$50,000+

**Hosting Renewals:**
- Basic: $25/month or $249/year
- Pro: Custom quote
- Enterprise: Custom quote

***

## Design Principles Summary
1. **Video-first background** - All pages use full-screen looping video
2. **Transparency layers** - Content floats over video with 75-85% opacity
3. **Cyan accent color** - Used sparingly for CTAs, highlights, headings
4. **Dark sophisticated aesthetic** - Professional, technical, premium feel
5. **Minimal animations** - Only homepage intro zoom, subtle hover effects
6. **Mobile-responsive** - Hides nav on mobile, skips intro animation
7. **Content hierarchy** - Clear visual structure with cards and sections
8. **White space** - Generous padding and gaps for breathing room
9. **Consistent patterns** - Reusable card layouts, grid systems
10. **Technical credibility** - Specific tools, times, measurements throughout