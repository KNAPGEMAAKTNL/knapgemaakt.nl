# MASTER CHECKLIST: Complete A-Z Implementation & Maintenance
## Astro 5 + Cloudflare Pages Local Business Website - Full Process

**Document Purpose**: Single source of truth for implementing and maintaining high-performance, SEO-optimized local business websites. Consolidates all 7 specialized SOPs into one comprehensive checklist with explanations included.

**Total Estimated Time**:
- Initial Build & Launch: 5-7 days
- Post-Launch Monitoring: 1-2 hours/week per client
- Optimization Cycles: 30-60 minutes/month per client

---

# PHASE 1: PRE-PROJECT PLANNING & STRATEGY (Days 1-2)

## 1.1 Strategic Foundation & Decision Making

- [ ] **Understand the Local Entity Model**
  - *Why*: Modern search engines rank entities, not keywords. A local business's "entity" is defined by NAP consistency, structured data validity, review sentiment, and citation authority. Every task below strengthens this entity confidence score.
  - Confirm understanding with team

- [ ] **Confirm Tech Stack Decision: Astro 5 + Cloudflare Pages**
  - *Why*: Static sites deliver 60% Core Web Vitals pass rate vs 38% WordPress. Astro's Zero-JavaScript default eliminates JavaScript bloat. Cloudflare's edge CDN provides <50ms TTFB globally. Cost: €0/month vs €200-800/month for WordPress. Security: no database, no plugins, no attack surface.
  - [ ] Document decision rationale for client handoff
  - [ ] Explain advantage vs WordPress to client

- [ ] **Review Client Business Model**
  - [ ] Is this brick-and-mortar (restaurant, gym) or service-area business (plumber, electrician)?
  - [ ] Confirm target cities/regions for local optimization
  - [ ] Identify primary and secondary service categories
  - [ ] Document current Google Business Profile status

- [ ] **Establish KPI Priorities for Client**
  - Business Outcomes (40%): Phone calls, form submissions, bookings, direction requests
  - Local Visibility (25%): GBP actions, local pack rankings, Share of Local Voice
  - Organic Rankings (20%): Target keyword positions (top 10)
  - Technical Health (15%): Core Web Vitals, uptime, crawl errors
  - Document client expectations

---

# PHASE 2: TECHNICAL ARCHITECTURE & BUILD SETUP (Days 1-3)

## 2.1 Project Initialization & Configuration

- [ ] **Create Astro 5 Project with Correct Configuration**
  ```javascript
  // astro.config.mjs must include:
  - output: 'static'  // Force SSG, no dynamic rendering
  - site: 'https://www.clientdomain.com'  // Absolute domain
  - trailingSlash: 'always'  // Consistent URL structure
  - integrations: [sitemap(), react()]
  - build: { inlineStylesheets: 'auto' }
  - experimental: { responsiveImages: true, clientPrerender: true }
  ```
  - [ ] File created and tested locally
  - [ ] Verified with `npm run build` success

- [ ] **Install Required Dependencies**
  - [ ] @astrojs/react (React 19 for interactive components)
  - [ ] @astrojs/tailwind (Tailwind CSS 4 Oxide engine)
  - [ ] @astrojs/sitemap (Automatic XML sitemap generation)
  - [ ] sharp (Image optimization library)
  - [ ] Check node_modules installed

- [ ] **Configure Tailwind CSS 4 with Oxide Engine**
  - [ ] Create `input.css` with @theme block for Dutch design consistency
  - [ ] Define color palette matching client branding
  - [ ] Set up component layer for reusable styles (buttons, containers, headings)
  - [ ] Test build performance (target: <500ms incremental builds)

- [ ] **Set Up Project Folder Structure**
  ```
  src/
  ├── components/
  │   ├── seo/
  │   │   ├── LocalBusinessSchema.astro
  │   │   ├── FAQSchema.astro
  │   │   ├── BreadcrumbSchema.astro
  │   ├── Islands/
  │   │   ├── ContactForm.tsx
  │   │   ├── ReviewsWidget.tsx
  │   ├── Layout.astro
  ├── content/
  │   ├── config.ts (Zod schemas for content validation)
  │   ├── services/
  │   ├── locations/
  ├── pages/
  ├── public/
  │   ├── _headers (Cloudflare edge configuration)
  │   ├── _redirects (URL redirect rules)
  │   ├── robots.txt (dynamic or static)
  ```
  - [ ] Folder structure created
  - [ ] All core components in place

## 2.2 Content Layer Schema Configuration (Type Safety for SEO)

- [ ] **Define Content Collections with Zod Validation**
  - [ ] Create `src/content/config.ts` with strict schemas
  - [ ] Services collection: title, description, icon, serviceType, content
  - [ ] Locations collection: city, neighborhood, coordinates, localContent
  - [ ] Pages collection: title, description, metaDescription, publishDate, modifiedDate, author
  - **Why**: Astro's Content Layer prevents missing SEO fields. Build fails if required fields missing (title, description, canonical). No accidental 404s or missing meta tags in production.
  - [ ] Run `npx astro check` - must pass with zero errors

- [ ] **Configure Image Service**
  - [ ] Set `image.service` to `sharp` in astro.config.mjs
  - [ ] This enables automatic WebP/AVIF conversion at build time
  - [ ] All images in `src/assets/` (not public/) for optimization
  - [ ] Test: `npm run build` and verify optimized images in `dist/`

## 2.3 Base Layout & Global SEO Infrastructure

- [ ] **Create BaseLayout.astro Component**
  ```astro
  - <meta charset="UTF-8" />
  - <meta name="viewport" content="width=device-width, initial-scale=1" />
  - <meta name="robots" content="index, follow" />
  - Dynamic <title> from props
  - Dynamic <meta name="description" /> from props
  - Self-referencing <link rel="canonical" />
  - <meta property="og:*" /> tags for social sharing
  - Structured data script tags
  - Google Analytics 4 script
  ```
  - [ ] Layout created with all required meta tags
  - [ ] Test on multiple pages: view source shows complete metadata

- [ ] **Create LocalBusinessSchema.astro Component**
  - [ ] Accepts props: name, address, phone, email, hours, geo, areaServed, etc.
  - [ ] Generates valid JSON-LD LocalBusiness schema
  - [ ] For Dutch businesses: Include vatID, identifier (KvK-nummer)
  - [ ] Renders as <script type="application/ld+json">
  - [ ] Validate with https://validator.schema.org/
  - [ ] Test: Schema must validate with zero errors

- [ ] **Create FAQ Schema Component**
  - [ ] Accepts array of { question, answer } pairs
  - [ ] Generates FAQPage schema
  - [ ] Used on service pages (each service gets custom FAQs)
  - [ ] Test: Google Rich Results Test shows eligible for rich results

- [ ] **Create BreadcrumbList Schema Component**
  - [ ] Auto-generates hierarchy from current page path
  - [ ] Shows structure to search engines and users
  - [ ] Test: Breadcrumbs appear in GSC rich results

## 2.4 Navigation & Component Architecture

- [ ] **Create Header/Navigation Component**
  - [ ] Logo with proper sizing and alt text
  - [ ] Primary navigation menu
  - [ ] Mobile-responsive hamburger menu (48x48px minimum tap target)
  - [ ] Contact information (phone clickable with `tel:` link)
  - [ ] Sticky on scroll for accessibility
  - [ ] Accessibility: proper `<nav>` semantic tag, ARIA labels

- [ ] **Create Footer Component with Contact Information**
  - [ ] Business name, address, phone, email prominently displayed
  - [ ] **Legal footer with all required Dutch elements**:
    - [ ] KvK-nummer (Chamber of Commerce registration)
    - [ ] BTW-nummer (VAT number)
    - [ ] Privacy policy link
    - [ ] Terms & conditions link
    - [ ] Verklaring Gegevensbescherming (GDPR compliance statement)
  - [ ] Quick links to services, about, contact
  - [ ] Social media links
  - [ ] Proper semantic HTML: `<footer>`, `<address>` tags

- [ ] **Create Hero Section Component**
  - [ ] H1 with primary keyword + location (required on every page)
  - [ ] Background hero image optimized with `<Image>` component
  - [ ] Primary CTA button (contact, booking, call)
  - [ ] Proper image dimensions (1200x630px recommended, max 100KB)
  - [ ] Image uses `fetchpriority="high"` and `loading="eager"` (LCP optimization)

## 2.5 Interactive Components (React Islands)

- [ ] **Create Contact Form Component (React)**
  - [ ] Use Astro Actions for server-side form handling (not React 19 Server Actions)
  - [ ] Form fields: name, email, message, service type (required)
  - [ ] Client-side validation with Zod schema
  - [ ] Submit with `client:visible` directive (loads only when scrolled into view)
  - [ ] Loading state: `isPending` shows "Sending..." feedback
  - [ ] Success/error messages displayed
  - [ ] **Important**: Hydrate with `client:visible` or `client:idle`, NOT `client:load` (impacts INP)

- [ ] **Create Review Widget Component (Optional Server Island)**
  - [ ] If fetching reviews from external API: use `server:defer`
  - [ ] Static fallback while dynamic reviews load
  - [ ] No layout shift: fallback matches final dimensions
  - [ ] Displays star rating, count, latest reviews

- [ ] **Create Cost Calculator (React, if applicable)**
  - [ ] Interactive estimates for service pricing
  - [ ] Hydrate with `client:visible`
  - [ ] Breaks long computation into <50ms chunks (avoids long tasks)
  - [ ] Shows immediate visual feedback on input

---

# PHASE 3: CONTENT CREATION & OPTIMIZATION (Days 2-4)

## 3.1 Homepage Implementation

- [ ] **Create Homepage (`src/pages/index.astro`)**

  ### Above-Fold Section
  - [ ] Hero section with H1 containing primary keyword + service + location
    - Example: "Emergency Plumber Amsterdam - 24/7 Service Available"
  - [ ] Hero image optimized: <1.5s LCP target
  - [ ] Primary CTA button (phone click, booking, contact form)
  - [ ] Trust signals visible (ratings, years in business, certifications)

  ### Main Content Sections
  - [ ] Who you are / introductory paragraph (100-150 words)
  - [ ] Primary services overview (link to detail pages)
  - [ ] Service areas / geographic coverage
    - For service businesses: list cities served (Amsterdam, Rotterdam, Den Haag, Utrecht)
    - For retail: multiple locations if applicable
  - [ ] Why choose us (3-5 bullet points highlighting differentiation)
  - [ ] Credentials & certifications display
    - KIWA-keurmerk, STEK, VCA, ISO certifications
    - KvK registration visible
    - Years in business
  - [ ] Recent reviews/testimonials showcase (3-5 latest, highest-rated)
    - Include review author name, date, star rating
    - Pull from Google Business Profile via API if available
  - [ ] Team member bios (include credentials for E-E-A-T)
  - [ ] FAQ section with local variations
  - [ ] Local area description (neighborhoods served, landmarks, local context)
    - Example: "Serving all Amsterdam neighborhoods from Centrum to Oost, operating since 1998"
  - [ ] Call-to-action section above fold and before footer

  ### Technical Requirements
  - [ ] Page title: 50-60 characters, includes keyword + location + brand
    - Example: "Emergency Plumber Amsterdam | 24/7 Service | PlumbPro"
  - [ ] Meta description: 140-155 characters, includes CTA
    - Example: "Emergency plumbing in Amsterdam. Fast response, no call charges. Available 24/7. Call 020-123-4567."
  - [ ] Single H1 (verified with Screaming Frog)
  - [ ] H2/H3 hierarchy proper (no skipped levels)
  - [ ] LocalBusiness schema implemented
  - [ ] Images: all have alt text, optimized dimensions, lazy-loaded below fold
  - [ ] Total page size: target <200KB before compression

- [ ] **Homepage Content Length & Keyword Optimization**
  - [ ] Homepage content: minimum 800-1,000 words
  - [ ] Primary keyword in H1, first paragraph, section headers
  - [ ] Natural keyword integration (never keyword stuffing)
  - [ ] Title tag, meta description, internal links all contain primary keyword
  - [ ] Optimize for featured snippet (include direct answers to common questions)

## 3.2 Service Pages Implementation

- [ ] **Create Service Page Template** (e.g., `src/pages/diensten/[service].astro`)
  - [ ] Dynamic page generation from content collection
  - [ ] Each service gets dedicated page with unique content

  ### Service Page Content Structure
  - [ ] H1: "[Service Name] in [City]" (unique per location if using location parameter)
  - [ ] Intro paragraph: 50-60 words, direct answer to primary intent
    - **Why**: LLMs extract first 40-60 words for AI answers
    - Example: "Emergency plumbing in Amsterdam requires immediate professional intervention. We arrive within 30 minutes, diagnose the issue, and provide transparent pricing before beginning repairs. Our 24/7 emergency service has solved thousands of Amsterdam plumbing emergencies over 28 years."
  - [ ] Problem/solution section: Address local pain points
    - Example: "Many older Amsterdam properties built in the 1800s have outdated plumbing that frequently fails..."
  - [ ] Service process breakdown (step-by-step)
  - [ ] Pricing transparency (start price, what's included, mention no call-out charges if applicable)
  - [ ] Service area coverage (neighborhoods, response times)
  - [ ] Credentials & certifications (KIWA, STEK, VCA, years experience)
  - [ ] Local testimonials (reviews from customers in that city/service area)
  - [ ] FAQ section (5-10 questions specific to this service)
  - [ ] Related services (internal links to complementary services)
  - [ ] CTA: phone click, booking link, contact form

  ### Technical Requirements
  - [ ] Page title: 50-60 characters, "[Service] [City] | Brand Name"
  - [ ] Meta description: 140-155 characters, unique per page
  - [ ] Single H1 per page
  - [ ] Content length: 800-1,200 words minimum
  - [ ] 3-5 internal links to homepage, other services, location pages
  - [ ] LocalBusiness schema with this specific service
  - [ ] Service schema (schema.org/Service) if applicable
  - [ ] FAQ schema for questions section
  - [ ] All images: alt text, proper dimensions, <100KB each

## 3.3 Location/Neighborhood Pages (Programmatic SEO)

- [ ] **Create Location Page Template** (e.g., `src/pages/locaties/[city].astro`)
  - [ ] Dynamic generation for each city/neighborhood combination
  - [ ] **Critical**: Each location page must be 60-70% unique content
    - Don't just swap city names - add genuine local context

  ### Unique Content Elements Per Location
  - [ ] Local neighborhood description (landmarks, characteristics)
    - Example: "Amsterdam Oost is characterized by its wide tree-lined streets and proximity to the Ooster Park..."
  - [ ] Local testimonials (reviews from that specific area)
  - [ ] Location-specific team member bios if applicable
  - [ ] Local case studies ("How we helped a hotel in De Pijp")
  - [ ] Neighborhood-specific service variations
    - Example: "Pre-war Amsterdam properties often have narrow access requiring specialized techniques..."
  - [ ] Local landmarks and directions
    - Example: "Located 5 minutes walk from Amsterdam Central Station"
  - [ ] Area-specific opening hours if different by location

  ### Technical Requirements
  - [ ] Page title: "[Service] [Specific Neighborhood], [City] | Brand"
  - [ ] Meta description: Unique, neighborhood-specific
  - [ ] H1: Unique per location, includes neighborhood name
  - [ ] Content: 800-1,200 words minimum, 60-70% unique
  - [ ] NO low-quality location pages (content quality > quantity)
  - [ ] LocalBusiness schema with specific address/coordinates per location
  - [ ] If service-area business: use service area override in GBP for secondary cities

## 3.4 Blog/Resource Pages (Authority Building)

- [ ] **Create High-Authority Blog Posts**
  - [ ] Topics: answering expensive customer questions
    - Example: "Kosten loodgieter Amsterdam 2026: Complete guide"
    - Example: "CV ketel onderhoud: Waarom jaarlijks onderhoud geld bespaart"
  - [ ] Content length: 1,500-2,500 words (authority content)
  - [ ] Include original research or unique insights
  - [ ] Featured snippet optimization (direct answers, lists, tables)
  - [ ] Internal linking to 3-5 service/location pages
  - [ ] Schema: NewsArticle or BlogPosting schema

- [ ] **Content Topics to Cover** (prioritize by search volume)
  - [ ] Pricing guides ("How much does [service] cost in [region]?")
  - [ ] How-to guides ("What to do when [problem occurs]?")
  - [ ] Process explanations (transparency = E-E-A-T signals)
  - [ ] Common mistakes to avoid
  - [ ] Industry changes/updates
  - [ ] Local market analysis (if unique)

## 3.5 About & Team Pages (E-E-A-T Signals)

- [ ] **Create Comprehensive About Page**
  - [ ] Company origin story (when founded, why started)
  - [ ] Mission/values statement
  - [ ] Number of clients served (if significant)
  - [ ] Certifications and memberships prominently displayed
  - [ ] Quality guarantees or promises
  - [ ] Team member bios with photos
    - Include each person's:
      - [ ] Years of experience
      - [ ] Specific certifications/credentials
      - [ ] Specialties
      - [ ] Photo
      - [ ] Author schema with credentials
  - [ ] Trust signals: awards, media mentions, partnerships
  - [ ] Accessibility statement

- [ ] **Create Team Member Detail Pages** (for larger teams)
  - [ ] Individual bios with credentials
  - [ ] Author schema: name, jobTitle, description, credentials, image
  - [ ] Link to main profile from service pages where applicable

## 3.6 Contact & Conversion Pages

- [ ] **Create Contact Page**
  - [ ] Multiple contact methods prominently displayed
    - [ ] Phone (clickable `tel:` link, large font)
    - [ ] Email (clickable `mailto:` link)
    - [ ] Contact form (inline React component)
    - [ ] Address with embedded Google Map
    - [ ] Hours of operation (daily and holiday)
    - [ ] WhatsApp link (increasingly common in Netherlands)
  - [ ] Form fields: name, email, phone, message, service type
  - [ ] Form validation and success feedback
  - [ ] FAQ about response times
  - [ ] Map showing service area or office location
  - [ ] Accessibility: form labels, keyboard navigation

- [ ] **Create Booking/Quote Page** (if applicable)
  - [ ] Interactive cost calculator (React component)
  - [ ] Booking system integration if available
  - [ ] FAQ about booking process

## 3.7 Legal & Compliance Pages

- [ ] **Create Privacy Policy (Privacyverklaring)**
  - [ ] GDPR-compliant (AVG in Dutch law)
  - [ ] Explain data collection and usage
  - [ ] Contact form consent
  - [ ] Google Analytics opt-out option
  - [ ] Cookie policy
  - [ ] Data retention periods

- [ ] **Create Terms & Conditions (Algemene Voorwaarden)**
  - [ ] Payment terms
  - [ ] Cancellation policy
  - [ ] Liability limitations
  - [ ] Dispute resolution

---

# PHASE 4: IMAGE OPTIMIZATION & MEDIA HANDLING

## 4.1 Image Preparation & Optimization

- [ ] **Collect All Images**
  - [ ] Hero images (1200x630px, portrait variations 800x1000px)
  - [ ] Service photos (min 3-5 per service)
  - [ ] Team photos (headshots 300x400px minimum)
  - [ ] Before/after project photos if applicable
  - [ ] Logo files (PNG for web, SVG if available)
  - [ ] Location/landmark photos

- [ ] **Image Quality Standards**
  - [ ] Save all original source files at high quality (1920px width minimum)
  - [ ] Resize to actual display dimensions before optimization
  - [ ] No image >200KB in final output
  - [ ] Use modern formats: WebP for compatibility, AVIF for modern browsers

- [ ] **Optimize Images with Astro <Image> Component**
  - [ ] Store originals in `src/assets/` folder (not public/)
  - [ ] Use Astro's `<Image>` component (automatic WebP/AVIF generation)
  - [ ] Set explicit `width` and `height` attributes
    - **Why**: Prevents Cumulative Layout Shift (CLS), stabilizes layout while image loads
  - [ ] Descriptive alt text in Dutch:
    - Formula: [Descriptive action] + [subject] + [location/context]
    - ✅ Good: "Gecertificeerde Amsterdam loodgieter repareert keukenlek"
    - ❌ Bad: "IMG_1234" or keyword stuffing
  - [ ] Implement proper lazy loading:
    - Above-fold: `loading="eager"` + `fetchpriority="high"`
    - Below-fold: `loading="lazy"` + `decoding="async"`

- [ ] **Image Naming Convention**
  - [ ] Use descriptive names: `amsterdam-plumber-kitchen-leak.webp`
  - [ ] Include primary keyword naturally
  - [ ] NO special characters or spaces (use hyphens)
  - [ ] Lowercase only

---

# PHASE 5: STRUCTURED DATA IMPLEMENTATION

## 5.1 LocalBusiness Schema (Critical)

- [ ] **Implement on Homepage**
  - [ ] Required fields:
    - [ ] @type: LocalBusiness (or specific subtype: Plumber, Dentist, Restaurant)
    - [ ] name: Exact business name (no keyword stuffing)
    - [ ] image: Logo or representative image
    - [ ] address: Full PostalAddress with streetAddress, addressLocality, postalCode, addressRegion
    - [ ] telephone: In E.164 format (+31-20-123-4567)
    - [ ] email: Contact email
    - [ ] url: Website URL (absolute HTTPS)
  - [ ] Recommended fields:
    - [ ] description: Business description (100-150 words)
    - [ ] geo: GeoCoordinates with latitude/longitude
    - [ ] openingHoursSpecification: Day-by-day hours
    - [ ] priceRange: €, €€, €€€, €€€€
    - [ ] areaServed: Cities served (GeoCircle or list of cities)
    - [ ] aggregateRating: If you have reviews (ratingValue, reviewCount)
    - [ ] sameAs: Links to social media profiles
  - [ ] For Dutch businesses specifically:
    - [ ] identifier: KvK-nummer and BTW-nummer as PropertyValue objects
    - [ ] knowsAbout: Array of services offered
  - [ ] Validate with Google Rich Results Test (zero errors required)

- [ ] **Implement on Service Pages**
  - [ ] Service schema: @type = Service
  - [ ] Link back to main LocalBusiness via `provider: { @id: "#organization" }`
  - [ ] Include serviceType, areaServed, offers (with price if available)

- [ ] **Implement on Location Pages** (if applicable)
  - [ ] Separate LocalBusiness schema per location
  - [ ] Unique @id for each location
  - [ ] Specific address per location
  - [ ] If service-area business: use geo coordinates of service center

## 5.2 FAQ Schema Implementation

- [ ] **Create FAQPage Schema for Each Service Page**
  - [ ] Minimum 5-10 questions per service
  - [ ] Questions must match actual content headings
  - [ ] Answers extracted from first 40-60 words of visible content below heading
  - [ ] Use FAQSchema.astro component
  - [ ] **Important**: Content must be visible on page (no hidden schema content)
  - [ ] Validate: Google Rich Results Test should show eligible for FAQ rich results

## 5.3 BreadcrumbList Schema

- [ ] **Implement on All Pages Except Homepage**
  - [ ] Shows page hierarchy to users and crawlers
  - [ ] Auto-generated from page path structure
  - [ ] Validate with Rich Results Test

## 5.4 Other Beneficial Schemas

- [ ] **Author/Person Schema** (for team member pages)
  - [ ] name, jobTitle, description (credentials), image
  - [ ] Educational credentials listed
  - [ ] Improves E-E-A-T signals

- [ ] **Review Schema** (if displaying individual reviews)
  - [ ] author, reviewRating, reviewBody, datePublished
  - [ ] Must match visible review content

- [ ] **Organization Schema** (homepage, footer)
  - [ ] name, logo, sameAs (social links)
  - [ ] Contact information
  - [ ] Helps establish entity in knowledge graph

---

# PHASE 6: CORE WEB VITALS & PERFORMANCE OPTIMIZATION

## 6.1 Largest Contentful Paint (LCP) ≤2.5s Target

- [ ] **Hero Image Optimization (73% of sites have image as LCP element)**
  - [ ] Use `<Image>` component with explicit dimensions
  - [ ] Add `loading="eager"` and `fetchpriority="high"`
  - [ ] Ensure file <100KB after optimization
  - [ ] Use modern format: WebP with AVIF fallback
  - [ ] Resize to actual display dimensions (1200px max width)
  - [ ] Test: PageSpeed Insights should show LCP <1.5s

- [ ] **Font Loading Strategy**
  - [ ] Use system fonts where possible (fastest: -apple-system, BlinkMacSystemFont, segoe ui)
  - [ ] If web fonts needed: preload critical font in `_headers`
    ```
    Link: </fonts/inter.woff2>; rel=preload; as=font; crossorigin
    ```
  - [ ] Use `font-display: swap` to show fallback immediately
  - [ ] Limit to 1-2 font families maximum

- [ ] **Critical CSS Inlining**
  - [ ] Configure `build: { inlineStylesheets: 'auto' }` in astro.config.mjs
  - [ ] This inlines small CSS files in `<head>` to avoid render blocking
  - [ ] CSS for above-fold content loads immediately

- [ ] **JavaScript Deferral**
  - [ ] Use Astro islands pattern: only hydrate interactive components
  - [ ] All static content renders to pure HTML
  - [ ] React components: only use `client:load` for critical above-fold
  - [ ] Use `client:idle` for secondary features
  - [ ] Use `client:visible` for below-fold interactive elements
  - [ ] Test: View page source - main content must be in HTML, not JavaScript

## 6.2 Interaction to Next Paint (INP) ≤200ms Target

- [ ] **Minimize JavaScript Blocking**
  - [ ] Audit all scripts: are they necessary?
  - [ ] Third-party scripts (analytics, chat, reviews) must not block interaction
  - [ ] For Google Tag Manager: implement Partytown (moves GTM to web worker)
  - [ ] All scripts at end of `</body>`, not in `<head>`

- [ ] **React Component Optimization**
  - [ ] Break long computations into <50ms chunks
  - [ ] Use `scheduler.yield()` for non-blocking work
  - [ ] Form submissions: show immediate visual feedback (isPending state)
  - [ ] Use `useActionState` hook for handling server actions

- [ ] **Interaction Patterns**
  - [ ] Button clicks: immediate visual feedback (loading state, hover effect)
  - [ ] Form inputs: validation must respond in <100ms
  - [ ] Mobile: ensure 48x48px minimum tap targets with 8px spacing

## 6.3 Cumulative Layout Shift (CLS) ≤0.1 Target

- [ ] **Image Dimensions**
  - [ ] Every image must have explicit `width` and `height` attributes
  - [ ] Use `aspect-ratio` CSS utility for responsive images
  - [ ] This reserves layout space before image loads

- [ ] **Reserved Space for Dynamic Content**
  - [ ] Maps, iframes, embedded widgets: use `min-height` CSS
  - [ ] Use `contain-intrinsic-size` for `content-visibility: auto`
  - [ ] Placeholder minimum height matches expected final height
  - [ ] Server Islands: fallback dimensions match loaded content

- [ ] **Web Fonts**
  - [ ] Use `font-display: swap` to prevent layout shift when font loads
  - [ ] Avoid system font → web font size changes
  - [ ] Preload critical fonts: `<link rel="preload" as="font">`

- [ ] **Ads & Third-Party Widgets**
  - [ ] Reserve fixed height for any ads or widgets
  - [ ] Load asynchronously after initial render
  - [ ] Never allow dynamic injection of ads mid-page

## 6.4 Overall Performance Score ≥90 Target

- [ ] **Build Optimization**
  - [ ] Tailwind CSS 4 Oxide engine: <500ms build times
  - [ ] Code splitting: lazy load heavy components
  - [ ] Tree-shaking: unused code eliminated from bundle
  - [ ] Test: `npm run build` completes <1 min

- [ ] **Image Optimization**
  - [ ] Astro `<Image>` handles all optimization
  - [ ] All images use modern formats (WebP minimum, AVIF where supported)
  - [ ] Responsive images: multiple widths via `sizes` attribute
  - [ ] Total images payload <500KB for typical page

- [ ] **CSS Optimization**
  - [ ] Tailwind purges unused styles automatically
  - [ ] No inline styles (use utility classes)
  - [ ] CSS-in-JS: avoided (use Tailwind only)
  - [ ] Test: CSS file <15KB gzipped

- [ ] **JavaScript Optimization**
  - [ ] Islands architecture: zero JS for static content
  - [ ] React components: only shipped if `client:*` directive
  - [ ] Test: JavaScript <50KB for typical local business site

---

# PHASE 7: CLOUDFLARE PAGES DEPLOYMENT SETUP

## 7.1 Project Structure for Deployment

- [ ] **Create public/_headers File** (Cloudflare edge configuration)
  ```
  # Global security headers
  /*
    Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: geolocation=(), camera=(), microphone=()

  # Aggressive caching for hashed assets (1 year)
  /_astro/*
    Cache-Control: public, max-age=31536000, immutable

  /fonts/*
    Cache-Control: public, max-age=31536000, immutable

  # Images cache (30 days)
  /images/*
    Cache-Control: public, max-age=2592000

  # HTML pages: validate on each visit
  /
    Cache-Control: public, max-age=0, must-revalidate

  # Prevent pages.dev indexing (keep SEO on custom domain)
  https://:project.pages.dev/*
    X-Robots-Tag: noindex
  ```
  - [ ] File created and verified

- [ ] **Create public/_redirects File** (Permanent URL redirects)
  ```
  # Old page redirects (if migrating from WordPress)
  /old-url /new-url 301
  /contact-us /contact 301

  # Trailing slash normalization (if using trailingSlash: 'never')
  /about/ /about 301
  ```
  - [ ] File created with any necessary redirects
  - [ ] Test: manual redirect verification
  - [ ] Limit: 2,000 static redirects maximum

- [ ] **Create public/robots.txt** (unless using dynamic generation)
  ```
  User-agent: *
  Allow: /

  # Allow AI crawlers
  User-agent: GPTBot
  Allow: /

  User-agent: PerplexityBot
  Allow: /

  User-agent: ClaudeBot
  Allow: /

  Sitemap: https://yourdomain.com/sitemap-index.xml
  ```
  - [ ] File created
  - [ ] Verify at /robots.txt path

## 7.2 Cloudflare Pages Integration

- [ ] **Connect GitHub Repository**
  - [ ] Push Astro project to GitHub
  - [ ] Cloudflare Pages: create new project
  - [ ] Select GitHub repository
  - [ ] Build command: `npm run build`
  - [ ] Build output: `dist`

- [ ] **Environment Variables** (if applicable)
  - [ ] Database connection strings (encrypted)
  - [ ] API keys (encrypted)
  - [ ] Site URL (environment-specific)
  - [ ] Set in Cloudflare Pages dashboard

- [ ] **Deployment Settings**
  - [ ] Production branch: `main` (or `master`)
  - [ ] Preview deployments: enabled
  - [ ] Build timeout: 20 minutes (sufficient for large sites)
  - [ ] Test deployment succeeds

## 7.3 Custom Domain Configuration

- [ ] **Add Custom Domain**
  - [ ] Workers & Pages → Project → Custom domains
  - [ ] Add apex domain (example.com) and www subdomain
  - [ ] Verify DNS: Cloudflare auto-creates CNAME records if DNS hosted there
  - [ ] SSL certificate: auto-provisioned within 15 minutes

- [ ] **Verify HTTPS & Security**
  - [ ] Visit https://yourdomain.com (padlock icon visible)
  - [ ] SSL/TLS setting: Full (strict) in Cloudflare
  - [ ] HSTS headers present: `curl -I https://yourdomain.com` shows `Strict-Transport-Security`
  - [ ] No mixed content warnings in browser console

---

# PHASE 8: PRE-LAUNCH TECHNICAL AUDIT & TESTING (Days 5-6)

## 8.1 Crawlability & Indexing Audit (Screaming Frog)

- [ ] **Configure Screaming Frog**
  - [ ] Download from screamingfrog.co.uk (free version)
  - [ ] Settings → Crawl: User-Agent = "Googlebot"
  - [ ] Rendering: "Text Only" for SSG (no JavaScript rendering needed)
  - [ ] Window size: 411x731 (mobile emulation)

- [ ] **Run Full Site Crawl**
  - [ ] Crawl entire site from homepage
  - [ ] Export results to CSV for analysis
  - [ ] Analyze by status code:
    - [ ] **200 OK**: Verify all indexable content
    - [ ] **301 redirects**: Intentional? Update internal links to final URL
    - [ ] **302 redirects**: Convert to 301 if permanent
    - [ ] **404 errors**: Fix broken links immediately (critical blocker)
    - [ ] **5xx errors**: Debug server issues

  - [ ] **Title Tag Analysis**
    - [ ] Verify every page has unique title 30-60 characters
    - [ ] Identify duplicates: `Title > Duplicate`
    - [ ] Identify missing: `Title > Missing`

  - [ ] **H1 Analysis**
    - [ ] Every page must have exactly ONE H1
    - [ ] Filter: `H1 > Missing` and `H1 > Multiple`
    - [ ] All H1s must contain primary keyword
    - [ ] H1 different from title tag (but related)

  - [ ] **Meta Description Analysis**
    - [ ] Every page must have unique description 70-155 characters
    - [ ] Filter: `Meta Description > Duplicate` and `Meta Description > Missing`

  - [ ] **Images Optimization**
    - [ ] Filter: `Images > Missing Alt Text`
    - [ ] Every informative image must have descriptive alt text
    - [ ] Filter images by file size: `Images > Size`
    - [ ] No image >100KB

  - [ ] **Canonicals**
    - [ ] Every page must have self-referencing canonical
    - [ ] Directives tab: verify canonical URLs
    - [ ] No canonical pointing to 404 or wrong page

  - [ ] **Internal Links**
    - [ ] Check for orphan pages (in sitemap but not linked from any page)
    - [ ] Every page should have 2-3 internal links
    - [ ] Anchor text should be descriptive (not "click here")

- [ ] **Fix All Critical Issues**
  - [ ] 404s and 500s: blocker, must fix today
  - [ ] Missing H1, title, meta description: must fix today
  - [ ] Duplicate titles/descriptions: fix within 24 hours
  - [ ] Missing alt text: fix within 24 hours
  - [ ] Orphan pages: add internal links or remove

## 8.2 Core Web Vitals Testing (PageSpeed Insights & Lighthouse)

- [ ] **Test Homepage Mobile Performance**
  - [ ] Visit pagespeed.web.dev
  - [ ] Enter production URL
  - [ ] Test mobile version (primary)
  - [ ] Review four scores:
    - [ ] **Performance** score: must be ≥70 for launch, target ≥90
    - [ ] **Accessibility** score: must be ≥90
    - [ ] **Best Practices** score: must be ≥90
    - [ ] **SEO** score: must be ≥90

  - [ ] **Core Web Vitals Metrics**
    - [ ] **LCP (Largest Contentful Paint)**: target <2.5s, ideally <1.5s
    - [ ] **INP (Interaction to Next Paint)**: target <200ms
    - [ ] **CLS (Cumulative Layout Shift)**: target <0.1

  - [ ] **Performance Score Composition**
    - [ ] Total Blocking Time (TBT): 30% weight
    - [ ] Largest Contentful Paint: 25% weight
    - [ ] Cumulative Layout Shift: 15% weight
    - [ ] First Contentful Paint: 10% weight
    - [ ] Speed Index: 10% weight

  - [ ] **Address Any Red Flags**
    - [ ] LCP >2.5s: Optimize hero image, defer non-critical CSS
    - [ ] INP >200ms: Reduce JavaScript, defer third-party scripts
    - [ ] CLS >0.1: Add image dimensions, reserve space for dynamic content
    - [ ] Large images: Re-optimize, use modern formats
    - [ ] Unused JavaScript: Remove or lazy-load components

- [ ] **Test Desktop Performance** (secondary, target ≥95)
  - [ ] Must achieve ≥80 score minimum
  - [ ] Desktop usually faster than mobile (simpler task)

- [ ] **Test Key Pages**
  - [ ] Homepage
  - [ ] 3-5 service/location pages (representative sample)
  - [ ] Contact page
  - [ ] Blog post (if applicable)
  - [ ] Document all results

## 8.3 Chrome DevTools Lighthouse (Local Testing)

- [ ] **Run Lighthouse Locally**
  - [ ] DevTools (F12) → Lighthouse tab
  - [ ] Select: Performance, Accessibility, Best Practices, SEO
  - [ ] Device: Mobile (primary)
  - [ ] Throttling: Simulated 4G
  - [ ] Run 3 times and average results (variance expected)

- [ ] **Compare DevTools vs PageSpeed Insights**
  - [ ] DevTools uses local machine performance (may differ from PSI)
  - [ ] PSI uses real Chrome data (more reliable for ranking signals)
  - [ ] Focus on PSI results for launch decision

## 8.4 Structured Data Validation

- [ ] **Validate All Schema Markup**
  - [ ] Visit https://search.google.com/test/rich-results
  - [ ] Enter homepage URL
  - [ ] Results: "Page is eligible for rich results" (success)
  - [ ] Errors: Must fix immediately (blocker)
  - [ ] Warnings: Fix before launch if possible

- [ ] **Alternative Validation: Schema.org Validator**
  - [ ] Visit https://validator.schema.org/
  - [ ] Check broader schema correctness beyond Google's specific needs
  - [ ] Zero critical errors required

- [ ] **Validate on Key Page Types**
  - [ ] Homepage: LocalBusiness schema
  - [ ] Service page: LocalBusiness + Service + FAQ schema
  - [ ] Location page: LocalBusiness schema with specific address

## 8.5 Mobile Responsiveness & Accessibility Testing

- [ ] **Mobile Responsiveness**
  - [ ] Chrome DevTools device toolbar (Ctrl+Shift+M)
  - [ ] Test at: iPhone SE (375px), iPhone 12 Pro (390px), iPad (768px)
  - [ ] Check:
    - [ ] No horizontal scrolling
    - [ ] Text readable without zoom
    - [ ] Buttons/links: 48x48px minimum tap targets
    - [ ] Navigation menu: functional on mobile
    - [ ] Images: responsive and scaled appropriately

- [ ] **Accessibility Testing**
  - [ ] **Lighthouse Accessibility**: Run in DevTools, must be ≥90 for launch
  - [ ] **WAVE Browser Extension**: Wave.webaim.org, zero red errors
  - [ ] **axe DevTools**: DevTools tab, zero critical issues
  - [ ] **Manual keyboard navigation**:
    - [ ] Press Tab through entire page
    - [ ] All interactive elements reachable
    - [ ] No keyboard traps
    - [ ] Focus indicators visible
    - [ ] Escape key closes modals
  - [ ] **Color contrast**: Minimum 4.5:1 for normal text (WCAG AA)
  - [ ] **Form labels**: Every input has associated `<label>`
  - [ ] **Heading hierarchy**: No skipped levels, single H1

## 8.6 Security & Headers Validation

- [ ] **Verify HTTPS & Redirects**
  - [ ] `curl -I https://domain.com` shows 200 OK with HTTPS
  - [ ] `curl -I http://domain.com` redirects to HTTPS (301)

- [ ] **Validate Security Headers** (securityheaders.com)
  - [ ] `Strict-Transport-Security`: Present (HSTS)
  - [ ] `X-Frame-Options: DENY`: Prevents clickjacking
  - [ ] `X-Content-Type-Options: nosniff`: Prevents MIME sniffing
  - [ ] `Content-Security-Policy`: Defined (or at minimum `default-src 'self'`)
  - [ ] `Referrer-Policy`: Present (typically `strict-origin-when-cross-origin`)
  - [ ] Target: A+ rating on securityheaders.com

- [ ] **Verify Cloudflare Settings**
  - [ ] SSL/TLS: Full (strict)
  - [ ] Always Use HTTPS: ON
  - [ ] Brotli compression: ON (automatic)
  - [ ] Early Hints (103): Enabled for preload hints
  - [ ] HTTP/3 (QUIC): Enabled (automatic)

## 8.7 Functional Testing Checklist

- [ ] **Forms**
  - [ ] Contact form: successfully submits
  - [ ] Validation: shows error messages for invalid input
  - [ ] Success: displays confirmation message
  - [ ] Submission logging: verify data received (check email or backend)

- [ ] **Links**
  - [ ] Internal links: navigate without errors
  - [ ] External links: open correctly (new tab if `target="_blank"`)
  - [ ] Anchor links: scroll to correct section
  - [ ] `tel:` links: click-to-call works on mobile
  - [ ] `mailto:` links: open email client
  - [ ] Maps link: opens directions

- [ ] **Contact Information**
  - [ ] Phone number visible on every page (header/footer)
  - [ ] Phone number clickable on mobile
  - [ ] Email visible and clickable
  - [ ] Address displayed with map
  - [ ] Hours of operation shown

- [ ] **Images**
  - [ ] All images load correctly
  - [ ] Images responsive on mobile
  - [ ] No broken image icons
  - [ ] Alt text provides meaningful descriptions

---

# PHASE 9: LAUNCH PREPARATION & FINAL CHECKS (Day 6)

## 9.1 Google Search Console Setup

- [ ] **Property Verification** (DNS method recommended)
  - [ ] search.google.com/search-console
  - [ ] Add property → Domain
  - [ ] Enter domain (example.com, no protocol)
  - [ ] Copy TXT verification record
  - [ ] In Cloudflare DNS: Add TXT record with Google's value
  - [ ] Wait 1-5 minutes for DNS propagation
  - [ ] Verify in GSC (usually succeeds within 5 minutes)

- [ ] **Post-Verification Configuration**
  - [ ] Submit XML sitemap: `Sitemaps → Add sitemap → sitemap-index.xml`
  - [ ] Inspect homepage URL: request indexing
  - [ ] Enable email notifications: Settings → Email preferences
  - [ ] Verify robots.txt: Settings → robots.txt report (should show no errors)
  - [ ] Screenshot current index state: Indexing → Pages (baseline)

## 9.2 Google Analytics 4 Setup

- [ ] **Install Measurement ID**
  - [ ] GA4 measurement code in BaseLayout.astro
  - [ ] Test: DevTools → Network tab, filter "gtag"
  - [ ] Real-time dashboard should show current activity
  - [ ] Verify: GA4 properties settings configured correctly

- [ ] **Configure Conversion Events**
  - [ ] Phone click (tel: link click)
  - [ ] Form submission (contact form, booking, quote)
  - [ ] Email click (mailto: link)
  - [ ] Direction click (maps link)
  - [ ] These must be marked as "conversions" in GA4 settings

- [ ] **Create Looker Studio Dashboard** (optional)
  - [ ] Connect GA4 data source
  - [ ] Show: organic traffic, conversions, engagement rate
  - [ ] Setup for automated monthly reporting

## 9.3 Uptime Monitoring Setup

- [ ] **Configure UptimeRobot** (free tier: 50 monitors)
  - [ ] uptimerobot.com account
  - [ ] Create monitor: HTTP(s) type
  - [ ] URL: https://yourdomain.com
  - [ ] Monitoring interval: 5 minutes
  - [ ] Alert recipients: your email + client email
  - [ ] Alert: down, flaky, SSL expiring

## 9.4 Final Pre-Launch Checklist

- [ ] **Critical Blockers (Must be 100% complete)**
  - [ ] HTTPS enabled (padlock visible)
  - [ ] Site crawlable (no global noindex)
  - [ ] robots.txt valid
  - [ ] Every page: unique H1, unique title, unique meta description
  - [ ] Canonical tags on all pages
  - [ ] XML sitemap valid
  - [ ] Mobile responsive (no horizontal scroll)
  - [ ] No broken internal links (404s fixed)
  - [ ] LCP ≤2.5s (preferably <1.5s)
  - [ ] All P0 issues from Screaming Frog fixed

- [ ] **High Priority (Must fix before launch)**
  - [ ] All images: alt text, proper dimensions, <100KB
  - [ ] LocalBusiness schema: zero validation errors
  - [ ] Contact information: prominently visible
  - [ ] Forms functional (if applicable)
  - [ ] Core Web Vitals: INP ≤200ms, CLS ≤0.1
  - [ ] PageSpeed mobile score ≥70 (target ≥90)
  - [ ] Accessibility score ≥90
  - [ ] All meta descriptions present and unique

- [ ] **Medium Priority (Fix within 1 week post-launch)**
  - [ ] FAQ schema implemented on service pages
  - [ ] Internal linking optimized
  - [ ] Security headers: A+ rating
  - [ ] Open Graph tags for social sharing
  - [ ] TTFB <800ms

---

# PHASE 10: LAUNCH DAY (Day 7)

## 10.1 Final Verification (2 hours before launch)

- [ ] **Run Final PageSpeed Test**
  - [ ] Homepage: screenshot scores
  - [ ] Document baseline: LCP, INP, CLS, performance score
  - [ ] Review any last-minute regressions

- [ ] **Verify All Links Work**
  - [ ] Homepage internal links (services, about, contact)
  - [ ] Navigation menu
  - [ ] Footer links (privacy, terms)
  - [ ] Contact information (tel, email, address)

- [ ] **Test Forms**
  - [ ] Contact form: submit test message
  - [ ] Verify email received
  - [ ] Check success message displayed

- [ ] **Check Search Console**
  - [ ] Property verified
  - [ ] Sitemap submitted
  - [ ] Homepage inspection shows indexing ready
  - [ ] Robots.txt accessible

- [ ] **Verify GA4 Tracking**
  - [ ] Real-time view shows current activity
  - [ ] Conversion events firing correctly

- [ ] **Monitor Uptime**
  - [ ] UptimeRobot shows site UP
  - [ ] No alerts in past 2 hours

## 10.2 Go-Live Actions

- [ ] **Confirm Production Environment Ready**
  - [ ] robots.txt: Allow rules active (no Disallow on production)
  - [ ] Environment variables: production values set
  - [ ] Database/API connections: production URLs
  - [ ] Email notifications: configured to client

- [ ] **Verify SSL Certificate**
  - [ ] Cloudflare dashboard: certificate issued
  - [ ] Browser: padlock icon visible
  - [ ] HSTS header present

- [ ] **First Indexing Request**
  - [ ] GSC → URL Inspection → homepage URL
  - [ ] Click "Request Indexing"
  - [ ] Wait for response (usually <24 hours)

- [ ] **Document Baseline Metrics**
  - [ ] Take screenshots of:
    - [ ] PageSpeed Insights scores
    - [ ] GSC coverage (0 pages indexed initially)
    - [ ] GA4 real-time view
    - [ ] UptimeRobot status
  - [ ] Create launch report document

## 10.3 Post-Launch Communication

- [ ] **Notify Client**
  - [ ] Website live at production URL
  - [ ] Provide baseline performance metrics
  - [ ] Explain next steps (Google indexing takes 24-48 hours)
  - [ ] Provide contact information for issues
  - [ ] Schedule kickoff call for ongoing maintenance

- [ ] **Internal Documentation**
  - [ ] Update project wiki with launch date
  - [ ] Document any deviations from standard process
  - [ ] Update SOP if any improvements identified

---

# PHASE 11: ONGOING MONITORING & OPTIMIZATION (Post-Launch)

## 11.1 Daily Monitoring (10-15 minutes total, batched across all clients)

- [ ] **Automated Alerts Check** (every morning)
  - [ ] Review UptimeRobot email alerts
  - [ ] Check GSC email notifications for critical issues
  - [ ] Scan Semrush Sensor for algorithm volatility
  - [ ] Review GBP notifications for new reviews

- [ ] **Action Thresholds**
  - [ ] Site downtime: immediate investigation
  - [ ] Manual action/penalty in GSC: same-day response
  - [ ] New reviews: respond within 24-48 hours

## 11.2 Weekly Tasks (1.5-2 hours per client, batched)

- [ ] **Keyword Ranking Check** (5 min per client)
  - [ ] GSC Performance → Queries sorted by impressions
  - [ ] Note top keywords and positions
  - [ ] Flag any significant drops (>5 positions)
  - [ ] Compare to previous week

- [ ] **Traffic Anomaly Review** (5 min per client)
  - [ ] GA4 dashboard: organic traffic trend
  - [ ] Check for unexpected drops (>20% = investigate)
  - [ ] Compare to previous week baseline

- [ ] **GBP Insights Scan** (5 min per client)
  - [ ] Views, website clicks, direction requests, calls
  - [ ] Actions stable or growing month-over-month
  - [ ] Flag any significant drops

- [ ] **Local Pack Positioning** (5 min per client)
  - [ ] Check local rankings for primary keywords
  - [ ] Use BrightLocal or Local Falcon for automated tracking
  - [ ] Target: top 3 for primary service + location keywords

- [ ] **Competitor Quick-Check** (10 min rotating)
  - [ ] Sample 3-5 competitors each week
  - [ ] Check if any competitors ranking in positions you don't cover
  - [ ] Note any new content from competitors

## 11.3 Monthly Optimization Sprint (20-30 minutes per client)

- [ ] **Generate Monthly Client Report**
  - [ ] Create from template Looker Studio dashboard
  - [ ] Manual additions: 3-5 key insights
  - [ ] Export PDF and email to client
  - [ ] Report structure:
    - [ ] Page 1: Executive summary (traffic, conversions, top wins)
    - [ ] Page 2: Detailed metrics (rankings, GBP analytics, CWV)
    - [ ] Page 3: Work completed + next steps

- [ ] **GSC Index Coverage Review** (5 min)
  - [ ] Check Pages report: any new indexing issues?
  - [ ] Note excluded pages (should match intentional noindex/canonical)
  - [ ] Verify server errors count: should be zero

- [ ] **Content Performance Audit** (10 min)
  - [ ] GSC Queries + Pages: identify underperforming content
  - [ ] Flag pages with:
    - [ ] >200 impressions, <2% CTR (title/meta optimization)
    - [ ] Position 11-20, high volume (content depth opportunity)
    - [ ] >20% traffic decline MoM (content decay)
  - [ ] Create prioritized content refresh list (ICE scoring)

- [ ] **Core Web Vitals Check** (5 min)
  - [ ] PageSpeed Insights: check "Good" threshold maintenance
  - [ ] Any "Poor" metrics: immediate investigation and fix
  - [ ] CrUX historical data: verify trends

- [ ] **Backlink Profile Review** (5 min)
  - [ ] GSC Links report: any new high-quality links?
  - [ ] Linkody or similar: significant lost links?
  - [ ] Generally: backlinks stable or growing
  - [ ] Very rarely: identify toxic links (only disavow if manual penalty)

- [ ] **Technical Health Scan** (10 min)
  - [ ] Screaming Frog crawl (<500 URLs for free version)
  - [ ] Check for:
    - [ ] New 404s or 500s
    - [ ] Redirect chains or loops
    - [ ] Missing titles or H1s
    - [ ] Missing alt text
    - [ ] Orphaned pages

- [ ] **GBP Optimization** (10 min)
  - [ ] Post one Google Update/Offer/Event
  - [ ] Upload 1-2 new photos
  - [ ] Review and update business hours
  - [ ] Check Q&A for new questions (note: API discontinued Nov 2025)
  - [ ] Respond to all reviews: target <24-48 hours
  - [ ] Monitor review velocity: goal 1+ new/month

## 11.4 Quarterly Deep-Dive (1.5-2 hours per client, rotating schedule)

- [ ] **Comprehensive Competitor Analysis** (45 min)
  - [ ] Identify 3-5 direct competitors in local pack
  - [ ] Keyword gap: keywords competitors rank for, you don't
  - [ ] Content gap: topics competitors cover, you don't
  - [ ] Backlink gap: referring domains difference
  - [ ] GBP comparison: review count, rating, post frequency
  - [ ] Create action plan from gaps (highest impact first)

- [ ] **Complete Technical Audit** (30 min)
  - [ ] Full-site Screaming Frog crawl
  - [ ] Schema validation: all schema valid in Rich Results Test
  - [ ] Crawl errors/issues: document and prioritize fixes
  - [ ] Performance: PageSpeed Insights for sample pages

- [ ] **Content Strategy Review** (30 min)
  - [ ] Content decay detection: pages losing traffic/rankings
  - [ ] New opportunity identification: gap analysis from competitors
  - [ ] Cannibalization audit: multiple pages ranking for same query
  - [ ] Create 3-month content calendar with priorities

- [ ] **Local Citation Audit** (15 min)
  - [ ] NAP consistency check: 10+ major directories
  - [ ] Correct inconsistencies found
  - [ ] Target: 100% consistency score

- [ ] **Strategy Call with Client** (30 min)
  - [ ] Review quarterly findings
  - [ ] Present recommendations
  - [ ] Discuss any significant changes
  - [ ] Align on next quarter priorities

## 11.5 Prioritization Framework (ICE Scoring)

**Formula**: (Impact × Confidence × Effort) / 3 = Priority Score

| Factor | 1 | 2 | 3 | 4 | 5 |
|--------|---|---|---|---|---|
| **Impact** | Minimal effect | | Medium | | Major traffic/conversion |
| **Confidence** | Speculation | | Proven approach | | Very high certainty |
| **Effort** | 1+ weeks | | Medium | | <1 hour |

**Examples**:
- Fix 10 broken internal links: Impact 3, Confidence 5, Effort 5 = **4.3** (Quick Win)
- Optimize title tags for CTR: Impact 4, Confidence 4, Effort 4 = **4.0** (Quick Win)
- Create new service page: Impact 5, Confidence 3, Effort 2 = **3.3** (Strategic)
- Improve page speed: Impact 4, Confidence 4, Effort 2 = **3.3** (Strategic)
- Build local citations: Impact 3, Confidence 4, Effort 3 = **3.3** (Standard)

## 11.6 Multi-Client Triage Matrix

**P1 - Critical** (respond within 24 hours):
- [ ] Site down/not indexing
- [ ] Manual penalty in GSC
- [ ] Massive traffic drop (>50%)
- [ ] GBP suspension

**P2 - High** (address within 1 week):
- [ ] Significant ranking drops (top 3 → page 2)
- [ ] Technical errors affecting crawling
- [ ] Core Web Vitals moved to "Poor"

**P3 - Medium** (address within 2 weeks):
- [ ] Moderate ranking fluctuations
- [ ] Content optimization opportunities
- [ ] Citation inconsistencies
- [ ] Lost valuable backlinks

**P4 - Low** (monthly maintenance):
- [ ] Minor technical tweaks
- [ ] Proactive improvements
- [ ] Competitive monitoring updates

## 11.7 Algorithm Update Response Procedures

- [ ] **Monitor Sources** (daily during volatility)
  - [ ] Google Search Status Dashboard (status.search.google.com)
  - [ ] Semrush Sensor (track SERP volatility score)
  - [ ] MozCast (Google algorithm stability)
  - [ ] Search Engine Land/Journal (official announcements)

- [ ] **Impact Assessment**
  - [ ] Traffic drop? How much? Which pages/keywords?
  - [ ] Ranking drops? Which keywords? From where to where?
  - [ ] Use matrix to determine severity:
    - [ ] <5% traffic drop + <3 position drop: Monitor
    - [ ] 5-15% + 3-10 positions: Enhanced monitoring
    - [ ] 15-30% + 10-20 positions: Root cause analysis
    - [ ] >30% + >20 positions: Critical recovery

- [ ] **Response Strategies by Update Type**
  - [ ] **Core updates**: Audit E-E-A-T signals, remove thin content, wait 4-6 months for next update
  - [ ] **Helpful content**: Rewrite AI-generated/low-value content with genuine expertise
  - [ ] **Local search updates**: Optimize GBP completeness, ensure NAP consistency, accelerate reviews
  - [ ] **Spam updates**: Run security check, remove low-quality content, disavow toxic links if manual penalty

---

# PHASE 12: SPECIALIZED OPTIMIZATIONS FOR 2025-2026

## 12.1 AI Search Visibility Tracking

- [ ] **Monitor AI Overview Appearance**
  - [ ] AI Overviews appear in 40% of local business queries
  - [ ] Manual testing: Search queries in ChatGPT, Google AI Overviews, Perplexity
  - [ ] Document: Which queries trigger AI Overviews? Are you cited?
  - [ ] Tools: SE Ranking (AI Tracker), Surfer AI Tracker, Writesonic GEO

- [ ] **Optimize for Zero-Click Queries**
  - [ ] 64% of Google searches now end without click
  - [ ] Success metric: Brand Imprinting (user remembers your business even without click)
  - [ ] Include business name naturally in key content sections
  - [ ] Embed brand in benefit statements
  - [ ] Answer questions directly in first 40-60 words

## 12.2 Answer Engine Optimization (AEO)

- [ ] **Structure Content for LLM Extraction**
  - [ ] Direct answer in H2 heading + first paragraph
  - [ ] 40-60 word initial answer (what LLMs cite)
  - [ ] Detailed explanation follows
  - [ ] Examples and evidence below
  - [ ] Format: FAQ, lists, tables where applicable

- [ ] **Implement Speakable Schema**
  - [ ] For FAQ pages: mark sections suitable for text-to-speech
  - [ ] CSS selectors identify specific text for audio playback
  - [ ] Improves voice search and audio feature visibility

## 12.3 Voice Search Optimization

- [ ] **Voice Search Prevalence**: 76% of voice searches are local
  - [ ] "Near me" queries
  - [ ] "Find a [service] in [city]"
  - [ ] "What's the best [service] around me?"

- [ ] **Optimization Tactics**
  - [ ] Conversational content: natural language, question-based headers
  - [ ] Direct answers to common voice questions
  - [ ] Long-tail conversational keywords
  - [ ] Local context: include city/neighborhood names naturally
  - [ ] "Open now" status important for voice results
  - [ ] Mobile-first page experience (voice devices typically mobile)

## 12.4 Creating Original Research Content

- [ ] **High-Value Authority Building**
  - [ ] Original research outperforms all other content for AI citations
  - [ ] AI systems favor first-party data
  - [ ] Consistency: highest CTR and social shares

- [ ] **Research Ideas for Local Businesses**
  - [ ] Customer survey: local service preferences, challenges, trends
  - [ ] Anonymized service data: common issues, success rates, seasonal patterns
  - [ ] Local market analysis: pricing trends, demand patterns, service gaps
  - [ ] Industry benchmarking: your metrics vs national averages

- [ ] **Publication Process**
  - [ ] Conduct survey: target 100+ responses
  - [ ] Create visualizations: charts, graphs, data tables
  - [ ] Publish with methodology: explain how data was collected
  - [ ] Update annually for freshness
  - [ ] Expected result: 10+ backlinks and 5+ AI citations within 6 months

---

# PHASE 13: ONGOING MAINTENANCE & SERVICE DELIVERY

## 13.1 Monthly Service Delivery for €49/month Model

**Time Budget**: 50 minutes per client per month = €55/hour effective rate at scale

| Activity | Time | Cost-Benefit |
|----------|------|--------------|
| Monitoring & alerts | 15 min | Prevent disasters |
| Reporting | 20 min | Client satisfaction |
| Maintenance tasks | 35 min | Grow visibility |
| Strategic optimization | 10 min | Compound improvement |
| **Total** | **50-80 min** | **€44-46 profit** |

## 13.2 Content Refresh Calendar

| Frequency | Task | Duration | Examples |
|-----------|------|----------|----------|
| **Weekly** | Review GSC data for opportunities | 10 min | Flag underperforming pages, rank changes |
| **Monthly** | Refresh homepage/service pages | 20 min | Update testimonials, statistics, dates |
| **Quarterly** | Major content refresh | 60 min | Deep content update, add new case studies |
| **Annually** | Complete content audit | 120 min | Identify all stale/outdated content |

## 13.3 Review Management SOP

- [ ] **Review Response Workflow**
  - [ ] Target: respond to ALL reviews within 24-48 hours
  - [ ] **Positive review template**:
    - [ ] Thank by name
    - [ ] Reference specific detail from review
    - [ ] Mention location/service area naturally
    - [ ] Invite return visit
    - [ ] Keep under 200 characters

  - [ ] **Negative review template**:
    - [ ] Respond within 24 hours (critical for recovery)
    - [ ] Acknowledge issue, apologize sincerely
    - [ ] Offer to resolve offline (provide contact)
    - [ ] Stay professional, avoid defensiveness
    - [ ] Follow up internally if systemic issue
    - [ ] Keep under 300 characters

- [ ] **Review Generation Campaign**
  - [ ] SMS most effective: highest conversion (immediate, personal)
  - [ ] Email secondary: good conversion (broader reach)
  - [ ] QR code: at point of sale (medium conversion)
  - [ ] Goal: 1+ new review per month minimum
  - [ ] Strategy: consistent velocity > big spikes (Google detects unnatural spikes)

## 13.4 Social Media & GBP Post Schedule

- [ ] **Google Business Profile Posts** (weekly, 10-15 min)
  - [ ] 1 post per week (3-4 weekly optimal)
  - [ ] Post types: 30% promotional, 30% educational, 20% behind-scenes, 20% community
  - [ ] Optimal timing: Tuesday-Wednesday, 10 AM - 2 PM
  - [ ] Include CTA buttons when applicable
  - [ ] Monitor engagement metrics (views, clicks)

- [ ] **Content Ideas**
  - [ ] Updates: New service offering, team member, office changes
  - [ ] Offers: Seasonal promotions, discounts, bundles
  - [ ] Events: Workshops, community involvement, sponsorships
  - [ ] Behind-the-scenes: Team at work, preparation, customer stories
  - [ ] Educational: Tips, how-to guides, local insights

## 13.5 Common Maintenance Scenarios & SOPs

### SOP: New Client Onboarding
**Day 1** (2-3 hours):
1. Gain access: GSC, GA4, GBP, Cloudflare, hosting
2. Add to monitoring: UptimeRobot, rank tracking, analytics
3. Baseline audit: PageSpeed, Screaming Frog, GSC health
4. Document current performance metrics

**Week 1** (3-4 hours):
1. Technical audit: identify top 5 quick wins
2. Set up Looker Studio reporting template
3. Create keyword tracking list (10-15 keywords)
4. Create optimization roadmap

**Month 1 deliverable**: Baseline report + prioritized 3-month plan

### SOP: Traffic Drop Investigation
**Step 1** (5 min): Verify scope
- GSC Performance: site-wide traffic vs specific pages
- Compare traffic drop date to known algorithm updates

**Step 2** (10 min): Check technical issues
- GSC Index Coverage: any new errors?
- UptimeRobot: any downtime events?
- PageSpeed: any performance regression?

**Step 3** (10 min): Assess external factors
- Semrush Sensor: SERP volatility during this period?
- Competitors: did they improve, pushing you down?
- Seasonality: normal fluctuation expected?

**Step 4** (15 min): Document and action
- Log findings in tracker
- Determine if action needed vs monitoring
- Communicate with client if significant

### SOP: Content Refresh Procedure
**Trigger**: Monthly audit identifies underperforming content

**Step 1** (15 min): Analysis
- GSC queries for this page: what's user searching?
- Competitor content: what do top-ranking pages cover?
- Content gaps: what's missing from your content?

**Step 2** (10 min): Plan
- Document required changes
- Estimate time investment
- Score with ICE method for priority

**Step 3** (30-60 min): Implementation
- Update statistics, dates, facts
- Add new sections addressing gaps
- Improve title tag for CTR (if needed)
- Add/improve internal links
- Refresh images (update dates in filenames)

**Step 4** (ongoing): Track results
- Monitor GSC for 4-6 weeks
- Document impact in client tracker

### SOP: Review Response Workflow
**Daily** (5 min):
- Check GBP mobile app notifications
- Respond to new reviews within 24-48 hours
- Positive: 200 char max, thank + detail + CTA
- Negative: 300 char max, acknowledge + apologize + offer to resolve

**Monthly** (10 min):
- Review velocity analysis: trending up or down?
- If <1 review in 30 days: trigger review request campaign
- Identify trends in feedback

---

# FINAL VALIDATION CHECKLIST (Before Handoff to Client)

## Pre-Launch Validation

- [ ] All 100 P0 items completed and verified
- [ ] PageSpeed mobile: ≥70 score (target ≥90)
- [ ] Lighthouse accessibility: ≥90 score
- [ ] Lighthouse best practices: ≥90 score
- [ ] Lighthouse SEO: ≥90 score
- [ ] No 404s or broken links
- [ ] All images optimized and properly formatted
- [ ] All schema markup validated with zero errors
- [ ] GSC property verified and sitemap submitted
- [ ] GA4 tracking verified in real-time
- [ ] Forms functional and submissions received
- [ ] Mobile responsive (no horizontal scroll)
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Security headers A+ rating
- [ ] All team trained on maintenance procedures

## Post-Launch Validation (Week 1)

- [ ] Homepage indexed (GSC shows in coverage)
- [ ] No crawling errors reported (GSC Clean)
- [ ] GA4 showing organic traffic coming in
- [ ] GBP profile fully optimized and complete
- [ ] UptimeRobot confirms uptime: 100%
- [ ] First reviews starting to appear (if applicable)
- [ ] Baseline metrics documented for future comparison
- [ ] Client satisfied with launch quality

---

## APPENDIX: CRITICAL FORMULAS & FRAMEWORKS

### Title Tag Formula
```
[Primary Keyword] [City/Location] | [Brand Name]
- Length: 50-60 characters
- Example: "Plumber Amsterdam | Emergency Service | HydroPro"
```

### Meta Description Formula
```
[Action verb] + [Unique value] + [CTA] + [Location/Contact]
- Length: 140-155 characters
- Example: "Emergency plumbing in Amsterdam within 30 min. No call charges. Available 24/7. Call 020-123-4567."
```

### H1 Formula
```
[Primary Service] [City] - [Unique Angle]
- Length: 20-70 characters
- Example: "Emergency Plumber Amsterdam - 30 Minute Response Time"
```

### Content Word Count Guidelines

| Page Type | Minimum | Optimal | Max |
|-----------|---------|---------|-----|
| Homepage | 800 | 1,000-1,500 | 2,000 |
| Service Page | 800 | 1,200-1,500 | 2,500 |
| Location Page | 800 | 1,000-1,200 | 2,000 |
| Blog/Guide | 1,500 | 2,000-2,500 | 3,500 |
| About Page | 500 | 800-1,200 | 1,500 |

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | ≤2.5s | 2.5-4.0s | >4.0s |
| **INP** | ≤200ms | 200-500ms | >500ms |
| **CLS** | ≤0.1 | 0.1-0.25 | >0.25 |

### ICE Scoring Interpretation

| Score | Category | Action |
|-------|----------|--------|
| 4.0+ | Quick Win | Do immediately |
| 3.3-3.9 | Standard | Priority backlog |
| 2.7-3.2 | Nice-to-Have | Lower priority |
| <2.7 | Low Value | Consider deprioritizing |

### Triage Priority Matrix

| Priority | Response Time | Examples |
|----------|---------------|----------|
| **P1** | 24 hours | Site down, manual penalty, 50%+ traffic drop |
| **P2** | 1 week | Significant ranking drops, CWV Poor |
| **P3** | 2 weeks | Moderate fluctuations, optimization opportunities |
| **P4** | Monthly | Minor tweaks, ongoing improvements |

---

## SUMMARY

This Master Checklist consolidates all content from 7 comprehensive SOPs into a single actionable task list covering:

1. **Strategic Planning** (KPIs, business model, tech stack decision)
2. **Technical Architecture** (Astro config, Content Layer, components, schema)
3. **Content Creation** (Homepage, services, locations, blog, legal pages)
4. **Image Optimization** (Standards, naming, Astro Image component)
5. **Structured Data** (LocalBusiness, FAQ, Breadcrumb, schema validation)
6. **Performance** (Core Web Vitals, optimization techniques, testing)
7. **Deployment** (Cloudflare configuration, custom domain, SSL)
8. **Pre-Launch Testing** (Crawlability, performance, accessibility, security)
9. **Launch Day** (Final verification, go-live, communication)
10. **Ongoing Monitoring** (Daily, weekly, monthly, quarterly tasks)
11. **Specialized Techniques** (AI search, voice search, original research)
12. **Service Delivery** (€49/month maintenance model, SOPs)

**Total Estimated Implementation Time**:
- Initial build: 5-7 days
- Ongoing maintenance: 1-2 hours/week per client
- Monthly optimization: 30-60 minutes per client

**Key Success Metrics**:
- All clients: top 3 local pack for primary keywords
- All clients: 4.0+ star rating with growing review velocity
- All clients: Core Web Vitals consistently "Good"
- All clients: zero security incidents
- Client perception: ongoing value despite low monthly fee

---

**Document Version**: 1.0 (January 2026)
**Last Updated**: January 17, 2026
**Status**: Ready for technical team implementation

