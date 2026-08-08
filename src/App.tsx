import { useState } from 'react';
import { SiteNavigation } from './components/SiteNavigation';
import { SkipLink } from './components/SkipLink';
import { CombatSection } from './sections/Combat/CombatSection';
import { HeroesSection } from './sections/Heroes/HeroesSection';
import { OpeningSection } from './sections/Opening/OpeningSection';
import { ReactionsSection } from './sections/Reactions/ReactionsSection';
import { SpecialUltimatesSection } from './sections/SpecialUltimates/SpecialUltimatesSection';
import { WorldSection } from './sections/World/WorldSection';

const upcomingChapters = [
  { id: 'modes', index: '06', title: 'Choose the Trial' },
  { id: 'progression', index: '07', title: 'Build Your Answer' },
  { id: 'play', index: '10', title: 'Enter the Battleground' }
] as const;

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
        {upcomingChapters.map(chapter => (
          <section id={chapter.id} className="chapter-placeholder" key={chapter.id}>
            <p>{chapter.index} / Transmission forming</p>
            <h2>{chapter.title}</h2>
          </section>
        ))}
      </main>
    </div>
  );
}
