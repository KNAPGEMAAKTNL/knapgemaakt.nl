# Complete Website Monitoring Guide for Cloudflare-Hosted Sites

**A Zero-Cost Observability Stack for Small Business Websites**

This guide provides a comprehensive framework for monitoring websites hosted on Cloudflare's free plan, covering availability (uptime), performance (Core Web Vitals), and search visibility (SEO). It includes practical tool recommendations, setup instructions, and Standard Operating Procedures for both project development and ongoing maintenance.

---

## Table of Contents

1. [Understanding the Monitoring Landscape](#1-understanding-the-monitoring-landscape)
2. [Cloudflare Free Plan: Native Capabilities](#2-cloudflare-free-plan-native-capabilities)
3. [Availability Monitoring (Uptime)](#3-availability-monitoring-uptime)
4. [Performance Monitoring (Core Web Vitals)](#4-performance-monitoring-core-web-vitals)
5. [SEO Monitoring](#5-seo-monitoring)
6. [Integration & Dashboards](#6-integration--dashboards)
7. [Recommended Monitoring Stack](#7-recommended-monitoring-stack)
8. [SOP: During Project Development](#8-sop-during-project-development)
9. [SOP: Post-Launch Maintenance](#9-sop-post-launch-maintenance)

---

## 1. Understanding the Monitoring Landscape

### The Three Pillars of Website Observability

Modern website monitoring encompasses three critical dimensions:

| Pillar | What It Measures | Why It Matters |
|--------|------------------|----------------|
| **Availability** | Is the site accessible? | Direct revenue/reputation impact |
| **Performance** | How fast does it load? | User experience + SEO ranking factor |
| **SEO Health** | Is it visible in search? | Organic traffic acquisition |

### Edge vs. Origin Monitoring

For Cloudflare-hosted sites, data exists in two zones:

- **Edge (Cloudflare)**: Where Cloudflare terminates connections and serves cached content
- **Origin (Your Server)**: Where the application logic resides

Relying solely on Cloudflare analytics shows Edge performance but may miss Origin failures. Conversely, server monitoring might report a healthy server while Edge configuration errors render the site inaccessible.

**Solution**: Implement monitoring at both layers for complete visibility.

---

## 2. Cloudflare Free Plan: Native Capabilities

### What's Included at No Cost

The Cloudflare free tier provides substantial monitoring value:

#### Traffic Analytics (Edge Analytics)
- **30 days of data retention** for traffic, security, and performance metrics
- HTTP requests, bandwidth, geographic distribution, status codes, cache hit ratios
- Security Analytics showing all HTTP traffic including non-mitigated requests

#### Web Analytics (Real User Monitoring)
- Privacy-first, cookie-free JavaScript beacon
- Core Web Vitals: LCP, CLS, page load times
- Visitor counts, referrers, device breakdowns
- **Limitation**: 10% sampling on free tier (estimates, not exact counts)

#### Native Alerts (Email Only)
- HTTP DDoS attacks (>100 requests/second)
- SSL certificate validation issues and expiration warnings
- Origin server failures (521 errors via Passive Origin Monitoring)
- Weekly Web Analytics summaries

### Critical Limitations

| Feature | Free Plan | Pro Plan ($20/mo) |
|---------|-----------|-------------------|
| Time granularity | 1-hour (24h window) | 15-minute drill-down |
| Cache Analytics | ❌ | ✅ |
| Webhook/Slack notifications | ❌ | ✅ |
| Security event alerts | ❌ | Business+ |
| Log export (Logpush) | ❌ | Enterprise |
| DNS Analytics retention | 8 days | Extended |

### The "Traffic Paradox" Problem

Cloudflare's Passive Origin Monitoring only triggers when real users encounter errors. If your site crashes at 2 AM with no visitors, no alert is sent. **This is why external active monitoring is essential.**

---

## 3. Availability Monitoring (Uptime)

### Why External Monitoring is Non-Negotiable

Active (synthetic) monitors simulate users visiting your site at fixed intervals, detecting outages even during zero-traffic periods.

### Technical Challenges with Cloudflare

1. **The "200 OK" Masquerade**: Cloudflare may serve error pages that poorly-configured monitors consider "up"
2. **Bot Management Conflicts**: WAF rules may block monitoring agents, causing false positives

**Solution**: Add your monitoring provider's IP ranges to Cloudflare WAF > Tools > IP Access Rules allowlist.

### 2025 Tool Landscape (Updated)

> **Important**: In December 2024, UptimeRobot restricted its free plan to non-commercial use only, making Freshping the clear winner for business websites.

| Service | Monitors | Check Interval | Status Pages | Commercial Use |
|---------|----------|----------------|--------------|----------------|
| **Freshping** ⭐ | 50 | **1 minute** | 5 | ✅ Yes |
| UptimeRobot | 50 | 5 minutes | 1 | ❌ Personal only |
| HetrixTools | 15 | 1 minute | Unlimited | ✅ Yes |
| Better Stack | 10+10 heartbeats | 3 minutes | 1 | ✅ Yes |
| StatusCake | 10 | 5 minutes | ❌ None | ✅ Yes |

### Recommended Tools

#### Primary: Freshping (Best Free Option)
- **50 monitors** at 1-minute intervals
- 5 public status pages
- Alerts via email, Slack, webhooks
- Monitoring from 10 global locations
- Setup time: Under 5 minutes

#### Secondary: HetrixTools (Speed Specialist)
- **1-minute checks** with diagnostic data (traceroute, MTR)
- Discord/Telegram integration
- Blacklist monitoring included
- **Caveat**: Requires login every 90 days to keep account active

#### For Internal Processes: Cronitor
- Monitors scheduled tasks (CRON jobs, backups)
- "Heartbeat" monitoring: alerts if expected ping doesn't arrive
- 5 monitors on free tier

#### Self-Hosted: Uptime Kuma
- Unlimited monitors with 20-second intervals
- Runs on $5/month VPS, Docker, or Raspberry Pi
- 90+ notification integrations
- Trade-off: You maintain the infrastructure

### Hybrid Strategy

For comprehensive coverage:
1. **Freshping**: Primary public monitoring with status page
2. **HetrixTools**: Critical endpoints (checkout, login) needing fastest detection
3. **Cronitor**: Internal backup/database health monitoring

---

## 4. Performance Monitoring (Core Web Vitals)

### Current Metrics (March 2024 Update)

Google replaced First Input Delay (FID) with Interaction to Next Paint (INP):

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4s | > 4s |
| **INP** (Interaction to Next Paint) | < 200ms | 200ms - 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |

### Lab Data vs. Field Data

- **Lab Data (Synthetic)**: Controlled tests, immediate feedback, good for debugging
- **Field Data (RUM)**: Real user experiences, used for search rankings

**You need both**: Lab data catches regressions immediately; field data shows actual user experience.

### Free Tools Comparison

#### One-Time Testing

| Tool | Free Limits | Best For |
|------|-------------|----------|
| PageSpeed Insights | Unlimited | Quick audits with real-user data |
| WebPageTest | 100s/month | Detailed waterfall, video capture |
| GTmetrix | **5/month** | ❌ Severely limited, avoid for monitoring |
| Lighthouse (DevTools) | Unlimited | Deep debugging, offline testing |

#### Ongoing Monitoring

| Tool | Data Type | Retention | Cost |
|------|-----------|-----------|------|
| Google Search Console | Field (CrUX) | **16 months** | Free |
| Cloudflare Web Analytics | Field (RUM) | 6 months | Free |
| PageSpeed Insights API | Lab + Field | You store it | Free (25K calls/day) |

### Recommended Setup: Automated PSI Monitoring

Build a free, unlimited performance monitor using Google's infrastructure:

#### Architecture
1. **Engine**: PageSpeed Insights API (free, 25,000 calls/day)
2. **Controller**: Google Apps Script (runs automatically)
3. **Database**: Google Sheets (unlimited retention)
4. **Visualization**: Looker Studio dashboard

#### Implementation Steps

1. **Get API Key**: Create project in Google Cloud Console, enable PageSpeed Insights API
2. **Create Google Sheet**: With columns for Date, URL, Performance Score, LCP, CLS, TBT
3. **Add Apps Script**:
```javascript
function runPageSpeedTest() {
  const API_KEY = 'YOUR_API_KEY';
  const urls = ['https://yoursite.com/', 'https://yoursite.com/contact'];
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  urls.forEach(url => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}&strategy=mobile`;
    const response = UrlFetchApp.fetch(apiUrl);
    const data = JSON.parse(response.getContentText());

    const metrics = data.lighthouseResult.audits;
    sheet.appendRow([
      new Date(),
      url,
      data.lighthouseResult.categories.performance.score * 100,
      metrics['largest-contentful-paint'].numericValue,
      metrics['cumulative-layout-shift'].numericValue,
      metrics['total-blocking-time'].numericValue
    ]);
  });
}
```
4. **Schedule**: Set trigger to run daily (e.g., 2 AM)

#### Alternative: Lighthouse CI in GitHub Actions
```yaml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://yoursite.com/
          budgetPath: ./budget.json
```

### Real User Monitoring (Free Options)

1. **Cloudflare Web Analytics**: Already included, 10% sampling
2. **Google Analytics 4 + web-vitals.js**: Unlimited retention, requires custom implementation

---

## 5. SEO Monitoring

### Google Search Console: The Foundation

GSC provides ~60% of what paid tools offer for your own site monitoring.

#### Key Features
- **Performance Report**: Clicks, impressions, CTR, average position for all queries
- **Index Coverage**: Crawl errors, excluded pages, indexing issues
- **Core Web Vitals**: Real user field data grouped by status
- **Data Retention**: **16 months** of historical data

#### Setup Best Practices
1. Use DNS verification (covers all subdomains)
2. Submit XML sitemap immediately
3. Connect to Google Analytics 4
4. Check Performance report weekly
5. Review Index Coverage after major site changes

### Free SEO Tool Ecosystem

| Task | Free Solution | Limitation |
|------|---------------|------------|
| Rank tracking | GSC average position | No competitor data, delayed |
| Keyword tracking | Seobility (10 keywords daily) | Limited volume |
| Keyword research | Keyword Surfer + Ubersuggest (3/day) | No bulk analysis |
| Backlink monitoring | GSC Links + Ahrefs AWT (100 links) | No quality scores |
| Technical audits | Screaming Frog (500 URLs) | No JS rendering |
| Site crawl | Seobility (1,000 pages weekly) | Cloud-based, limited |

### Recommended SEO Stack

1. **Daily Rank Tracking**: Seobility (top 10 keywords)
2. **Traffic & Trends**: Google Search Console (weekly review)
3. **Backlinks**: Ahrefs Webmaster Tools (weekly review)
4. **Technical Health**:
   - Screaming Frog (monthly deep scan)
   - Seobility (weekly automated crawl)

### What Free Tools Cannot Do

- Daily rank tracking with historical data at scale
- Competitor backlink analysis
- Automated ranking change alerts
- Sites exceeding 500 pages (Screaming Frog limit)
- Content optimization recommendations

**Investment Threshold**: Consider Ubersuggest ($12/month) or Screaming Frog ($259/year) when these become critical needs.

---

## 6. Integration & Dashboards

### The Fragmentation Problem

Free tools create data silos:
- Uptime → Freshping
- Rankings → Seobility/GSC
- Performance → Google Sheets
- Traffic → Cloudflare

### Solution: Google Looker Studio

Looker Studio (free) serves as the unified visualization layer.

#### Native Connectors (Free)
- **Google Search Console**: Direct connection
- **Chrome UX Report (CrUX)**: Via BigQuery (1TB/month free)
- **Google Sheets**: Universal adapter for custom data

#### Integration Patterns

| Source | Destination | Method |
|--------|-------------|--------|
| Freshping → Slack | Native | Free integration |
| GSC → Looker Studio | Native | Direct connector |
| PSI API → Sheets | Apps Script | Automated daily |
| Cloudflare → Email | Native | Weekly digest |

#### Email-to-Sheet Pattern (for tools without direct connectors)
1. Configure alerts to specific Gmail address
2. Use Make.com (1,000 ops/month free) or Zapier (100 tasks/month)
3. Trigger: "New email matching 'Uptime Alert'"
4. Action: "Add row to Google Sheet"
5. Connect Sheet to Looker Studio

### Limitation

Cloudflare's free plan lacks webhook notifications, preventing real-time Slack/Discord integration without the Pro upgrade ($20/month).

---

## 7. Recommended Monitoring Stack

### The Complete Free Stack

| Pillar | Tool | Role |
|--------|------|------|
| **Availability** | Freshping | 1-min checks, public status page |
| **Availability** | Cloudflare Passive | Automatic 521 error alerts |
| **Performance** | Google Search Console | Ongoing CWV from real users |
| **Performance** | PSI API + Sheets | Automated lab testing |
| **Performance** | Cloudflare Web Analytics | Real-time RUM |
| **SEO Ranking** | Seobility | Track 10 core keywords daily |
| **SEO Backlinks** | Ahrefs AWT | Weekly new/lost backlinks |
| **SEO Technical** | Screaming Frog | Monthly technical audits |
| **Reporting** | Looker Studio | Unified dashboard |

### Setup Checklist

- [ ] Cloudflare account configured with Web Analytics beacon
- [ ] Freshping account with primary monitors + status page
- [ ] Google Search Console verified and sitemap submitted
- [ ] Google Sheets + Apps Script for PSI automation
- [ ] Seobility account tracking top 10 keywords
- [ ] Ahrefs Webmaster Tools verified
- [ ] Screaming Frog installed locally
- [ ] Looker Studio dashboard connected to GSC + Sheets

---

## 8. SOP: During Project Development

### Phase 1: Project Setup (Day 1)

#### Monitoring Infrastructure
1. **Create Cloudflare account** and add site
   - Enable Web Analytics (add JS beacon to site)
   - Configure SSL/TLS settings
   - Enable Passive Origin Monitoring alerts

2. **Set up Freshping**
   - Create monitor for staging/development URL
   - Configure Slack/email alerts for development team
   - Note: Status page not needed until launch

3. **Verify Google Search Console**
   - Use DNS verification method
   - Submit XML sitemap
   - Request indexing of key pages (post-launch)

#### Performance Baseline
4. **Run initial PageSpeed Insights test**
   - Document baseline scores for homepage
   - Identify critical performance issues early
   - Set performance budget targets:
     - Performance Score: ≥ 90
     - LCP: < 2.5s
     - CLS: < 0.1

### Phase 2: Development Cycle (Ongoing)

#### Before Each Sprint
1. Review current performance metrics
2. Identify any monitoring gaps for new features
3. Plan performance testing for new pages/features

#### During Development
1. **Run Lighthouse in DevTools** after significant changes
2. **Check for regressions** before committing:
   - Performance score drop > 5 points
   - LCP increase > 500ms
   - CLS increase > 0.05

3. **Test on staging** with Freshping monitor active

#### Before Pull Request
1. Run full Lighthouse audit
2. Document any performance trade-offs
3. Verify no broken links (quick Screaming Frog crawl)

### Phase 3: Pre-Launch Checklist (Final Week)

#### Monitoring Setup
- [ ] Freshping production monitors configured
- [ ] Public status page created (status.yourdomain.com)
- [ ] Alert channels verified (email, Slack working)
- [ ] Google Search Console verified for production domain
- [ ] Sitemap submitted and validated

#### Performance Verification
- [ ] PageSpeed Insights score ≥ 90 (mobile)
- [ ] All Core Web Vitals passing
- [ ] No render-blocking resources
- [ ] Images optimized and lazy-loaded

#### SEO Verification
- [ ] All pages have unique meta titles/descriptions
- [ ] robots.txt allows crawling
- [ ] No noindex tags on important pages
- [ ] Internal linking structure verified
- [ ] 404 error handling configured

#### Technical Verification
- [ ] SSL certificate valid and auto-renewing
- [ ] Cloudflare caching rules configured
- [ ] Error pages (404, 500) styled and helpful
- [ ] Backup/recovery procedures documented

### Phase 4: Launch Day

1. **Activate production monitoring**
   - Switch Freshping from staging to production URL
   - Enable public status page

2. **Watch dashboards closely** for first 4 hours
   - Check Cloudflare for traffic patterns
   - Monitor Freshping for any downtime
   - Watch for 5xx errors in Cloudflare analytics

3. **Run post-launch verification**
   - Full site crawl with Screaming Frog
   - PageSpeed test on all key pages
   - Verify Google can crawl (GSC URL Inspection)

4. **Document baseline metrics**
   - Screenshot Cloudflare analytics
   - Record initial PSI scores
   - Note GSC indexing status

---

## 9. SOP: Post-Launch Maintenance

### Daily Tasks (5 minutes)

1. **Check Freshping dashboard**
   - Verify 100% uptime in last 24 hours
   - Review any incident notifications
   - No action needed if all green

2. **Glance at Cloudflare traffic**
   - Unusual spikes or drops?
   - Any security events?

### Weekly Tasks (30 minutes)

#### Monday: Availability Review
- [ ] Review Freshping weekly uptime report
- [ ] Check incident history and response times
- [ ] Verify all monitors still active
- [ ] Review Cloudflare security events

#### Wednesday: SEO & Search Review
- [ ] Check Google Search Console Performance
  - Compare clicks/impressions to previous week
  - Look for significant ranking changes
  - Review any new errors in Coverage report
- [ ] Review Seobility keyword tracking
  - Note any position changes > 3 places
  - Investigate drops in top 10 keywords

#### Friday: Performance Review
- [ ] Run PageSpeed Insights on homepage + 2 key pages
- [ ] Compare to baseline/previous week
- [ ] Check Cloudflare Web Analytics for CWV trends
- [ ] Review Google Sheets PSI log for patterns

### Monthly Tasks (2 hours)

#### Technical Audit (First Monday)
1. **Full Screaming Frog crawl**
   - Export and review 4xx errors
   - Check for missing meta descriptions
   - Identify duplicate content issues
   - Review heading structure

2. **Seobility automated crawl review**
   - Compare to previous month
   - Prioritize critical errors

3. **Core Web Vitals deep dive**
   - Review CrUX data in Search Console
   - Compare lab vs field data
   - Identify pages failing thresholds

#### Backlink Review (Second Monday)
1. **Check Ahrefs Webmaster Tools**
   - Review new backlinks (quality check)
   - Investigate lost backlinks
   - Monitor Domain Rating changes

2. **Compare to competitors** (if applicable)
   - Using free Ubersuggest searches

#### Performance Optimization (Third Monday)
1. **Review PSI historical data**
   - Identify trends in Google Sheets
   - Correlate changes with deployments

2. **Test on real devices**
   - Use WebPageTest for detailed analysis
   - Check filmstrip for visual loading

#### Reporting (Last Monday)
1. **Generate Looker Studio report**
   - Export or schedule email delivery
   - Include: Traffic, Rankings, Performance, Uptime

2. **Document notable changes**
   - Add to project changelog
   - Plan optimization tasks for next month

### Quarterly Tasks (4 hours)

#### Q1, Q2, Q3, Q4: Comprehensive Review

1. **Year-over-year comparison** (where data exists)
   - Traffic trends (GSC)
   - Ranking progression (GSC)
   - Performance evolution (Sheets)

2. **Tool audit**
   - Are all monitoring tools still active?
   - Any free tier changes affecting us?
   - Consider if paid upgrades justified

3. **Competitive analysis**
   - How do we rank vs competitors?
   - Performance comparison
   - Feature gap analysis

4. **Goal setting for next quarter**
   - Performance targets
   - SEO objectives
   - Uptime SLA commitments

### Incident Response Procedure

#### When Downtime Alert Received

1. **Acknowledge** within 15 minutes
   - Check Freshping for scope
   - Verify it's not a false positive

2. **Diagnose** within 30 minutes
   - Check Cloudflare for errors (521, 523)
   - Check origin server status
   - Review recent deployments

3. **Communicate** immediately
   - Update status page
   - Notify stakeholders via Slack/email

4. **Resolve** as priority
   - Implement fix
   - Verify monitoring shows recovery

5. **Post-mortem** within 24 hours
   - Document root cause
   - Identify prevention measures
   - Update monitoring if gaps found

---

## Quick Reference: Tool Login Schedule

To maintain free tier access (especially HetrixTools' 90-day requirement):

| Tool | Login Frequency | Action |
|------|-----------------|--------|
| Freshping | Weekly (with review) | Dashboard check |
| HetrixTools | Every 60 days | Login to prevent suspension |
| Seobility | Weekly (with review) | Keyword check |
| Ahrefs AWT | Weekly (with review) | Backlink review |
| Google Search Console | Weekly (with review) | Performance review |

**Tip**: Set calendar reminders for HetrixTools login to avoid account suspension.

---

## Conclusion

A comprehensive monitoring stack for Cloudflare-hosted sites is achievable at zero cost through strategic tool combination:

- **Freshping** provides commercial-friendly uptime monitoring with 1-minute resolution
- **Google Search Console** delivers 16 months of SEO intelligence
- **PageSpeed Insights API** enables unlimited automated performance tracking
- **Looker Studio** unifies reporting across all data sources

The critical success factor is **automation and routine**. The SOPs above transform monitoring from an afterthought into a systematic practice that catches issues before they impact users and search rankings.

### When to Upgrade to Paid Tools

Consider paid tools when:
- Cloudflare Pro ($20/month): Need webhook/Slack alerts from Cloudflare
- Ubersuggest ($12/month): Need competitor analysis or more keyword tracking
- Screaming Frog ($259/year): Site exceeds 500 pages
- Better Stack Paid: Need 30-second uptime checks or on-call scheduling

For most small business sites under 500 pages, the free stack provides professional-grade observability sufficient for years of growth.
