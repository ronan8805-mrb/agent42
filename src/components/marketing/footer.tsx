import { Link } from "@tanstack/react-router";
import { Mark } from "@/components/brand";

export function MarketingFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-16 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Mark />
            Agent 42
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            The receptionist that never sleeps.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/how-it-works" className="hover:text-accent">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-accent">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/industries" className="hover:text-accent">
                Industries
              </Link>
            </li>
            <li>
              <Link to="/trial" className="hover:text-accent">
                Free trial
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-accent">
                Journal
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-accent">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/legal/privacy" className="hover:text-accent">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/legal/terms" className="hover:text-accent">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-content items-center justify-between border-t border-line px-6 py-6 text-xs text-muted">
        <span>© {new Date().getFullYear()} Agent 42 Ltd</span>
        <span className="tabular">42</span>
      </div>
    </footer>
  );
}
