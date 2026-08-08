import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  const label = enabled ? 'Disable website sound' : 'Enable website sound';

  return (
    <button className="sound-toggle" type="button" onClick={onToggle} aria-label={label} aria-pressed={enabled}>
      {enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      <span>{enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}
