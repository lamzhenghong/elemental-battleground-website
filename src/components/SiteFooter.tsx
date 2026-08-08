import { ArrowUp } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div>
          <img src="/media/brand/game-logo.png" alt="" />
          <strong>Elemental Battleground</strong>
        </div>
        <p>Created and directed by <strong>lamzhenghong</strong>. Independent game project.</p>
        <a href="#overview" aria-label="Return to the top"><ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
