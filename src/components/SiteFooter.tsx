import { ArrowUp } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div>
          <img src="/media/icons/game-logo.png" alt="" />
          <strong>Elemental Battleground</strong>
        </div>
        <p>© 2026 <strong>lamzhenghong</strong>. Independent game project. All project assets remain their creator's property.</p>
        <a href="#overview" aria-label="Return to the top"><ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
