import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";
import ScrollToTopButton from "../ui/ScrollToTopButton";

export default function SiteLayout() {
  const location = useLocation();

  // Accessibility: focus main WITHOUT scrolling the page
  useEffect(() => {
    const main = document.getElementById("main") as HTMLElement | null;

    // preventScroll is supported in modern browsers
    // fallback: just focus if preventScroll isn't available
    try {
      main?.focus({ preventScroll: true } as any);
    } catch {
      main?.focus();
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-brand-ink font-body">
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
