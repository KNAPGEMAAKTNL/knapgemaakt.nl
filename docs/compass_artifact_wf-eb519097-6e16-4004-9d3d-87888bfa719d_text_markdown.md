# Free Website Monitoring Stack for Cloudflare Sites

**A small business website hosted on Cloudflare's free plan can achieve comprehensive monitoring across uptime, performance, and SEO for $0** by combining Cloudflare's built-in analytics with strategic free tools. The optimal stack uses Freshping for uptime (with 1-minute checks), Google Search Console for SEO intelligence, and PageSpeed Insights API for automated performance tracking. This guide provides the complete setup with specific free tier limitations.

---

## Cloudflare's free plan delivers substantial monitoring value

Cloudflare's free tier includes more analytics than most users realize, though alerting capabilities remain limited to email only.

### What's included at no cost

The free plan provides **30 days of analytics data retention** across traffic, security, and performance metrics. You can track total HTTP requests, bandwidth usage, geographic distribution, status codes, and cache hit ratios through the dashboard at `dash.cloudflare.com`. Security Analytics—made available to free users during Cloudflare's 2024 Security Week—shows all HTTP traffic including non-mitigated requests, helping identify malicious patterns.

**Cloudflare Web Analytics** offers privacy-first, cookie-free Real User Monitoring via a JavaScript beacon. It tracks Core Web Vitals (LCP, CLS, page load times), visitor counts, referrers, and device breakdowns. However, free tier data uses **10% sampling**, displaying estimates rather than exact counts—a significant accuracy limitation for low-traffic sites.

### Alert capabilities on the free plan

Free users receive email notifications for:
- HTTP DDoS attacks exceeding 100 requests/second
- SSL certificate validation issues and expiration warnings
- Origin server failures (521 errors via Passive Origin Monitoring)
- Cloudflare service incidents and maintenance
- Weekly Web Analytics summaries

**Critical limitation**: Webhook, Slack, and PagerDuty integrations require the Pro plan ($20/month). Free users cannot set custom traffic thresholds or receive WAF security event alerts.

### Key constraints versus paid plans

| Feature | Free | Pro ($20/mo) |
|---------|------|--------------|
| Time granularity | 1-hour drill-down (24h window) | 15-minute drill-down |
| Cache Analytics | ❌ | ✅ |
| Webhook notifications | ❌ | ✅ |
| Security event alerts | ❌ | Business+ |
| Log export (Logpush) | ❌ | Enterprise |
| Web Analytics data | 10% sampling, 30-day retention | Same |

The GraphQL Analytics API provides free programmatic access at **300 queries per 5 minutes**, enabling custom dashboards and integrations for those comfortable with API development.

---

## Freshping emerges as the best free uptime monitor for 2025

A major shift occurred in **December 2024**: UptimeRobot restricted its free plan to non-commercial use only, enforcing account suspensions for business users. This makes Freshping the clear winner for legitimate commercial monitoring.

### Top free uptime tools compared

| Service | Monitors | Check Interval | Status Pages | Commercial Use |
|---------|----------|----------------|--------------|----------------|
| **Freshping** | 50 | **1 minute** | 5 | ✅ Yes |
| UptimeRobot | 50 | 5 minutes | 1 | ❌ Personal only |
| HetrixTools | 15 | 1 minute | Unlimited | ✅ Yes |
| Better Stack | 10+10 heartbeats | 3 minutes | 1 (custom domain) | ✅ Yes |
| StatusCake | 10 | 5 minutes | ❌ None | ✅ Yes |

**Freshping** offers the most generous commercial-friendly free tier: **50 monitors at 1-minute intervals**, 5 public status pages, alerts via email/Slack/webhooks, and monitoring from 10 global locations. Setup takes under 5 minutes through Freshworks' dashboard.

**HetrixTools** provides excellent value with 1-minute checks, unlimited status pages, Discord/Telegram integration, and unique blacklist monitoring—though limited to 15 monitors and requiring login every 90 days to keep accounts active.

### Self-hosted alternative for technical users

**Uptime Kuma** delivers unlimited monitors with **20-second check intervals** at no recurring cost. This open-source solution runs on a $5/month VPS, Docker, or Raspberry Pi, supporting 90+ notification services including Discord, Telegram, and PagerDuty. The trade-off: you're responsible for hosting, updates, and ensuring the monitor itself stays online.

---

## Performance monitoring requires combining multiple free tools

No single free tool provides complete performance coverage. The optimal approach layers one-time testing tools with scheduled monitoring and real user data.

### Core Web Vitals monitoring essentials

Google's **March 2024** update replaced First Input Delay (FID) with **Interaction to Next Paint (INP)**. Current thresholds: LCP under 2.5 seconds, INP under 200ms, CLS under 0.1.

**Google Search Console** provides the best free ongoing CWV monitoring, grouping URLs by Good/Needs Improvement/Poor status with **16 months of historical data**. This uses real Chrome User Experience Report (CrUX) field data from actual visitors.

**PageSpeed Insights** combines lab testing (Lighthouse) with CrUX field data, offering **25,000 free API calls daily** (240/minute)—enough to automate hourly tests across dozens of pages using cron jobs or CI/CD pipelines.

### One-time testing tools breakdown

| Tool | Free Tests | Best For |
|------|-----------|----------|
| PageSpeed Insights | Unlimited | Quick audits with real-user data |
| WebPageTest | 100s/month | Detailed waterfall analysis, video capture |
| GTmetrix | **5/month** | Comprehensive reports (severely limited) |
| Lighthouse (DevTools) | Unlimited | Deep debugging, offline testing |

GTmetrix's free tier dropped to just 5 tests monthly with 1-week data retention—effectively useless for ongoing monitoring. WebPageTest remains generous with detailed filmstrip views, multi-browser testing, and 30+ day report retention.

### Setting up continuous performance tracking for free

**Option 1: PageSpeed Insights API automation**
Create a free Google Cloud project, generate an API key, and schedule tests via cron or GitHub Actions. Store results in Google Sheets using Apps Script or a free database tier (Supabase, PlanetScale). This approach costs nothing and scales to hundreds of daily tests.

**Option 2: Lighthouse CI in pipelines**
GitHub Actions' free tier includes 2,000 minutes monthly—sufficient to run Lighthouse audits on every deployment with performance budgets that fail builds on regressions.

**Option 3: CrUX API for real-user data**
The Chrome User Experience Report API provides **150 free queries per minute** with 40 weeks of historical weekly data. This shows how actual Chrome users experience your site across different connection types and devices.

### Free Real User Monitoring options

**Cloudflare Web Analytics** (described above) captures Core Web Vitals from real visitors but suffers from sampling. **Google Analytics 4** can receive Web Vitals data through the open-source `web-vitals.js` library (~2KB), providing unlimited retention and integration with other analytics dimensions—though requiring custom implementation.

---

## Google Search Console anchors the free SEO monitoring stack

For SEO, Google Search Console alone provides roughly **60% of what paid tools like Ahrefs or SEMrush offer** for monitoring your own site.

### Search Console delivers comprehensive insights

The Performance report shows clicks, impressions, CTR, and average position for every query driving traffic to your site—with **16 months of retention** and filtering by page, country, device, and date range. The Index Coverage report identifies crawl errors, excluded pages, and indexing issues before they impact rankings.

**Setup best practice**: Use DNS verification (covers all subdomains), submit your XML sitemap immediately, and connect to Google Analytics 4. Check the Performance report weekly and Index Coverage after any major site changes.

### Free keyword and backlink monitoring reality check

| Task | Free Solution | Limitation |
|------|---------------|------------|
| Rank tracking | Search Console average position | No competitor data, delayed reporting |
| Keyword research | Keyword Surfer extension + Ubersuggest (3/day) | No bulk analysis |
| Backlink monitoring | Search Console Links + Ahrefs free (100 links) | No quality scores or alerts |
| Technical audits | Screaming Frog (500 URLs) | No JavaScript rendering, can't save crawls |

**Ubersuggest's free tier** provides 3 searches daily, 25 tracked keywords (weekly updates), and 150-page site audits—genuinely useful for small sites. The **Keyword Surfer** Chrome extension displays search volumes and traffic estimates directly in Google results with no account required.

**Screaming Frog's free version** crawls up to 500 URLs, finding broken links, missing meta descriptions, duplicate content, and heading structure issues. For sites under 500 pages, this covers most technical SEO auditing needs.

### Honest assessment of free versus paid

Free tools adequately handle: monitoring your own rankings, basic keyword research, identifying technical issues on small sites, and viewing your backlink profile.

**Paid tools remain necessary for**: daily rank tracking with historical data, competitor backlink analysis at scale, automated alerts for ranking changes, sites exceeding 500 pages, and content optimization recommendations.

---

## Building an integrated monitoring dashboard

Most free tools offer limited native integrations, but practical aggregation is achievable through several approaches.

### Free dashboard options

**Google Looker Studio** (formerly Data Studio) connects directly to Search Console and Analytics, allowing custom dashboards combining performance, traffic, and SEO data. Add CrUX data via BigQuery connector (1TB/month free) for comprehensive Core Web Vitals visualization.

**Notion or Google Sheets** can aggregate data manually or via automation. Free tiers of n8n (self-hosted) or Make.com (1,000 operations/month) enable connecting APIs to central dashboards.

### Practical tool integration patterns

- **Freshping → Slack**: Native free integration for downtime alerts
- **Search Console → Looker Studio**: Direct connector for SEO dashboards
- **PageSpeed API → Google Sheets**: Apps Script automation for performance trends
- **Cloudflare Analytics → Email**: Weekly summary digest (built-in)

The limiting factor is Cloudflare's free plan lacking webhook notifications—preventing real-time integration with Slack or Discord without the Pro upgrade.

---

## Recommended minimal monitoring stack

For a small business website on Cloudflare's free plan, this configuration provides comprehensive coverage without overwhelming complexity:

**Uptime & Availability**
- **Freshping** (primary): 50 monitors, 1-minute checks, Slack alerts, public status page
- **Cloudflare Passive Origin Monitoring**: Automatic 521 error alerts via email

**Performance Monitoring**
- **Google Search Console**: Ongoing Core Web Vitals from real users
- **PageSpeed Insights** (manual): Weekly spot-checks on key pages
- **Lighthouse CI**: Performance budgets in deployment pipeline (if using CI/CD)

**SEO Monitoring**
- **Google Search Console**: Rankings, indexing, backlinks, technical issues
- **Screaming Frog Free**: Monthly technical audits (under 500 pages)
- **Keyword Surfer extension**: Ad-hoc keyword research

**Dashboards**
- **Google Looker Studio**: Combined Search Console + Analytics visualization
- **Freshping status page**: Customer-facing uptime transparency

### Weekly monitoring routine

| Day | Task | Tool | Time |
|-----|------|------|------|
| Monday | Review uptime/incident history | Freshping | 5 min |
| Wednesday | Check Search Console Performance + Coverage | GSC | 15 min |
| Friday | Run PageSpeed test on homepage + key pages | PSI | 10 min |
| Monthly | Technical audit of full site | Screaming Frog | 30 min |

---

## Conclusion

The 2024-2025 free monitoring landscape has shifted significantly: UptimeRobot's commercial restrictions make **Freshping the clear uptime choice**, while **Google Search Console** remains the indispensable SEO foundation with 16 months of ranking and indexing data. Cloudflare's free analytics provide baseline visibility but lack webhook integrations essential for modern alerting workflows.

The critical gap in free monitoring is **automated alerting beyond email**. Cloudflare's Pro plan ($20/month) addresses this with webhook notifications. For performance monitoring, PageSpeed Insights' generous **25,000 daily API calls** enable sophisticated automated tracking at no cost for those willing to build simple automation.

A complete free stack covering uptime, performance, and SEO is achievable for small sites under 500 pages. The practical ceiling arrives when needing daily rank tracking, comprehensive competitor analysis, or monitoring larger sites—where Ubersuggest ($12/month) or Screaming Frog ($259/year) become worthwhile investments.