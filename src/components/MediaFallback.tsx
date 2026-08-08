import { useState, type ReactNode } from 'react';

interface MediaFallbackProps {
  children: (onError: () => void) => ReactNode;
  className?: string;
  message?: string;
}

export function MediaFallback({ children, className = '', message = 'Visual unavailable' }: MediaFallbackProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`media-fallback ${className}`.trim()} data-media-error={failed ? 'true' : undefined}>
      {failed ? null : children(() => setFailed(true))}
      {failed ? <span role="status">{message}</span> : null}
    </div>
  );
}
