import { useState } from 'react';
import { SiteNavigation } from './components/SiteNavigation';
import { SkipLink } from './components/SkipLink';
import { OpeningSection } from './sections/Opening/OpeningSection';
import { WorldSection } from './sections/World/WorldSection';

const upcomingChapters = [
  { id: 'combat', index: '02', title: 'Combat Without Hesitation' },
  { id: 'heroes', index: '04', title: 'Four Limited Legends' },
  { id: 'special-ultimates', index: '05', title: 'Special Ultimates' },
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
