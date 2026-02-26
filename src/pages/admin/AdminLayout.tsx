
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearToken } from "../../api/api";
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Flame,
  FileText,
  GraduationCap,
  Building2,
  Repeat2,
  School,
  Leaf,
  ShieldCheck,
  Zap,
  Trash2,
  Wind,
  PiggyBank,
  BadgeDollarSign,
  Globe,
  Scale,
  ChevronDown,
  Wrench,
  Presentation,
  Mic,
  LogOut,
  PhoneCall,
  Plus,
  Inbox,
  User2Icon,
  HandCoins
} from "lucide-react";

export default function AdminLayout() {
  const nav = useNavigate();
  const location = useLocation();

  function logout() {
    clearToken();
    nav("/admin/login");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-brand-mist text-brand-ink"
        : "text-slate-700 hover:bg-brand-mist"
    }`;

  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 pl-10 text-sm font-semibold transition ${
      isActive
        ? "bg-brand-mist text-brand-ink"
        : "text-slate-600 hover:bg-brand-mist"
    }`;

  const groupBtnClass = (open: boolean) =>
    `flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
      open ? "bg-brand-mist text-brand-ink" : "text-slate-700 hover:bg-brand-mist"
    }`;

  // ---- route helpers for auto-open dropdowns
  const isEducationRoute = useMemo(
    () =>
      [
        "/epc-admin-92f3/institutions",
        "/epc-admin-92f3/exchange",
        "/epc-admin-92f3/universities",
      ].some((p) => location.pathname.startsWith(p)),
    [location.pathname]
  );

  const isClimateRoute = useMemo(
    () =>
      [
        "/epc-admin-92f3/climate/security-diplomacy",
        "/epc-admin-92f3/climate/energy",
        "/epc-admin-92f3/climate/waste-management",
        "/epc-admin-92f3/climate/air-pollution",
      ].some((p) => location.pathname.startsWith(p)),
    [location.pathname]
  );

  const isInvestmentRoute = useMemo(
    () =>
      [
        "/epc-admin-92f3/investment/green-investment",
        "/epc-admin-92f3/investment/geopolitical-risk",
        "/epc-admin-92f3/investment/energy-transition",
        "/epc-admin-92f3/investment/regulatory-reform",
      ].some((p) => location.pathname.startsWith(p)),
    [location.pathname]
  );

  const [eduOpen, setEduOpen] = useState(isEducationRoute);
  const [climateOpen, setClimateOpen] = useState(isClimateRoute);
  const [investmentOpen, setInvestmentOpen] = useState(isInvestmentRoute);

  useEffect(() => {
    if (isEducationRoute) setEduOpen(true);
    if (isClimateRoute) setClimateOpen(true);
    if (isInvestmentRoute) setInvestmentOpen(true);
  }, [isEducationRoute, isClimateRoute, isInvestmentRoute]);

  // add near your hooks
useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const el = document.getElementById("admin-main");
  if (el) el.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-mist">
      <div className="mx-auto max-w-6xl p-4">
        <div className="grid gap-4 md:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl border border-brand-line bg-white p-4 shadow-card">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              {/* Replace src with your real logo path */}
              <img
                src="/logo.png"
                alt="EPC Logo"
                className="h-14 w-14 rounded-xl border border-brand-line object-cover"
                onError={(e) => {
                  // fallback: hide broken image
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <div className="font-heading text-lg font-bold text-brand-ink">
                  Admin Panel
                </div>
                <div className="text-xs text-slate-500">Eurasia Policy Council</div>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              {/* Top-level */}
              <NavLink to="/epc-admin-92f3" end className={linkClass}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>

              <NavLink to="/epc-admin-92f3/events" className={linkClass}>
                <CalendarDays size={18} />
                Events
              </NavLink>

              <NavLink to="/epc-admin-92f3/hottopics" className={linkClass}>
                <Flame size={18} />
                Home Hot Topics
              </NavLink>
              <NavLink to="/epc-admin-92f3/callbackrequests" className={linkClass}>
                <PhoneCall size={18} />
                Call Back Requests
              </NavLink>
              <NavLink to="/epc-admin-92f3/research-papers" className={linkClass}>
                <FileText size={18} />
                Home Latest Research Papers
              </NavLink>
              <NavLink to="/epc-admin-92f3/membershipplans" className={linkClass}>
                <Plus size={18} />
                Membership Page
              </NavLink>
              <NavLink to="/epc-admin-92f3/membershiprequests" className={linkClass}>
                <Inbox size={18} />
                Membership Requests
              </NavLink>

              {/* Education dropdown */}
              <button
                type="button"
                onClick={() => setEduOpen((s) => !s)}
                className={groupBtnClass(eduOpen)}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap size={18} />
                  Education
                </span>
                <ChevronDown
                  size={18}
                  className={`transition ${eduOpen ? "rotate-180" : ""}`}
                />
              </button>

              {eduOpen && (
                <div className="space-y-1">
                  <NavLink to="/epc-admin-92f3/institutions" className={subLinkClass}>
                    <Building2 size={16} />
                    Institutions
                  </NavLink>
                  <NavLink to="/epc-admin-92f3/exchange" className={subLinkClass}>
                    <Repeat2 size={16} />
                    Exchange
                  </NavLink>
                  <NavLink to="/epc-admin-92f3/universities" className={subLinkClass}>
                    <School size={16} />
                    Universities
                  </NavLink>
                   <NavLink to="/epc-admin-92f3/seminars" className={subLinkClass}>
                    <Presentation size={16} />
                    Seminars
                  </NavLink>
                   <NavLink to="/epc-admin-92f3/workshops" className={subLinkClass}>
                    <Wrench size={16} />
                    Workshops
                  </NavLink>
                  <NavLink to="/epc-admin-92f3/conference" className={subLinkClass}>
                    <Mic size={16} />
                    Conference
                  </NavLink>
                </div>
              )}

              {/* Climate Change dropdown */}
              <button
                type="button"
                onClick={() => setClimateOpen((s) => !s)}
                className={groupBtnClass(climateOpen)}
              >
                <span className="flex items-center gap-2">
                  <Leaf size={18} />
                  Climate Change
                </span>
                <ChevronDown
                  size={18}
                  className={`transition ${climateOpen ? "rotate-180" : ""}`}
                />
              </button>

              {climateOpen && (
                <div className="space-y-1">
                  <NavLink
                    to="/epc-admin-92f3/security-diplomacy"
                    className={subLinkClass}
                  >
                    <ShieldCheck size={16} />
                    Security &amp; Diplomacy
                  </NavLink>

                  <NavLink to="/epc-admin-92f3/energy" className={subLinkClass}>
                    <Zap size={16} />
                    Energy
                  </NavLink>

                  <NavLink
                    to="/epc-admin-92f3/waste-management"
                    className={subLinkClass}
                  >
                    <Trash2 size={16} />
                    Waste Management
                  </NavLink>

                  <NavLink
                    to="/epc-admin-92f3/air-pollution"
                    className={subLinkClass}
                  >
                    <Wind size={16} />
                    Air Pollution
                  </NavLink>
                </div>
              )}

              {/* Investment dropdown */}
              <button
                type="button"
                onClick={() => setInvestmentOpen((s) => !s)}
                className={groupBtnClass(investmentOpen)}
              >
                <span className="flex items-center gap-2">
                  <PiggyBank size={18} />
                  Investment
                </span>
                <ChevronDown
                  size={18}
                  className={`transition ${investmentOpen ? "rotate-180" : ""}`}
                />
              </button>

              {investmentOpen && (
                <div className="space-y-1">
                  <NavLink
                    to="/epc-admin-92f3/green-investment"
                    className={subLinkClass}
                  >
                    <Leaf size={16} />
                    Green Investment
                  </NavLink>

                  <NavLink
                    to="/epc-admin-92f3/geopolitical-risk"
                    className={subLinkClass}
                  >
                    <Globe size={16} />
                    Geopolitical Risk
                  </NavLink>

                  <NavLink
                    to="/epc-admin-92f3/energy-transition"
                    className={subLinkClass}
                  >
                    <BadgeDollarSign size={16} />
                    Energy Transition
                  </NavLink>

                  <NavLink
                    to="/epc-admin-92f3/regulatory-reform"
                    className={subLinkClass}
                  >
                    <Scale size={16} />
                    Regulatory Reform
                  </NavLink>
                </div>
              )}
            </div>
             <NavLink to="/epc-admin-92f3/poverty-management" className={linkClass}>
                <HandCoins size={18} />
                Poverty-Management
              </NavLink>
               <NavLink to="/epc-admin-92f3/women-empowerment" className={linkClass}>
                <User2Icon size={18} />
                Women-Empowerment
              </NavLink>

            <button
              onClick={logout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-line px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-mist"
            >
              <LogOut size={18} />
              Logout
            </button>
          </aside>

          <main
  id="admin-main"
  className="rounded-2xl border border-brand-line bg-white p-6 shadow-card max-h-[calc(100vh-2rem)] overflow-y-auto"
>
  <Outlet />
</main>

        </div>
      </div>
    </div>
  );
}
