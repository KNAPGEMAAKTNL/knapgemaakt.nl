# AI Content Creation SOP for Dutch B2B Markets

> **Purpose**: This Standard Operating Procedure guides AI-assisted content creation that passes Google's quality evaluation, reads as genuinely human, and resonates with Dutch business audiences.

---

## Table of Contents

1. [Quick-Reference Decision Tree](#1-quick-reference-decision-tree)
2. [Core Principles](#2-core-principles)
3. [Detection Science: What Gets Flagged](#3-detection-science-what-gets-flagged)
4. [Dutch Market Adaptation](#4-dutch-market-adaptation)
5. [Prompt Framework & Templates](#5-prompt-framework--templates)
6. [Editing Playbook](#6-editing-playbook)
7. [Find-and-Replace Reference](#7-find-and-replace-reference)
8. [Checklists](#8-checklists)

---

## 1. Quick-Reference Decision Tree

```
START: You need B2B content for Dutch market
│
├─► STEP 1: Determine Content Type
│   ├─ Homepage/Service page → Use Dutch-specific prompts + Direct value prop
│   ├─ Thought leadership blog → Long-form with experiential markers (1500+ words)
│   ├─ SEO capture blog → Short-form with direct answers (500-800 words)
│   └─ FAQ/Meta content → Use specific templates below
│
├─► STEP 2: Determine Human Touch Level
│   │
│   │  LOW TOUCH (AI + Light Edit)          HIGH TOUCH (AI + Heavy Edit)
│   │  ─────────────────────────────        ─────────────────────────────
│   │  Informational/Definition/FAQ         Conversion/Thought Leadership
│   │  Top-of-funnel awareness              C-Suite decision makers
│   │  Consensus knowledge                  Experience-based content
│   │  Neutral/instructional tone           Persuasive/culturally specific
│   │  Low E-E-A-T necessity                Critical E-E-A-T necessity
│
├─► STEP 3: Generate AI Draft
│   └─ Use appropriate template from Section 5
│
├─► STEP 4: Evaluate Draft
│   ├─ >50% off-topic or wrong tone → REGENERATE with refined prompt
│   └─ Structure sound, needs humanizing → EDIT using Playbook (Section 6)
│
└─► STEP 5: Before Publishing
    ├─ Run vocabulary tell search (Section 7)
    ├─ Verify sentence length variation (burstiness check)
    ├─ Read aloud test
    └─ Apply Dutch tone calibration
```

---

## 2. Core Principles

### 2.1 What Google Actually Measures (2024-2026)

| Signal | What It Means | Action Required |
|--------|---------------|-----------------|
| **Experience (E-E-A-T)** | First-person details, specific verifiable claims, original insights | Include "I/We" statements with non-generic specifics |
| **Helpful Content System** | Site-wide quality signal—poor content anywhere affects all rankings | Maintain quality across entire domain |
| **SpamBrain Detection** | Identifies structural uniformity, publication velocity spikes, linguistic patterns | Vary structure, publish consistently, humanize language |
| **Satisfaction Signals** | Users completing their journey on your content vs. "pogo-sticking" back to search | Fully answer the query; provide genuine value |

### 2.2 The E-E-A-T Experience Detector

Google differentiates between **knowing facts (Expertise)** and **living them (Experience)**:

| Signal Type | What Google Looks For | How to Demonstrate |
|-------------|----------------------|-------------------|
| First-person language | "I tested," "In my experience," "We found" | Include genuine observations from actual use |
| Specific verifiable details | Exact numbers, dates, product names, company names | "I've run this setup for 18 months" not "I've used this extensively" |
| Original photos/screenshots | Evidence of hands-on engagement | Include original visuals, not stock |
| Acknowledged limitations | Real experts know nothing works universally | "This approach struggles when..." |
| Trade-off discussions | Understanding of nuance | "The speed gain comes at the cost of..." |

**Example Contrast**:
- ❌ Expertise only: "CRM software helps manage contacts"
- ✅ Experience: "When we migrated 5,000 contacts to HubSpot, we found the deduplication tool struggled with Dutch prefixes"

### 2.3 Essential vs. Nice-to-Have

| Essential (Do Every Time) | Nice-to-Have |
|---------------------------|--------------|
| Vary sentence lengths (5-30 words) | Video testimonials |
| Remove AI vocabulary tells | Schema markup |
| Add specific examples with names/numbers | A/B testing variations |
| Include experiential markers | Detection tool testing |
| Apply Dutch directness calibration | Third-party review badges |
| Verify all facts/statistics | Advanced internal linking |
| Read-aloud test | |

---

## 3. Detection Science: What Gets Flagged

### 3.1 Burstiness (Sentence Length Variation)

**Definition**: Measures variation in sentence structure and length throughout a document.

| Pattern | Characteristic | Example Word Counts |
|---------|---------------|---------------------|
| **AI (Low Burstiness)** | Uniform, clustered within 3-4 words | 16, 18, 15, 17, 19, 16, 18 |
| **Human (High Burstiness)** | Varied, dramatic differences | 8, 23, 15, 6, 31, 12, 4, 18 |

**Quick Check**: Count words in 5 consecutive sentences. If all fall within 3-4 words of each other → restructure for variation.

### 3.2 Perplexity (Word Predictability)

**Definition**: Measures how "surprising" word choices are.

| Pattern | Characteristic | Example |
|---------|---------------|---------|
| **AI (Low Perplexity)** | Follows probability—predictable, "safe" choices | "It is important to note that..." |
| **Human (High Perplexity)** | Surprising choices, idiosyncratic expression | "Here's the thing nobody tells you..." |

### 3.3 AI Vocabulary Fingerprints

**Words AI Overuses (150x+ compared to humans)**:
- "Tapestry," "camaraderie"

**Words AI Overuses (60-100x)**:
- "Delve," "underscore," "commendable," "nuanced," "palpable," "meticulous"

**Words AI Overuses (10-50x)**:
- "Robust," "pivotal," "crucial," "comprehensive," "transformative," "innovative," "cutting-edge," "leverage," "endeavour," "streamline," "seamless"

**Phrase Patterns That Signal AI**:
- "In today's ever-evolving landscape"
- "It's important to note that"
- "In the realm of"
- "Furthermore... Additionally... Moreover" (in sequence)
- "Unlock the secrets/potential/power of"
- "Not only X but also Y" (repeatedly)
- "At the end of the day"
- "In conclusion"

### 3.5 Punctuation Tells: Em-Dashes and En-Dashes

**Critical Rule: Avoid dashes in Dutch content.**

AI heavily overuses em-dashes (—) and en-dashes (–) as a "safe" way to connect clauses. Dutch writers rarely use them in prose. This is one of the clearest AI fingerprints.

| AI Pattern | Human Alternative |
|------------|-------------------|
| `**Term** — explanation` | `**Term.** Explanation` |
| `€500 – €1.500` | `€500 tot €1.500` |
| `that's important — and here's why` | `that's important. Here's why` or use a comma |
| `both options work — as long as you` | `both options work, as long as you` |

**Replacements**:
- Use **periods** to separate definition-style content
- Use **commas** for natural clause connections
- Use **colons** to introduce lists or explanations
- Use **"tot"** for price/number ranges in Dutch

### 3.4 SpamBrain Detection Vectors

1. **Velocity Monitoring**: Sudden spike in publication (2 posts/week → 50 posts/day)
2. **Structural Fingerprinting**: Identical templates with only keywords swapped
3. **Fuzzy Hashing**: Slightly reworded but semantically identical to existing web content

---

## 4. Dutch Market Adaptation

### 4.1 Core Dutch Communication Principles

**Foundation: "Recht door zee" (Straight through the sea)**

| International Approach | Dutch Adaptation |
|----------------------|------------------|
| Build rapport before business | Get to the point immediately |
| Soft-pedal negatives | State limitations directly |
| Heavy enthusiasm | Understated confidence |
| "The best solution for..." | "A practical solution that..." |
| Aspiration-focused | Results-focused |

**The "Doe Maar Gewoon" Test**: Before publishing, ask: "Does this sound like showing off?"

Dutch sayings reinforce this:
- "Doe maar gewoon, dan doe je al gek genoeg" (Just act normal, that's crazy enough)
- "Steek je kop niet boven het maaiveld uit" (Don't stick your head above the mowing field)

### 4.2 Register Guide: "U" vs. "Je"

| Context | Register | Example |
|---------|----------|---------|
| Tech/SaaS B2B | Je/jij | "Zo bespaar je tijd" |
| Creative/Marketing agencies | Je/jij | "Bekijk wat dit voor je kan betekenen" |
| Finance/Legal/Healthcare | U (initially) | "Wij helpen u graag verder" |
| Government/Public sector | U | "Kunt u mij vertellen..." |
| First email to unknown person | U, then follow their lead | Switch if they use "je" |
| Website copy (most B2B) | Je/jij | More approachable |

**Default Rule**: When in doubt for B2B tech/services, use "je."

**Critical Error**: AI frequently switches between u and je within the same text. This immediately destroys trust with native speakers.

### 4.3 Enthusiasm Calibration

| Level | Dutch Perception | When to Use |
|-------|-----------------|-------------|
| Excited superlatives | Insincere, suspicious | **Never** |
| Confident claims | Needs evidence | Only with specific proof |
| Factual statements | Trustworthy | **Default approach** |
| Understated results | Credible, respectable | Best for case studies |

**Example**:
- ❌ American: "We're absolutely THRILLED to announce our revolutionary, game-changing solution!"
- ✅ Dutch: "We've developed a practical solution that helps you work more efficiently. Here are the results."

### 4.4 Phrase Swaps: International → Dutch

**Headlines and CTAs**:

| Don't Say | Say Instead |
|-----------|-------------|
| "Unlock your potential" | "Bespaar [X] uur per week" |
| "Revolutionary platform" | "Praktische oplossing voor [specific problem]" |
| "World-leading solution" | "Gebruikt door [X] Nederlandse bedrijven" |
| "Transform your business" | "Resultaten die je morgen kunt zien" |
| "Get started today!" | "Aan de slag" or "Plan een gesprek" |
| "Learn more" | "Lees verder" or "Bekijk hoe het werkt" |
| "Success stories" | "Klantverhalen" or "Resultaten" |

**Body Copy**:

| International Pattern | Dutch Alternative |
|----------------------|-------------------|
| "We're passionate about..." | "Wij helpen bedrijven met [specific outcome]" |
| "Our amazing team" | "Ons team van [X] specialisten" |
| "Incredible results" | "Gemiddeld [X%] verbetering in [metric]" |
| "Best-in-class service" | "Reactietijd van gemiddeld [X uur]" |
| "Trust us" | "Dit zijn de resultaten bij vergelijkbare klanten" |

### 4.5 Dutch Modal Particles (Natural Language Markers)

| Particle | Effect | Example |
|----------|--------|---------|
| even | Softens, makes casual | "Neem even contact op" |
| toch | Adds emphasis/confirmation | "Dat is toch logisch" |
| maar | Softens commands | "Vraag maar een demo aan" |
| gewoon | Normalizes, de-emphasizes | "Gewoon goed werk" |

**Translated-Sounding** (Avoid):
> "Ons bedrijf is toegewijd aan het leveren van uitstekende klantenservice"

**Natural Dutch** (Use):
> "We helpen je graag verder—snel en persoonlijk"

### 4.6 "Jeukwoorden" (Itch Words) to Avoid

Dutch readers find these English loan words/phrases irritating:
- "In je kracht staan" (Standing in your power)
- "Agile werken" (as buzzword, not methodology)
- "Commitment" → Use: betrokkenheid, toewijding
- "Alignen" → Use: afstemmen
- "Meeting" → Use: overleg, vergadering (unless tech context)

### 4.7 False Friends (Valse Vrienden)

| Dutch Word | AI Often Translates As | Correct Meaning |
|------------|----------------------|-----------------|
| Eventueel | Eventually (in the end) | Possibly/Optionally |
| Actueel | Actual (real) | Current/Up-to-date |
| Administratie | Administration (management) | Bookkeeping/Records |
| Miljard | Billion | Correct—but "Trillion" is Dutch "Biljoen" |

### 4.8 Dutch Trust Signals

| Signal | Importance |
|--------|------------|
| ISO/NEN certifications | Critical for credibility |
| Physical address (not PO Box) | Essential legitimacy marker |
| Local phone number (+31) | Trust signal |
| Dutch case studies | More valuable than international ones |
| Keurmerken (quality marks) | Industry-specific credentials |

### 4.9 What Dutch Readers Find Insincere

- Superlatives without evidence ("Best," "leading," "world-class")
- Multiple exclamation marks
- Fake urgency ("Only 3 spots left!")
- Self-congratulation ("Our incredible team")
- Vague promises ("Transform your business")
- American-style testimonials ("This changed my life forever!")
- Over-politeness in copy
- Status display (emphasizing awards, offices)

---

## 5. Prompt Framework & Templates

### 5.1 Universal Context Elements (Include in Every Prompt)

```
ROLE: [Who is "writing" this—establishes expertise level and vocabulary]
CONTEXT: [Company, product/service, situation]
AUDIENCE: [Specific persona, knowledge level, pain points]
OBJECTIVE: [What reader should do/think/feel after reading]
VOICE & TONE: [Specific descriptors with examples or "like a..." comparisons]
FORMAT: [Length, structure, heading hierarchy]
REQUIREMENTS: [Specific inclusions, variation instructions, examples needed]
AVOID: [AI tells, phrases to exclude, patterns to prevent]
```

### 5.2 Template: Long-Form Blog Post (1500+ words)

```
ROLE: You are an expert content strategist who specializes in [INDUSTRY], writing for a Dutch B2B audience.

CONTEXT: I need a comprehensive blog post about [TOPIC] for [COMPANY NAME], a [BRIEF COMPANY DESCRIPTION] serving Dutch businesses.

AUDIENCE: [TARGET PERSONA] who [THEIR SITUATION/PROBLEM]. They have [KNOWLEDGE LEVEL] familiarity with this topic and value directness and practical information over marketing speak.

OBJECTIVE: Help readers [SPECIFIC OUTCOME] and position us as a trusted, knowledgeable partner.

VOICE & TONE:
- Direct and confident without being boastful
- Write conversationally, like a knowledgeable colleague sharing expertise over coffee
- Use contractions and occasional rhetorical questions
- Include 1-2 specific observations that show genuine experience
- Avoid enthusiasm that feels exaggerated—let results speak

STRUCTURE:
- 1500-2000 words
- Opening that gets to the point immediately (no "In today's fast-paced world")
- Clear H2 subheadings every 200-300 words
- Mix paragraphs (2-4 sentences) with strategic one-sentence paragraphs for emphasis
- Practical examples with specific names, numbers, or scenarios
- Conclusion with clear next step

REQUIREMENTS:
- Vary sentence length throughout: mix short punchy sentences (5-8 words) with longer explanatory ones (15-25 words). Include at least one sentence fragment for emphasis.
- Include at least 3 specific, concrete examples with real details
- Add one counterintuitive insight or commonly misunderstood point
- Include one parenthetical aside that shows personality
- Start at least two sentences with "And" or "But"

AVOID THESE WORDS/PHRASES:
delve, myriad, plethora, tapestry, robust, pivotal, crucial, leverage (as verb), cutting-edge, seamlessly, innovative, transformative, game-changer, in today's world, it's important to note, furthermore/additionally/moreover (at sentence starts), unlock the potential

SEO: Target keyword is [KEYWORD]. Include naturally in title, first 100 words, and 2-3 subheadings.

BEGIN with an opening that immediately addresses what the reader wants to know.
```

### 5.3 Template: Short-Form Blog Post (500-800 words)

```
ROLE: You are a concise, practical B2B writer who cuts through fluff for Dutch business readers.

TASK: Write a focused blog post on "[SPECIFIC TOPIC]" that delivers immediate value.

AUDIENCE: [READER TYPE] who wants a quick, actionable answer. They don't have time for lengthy introductions and prefer directness.

FORMAT:
- 500-700 words maximum
- Get to the point in the first sentence—answer the main question immediately
- 3-4 key points with brief explanations
- One practical tip per section
- End with a single, clear CTA

STYLE REQUIREMENTS:
- Short paragraphs (1-3 sentences maximum)
- Direct, no hedging language
- Include one specific example or number
- Vary sentence rhythm—some fragments okay for emphasis
- Write in "je" register (informal Dutch business convention)

AVOID: Filler phrases, unnecessary qualifiers ("basically," "essentially"), overexplaining, marketing enthusiasm

EXAMPLE OF DESIRED TONE:
"Skip the complicated setup. Here's what actually works—and why most advice gets it wrong."
```

### 5.4 Template: Homepage Hero Copy (Dutch B2B)

```
ROLE: You are a conversion-focused copywriter who writes for Dutch B2B audiences—direct, evidence-based, no hype.

COMPANY: [NAME] helps [AUDIENCE] to [CORE VALUE PROPOSITION] so they can [ULTIMATE BENEFIT].

TASK: Write hero section copy for our Dutch homepage.

REQUIREMENTS:

1. HEADLINE (8-12 words maximum):
   - Lead with the practical benefit or outcome
   - Use simple, concrete language
   - No superlatives without proof
   - Dutch readers should immediately understand what we do

2. SUBHEADLINE (15-25 words):
   - Explain the "how" or expand on the promise
   - Be specific about results (use numbers if available)
   - Match Dutch directness—no flowery language

3. CTA BUTTON TEXT (2-5 words):
   - Action-oriented, first-person works well ("Bekijk de demo")
   - Reduce friction/commitment language
   - Natural Dutch, not translated English

TONE: Confident, clear, practical. Not salesy or enthusiastic. Like a trusted colleague explaining what you do.

CONSTRAINTS:
- No superlatives ("best," "leading," "revolutionary")
- No buzzwords ("innovative," "cutting-edge," "game-changing")
- Write at a straightforward reading level
- All copy should pass the "doe maar gewoon" test

PROVIDE: 3 variations—one benefit-focused, one problem-focused, one with specific metric.

DUTCH LANGUAGE NOTE: Use natural Dutch phrasing. Avoid direct translations of English marketing terms.
```

### 5.5 Template: Service Page Copy

```
ROLE: You are a B2B copywriter who understands how Dutch buyers research and decide—they want facts, not persuasion.

SERVICE: [SERVICE NAME] - [ONE-SENTENCE DESCRIPTION]

TARGET BUYER: [JOB TITLE/ROLE] at [COMPANY TYPE] who is dealing with [MAIN CHALLENGE].

PAGE SECTIONS NEEDED:

1. HERO SECTION
- Headline: What outcome do we deliver? (not what we do)
- Subheadline: How do we deliver it?
- Primary CTA
- Social proof element (client count, rating, or recognizable logo)

2. PROBLEM SECTION (100-150 words)
- Describe their situation specifically
- Use their language (how they'd describe this to a colleague)
- Be direct about the consequences of not solving it

3. SOLUTION OVERVIEW (150-200 words)
- How our approach solves the problem
- What makes us different (with specifics)
- No claims without evidence

4. FEATURES → BENEFITS (400-600 words)
- 3-5 core features
- For each: Feature name → What this means for you (outcome)
- Include specific numbers where possible

5. SOCIAL PROOF
- One specific client result with numbers
- Quote with full name, title, company

6. HOW IT WORKS (150-200 words)
- 3-4 step process
- Set realistic expectations
- Address common concerns

7. CTA SECTION
- Restate key benefit concisely
- Low-friction next step
- What happens when they contact us

VOICE: Professional but not stiff. Knowledgeable but not condescending. Like a senior consultant advising a peer.

DUTCH CALIBRATION:
- Use "je" register for most B2B tech/services
- Replace marketing enthusiasm with specific evidence
- Include transparent information (pricing ranges, timelines, what's included)

AVOID: Generic claims, "world-class service," "comprehensive solutions," anything that could describe any competitor
```

### 5.6 Template: FAQ Content

```
TASK: Write [NUMBER] FAQ entries for [PAGE/PRODUCT].

AUDIENCE: [CUSTOMER TYPE] at various decision stages.

FORMAT FOR EACH FAQ:
- Question: Written as the customer would actually search or ask
- Answer: 2-4 sentences, direct answer first, then brief explanation if needed

REQUIREMENTS:
- Start answers with the direct response—never "Great question!"
- Be specific: include numbers, timeframes, concrete details
- Vary answer lengths (some short, some with more detail)
- Address the actual concern behind the question

TONE: Helpful, straightforward. Like answering a colleague's question.

QUESTIONS TO COVER:
[LIST YOUR QUESTIONS]

AVOID:
- Vague answers like "it depends" without explaining what it depends on
- Marketing language in answers
- Overly long explanations for simple questions
```

### 5.7 Template: Meta Title and Description

```
TASK: Write meta title and description for [PAGE].

PAGE CONTENT: [2-3 SENTENCE SUMMARY]
TARGET KEYWORD: [KEYWORD]
PAGE INTENT: [INFORMATIONAL/COMMERCIAL/TRANSACTIONAL]

REQUIREMENTS:
- Meta Title: 50-60 characters, keyword near beginning, clear value
- Meta Description: 140-155 characters, benefit + what reader will learn/get

PROVIDE 3 VARIATIONS:
1. Benefit-focused
2. Problem/solution-focused
3. Specific number or data-focused

AVOID:
- "This article discusses..." or "Learn about..."
- Keyword stuffing
- Generic claims without specifics
```

### 5.8 Template: About Us / Team Bio

```
ROLE: Brand Storyteller.

SUBJECT: [Name], [Title].

FACTS: [Key achievements, background, relevant experience].

STYLE GUIDELINES:
- Tone: Modest but competent. Avoid bragging.
- Narrative: Weave the facts into a story about why they do this work.
- Language: Dutch (Je/Jij).

INSTRUCTION:
"Write a bio that humanizes [Name]. Focus on their problem-solving philosophy. Do not use the phrase 'passionate about'. Keep it under 150 words."
```

### 5.9 Anti-Patterns: What NOT to Include in Prompts

**Vague Instructions That Backfire**:
- ❌ "Write in a human way" → Too vague
- ❌ "Don't sound like AI" → Negative directives less effective
- ❌ "Make it engaging" → Subjective; specify HOW
- ❌ "Be creative" → Too open-ended

**Better Alternatives**:
- ✓ "Vary sentence length between 5 and 25 words, with at least two sentences under 8 words per paragraph"
- ✓ "Include one conversational aside in parentheses and one rhetorical question"
- ✓ "Add a specific example with a company name, number, or date"
- ✓ "Write one section that challenges a common assumption"

---

## 6. Editing Playbook

### 6.1 Step-by-Step Editing SOP

#### Phase 1: First-Pass Review (2-3 minutes)

Read the entire piece without editing. Answer:

| Question | If NO → Action |
|----------|----------------|
| Is the core thesis/argument sound? | REGENERATE with revised prompt |
| Is >50% of content on-topic and relevant? | REGENERATE with clearer scope |
| Is the tone approximately right? | REGENERATE with explicit tone examples |
| Are facts plausible (verify later)? | Flag for fact-checking |
| Can this be edited in 15 minutes? | If longer needed, regenerate first |

#### Phase 2: Structural Editing (5 minutes)

**Sentence Variation Check**:
1. Count words in 5-10 consecutive sentences
2. If most cluster within 3-4 words → restructure
3. Target pattern: 8, 23, 15, 6, 31, 12, 4, 18

**Paragraph Restructuring**:
- Break paragraphs longer than 6 sentences
- Add at least one 1-2 sentence paragraph per section
- Vary paragraph lengths (1-2, 3-4, 5-6 sentences)

**Transition Audit**:
1. Circle every transition word
2. If same transition appears 2+ times → replace
3. Delete transitions where ideas connect without them

#### Phase 3: Vocabulary Editing (3 minutes)

Use the Find-and-Replace Reference in Section 7.

#### Phase 4: Humanization (3 minutes)

Add these elements if missing:

- [ ] One parenthetical aside: "(trust me on this one)" or "(more on that shortly)"
- [ ] One sentence starting with "And" or "But"
- [ ] One rhetorical question
- [ ] One specific example with name, company, number, or date
- [ ] One opinion statement: "I think..." or "The data suggests..."
- [ ] One admission of limitation: "This won't work for everyone"

#### Phase 5: Read-Aloud Test (2 minutes)

Read at natural speaking pace. Mark:
- ⚡ Where you stumbled (awkward phrasing)
- 🔄 Where you heard repetition
- 😴 Where rhythm felt monotonous
- 💨 Where you ran out of breath (sentence too long)

Fix only what you marked.

#### Phase 6: Dutch Calibration (for Dutch content)

| International Pattern | Dutch Adjustment |
|----------------------|------------------|
| Enthusiastic language | Tone down to confident-but-modest |
| "Revolutionary," "game-changing" | Replace with specific outcomes |
| Urgency tactics | Remove unless genuinely time-limited |
| Self-promotional statements | Replace with evidence/results |
| Formal register | Shift to "je" for most B2B contexts |

### 6.2 E-E-A-T Injection Techniques

Find three points in the draft where experiential markers can be added:

1. **The "I" Statement**: Change "It is often said that..." to "In my 10 years of experience, I've found that..."

2. **The Specific Fail**: Add a sentence about when something went wrong. AI rarely discusses failure. "We tried X in 2023, and it failed because of Y."

3. **The Counter-Argument**: Find a point the AI made and disagree slightly. "Most experts say X, but we actually prefer Y because..."

### 6.3 Burstiness Editing Technique: "Chopping"

Take long AI sentences and chop into fragments:

**AI Original**:
> "By utilizing advanced analytics, businesses can gain actionable insights that drive growth."

**Human Edit**:
> "Use analytics. Get insights. Grow. It's that simple."

### 6.4 Before/After Example

**Before (Raw AI)**:
> "In today's competitive business landscape, companies must leverage innovative solutions to stay ahead. Furthermore, implementing cutting-edge technologies can help organizations streamline their operations and achieve transformative results. Additionally, it's important to note that a comprehensive approach is crucial for success."

**After (Edited)**:
> "Most companies know they need better tools. But which investments actually pay off? After watching dozens of implementations, I've noticed the wins usually come from boring improvements—a scheduling system that saves 2 hours weekly, a communication platform that cuts meetings in half. The flashy stuff rarely delivers."

**What Changed**:
- Removed all AI vocabulary (leverage, innovative, cutting-edge, streamline, transformative, comprehensive, crucial)
- Cut formulaic transitions (Furthermore, Additionally, it's important to note)
- Added experiential marker ("After watching dozens of implementations")
- Added specific examples (scheduling system, communication platform, 2 hours weekly)
- Varied sentence structure (question, observation, short declarative)
- Added personality ("The flashy stuff rarely delivers")

---

## 7. Find-and-Replace Reference

### 7.1 Priority Replacements (Search First)

| Find | Replace With |
|------|--------------|
| delve | explore, look at, examine, dig into |
| robust | strong, reliable, solid |
| leverage (verb) | use, apply |
| innovative | new, fresh, different, [often delete] |
| cutting-edge | latest, advanced, modern |
| comprehensive | complete, full, thorough |
| transformative | significant, important |
| crucial | important, essential, key |
| pivotal | important, central |
| seamlessly | smoothly, easily |
| tapestry | mix, blend, combination |
| plethora/myriad | many, lots of, several |

### 7.2 Phrase Replacements

| Find | Replace With |
|------|--------------|
| It's important to note | Note that; Keep in mind |
| In today's [world/landscape] | Today; Now; [delete opener] |
| Furthermore/Additionally/Moreover | Also; Plus; And; What's more |
| In conclusion | [delete—just conclude] |
| In the realm of | In; Within |
| At its core | Basically; Really |
| A key takeaway is | The main point is; Here's what matters |
| By leveraging | By using; Through; With |

### 7.3 Full Alphabetical Reference

**A-C**
| AI Phrase | Human Alternative |
|-----------|-------------------|
| A comprehensive overview | What you need to know about |
| A key takeaway is | The main point is; Here's what matters |
| A multitude/plethora/myriad of | Many; Several; Lots of |
| At its core | Basically; Really; At heart |
| Bolster | Support; Strengthen; Back up |
| By leveraging | By using; Through; With |
| Cutting-edge | Latest; New; Advanced; [often delete] |

**D-F**
| AI Phrase | Human Alternative |
|-----------|-------------------|
| Daunting | Challenging; Tough; Hard |
| Delve into | Explore; Look at; Dig into |
| Elevate | Improve; Raise; Boost |
| Embark on | Start; Begin; Take on |
| Facilitate | Help; Make easier; Enable |
| Furthermore | Also; Plus; And; What's more |

**G-N**
| AI Phrase | Human Alternative |
|-----------|-------------------|
| Game-changing | Significant; Major; [delete] |
| Harness | Use; Apply; Put to work |
| In conclusion | [delete—just conclude] |
| In essence | Basically; Really |
| In the realm of | In; Within; In the world of |
| It is important to note | Note that; Worth knowing |
| Moreover | Also; Plus; Besides |
| Navigate | Handle; Work through; Manage |

**O-Z**
| AI Phrase | Human Alternative |
|-----------|-------------------|
| Optimize | Improve; Fine-tune; Make better |
| Paramount | Critical; Essential; Key |
| Pivotal | Important; Key; Central |
| Robust | Strong; Solid; Reliable |
| Seamless | Smooth; Easy |
| Streamline | Simplify; Speed up |
| Tapestry of | Mix of; Blend of |
| Transformative | Important; Significant |
| Underscore | Highlight; Show; Emphasize |
| Utilize | Use |

---

## 8. Checklists

### 8.1 Pre-Publish Checklist

**Content Quality (Essential)**
- [ ] All facts verified with current sources
- [ ] Statistics include dates and sources
- [ ] No contradictions between sections
- [ ] Claims supported with evidence or appropriately qualified
- [ ] Original insight present (not just compilation)

**Human Writing Markers (Essential)**
- [ ] Sentence lengths vary (5-30 words, not clustered)
- [ ] At least one sentence fragment for emphasis
- [ ] At least one rhetorical question
- [ ] Specific examples with names, numbers, or dates
- [ ] One parenthetical aside showing personality
- [ ] Some sentences start with "And" or "But"
- [ ] Contractions used where natural

**AI Tell Removal (Essential)**
- [ ] No "delve," "tapestry," "robust," "pivotal," "crucial"
- [ ] No "leverage" as verb, "cutting-edge," "innovative," "transformative"
- [ ] No "In today's [world/landscape]" openers
- [ ] No "Furthermore/Additionally/Moreover" at sentence starts
- [ ] No "It's important to note that"
- [ ] Transitions varied (not repeated)
- [ ] No em-dashes (—) or en-dashes (–) in prose; use periods, commas, or colons instead

**Dutch Calibration (For Dutch Content)**
- [ ] Enthusiasm appropriate (understated, evidence-based)
- [ ] No superlatives without specific proof
- [ ] Register correct ("u" vs "je" appropriate to context)
- [ ] Natural Dutch phrasing (not translated English)
- [ ] Directness without aggression
- [ ] Practical value clear

**Structure & SEO (Nice-to-Have)**
- [ ] Primary keyword in title, first 100 words, 2-3 headings
- [ ] Internal links to related content (4-8 per long post)
- [ ] External links to authoritative sources (2-4)
- [ ] Meta title under 60 characters
- [ ] Meta description 140-155 characters
- [ ] Clear CTA appropriate to content

### 8.2 Red Flag Pattern Search

Run these searches before publishing:

```
Search for: "delve" "tapestry" "robust" "crucial" "pivotal"
Action: Replace all

Search for: "leverage" (as verb) "cutting-edge" "innovative"
Action: Replace or delete

Search for: "Furthermore" "Additionally" "Moreover" "However"
Action: If multiple at sentence start, vary or remove

Search for: "In today's" "In conclusion" "It is important"
Action: Rewrite or delete

Search for: "comprehensive" "transformative" "seamlessly"
Action: Replace with specific alternative

Search for: "!" (exclamation marks)
Action: Limit to 1-2 per piece maximum for Dutch content

Search for: "—" (em-dash) and "–" (en-dash)
Action: Replace with periods, commas, colons, or "tot" for ranges
```

### 8.3 Sentence Length Quick Check

Count words in 5 consecutive sentences:

**AI Pattern (Flag for editing)**:
> 16, 18, 15, 17, 19 ← Too uniform

**Human Pattern (Acceptable)**:
> 8, 23, 15, 6, 31 ← Good variation

### 8.4 Content Type Quick Reference

| Content Type | Length | Key Focus | Dutch Calibration |
|--------------|--------|-----------|-------------------|
| Long-form blog | 1500-2000 words | Original insight, expertise signals | Evidence over enthusiasm |
| Short-form blog | 500-800 words | Direct answer, single focus | Get to point in first sentence |
| Homepage hero | 50-75 words | Clear value prop, one CTA | No hype, specific benefit |
| Service page | 800-1200 words | Benefits > features, social proof | Transparency, practical outcomes |
| About page | 300-500 words | Human connection, credibility | Modest, let achievements speak |
| FAQ | 40-100 words/answer | Direct answer first | No marketing language |
| CTA copy | 2-6 words | Action + outcome | Low-key, "je" register |
| Meta description | 140-155 chars | Benefit + curiosity | Specific, no superlatives |

### 8.5 Emergency 5-Question Check

Before hitting publish:

1. Did I read it aloud?
2. Did I verify all facts/statistics?
3. Did I remove AI vocabulary tells?
4. Did I add specific examples?
5. Does it sound like our brand (not generic AI)?

---

## Summary: The 80/20 Rule

**These five practices deliver 80% of the quality improvement:**

1. **Vary sentence length intentionally**: Mix 5-word punches with 25-word explanations. Count and verify.

2. **Remove the vocabulary tells**: Search for and replace "delve," "robust," "leverage," "crucial," "innovative," "comprehensive," and other flagged words.

3. **Add specific examples**: Replace every vague claim with a name, company, number, or date. "Some companies" becomes "Buffer and Basecamp."

4. **Include experiential markers**: "In my experience," "I've noticed," "We found that"—but only if genuine.

5. **For Dutch: Replace enthusiasm with evidence**: "Revolutionary solution" becomes "Gemiddeld 34% kostenbesparing."

**The remaining 20% refinement comes from:**
- Parenthetical asides showing personality
- Strategic sentence fragments
- Rhetorical questions for transitions
- Read-aloud testing for flow
- Dutch modal particles for native feel

---

*Document version: 1.0 | Last updated: January 2026*
