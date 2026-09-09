import { useState } from 'react';
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

export function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="site-canvas" data-sound={soundEnabled ? 'enabled' : 'muted'}>
      <CinematicLoader />
      <SkipLink />
      <SiteNavigation soundEnabled={soundEnabled} onSoundToggle={() => setSoundEnabled(enabled => !enabled)} />
      <main id="main-content">
        <OpeningSection />
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
