# Ostra (Quiet Luxury Commerce): builder feedback, round 1
Final audit: 0 fail · 0 warn · 7 pass

Contradictions
1. Direction 5's heroes all need photos; the no-photo fallback ("type as image") conflicts with the 18–31px hero-text cap. Add "draw the product as a technical elevation" as the no-photo hero.
2. Line height: "never above 1.1" vs luxury serif heads at 1.33–1.45 and serif statements at 1.2–1.3. The audit warns above 1.15. Scope the rule to sans display.
3. The mobile h1 rule (32–44) can be bigger than direction 5's desktop hero text (18–31).
4. Law 5 says expo-out house ease; direction 5 uses easeOutCubic; tokens .btn uses --ease-ui, so there are always two curves.
5. Technique #38 staggers headline → subline → CTA, hiding the CTA for ~1.1s; motion.md says to reveal only the first element. Hero CTAs should be visible from frame one.

Audit
6. Accent invisible when it lives in SVG strokes, mono flags or thin bars, and the INFO then advises the wrong thing for direction 5.
7. motion.ease counts declarations, not usage.
8. The profile's "body 11px" is skewed by <p class=t-label>.
9. hero.ctas passes while the CTA is invisible in the screenshot (check opacity after transitions).
10. Slow (45–105s) with no progress output.

Gaps
11. The Spine has no CONVERSION line (primary purchase, and where it appears).
12. In the no-asset case, a product drawing is both the image and the motif. Clarify that this is allowed.
13. tokens.css spends the accent by default (.eyebrow dot, ::selection, --focus).
14. Praise: every real defect was caught by eye; the "look" step earned its place.

Isolation note: the user's global CLAUDE.md SuperCompress inbox contained research/ notes, and subagents read part of it. Future test builds should ignore that inbox.
