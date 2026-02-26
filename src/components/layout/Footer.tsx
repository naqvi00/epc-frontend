import { Link } from "react-router-dom";
import { useState } from "react";
import { brand } from "../../content/site";
import logo from "../../assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    const subject = encodeURIComponent(
      "Newsletter Subscription – Eurasia Policy Council"
    );

    const body = encodeURIComponent(
`Dear EPC Team,

I would like to subscribe to your newsletter to receive briefings, event invitations, and policy analysis updates.

Subscriber Email: ${email}

I confirm that I agree to receive communications from the Eurasia Policy Council and understand that I may unsubscribe at any time.

Kind regards,`
    );

    window.location.href = `mailto:info@epclondon.org?subject=${subject}&body=${body}`;

    setEmail("");
  }

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <img
                src={logo}
                alt={`${brand.orgName} logo`}
                className="h-24 w-24 shrink-0 object-contain"
              />

              <div>
                <div className="font-heading text-base font-semibold tracking-wide text-slate-900">
                  {brand.orgName.toUpperCase()}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {brand.tagline}
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-700">
              {brand.missionFull}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Policy, research & education engagement
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <div className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-slate-900">
              Quick links
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <Link className="text-slate-700 hover:text-blue-700" to="/about">About</Link>
              <Link className="text-slate-700 hover:text-blue-700" to="/insights">Research / Insights</Link>
              <Link className="text-slate-700 hover:text-blue-700" to="/publications">Publications</Link>
              <Link className="text-slate-700 hover:text-blue-700" to="/events">Events</Link>
              <Link className="text-slate-700 hover:text-blue-700" to="/people">People</Link>
              <Link className="text-slate-700 hover:text-blue-700" to="/education">Education</Link>
              <Link className="text-slate-700 hover:text-blue-700" to="/support">Support</Link>
              <Link className="text-slate-700 hover:text-blue-700" to="/contact">Contact</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                Newsletter
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Subscribe for briefings, event invitations and analysis updates.
              </p>

              <form className="mt-5 space-y-3" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="h-12 rounded-xl bg-slate-900 px-8 text-base font-semibold text-white hover:bg-slate-800"
                  >
                    Join
                  </button>
                </div>
              </form>

              <p className="mt-3 text-xs text-slate-600">
                By subscribing you agree to receive occasional emails. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom legal row */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand.orgName}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-blue-700" to="#">Privacy</Link>
            <Link className="hover:text-blue-700" to="#">Cookies</Link>
            <Link className="hover:text-blue-700" to="#">Terms</Link>
            <Link className="hover:text-blue-700" to="#">Disclaimer</Link>
          </div>
        </div>

        <div id="search-hint" className="sr-only">
          Search section anchor
        </div>
      </div>
    </footer>
  );
}