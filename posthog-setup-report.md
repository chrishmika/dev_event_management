# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the Next.js 15.3+ `instrumentation-client` pattern. Configured with a reverse proxy path (`/ingest`), error tracking (`capture_exceptions: true`), and debug mode in development.
- **`next.config.ts`** (updated): Added PostHog reverse proxy rewrites (`/ingest/static/*` and `/ingest/*`) and `skipTrailingSlashRedirect: true` to ensure events bypass tracking blockers.
- **`components/ExploreBtn.tsx`** (updated): Added `explore_events_clicked` event capture in the button's `onClick` handler — marks the top of the event discovery funnel.
- **`components/EventCard.tsx`** (updated): Added `"use client"` directive and `event_card_clicked` event capture on the Link's `onClick` handler, with properties: `event_slug`, `event_title`, `event_type`, `event_location`, `event_date`.
- **`.env.local`** (new file): `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` set via environment variables (never hardcoded).

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' button on the homepage hero section, indicating intent to browse events (top of funnel) | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details, indicating interest in a specific event. Properties: `event_slug`, `event_title`, `event_type`, `event_location`, `event_date` | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard - Analytics basics**: https://us.posthog.com/project/337725/dashboard/1347521
- **Insight - Event Engagement Overview (30 days)**: https://us.posthog.com/project/337725/insights/SVbMggkQ
- **Insight - Event Discovery Funnel**: https://us.posthog.com/project/337725/insights/mv1TjSsb
- **Insight - Daily Active Users (Event Engagement)**: https://us.posthog.com/project/337725/insights/m36M2yYg
- **Insight - Most Clicked Events by Type**: https://us.posthog.com/project/337725/insights/CMW7TeMi

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
