import type { ReactNode } from 'react';

interface MediaFallbackProps {
  children: ReactNode;
  message?: string;
}

export function MediaFallback({ children, message = 'Visual unavailable' }: MediaFallbackProps) {
  return (
    <div className="media-fallback">
      {children}
      <span>{message}</span>
    </div>
  );
}
