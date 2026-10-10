# Relay (Engineered Dark): builder feedback, round 1
Final audit: 0 fail · 0 warn · 8 pass

Contradictions and gaps
1. Engineered Dark says "CTA lives in the nav" but Step 4 and layout.md describe hero CTAs. Unclear which applies.
2. "One accent" vs product UI: diff red/green state colours inside replicas need an explicit exemption (the audit skips role=img, but the written rule doesn't say so).
3. No "missing proof" protocol. The skill pushes named customers and precise numbers; nothing says not to invent them or to mark them as placeholders.
4. No art-layer recipe for dark directions (all examples are light/warm).
5. "FIG 0.1/0.2/0.3 isometric line art" has no recipe or code.
6. "Everything from a token" doesn't fit UI replicas; exempt role=img replicas.
7. The Spine says SCALE comes from typography.md, which has no scale (the scale is in tokens.css).
8. --s-10 void + --s-9 section padding stacks to ~370px, beyond the 160–300px guidance.
9. The techniques §7 glow line is hard-coded purple; it should be var(--accent).

Asset bugs
10. tokens.css dark --ink-3 at .44 is ~4.1:1, failing AA; the 100/60/40 tiers fail on dark.
11. .t-lead and .serif-i rely on Newsreader, which 2-family builds never load, so a third family or a fallback sneaks in.
12. The .eyebrow dot uses the accent by default and silently takes one of its jobs.
13. motion.js splitWords splits on \s+ and destroys &nbsp; widow guards.
14. letterRoll sets textContent='' and deletes child spans and icons.
15. motion.js is an ES module, so it fails over file://. Say that a server is required.

Audit
16. motion.ease counts declarations, not usage (it lists unused --ease-pop).
17. The profile shows "body 11px" (mono label <p>s); the off-screen skip link shows as a button.
18. mobile-full.jpg duplicated content (the hero repeated after pricing). Misleading.
19. desktop-full.jpg is unreadable at its displayed size; save per-viewport slices.
20. Every real bug was inside the role=img replica and only the screenshots caught it, so stress the "look" step.
21. The banned phrase "take your" flags "take your time"; mono text is excluded from accent detection.

Worked well: the direction table, measured defaults, and anti-slop list.
