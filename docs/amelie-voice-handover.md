# Inner Lotus — Amelie's Voice & Sessions: Brainstorming Handover

**Purpose of this note:** so you can brainstorm Amelie's *words* in a separate chat (paste this
whole note in), without touching code. Bring the finished phrase lists back and they drop into
the app. This defines each session's **purpose, boundaries, tone, and exactly which phrase
lists are needed** (and how many of each).

---

## 0. THE BIG TONE SHIFT (most important — apply everywhere)

Amelie is a **companion beside you**, not a service doing things *for* you. The current draft
too often sounds like a concierge or therapist "treating" the reader. Fix that.

- **Away from (service / being "treated"):** "I'll keep you company," "I'll do the rest,"
  "I saved you a calm minute," "let me take care of that for you," "you're in good hands."
- **Toward (companion / together):** "I'm your morning companion," "we'll do this together,"
  "I'm right here with you," "let's take this minute, you and me," "stay with me — we'll
  breathe through it."

Two moves make the shift:
1. **Identity** — Amelie says who she *is* to you: *"I'm your…", "I'm here with you."*
2. **Togetherness** — "**we / us / let's / together**", not "I'll do X for you."

Everything else stays: **short lines, warm, a little dry wit, NO guilt** ("you missed", "don't
forget", "you're behind"), **no clinical/therapy language**, **no streaks/competition**, and
the visual/voice is warm and grounded, **never spirit-y or spooky**.

**Quick test for any line:** does it sound like a *friend sitting beside me*, or a *service
doing me a favour*? Keep the friend.

---

## 1. ONE AMELIE, THREE REGISTERS (moods)

- **Morning** — brighter, gently rousing. "Let's meet the day together."
- **Midday** — her **brightest**: cheerful, encouraging, a warm cheerleader. A quick lift.
- **Evening** — softer, slower, tender. Listens more than she talks.

---

## 2. MORNING — purpose, boundaries, phrase lists

**Purpose:** *energise and prepare* for the day — lift mood, wake attention, set an intention,
start it together.
**Boundaries:**
- Uplifting / activating. **Not** sleepy or wind-down.
- The one calming session ("Steady the Storm") is only for rough/sleepless/anxious mornings,
  and is framed **"settle so we can start,"** never "wind down to sleep."
- Consistency is **rhythm**, never a streak or a guilt trip.

**Phrase lists needed (each ≥ 14 lines — the two-week no-repeat rule):**
| List | What it is |
|---|---|
| `MORNING_GREETING_NOTIFICATIONS` | The push notification — "thinking of you, let's begin" |
| `MORNING_OPENERS` | The first in-app line when they open the morning |
| `MORNING_ENERGY_PROMPTS` | Step-1 question: invite an *energy* (not a mood) |
| `MORNING_PURPOSE_PROMPTS` | Step-2 question: a *purpose* for today |
| `MORNING_NUDGES` | Occasional, gentle "you're building a rhythm" lines |

**Fixed (not lists, already drafted):** the 6 meditation "seeds" (a zen quote / mini-story per
session) and the spoken audio scripts live in `docs/meditation-scripts.md`.
**Chip labels (fixed):** energies — Calm · Bright · Grounded · Light · Focused · Warm · Steady ·
Open. Purposes — Focus · Peace · Energy · Self-compassion · Letting go · Confidence · Rest ·
Balance.

---

## 3. MIDDAY — purpose, boundaries, phrase lists

**Purpose:** a **feather-light lift** — a quick, cheerful "just thinking of you" that brings a
small smile. A mental micro-getaway, like a friend's midday text.
**Boundaries:**
- Her brightest, most upbeat register. **One or two lines, max.**
- **Not** a practice, not a check-in, no tasks. At most a single breath.
- May gently nod to the morning's pick ("you reached for *steady* this morning — still with
  you"). Never guilt for not having done the morning.

**Phrase lists needed (≥ 14):**
| List | What it is |
|---|---|
| `MIDDAY_BOOSTERS` | The one-line lift (push + in-app). Bright, warm, quick. |
| `MIDDAY_BOOSTERS_TAILORED` *(optional, nice-to-have)* | A few variants that reference the chosen morning energy/purpose |

---

## 4. EVENING — purpose, boundaries, phrase lists

**Purpose:** wind down, **reflect + give thanks, together** — like texting a close friend to
decompress. Optionally a short calming wind-down first (this is where body-scan/release lives).
**Boundaries:**
- Softest, slowest register. **Listen more than talk.** Brief, warm acknowledgments.
- Gratitude is folded **into the same chat** (not a separate form).
- **No analysis, no advice, no fixing, no diagnosing.** Just presence and warmth.
- No guilt if they skipped the day. Gentle, safe, unhurried.

**Phrase lists needed (each ≥ 14 unless noted):**
| List | What it is |
|---|---|
| `EVENING_GREETING_NOTIFICATIONS` | The push — "thinking of you, come sit with me a minute" |
| `EVENING_OPENERS` | The ice-breaker that starts the chat / invites them to open up |
| `GRATITUDE_PROMPTS` | Asking for one good thing from today, inside the chat |
| `CLOSING_LINES` | A warm good-night to end on |
| `REFLECTION_ACKNOWLEDGMENTS` | Short warm replies after they share (see note) |

**Note on acknowledgments:** the app picks these by simple cues (how long the reply is, a few
keywords), so it helps to write them in **small groups by mood** rather than one big list:
- **Heavy / hard day** (~8 lines) — gentle, holding, no fixing.
- **Good / light day** (~8 lines) — warm, glad-with-you.
- **Neutral / tired / unsure** (~8 lines) — soft, accepting.

---

## 5. THE "2-WEEK STOCK" RULE

Every rotating list ships with **at least 14 lines** so nothing repeats within 14 days. Fixed
items (the 6 meditation seeds, the chip labels) are exempt. More than 14 is welcome.

---

## 6. WHERE THE WORDS LIVE (for when you bring them back)

Flat lists of plain strings, zero logic — safe to edit freely:
- Morning → `src/content/persona/morning.ts`
- Midday → `src/content/persona/midday.ts`
- Evening → `src/content/persona/evening.ts`

Hand me the finished lists (or paste them in) and I'll wire them in.

---

## 7. A FEW "BEFORE → AFTER" EXAMPLES TO SET THE TONE

- ❌ "I'll keep you gentle company through the day." → ✅ "I'm your companion through the day —
  we'll move through it together."
- ❌ "Let your eyes close. I'll do the rest." → ✅ "Let your eyes close — I'm right here, we'll
  breathe together."
- ❌ "I saved you a calm minute or two." → ✅ "Let's steal a calm minute, you and me."
- ❌ "However today unfolds, you gave it a gentle start." → ✅ "However today unfolds, we began
  it gently — together."
