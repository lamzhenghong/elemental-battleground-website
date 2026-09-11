# Interactive Gateway Design

## Goal

Connect the existing portal hero, a new elemental resonance selector, a short website combat trial, and the final call to action through one lightweight React state layer. The experience remains optional, preserves the existing promotional page, and uses only the seven elements confirmed in the game repository.

## Shared State

`InteractiveExperienceProvider` owns the selected element, portal charge and activation state, combat session result, best rank, website sound state, and reduced-experience flags. Only the selected element and best rank persist in local storage. Reads validate against current element and rank definitions before use.

The provider exposes narrow commands: select/reset element, update/reset portal charge, mark portal activation, begin/reset/complete combat, and toggle sound. The site canvas receives controlled CSS custom properties for selected-element accents without recolouring the full site.

## Element Model

The supported set is Pyro, Hydro, Cryo, Electro, Anemo, Geo, and Dendro. Each definition provides stable identity, three accent colours, an icon key, portal and particle language, combat attack and status labels, a short description, and small reducer modifiers. These modifiers create readable identity without changing the trial's scoring targets: Pyro has stronger skill impact, Hydro recovers health, Cryo extends stagger, Electro gains energy, Anemo widens dodge timing, Geo reduces incoming damage, and Dendro adds a delayed root echo.

## Portal

The hero keeps its existing video, artwork, copy, links, and visual hierarchy. A large semantic button sits over the portal core while the content layer allows pointer input to pass through except on real controls. Pointer movement writes bounded parallax CSS variables directly to the section, avoiding React renders per frame.

Holding pointer, touch, Enter, or Space charges for 1.3 seconds. A 20 Hz controller updates accessible progress and visual stage. Early release starts a smooth decay; full charge is guarded so activation fires once. Activation applies the selected accent, runs a short gate-open state, updates the URL hash, and scrolls to the resonance selector. Reduced-motion uses opacity and immediate scrolling while retaining charge feedback.

The particle canvas receives the element colours and transient charge/pointer refs. It caps particles, does no work for coarse pointer, reduced motion, data saver, hidden tabs, or offscreen content, and retains one cancellable animation loop.

## Resonance Selector

A compact section directly beneath the hero avoids a blocking first-visit modal. Seven buttons use radio semantics, visible names, icons, selected state, arrow-key movement, and a polite status announcement. Desktop uses a horizontal sigil rail; small screens use a two-column grid. Selecting a resonance updates the portal, combat trial, final CTA, and restrained shared accents. Reset returns to Pyro.

## Combat Trial

The gameplay placeholder becomes a lazy-loaded `CombatChallenge`. Pure reducer logic owns idle, basic training, dodge telegraph/window, parry telegraph/window, staggered skill, finisher-ready, completed, failed, and paused states. Timed transitions live in one hook layer; every timeout is cleared on phase change, restart, visibility loss, intersection loss, and unmount.

The intended path is three attacks, one dodge check, one parry check, an elemental skill, and an ultimate. Missed timing deals survivable damage and applies a score penalty. Keyboard and labelled on-screen controls share one dispatch path. The challenge captures the selected element when an attempt starts; changing resonance mid-attempt prompts a restart instead of changing mechanics silently.

Scoring uses +100 base attack with combo increments, +500 perfect dodge, +750 perfect parry, +400 skill, +1,000 finisher, a time bonus, and a no-damage bonus. Rank thresholds are S at 3,250, A at 2,650, B at 1,850, and C below. Results show score, rank, combo, timing successes, damage taken, resonance, retry, and the real game link.

## Accessibility And Performance

All portal, selector, and combat actions are semantic controls with visible focus, names, and non-colour telegraph labels. Important state changes use a restrained live region; normal damage does not. Minimum mobile targets are 44 CSS pixels. Reduced motion removes shake and large travel but preserves timing and scoring.

The combat module is loaded through `React.lazy` only near the Media section. CSS transforms and opacity handle motion. No new engine or physics dependency is introduced. Canvas particles remain capped and offscreen work pauses.

## Verification

Pure tests cover element validation, persistence, portal charge math, combat transitions, misses, scoring, ranks, pause/resume, and reset. Component tests cover selector keyboard behavior, context propagation, portal single activation, combat UI controls, and personalized final CTA. Manual browser checks cover desktop, mobile, landscape, 200 percent zoom, reduced motion, visibility pause, scroll pause, sound states, regressions, console/network errors, and the real Play link.
