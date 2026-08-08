import { useState } from 'react';
import { SiteNavigation } from './components/SiteNavigation';
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

export function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="site-canvas" data-sound={soundEnabled ? 'enabled' : 'muted'}>
      <SkipLink />
      <SiteNavigation soundEnabled={soundEnabled} onSoundToggle={() => setSoundEnabled(enabled => !enabled)} />
      <main id="main-content">
        <OpeningSection />
        <WorldSection />
        <CombatSection />
        <ReactionsSection />
        <HeroesSection />
        <SpecialUltimatesSection />
        <GameModesSection />
        <ProgressionSection />
        <SoundtrackSection soundEnabled={soundEnabled} onSoundEnabledChange={setSoundEnabled} />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
