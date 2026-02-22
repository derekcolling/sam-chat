# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ask Sam** — a Downtown Santa Monica visitor chatbot built on the OpenChat framework (Next.js 16, Vercel AI SDK, PostgreSQL). The bot persona is "Sam," a friendly, knowledgeable local guide that helps visitors find businesses, get directions, learn about events, and navigate the district.

The actual source code lives in the `sam-chat/` subdirectory. All commands should be run from `sam-chat/`.
GitHub repo: `derekcolling/sam-chat` (auto-deploys to Vercel on push to `main`).

---

## Product Context

### Mission

To serve as the most knowledgeable, always-available local guide for Downtown Santa Monica — helping every visitor, regardless of language or familiarity with the area, find exactly what they need to have a great experience. The bot replaces the experience of asking a knowledgeable local friend — available 24/7 in multiple languages with no wait time.

### Target Users

**Primary:**
- International tourists (pre-trip planning and in-destination)
- Domestic leisure visitors
- Day-trippers from greater LA
- World Cup and Olympic visitors (near-term priority)
- Local residents discovering new businesses

**Secondary:**
- DTSM staff using it as a reference tool
- Local businesses verifying their own listings
- Media and press seeking quick facts

### Branding

- **Name**: "Ask Sam" — short, gender-neutral, distinctly approachable, a subtle nod to Santa Monica
- **Colors**: Ocean blue (#0077B6) primary, warm sand (#F5E6C8) accent

---

## Bot Persona — "Sam"

### Personality Traits

- Warm but not over-eager
- Knowledgeable without being a know-it-all
- Beach-casual in tone — never stiff or corporate
- Gently enthusiastic about the neighborhood
- Patient with repetitive or unclear questions
- Culturally aware and never assumes where someone is from

### Voice Guidelines

- Writes in short, scannable sentences
- Uses "you'll love" and "locals swear by" sparingly but effectively
- Never uses jargon or insider acronyms without explanation
- Adapts formality to match the visitor's tone
- Avoids filler phrases like "Great question!" or "Absolutely!"

### Sample Introduction

> "Hey, I'm Sam — your guide to everything Downtown Santa Monica. Ask me about restaurants, shopping, parking, getting around, or what's happening this weekend. What can I help you find?"

---

## Core Capabilities

### Business Discovery (Primary Function)

Users can find businesses by:
- Category ("Where can I get coffee?")
- Vibe or occasion ("Good spot for a date night?")
- Dietary need ("Any vegan-friendly restaurants nearby?")
- Price point ("What's affordable for lunch?")
- Location proximity ("What's closest to the Pier?")
- Hours ("What's still open at 10pm on a Sunday?")

Each response includes name, one-sentence description, hours, price range, and one distinctive detail that makes it feel like a personal recommendation. Cap at three options to avoid overwhelm.

### Hours and Operations Lookup

- "Is [business] open right now?"
- "What time does [business] close on Saturdays?"
- "Does [business] take reservations?"

Always note when data was last verified; encourage calling ahead for holiday hours.

### Wayfinding

- Landmark-based directions ("The Pier is about a 10-minute walk south from the Promenade")
- Parking structure locations and which businesses validate
- Nearest Big Blue Bus stops
- Beach access points
- Restroom locations

### Event Awareness

- Current/upcoming Promenade events
- DTSM seasonal programming
- World Cup watch party locations
- Farmers market schedule and location

### FAQs

- Beach rules (dogs, alcohol, bonfires)
- Parking rates and validation
- Bike and scooter rentals
- Accessibility information
- Public restroom locations
- Safety tips

---

## Conversation Design

### Flow Architecture

Every conversation follows: *Greeting → Intent Recognition → Clarification if needed → Response → Follow-up offer → Resolution*

Never dead-end a conversation. Every response ends with either an answer + follow-up offer, or a graceful redirect.

### Clarification Logic

When ambiguous, ask **one** clarifying question — never multiple:
- "Are you looking for somewhere to sit down or more of a quick grab-and-go?"
- "Any dietary preferences I should know about?"

### Response Formatting

- Lead with the direct answer
- Follow with supporting detail
- End with a relevant follow-up offer
- Use short paragraphs over bullet lists
- Include one specific, memorable detail per recommendation

### Handling Out-of-Scope Questions

1. Answer if confident the information is accurate
2. Acknowledge the limit and point to a better resource
3. **Never guess or fabricate — cardinal rule**
4. Offer to help with something related that it *can* answer

### Escalation Pathways

Triggers for human handoff:
- User explicitly asks for a person
- User expresses frustration twice in the same conversation
- Question involves a complaint, safety concern, or emergency
- Question requires real-time information the bot doesn't have

---

## Language and Localization

**Priority Languages (World Cup):**
1. English (primary)
2. Spanish (Paraguay fans, local Spanish-speaking community)
3. Farsi (Iran plays two matches in LA)
4. French (Belgium fans, European tourism)
5. German (high-spending European segment)

**Principles:**
- Auto-detect based on user's input language; respond in same language
- Currency context for international visitors ("around $15 USD")
- Metric system option for distance ("about 800 meters" alongside "half a mile")

---

## Knowledge Base Structure

**Layer 1 — Static Core Data (POC foundation):**
Business directory, parking info, district map/landmarks, beach rules, transit routes

**Layer 2 — Semi-Static Data (updated weekly/monthly):**
Events calendar, seasonal hours, new openings, temporary closures

**Layer 3 — Dynamic Data (Phase 2+):**
Real-time parking availability, wait times, live event updates, weather integration

### Data Quality Standards

- Verified within 30 days
- Confirmed with business or official source
- Written in the bot's voice, not marketing copy
- Tagged with verification date
- Flagged for re-verification if no update within 60 days

---

## Governance and Content Management

**Content Ownership:** One person as "bot editor" — keeps knowledge base current, reviews failed conversations weekly, approves persona/response changes.

**Update Cadence:**
- Business hours: verify monthly
- Events: update weekly
- New businesses: add within one week of opening
- Closed businesses: remove within 48 hours
- Full knowledge base audit: quarterly

---

## Success Metrics

**POC Success Criteria:**
- Bot answers 70%+ of test questions accurately
- Clear path to expanding the knowledge base
- At least one business owner validates their listing
- At least 10 real visitors interact and rate positively

**Ongoing Metrics:**
- Containment rate (target 65%+)
- User satisfaction (target 4.0+/5)
- Most common unanswered questions (Phase 2 backlog)
- Average conversation length (2-4 exchanges is healthy)
- Return usage rate

---

## Phased Roadmap

**POC (Now):** Static data, 15-50 businesses, English primary, single-page embed. Goal: stakeholder validation + real user feedback.

**Phase 1 — Pre-World Cup:** Full business directory, multilingual support, events calendar, deploy on downtownsm.com.

**Phase 2 — World Cup and Beyond:** Real-time parking, wait times, WhatsApp/SMS deployment, merchant dashboard.

**Phase 3 — Olympic Readiness:** Full multilingual expansion, city transit API integration, accessibility features, voice interface, LA28 integration.

---

## Memory Management 

Maintain a structured memory system rooted at memory/ 

### Structure 

- memory/memory.md — index of all memory files, updated whenever you create or modify one 
- memory/general.md — cross-project facts, preferences, environment setup 
- memory/domain/{topic}.md — domain-specific knowledge (one file per topic) 
- memory/tools/{tool}.md — tool configs, CLI patterns, workarounds  

### Rules 

1. When you learn something worth remembering, write it to the right file immediately 
2. Keep memory.md as a current index with one-line descriptions
3. Entries: date, what, why — nothing more 
4. Read memory.md at session start. Load other files only when relevant
5. If a file doesn't exist yet, create it  

### Maintenance 

When I say "reorganize memory": 
1. Read all memory files 
2. Remove duplicates and outdated entries 
3. Merge entries that belong together 
4. Split files that cover too many topics 
5. Re-sort entries by date within each file
6. Update memory.md index 
7. Show me a summary of what changed

---

## Commands

```bash
# All commands run from sam-chat/
cd sam-chat

pnpm install              # Install dependencies
pnpm dev                  # Dev server with Turbo (localhost:3000)
pnpm build                # Production build (runs DB migration first)
pnpm lint                 # Lint via Ultracite (Biome-based)
pnpm format               # Auto-fix lint/format issues

# Database (Drizzle ORM + PostgreSQL)
pnpm db:migrate           # Apply migrations
pnpm db:generate          # Generate migrations from schema changes
pnpm db:studio            # Interactive DB explorer
pnpm db:push              # Push schema directly (no migration file)

# Testing (Playwright E2E)
pnpm test                 # Run all E2E tests (sets PLAYWRIGHT=True)
pnpm exec playwright test tests/e2e/chat.test.ts  # Single test file
```

---

## Development Guidelines

### Tool Development (Strict Conventions)

Every AI function-calling tool (`lib/ai/tools/`) MUST follow these rules to maintain compatibility with the Anthropic provider:

1.  **Use `inputSchema`**: Always use the `inputSchema` field (NOT `parameters`) in the `tool()` constructor.
2.  **Zod Schema**: `inputSchema` MUST be a `z.object({})`. Even if the tool takes no parameters, use `z.object({})`.
3.  **Descriptions**: Every field in the schema MUST have a `.describe()` call to help the AI understand its purpose.

*Example of a correct tool definition:*
```typescript
export const myTool = tool({
  description: "Description of what the tool does",
  inputSchema: z.object({
    paramName: z.string().describe("What this specific parameter is for"),
  }),
  execute: async ({ paramName }) => { ... }
});
```

### Common Pitfalls & Troubleshooting

- **Empty Response Bubble**: Usually caused by a missing `ANTHROPIC_API_KEY` in `.env.local` or a malformed tool schema (check the server terminal for `AI_APICallError`).
- **Operation Not Permitted**: On macOS, if the agent can't read `.env.local`, check file permissions (`ls -la@`) and ensure it's readable (`chmod 644`).
- **Stale Model IDs**: If the UI shows invalid models like `gpt-4o`, clear your browser cookies for `localhost` or check the `chat-model` cookie. Server-side validation now catches this and falls back to Claude.

---

## Architecture

### Request Flow
User -> Next.js App Router -> API Route (`app/(chat)/api/chat/route.ts`) -> Anthropic API (`@ai-sdk/anthropic`) -> Streaming response via `createUIMessageStream` -> Client `useChat()` hook

### Key Layers

- **`app/(auth)/`** — NextAuth.js authentication (credentials + guest). Auth config in `auth.ts`. User types: `guest` (20 msg/day) and `regular` (50 msg/day), configured in `lib/ai/entitlements.ts`.

- **`app/(chat)/api/`** — API routes. The main chat endpoint (`chat/route.ts`) handles streaming, rate limiting, message persistence, and tool orchestration. Request bodies validated with Zod (`chat/schema.ts`).

- **`lib/ai/`** — AI integration layer:
  - `providers.ts` — Model resolution via `@ai-sdk/anthropic` (direct Anthropic API). Reasoning models get `extractReasoningMiddleware`. Test environment uses mock providers.
  - `models.ts` — Model catalog (Anthropic-only). Default: `claude-sonnet-4-5`. Model IDs use Anthropic's native format (e.g. `claude-haiku-4-5`).
  - `prompts.ts` — Sam's persona, voice guidelines, behavioral rules, and the full business directory (15 businesses) are embedded in the system prompt. Business data source: `businesses-data.md`. Reasoning models skip artifact tools.
  - `tools/` — AI function-calling tools: `createDocument`, `updateDocument`, `getWeather`, `getParking`, `requestSuggestions`.

- **`lib/db/`** — Database layer (Drizzle ORM, Neon Postgres):
  - `schema.ts` — Table definitions. Note v2 tables: `Message_v2`, `Vote_v2` (deprecated originals still exist).
  - `queries.ts` — All DB query functions.
  - `migrations/` — Generated migration files.

- **`artifacts/`** — Document system with 4 types: `text`, `code`, `sheet`, `image`. Each has `client.tsx` (React UI) and `server.ts` (generation logic). Rendered in a side panel via `components/artifact.tsx`.

- **`components/`** — React components. `components/ui/` contains shadcn/ui primitives (excluded from linting).

- **`hooks/`** — Custom React hooks including `use-chat.ts` (chat state), `use-artifact.ts` (artifact management).

### Error Handling
`OpenChatError` class in `lib/errors.ts` uses typed error codes like `"rate_limit:chat"` or `"unauthorized:auth"`. Call `.toResponse()` to convert to HTTP response.

### Streaming
Chat uses resumable streams via `resumable-stream` + Redis. Stream IDs are persisted in the `Stream` table for reconnection.

### Path Aliases
`@/*` maps to the project root (`sam-chat/`), configured in `tsconfig.json`.

## Code Style

- **Linter/Formatter**: Ultracite (wraps Biome). Config in `biome.jsonc`.
- **Indentation**: 2 spaces.
- **Excluded from linting**: `components/ui/`, `lib/utils.ts`, `hooks/use-mobile.ts`.
- Package manager: **pnpm 9.12.3** (enforced).
- Tailwind CSS v4 with PostCSS.

## Environment Variables

Requires `.env.local` (see `.env.example`). Key vars:
- Database: `POSTGRES_URL`
- AI: `ANTHROPIC_API_KEY` (required, used by `@ai-sdk/anthropic`)
- Storage: `BLOB_READ_WRITE_TOKEN`
- Auth: `AUTH_SECRET`
- Streaming: `REDIS_URL` (optional, enables resumable streams)
