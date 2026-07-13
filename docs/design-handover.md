# Inner Lotus — UI/UX Design Handover (v1)

**Purpose.** Enough to design or redesign Inner Lotus end-to-end — the calm, warm daily
companion app. Values in **numbers/hex** (not code) so any tool (Figma, Sketch, pen and
paper) can use it. This file mirrors what's currently built; a designer can propose changes
to any part of it — nothing here is untouchable.

Companion doc: `docs/amelie-voice-handover.md` (the phrase pools & tone reference).

---

## 1. Product & feel (60-second brief)

**What it is.** A gentle daily companion named **Amelie** who meets the user three times a
day — an energising morning practice, a feather-light midday lift, and a tender evening
wind-down + reflection chat. Never a streak tracker. A companion, not a coach.

**Feel target.** Calm, elegant, dawn-inspired. Warm, grounded, physical (sunlit-lantern
warmth). Gently witty. **Never** spirit-y, spooky, ethereal, clinical, or productivity-coded
— those cues can distress an anxious or panic-prone user, which is the opposite of the
purpose.

**Design principles.**
1. **Companion, not service.** Everything reads as "we, together," not "I'll do that for you."
2. **Rhythm, never streaks.** Consistency is acknowledged softly; no counters, red states, or
   guilt language.
3. **Warm & grounded.** Sunlit, rounded, physical. Avoid cold glow, floating orbs, wisps.
4. **Generous space.** Big margins, big line-heights, one thing at a time.
5. **Safety first.** Nothing that could feel spectral, watching, or clinical.

---

## 2. Amelie — the character

**Two visual forms:**
- A **glowing orb / petal** shown on hero moments (home, onboarding, session, midday, done).
- Her **spoken lines** in the UI, always visually distinct from system chrome (warmer color,
  a touch larger, softer weight — reads as *her voice*, not a system message).

**The orb — hard rules (safety):**
- Warm, sunlit, grounded — like a paper lantern or dawn light.
- **Not** cold-glow, translucent, wispy, drifting, hovering, or flickering.
- Slow *resting-breath* motion (~9-second full cycle), plus slow **radiating rings** that ease
  outward and fade (morning sun-ray feel). Never fast, never sparkling.
- Palette shifts subtly by time of day (see §3.4).

**Three registers (moods), one character:**

| Register | When | Feel |
|---|---|---|
| Morning | 07:30–09:00 | Brighter, gently rousing, softly energising |
| Midday  | 11:45–14:15 | Her **brightest** — cheerful, warm cheerleader, quick lift |
| Evening | 18:30–22:00 | Softest, slowest, tender, listens more than talks |

**Voice rules (short version — full list in `amelie-voice-handover.md`):**
- Short lines. Warm. Dry, gentle wit.
- **Never** guilt language ("you missed", "don't forget", "you're behind").
- **Never** clinical/therapy words ("safe space", "process", "hard day?").
- Companion tone: "we / us / let's / together" — not "I'll take care of this for you."

---

## 3. Theme

### 3.1 Palette (light mode)

| Token | Hex | Use |
|---|---|---|
| `cream` (background) | `#FFF8F1` | App background base |
| `ink` (primary text) | `#332A2A` | Titles & body |
| `muted` (secondary text) | `#7A6B68` | Sub-copy, hints, captions |
| `lotus` (primary / brand) | `#D96F9F` | Primary buttons, key accents, Amelie's brand color |
| `peach` | `#F8B88B` | Warm accents (orb mid-layer, gradients) |
| `gold`  | `#F6D36B` | Bright accents (orb halo, gradients) |
| `mist`  | `#BBDDE6` | Cool accent (rarely used, morning gradients) |
| `lavender` | `#CDBEEB` | Evening accents |
| `sage`  | `#C9D8B6` | Ancillary accent |
| Surface (glass card) | `rgba(255,255,255,0.72)` | Card fill on gradients |
| Surface strong | `#FFFFFF` | Opaque card (chat user bubble) |
| Border | `rgba(255,255,255,0.85)` | Card borders on gradients |
| **Amelie voice text** | `#6E4A63` | Her spoken lines only (distinct from `ink`) |
| Shadow | `rgba(90,56,42,0.18)` | Soft drop shadow on cards |

### 3.2 Palette (dark mode — warm dusk, NOT flat purple)

| Token | Hex |
|---|---|
| Background base | `#2E2743` |
| Surface strong | `#3C3159` |
| Surface (translucent) | `rgba(255,255,255,0.06)` |
| Border | `rgba(255,255,255,0.12)` |
| Ink (primary text) | `#F5EEF6` |
| Muted (secondary) | `#C2B4D0` |
| Primary (unchanged) | `#D96F9F` |
| On primary | `#2A1830` |
| **Amelie voice text** | `#E7C7DC` |
| Shadow | `rgba(0,0,0,0.4)` |

Rule: dark mode should still feel like a warm dawn, never a dull flat dark purple.

### 3.3 Full-screen gradients (per window, top → bottom stops)

**Morning**
- Light: `#FFF8F1` → `#FFE4D2` → `#F7D6E5`
- Dark:  `#2E2743` → `#4A3557` → `#5E4056`

**Midday**
- Light: `#FFFBEF` → `#FFE9C9` → `#FBD7C2`
- Dark:  `#2E2743` → `#4E3A52` → `#614642`

**Evening**
- Light: `#F3E9F5` → `#DCC9EB` → `#BBAAD9`
- Dark:  `#241C3A` → `#352B50` → `#443660`

Gradients cover the whole screen behind all content. Cards and chips sit on top with
translucent-warm fills so the gradient breathes through.

### 3.4 Orb palettes (core → mid → halo)

| Window | Core | Mid | Halo (translucent) |
|---|---|---|---|
| Morning | `#FFE9A8` | `#F8C98B` | `rgba(248,184,139,0.55)` |
| Midday  | `#FFF0C4` | `#FAD79A` | `rgba(246,211,107,0.55)` |
| Evening | `#E7C7DC` | `#CDBEEB` | `rgba(176,156,214,0.50)` |

### 3.5 Typography

System font stack is fine (SF on iOS, Roboto on Android). If a custom family is wanted, choose
a warm, slightly rounded humanist sans (e.g. Nunito) and consider a soft serif (e.g. Fraunces
in a light weight) **for Amelie's spoken lines only**, to give her "voice" character.

| Role | Size / line-height | Weight | Notes |
|---|---|---|---|
| Title (H1) | 30 / 36, letter-spacing −0.5 | 800 | Screen headings |
| Amelie's voice | 22 / 31, letter-spacing +0.2 | 600 | Her spoken lines. Warmer color. |
| Amelie's voice (larger, hero) | 25 / 36 | 600 | Session seed, evening opener |
| Body | 16 / 22 | 400 | Default paragraph |
| Muted / caption | 14–16 / 20–23 | 400–500 | Hints, timestamps |
| Button label | 17 | 800 | ALL CAPS not used |
| Chip label | 16 | 600 (700 when selected) | |
| Section eyebrow | 13, tracking 1, UPPERCASE | 800 | e.g. "STEP 1 OF 2" |

### 3.6 Corner radii, spacing, motion

**Corners.** Cards `26`, chips `999` (pill), buttons `999` (pill), input `20`, chat bubble
`20` with a tail corner at `6` (bubble tail toward speaker).

**Spacing scale.** Multiples of 4. Common values used: `6, 8, 10, 12, 14, 16, 18, 20, 22, 24,
26, 28`. Screens use 22 horizontal padding and 12–16 vertical.

**Motion — calm and slow, always.**
- Route transitions: fade, ~250 ms.
- Chip select: gentle lift `-2 px`, no bounce.
- Orb breath cycle: **~9 s** (in + out combined).
- Orb radiating rings: **~5.6 s** each, staggered ×3.
- Amelie "typing" reveal in chat: **~650 ms** delay per message.
- Never bounce, spring, or overshoot. Ease `sin`/`quad`.

---

## 4. Components (a small kit)

### 4.1 `Screen` (window-tinted gradient wrapper)
Full-height container with the window's gradient (§3.3), safe-area aware, 22 horizontal
padding. Every top-level screen uses one.

### 4.2 `AmelieOrb`
Concentric warm layers — halo → mid → core — plus 3 outward *radiating rings* that fade.
Slow breath scale `0.94 ↔ 1.04`. Two common sizes in current UI: **~140** (hero) and **~200**
(during practice).

### 4.3 `Title`, `AmelieLine`, `Muted`
Three text primitives (see §3.5). `AmelieLine` is the *only* one in the warmer voice color.

### 4.4 `Chip` (selectable pill)
Pill, `paddingH 18 / paddingV 12`. Fill = translucent surface. Border = `1.5px`, `border`
color when unselected, `primary` (lotus) when selected. Selected state also lifts `-2 px`.
Label weight 600 → 700 on select.

### 4.5 `PrimaryButton`
Pill, min height 54, `paddingH 24 / paddingV 16`. **Two variants:**
- **Solid** (default) — fill `primary`, label `onPrimary`. Used once per screen as the main
  next action.
- **Ghost** — transparent fill, `1.5px` `primary` border, label `primary`. Used for
  secondary/alt actions (e.g., "Settle first — a quiet wind-down" on the evening landing).

Disabled state = `opacity 0.5`. Loading state = replace label with a small spinner in the
label color.

### 4.6 `SoftCard`
Translucent surface, `1px` border, radius 26, padding 18. Used for grouped content
(text-input container, window toggle rows, history entries).

### 4.7 `TextInput`
Sits inside a `SoftCard`. Font 20 for onboarding name; 16 for chat. No border of its own —
the card provides the outline.

### 4.8 Chat bubbles
Two shapes:
- **Amelie**: no bubble background at all. Just her `AmelieLine` text, left-aligned, `max
  width 86%`, sitting on the gradient. Reads as her *speaking*, not a chat blob.
- **User**: opaque white bubble (`surfaceStrong`), radius 20, tail corner (bottom-right) at 6.
  Right-aligned, `max width 82%`, `paddingH 15 / paddingV 11`.

While Amelie is "thinking" between messages, show a small muted line ("Amelie is here…")
below the last message, left-aligned.

### 4.9 `Switch` (three-window toggles in onboarding)
Standard platform switch; on-track color = `primary`. Sits inside a `SoftCard` row with a
label + hint.

---

## 5. Screens (structure + content)

Route paths shown in `code style` are for reference only. Rotating lines (Amelie's) are
picked from the pools in `amelie-voice-handover.md` with a two-week no-repeat rule.

### 5.1 Onboarding `/onboarding`
Four small steps, one screen each, on the **morning** gradient. Warm-minimal.

1. **Welcome** — hero orb, title "Hello — I'm Amelie.", one warm intro line, primary button.
2. **Name** — title "What should I call you?", one supportive line, one `SoftCard` with a
   text input, primary button "Continue". `autoFocus`, `returnKeyType: done`.
3. **Windows** — title "When shall I check in?", one supportive line, then **three `SoftCard`
   rows** with a switch each: *Morning · 7:30–9:00*, *Midday · 11:45–2:15*, *Evening ·
   6:30–10:00*. Each shows a short hint ("A calm, energising start", "A quick, cheerful
   lift", "Wind down & reflect"). All on by default.
4. **Notifications permission** — hero orb, title "One last thing.", a warm ask for
   notification permission ("how I'll find you through the day — never noisy…"), primary
   button "Let's begin". Errors show as a soft muted line above the button.

### 5.2 Home `/`
Morning gradient. Two zones:
- **Hero (top)**: orb, greeting title ("Morning, {name}." if name is set, else "Good morning."),
  one rotating morning opener in Amelie's voice.
- **Actions (bottom)**: solid primary "Let's begin the morning", muted supporting line, and a
  small horizontal row of secondary text links: **Midday · Evening · History**.

### 5.3 Morning check-in `/morning/check-in`
Morning gradient. Two-step flow on one route.
- Eyebrow "Step 1 of 2", title = rotating energy prompt, Amelie line "Not how you are — how
  you'd like to be.", **chip row** of eight energy chips (`Calm, Bright, Grounded, Light,
  Focused, Warm, Steady, Open`) centered/wrapped. Primary "Next" (disabled until a chip is
  picked).
- Same layout for Step 2: eyebrow "Step 2 of 2", title = rotating purpose prompt, Amelie
  line "You're inviting in `{energy.toLowerCase()}`. What would help it grow?", chip row of
  eight purpose chips (`Focus, Peace, Energy, Self-compassion, Letting go, Confidence, Rest,
  Balance`). Primary "Find my practice" (loading spinner while it saves + resolves).

### 5.4 Session `/morning/session`
Same route serves the morning meditations *and* the evening wind-down (a `window` param
switches gradient + copy). Three phases:

1. **Seed (eyes-open)** — small muted line "{Title} · {N} min" then a large Amelie line with
   the session's *seed* (a short mini-story). Primary "Begin — close your eyes, I'm with
   you." (Evening variant reads "Let your eyes close. We'll take this slowly.") If audio
   isn't recorded yet, show a muted line "Amelie's voice for this one is coming soon — for
   now, follow the orb's breath."
2. **Practice (eyes-closed)** — the orb enlarged (~200), one Amelie line, then a minimal
   progress bar and two small text controls (Pause/Play, End gently). Nothing to look at —
   the interface is *for closed eyes*.
3. **Done** — small orb, warm closing title, one Amelie line, primary button. Morning: "That's
   the day begun." → "Carry on with your day". Evening wind-down: "The day is set down now."
   → "Now, a little reflection" (goes to the chat).

### 5.5 Midday `/midday/lift`
Midday gradient. Absolute minimum content — no practice.
- Centered orb + one Amelie line (rotating). If the user did a morning check-in, that line
  gently echoes the *quality* they chose (never "you chose X").
- Primary "Back into the day".

### 5.6 Evening landing `/evening`
Evening gradient. Warm invitation.
- Hero orb, title "Evening.", one Amelie line inviting either the wind-down or the chat.
- Two buttons: **solid** "Let's talk a little" and **ghost** "Settle first — a quiet
  wind-down".

### 5.7 Evening chat `/evening/chat`
Evening gradient. Texting-style reflection + gratitude conversation.
- Vertical `ScrollView` of bubbles (see §4.8). Amelie bubbles slide in with the ~650 ms
  reveal. A muted "Amelie is here…" line shows while she's "thinking" between messages.
- Sticky bottom input row: multi-line `TextInput` (min 48 / max 120 tall) inside a soft pill
  shape, and a solid **Send** pill button (`primary` fill, disabled when empty or when
  Amelie hasn't asked yet).
- Rough flow: Opener → user reflects → Amelie *acknowledgment* (mood-picked) → gratitude
  prompt → user reply → warm acknowledgment → closing line. Once done, the composer swaps
  for a solid "Good night" button.
- If the day's chat is already complete, it opens read-only with a muted line "We already
  shared the evening. Rest well."

### 5.8 History `/history`
Evening gradient. Two sections in a scroll view:
- **Good things** — cards, one per gratitude entry: small date, then the entry text in
  Amelie-voice style.
- **Mornings** — cards, one per check-in: date on the left, "{energy} · {purpose}" on the
  right.
- Empty state: one muted line ("Nothing here yet — after a few check-ins and evenings, your
  trail will fill in softly.").
- Ghost "Back" button at the bottom.

---

## 6. Layout patterns

- **One-thing-at-a-time.** Never crowd. Even the "big" screens (check-in, chat) only ask for
  one input at a time.
- **Hero top, action bottom.** Most screens split as: hero content upper 60%, primary action
  at the bottom, breathing room in between.
- **Card usage.** Cards group *inputs and toggles* only. Text and Amelie lines sit directly
  on the gradient — they *are* the voice, they don't need a container.
- **Right-align user, left-align Amelie.** In chat, always.

---

## 7. States (please design for these)

For every button/chip/input, please cover:
- default, hover (web/desktop), pressed, focused, disabled, loading (buttons only),
  error (inputs only — subtle warm red, no shouting).

For every screen, please cover:
- normal, loading, empty (where applicable), error (only where a save matters — a muted
  warm line above the primary action, never a modal).

Notifications preview cards (design suggestion): show what a scheduled notification looks
like on lock screen — one line, warm, quiet.

---

## 8. Accessibility (please respect)

- Contrast: text ≥ 4.5:1 on background at both light and dark. Amelie's voice color has been
  tuned to meet this — please keep it that way if palettes change.
- Type: nothing below 14. Line-heights ~1.4×.
- Tap targets: minimum 44 × 44.
- Never rely on color alone (chip selected state also lifts and thickens; error uses word +
  color).
- Motion: respect "Reduce Motion" (if enabled, keep the orb still or cross-fade only; no
  radiating rings, no bubble slide).
- Screen reader: title first, then Amelie's line, then controls. Chips announce their
  selected state.

---

## 9. Iconography

**Currently used:** none — we use warm emoji sparingly (leading many Amelie lines) which
carries the visual mood without a full icon set. If icons are added later, keep them:
- Line style, 1.5–2 px stroke, rounded ends.
- Warm color (`ink` or `primary`).
- Small and used only in secondary spots — never at hero size.

If an app icon is designed, follow the orb visual language (warm sunlit lantern), never a
literal lotus flower rendered too coldly.

---

## 10. What's OFF-limits

Please do **not** propose:
- Streak counters, badges, XP, points, "missed" states, red states.
- "How are you feeling?" mood questionnaires (the check-in is upward-framed — energy /
  purpose — on purpose).
- Character illustrations of a person or spirit.
- Ghostly, ethereal, wisp, flame, or particle-drift effects for the orb.
- Rigid time-based locks (Midday, Evening, History are reachable from Home any time —
  intentional, especially early on).
- Anything that reads as clinical, medical, or therapy-app.

---

## 11. Handover checklist for the designer

Please deliver, in one Figma file (or equivalent):
- **Foundations page**: color styles (light + dark), text styles, elevation/shadow, spacing
  scale, radii.
- **Components page**: `AmelieOrb` (all three windows), `PrimaryButton` (solid + ghost, all
  states), `Chip`, `SoftCard`, `TextInput`, chat bubbles (Amelie + user), `Switch` row,
  gradient `Screen` frames per window.
- **Screens page**: all screens in §5, in **light and dark**, with **error / loading /
  empty** variants where relevant, plus a lock-screen notification preview per window.
- **Motion**: notes on any motion changes to §3.6; short Lottie/After-Effects for the orb is
  a nice-to-have but not required.
- **Copy hooks**: mark where rotating lines from `amelie-voice-handover.md` are inserted —
  we swap those in from data, not from Figma.

---

## 12. Companion docs to keep alongside this one

- `docs/amelie-voice-handover.md` — the phrase pools, tone rules, and what to write for
  morning/midday/evening.
- `docs/meditation-scripts.md` — the spoken narration scripts for the six morning
  meditations (relevant if audio companions are ever visualised, e.g., a waveform).

---

Thanks — and please don't hold back. If any of this feels off, propose an alternative;
we'll happily rework the app around a stronger design.
