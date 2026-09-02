import { Link } from "@tanstack/react-router";
import { Mark } from "@/components/brand";

export function MarketingFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-16 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Mark />
            Agent 42
          </div>
          <p className="mt-3 max-w-xs text-sm text-paper/60">
            Answers. Books. Never complains.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-[#F5C518] uppercase">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/how-it-works" className="hover:text-[#2DD4BF]">How it works</Link></li>
            <li><Link to="/pricing" className="hover:text-[#2DD4BF]">Pricing</Link></li>
            <li><Link to="/industries" className="hover:text-[#2DD4BF]">Industries</Link></li>
            <li><Link to="/trial" className="hover:text-[#2DD4BF]">Free trial</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-[#F5C518] uppercase">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-[#2DD4BF]">About</Link></li>
            <li><Link to="/blog" className="hover:text-[#2DD4BF]">Journal</Link></li>
            <li><Link to="/contact" className="hover:text-[#2DD4BF]">Contact</Link></li>
            <li><Link to="/login" className="hover:text-[#2DD4BF]">Login</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-[#F5C518] uppercase">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/legal/privacy" className="hover:text-[#2DD4BF]">Privacy</Link></li>
            <li><Link to="/legal/terms" className="hover:text-[#2DD4BF]">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-content items-center justify-between border-t border-paper/10 px-6 py-6 text-xs text-paper/40">
        <span>© {new Date().getFullYear()} Agent 42 Ltd</span>
        <span className="tabular text-[#F5C518]">42</span>
      </div>
    </footer>
  );
}
