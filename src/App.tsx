import type { CSSProperties } from 'react';
import { SiteNavigation } from './components/SiteNavigation';
import { CinematicLoader } from './components/CinematicLoader';
import { SiteFooter } from './components/SiteFooter';
import { SkipLink } from './components/SkipLink';
import { CombatSection } from './sections/Combat/CombatSection';
import { FinalCTASection } from './sections/FinalCTA/FinalCTASection';
import { GameModesSection } from './sections/GameModes/GameModesSection';
import { HeroesSection } from './sections/Heroes/HeroesSection';
import { OpeningSection } from './sections/Opening/OpeningSection';
import { ReactionsSection } from './sections/Reactions/ReactionsSection';
import { ProgressionSection } from './sections/Progression/ProgressionSection';
import { SoundtrackSection } from './sections/Soundtrack/SoundtrackSection';
import { SpecialUltimatesSection } from './sections/SpecialUltimates/SpecialUltimatesSection';
import { WorldSection } from './sections/World/WorldSection';
import { NewsSection } from './sections/News/NewsSection';
import { MediaSection } from './sections/Media/MediaSection';
import { ElementSelector } from './sections/Opening/ElementSelector';
import { useInteractiveExperience } from './interactive/InteractiveExperienceContext';

export function App() {
  const {
    selectedElement,
    soundEnabled,
    setSoundEnabled,
    toggleSound
  } = useInteractiveExperience();
  const resonanceStyle = {
    '--resonance-primary': selectedElement.primary,
    '--resonance-secondary': selectedElement.secondary,
    '--resonance-glow': selectedElement.glow
  } as CSSProperties;

  return (
    <div
      className="site-canvas"
      data-sound={soundEnabled ? 'enabled' : 'muted'}
      data-resonance={selectedElement.id}
      style={resonanceStyle}
    >
      <CinematicLoader />
      <SkipLink />
      <SiteNavigation soundEnabled={soundEnabled} onSoundToggle={toggleSound} />
      <main id="main-content">
        <OpeningSection />
        <ElementSelector />
        <NewsSection />
        <WorldSection />
        <HeroesSection />
        <ReactionsSection />
        <CombatSection />
        <SpecialUltimatesSection />
        <GameModesSection />
        <ProgressionSection />
        <MediaSection />
        <SoundtrackSection soundEnabled={soundEnabled} onSoundEnabledChange={setSoundEnabled} />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
