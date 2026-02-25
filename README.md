# ⚡ Spark — SaaS Idea Generator

A multi-page, client-side web app for discovering, saving, and validating Tech/SaaS business ideas. No backend required — runs entirely in the browser with `localStorage` for persistence.

---

## Pages & Features

### 1. `index.html` — Generate
The main idea discovery page.

- **20 curated SaaS ideas** across 8 target markets (SMB, Enterprise, Developer, Creator, Healthcare, Finance, E-commerce, Consumer)
- **3 filters**: Target Market, Revenue Model, Difficulty
- **Sort** by Pain Score, Revenue Potential, Time to MVP, or shuffle
- **Show** 3 / 5 / 8 / All results
- Expandable **detail drawer** per card: competitive edge, tech stack, and link to Validate
- **Pain score bar** with color-coded severity (green → amber → red)
- Save any idea with ♡; links directly to the Validate scorecard

### 2. `saved.html` — Saved Ideas Board
A personal workspace for managing shortlisted ideas.

- **List view** + **Kanban board** (Exploring → Validating → Building)
- Click any idea to open a **sidebar panel** with full details
- Add **personal notes** and save them persistently
- **Rate interest** with 1–5 stars
- **Set stage** (Exploring / Validating / Building) — reflected in Kanban
- Time-stamped saves, per-idea deletion, and clear-all

### 3. `validate.html` — Validation Scorecard
A structured framework for evaluating any idea before committing.

- **6-dimension scorecard** with animated scores (0–100):
  - 🌍 Market Opportunity
  - ⚔️ Competitive Position
  - 💰 Revenue Model
  - 🛠 Technical Feasibility
  - 🚀 Go-To-Market
  - ⏱ Market Timing
- **Animated ring score** with verdict: Strong Opportunity / Promising / Needs Work
- **Strengths vs. Risks** breakdown
- **Competitor table** with known weaknesses and your differentiating angle
- **Randomized next-steps checklist** (5 of 7 rotating action items)
- Deep-linkable via URL param: `validate.html?id=idea-id`
- Print-friendly layout

---

## File Structure

```
spark/
├── index.html      # Idea generator & discovery
├── saved.html      # Saved ideas board & workspace
├── validate.html   # Validation scorecard
├── styles.css      # Shared design system & tokens
├── app.js          # Shared data, utilities & localStorage helpers
└── README.md       # This file
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vanilla HTML/CSS/JS — zero dependencies |
| Fonts | Syne (display) · DM Mono (body) · Fraunces (italic accent) via Google Fonts |
| Persistence | `localStorage` via `Store` helper in `app.js` |
| Styling | CSS custom properties (design tokens), no preprocessor |
| Build | None — open `index.html` directly in a browser |

---

## Running Locally

No build step needed. Just open any file in a browser:

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally (recommended to avoid CORS on file:// links)
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## Data & Persistence

All user data (saved ideas, notes, star ratings, stages) is stored in `localStorage` under the `spark_` prefix:

| Key | Contents |
|---|---|
| `spark_saved` | Array of saved idea objects `{ id, savedAt, notes, score, stage }` |

No data is sent to any server. Clearing browser storage will reset all saved ideas.

---

## Idea Database (`app.js`)

The `IDEAS` array contains 20 hand-curated SaaS ideas, each with:

```js
{
  id:           string,       // unique slug
  title:        string,
  tagline:      string,       // one-liner pitch
  desc:         string,       // 2–3 sentence description
  market:       string[],     // e.g. ['smb', 'enterprise']
  models:       string[],     // e.g. ['subscription', 'freemium']
  difficulty:   'easy' | 'medium' | 'hard',
  mvpWeeks:     [min, max],   // estimated build time range
  revenueRange: string,       // e.g. '$29–$99/mo'
  arr:          string,       // e.g. '$350K–$1.2M'
  painScore:    number,       // 0–100
  marketSize:   'Small' | 'Medium' | 'Large' | 'Huge',
  competitors:  string[],
  edge:         string,       // your differentiating angle
  tags:         string[],
  techStack:    string[],
}
```

To add new ideas, append to the `IDEAS` array in `app.js` following the same schema.

---

## Design System (`styles.css`)

CSS custom properties used throughout:

```css
--bg, --surface, --card       /* background layers */
--border, --border-hi         /* borders */
--accent                      /* primary: indigo #5b4cff */
--amber                       /* secondary: #f0a500 */
--green, --red                /* success / danger */
--text, --text-2, --text-3    /* text hierarchy */
```

---

## Extending the App

**Add a new idea:** Append to `IDEAS` in `app.js` with all required fields.

**Add a new filter:** Add an `<option>` to the relevant `<select>` in `index.html` and update the filter logic in `generate()`.

**Add a new validation dimension:** Add an entry to `CRITERIA_CONFIG` in `validate.html` following the existing pattern — each criterion needs a `name`, `icon`, and `describe(idea)` function that returns `{ score, detail }`.

**Persist to a backend:** Replace the `Store` helper in `app.js` with API calls — the interface (`get`, `set`, `remove`) is the same.

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires ES6+ and `localStorage`. No IE support.

