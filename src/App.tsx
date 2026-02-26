import { Routes, Route, Navigate } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import Homes from './pages/Home'
import AboutOverview from './pages/about/AboutOverview'
import MissionVision from './pages/about/MissionVision'
import WhatWeDo from './pages/about/WhatWeDo'
import Leadership from './pages/about/Leadership'
import Partners from './pages/about/Partners'
import Careers from './pages/about/Careers'
import AnnualReport from './pages/about/AnnualReport'
import MediaPress from './pages/about/MediaPress'
import InsightsLanding from './pages/insights/InsightsLanding'
import TopicsListing from './pages/insights/TopicsListing'
import RegionsListing from './pages/insights/RegionsListing'
import ArticlesListing from './pages/insights/ArticlesListing'
import PublicationsLanding from './pages/publications/PublicationsLanding'
import PublicationsListing from './pages/publications/PublicationsListing'
import EventsLanding from './pages/events/EventsLanding'
import UpcomingEvents from './pages/events/UpcomingEvents'
import PastEvents from './pages/events/PastEvents'
import OurTeam from './pages/people/OurTeam'
import ExpertsDirectory from './pages/people/ExpertsDirectory'
import EducationLanding from './pages/education/EducationLanding'
import EducationCategory from './pages/education/EducationCategory'
import SupportLanding from './pages/support/SupportLanding'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Institutions from "./pages/education/Institutions";
import Universities from "./pages/education/Universities"
import Seminars from "./pages/education/Seminars"
import Workshops from "./pages/education/Workshops"
import Conference from "./pages/education/Conference"
import SecurityDiplomacy from "./pages/climatechange/SecurityDiplomacy"
import AirPolution from "./pages/climatechange/AirPolution"
import Energy from "./pages/climatechange/Energy"
import WasteManagement from "./pages/climatechange/WasteManagement"
import { ToastContainer } from "react-toastify";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import RequireAdmin from "./components/admin/RequireAdmin";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminHotTopics from './pages/admin/AdminHotTopics'
import AdminResearch from './pages/admin/AdminResearch'
import AdminInstitutions from "./pages/admin/AdminInstitution";
import Exchange from './pages/education/Exchange'
import AdminExchange from './pages/admin/AdminExchange'
import AdminUniversities from "./pages/admin/AdminUniversities"
import AdminSeminars from "./pages/admin/AdminSeminars"
import AdminWorkshops from "./pages/admin/AdminWorkshops"
import AdminConference from "./pages/admin/AdminConference"
import AdminCallbackRequests from './pages/admin/AdminCallbackRequests'
import AdminSecurityDiplomacy from './pages/admin/AdminSecurityDiplomacy'
import AdminAirpollution from "./pages/admin/AdminAirPolution"
import AdminEnergy from "./pages/admin/AdminEnergy"
import AdminWasteManagement from './pages/admin/AdminWasteManagement'
import ClimateChangeLanding from './pages/climatechange/ClimateChangeLanding'
import Researchers from './pages/people/Researcher'
import Membership from "./pages/Membership"
import AdminMembershipPlans from "./pages/admin/AdminMembershipPlans"
import AdminMembershipRequests from './pages/admin/AdminMembershipRequests'
import InvestmentLanding from './pages/Investement/InvestmentLanding'
import Energytransition from "./pages/Investement/Energytransition"
import Geopoliticalrisk from "./pages/Investement/Geopoliticalrisk"
import GreenInvestment from "./pages/Investement/GreenInvestment"
import Regulatoryreform from "./pages/Investement/Regulatoryreform"
import AdminGreenInvestment from './pages/admin/AdminGreenInvestment'
import AdminEnergyTransition from './pages/admin/AdminEnergyTransition'
import AdminGeopoliticalRisk from './pages/admin/AdminGeopoliticalRisk'
import AdminRegulatoryReform from './pages/admin/AdminRegulatoryReform'
import PowertyManagment from "./pages/PovertyManagment"
import WomenEmpowerment from "./pages/WomenEmpowermet"
import AdminPovertyManagement from "./pages/admin/AdminPovertyManagement"
import AdminWomenEmpowerment from "./pages/admin/AdminWomenEmpowerment"


export default function App() {
  const ADMIN_PREFIX = "/epc-admin-92f3";
  return (
    <>
    <Routes>
   
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Homes/>} />

        <Route path="/about" element={<AboutOverview />} />
        <Route path="/about/mission-vision" element={<MissionVision />} />
        <Route path="/about/what-we-do" element={<WhatWeDo />} />
        <Route path="/about/leadership" element={<Leadership />} />
        <Route path="/about/partners" element={<Partners />} />
        <Route path="/about/careers" element={<Careers />} />
        <Route path="/about/annual-report" element={<AnnualReport />} />
        <Route path="/about/media" element={<MediaPress />} />

        <Route path="/insights" element={<InsightsLanding />} />
        <Route path="/insights/topics" element={<TopicsListing />} />
        <Route path="/insights/regions" element={<RegionsListing />} />
        <Route path="/insights/all" element={<ArticlesListing />} />

        <Route path="/publications" element={<PublicationsLanding />} />
        <Route path="/publications/library" element={<PublicationsListing />} />

        <Route path="/events" element={<EventsLanding />} />
        <Route path="/events/upcoming" element={<UpcomingEvents />} />
        <Route path="/events/past" element={<PastEvents />} />

        <Route path="/people" element={<OurTeam />} />
        <Route path="/researcher" element={<Researchers/>} />
        <Route path="/people/directory" element={<ExpertsDirectory />} />

       <Route path="/climate-change" element={<ClimateChangeLanding/>} />
       <Route path="/climate-change/security-diplomacy" element={<SecurityDiplomacy />} />
       <Route path="/climate-change/waste-management" element={<WasteManagement />} />
       <Route path="/climate-change/energy" element={<Energy />} />
       <Route path="/climate-change/air-pollution" element={<AirPolution/>} />
        <Route path="/education" element={<EducationLanding />} />
         <Route path="/education/institutions" element={<Institutions />} />
         <Route path="/education/exchange" element={<Exchange/>} />
         <Route path="/education/universities" element={<Universities/>} />
         <Route path="/education/seminars" element={<Seminars/>} />
         <Route path="/education/workshops" element={<Workshops/>} />
         <Route path="/education/conference" element={<Conference/>} />
        <Route path="/education/:category" element={<EducationCategory />} />

       <Route path="/investment" element={<InvestmentLanding/>} />
       <Route path="/investment/energy-transition" element={<Energytransition/>} />
      <Route path="/investment/geopolitical-risk" element={<Geopoliticalrisk/>} />
       <Route path="/investment/green-investment" element={<GreenInvestment/>} />
       <Route path="/investment/regulatory-reform" element={<Regulatoryreform/>} />


         <Route path="/poverty-management" element={<PowertyManagment/>} />
         <Route path="/women-empowerment" element={<WomenEmpowerment/>} />
        <Route path="/membership" element={<Membership/>} />
        <Route path="/support" element={<SupportLanding />} />

        <Route path="/contact" element={<Contact />} />
        


        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>

     <Route path={`${ADMIN_PREFIX}/login`} element={<AdminLogin />} />

<Route
  path={ADMIN_PREFIX}
  element={
    <RequireAdmin>
      <AdminLayout />
    </RequireAdmin>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="events" element={<AdminEvents />} />
    <Route path="hottopics" element={<AdminHotTopics />} />
  <Route path="research-papers" element={<AdminResearch />} />
  <Route path="institutions" element={<AdminInstitutions />} />
    <Route path="exchange" element={<AdminExchange />} />
    <Route path="universities" element={<AdminUniversities />} />
<Route path="seminars" element={<AdminSeminars/>} />
<Route path="workshops" element={<AdminWorkshops/>} />
<Route path="conference" element={<AdminConference/>} />
<Route path="callbackrequests" element={<AdminCallbackRequests/>} />
<Route path="security-diplomacy" element={<AdminSecurityDiplomacy/>} />
<Route path="air-pollution" element={<AdminAirpollution/>} />
<Route path="energy" element={<AdminEnergy/>} />
<Route path="waste-management" element={<AdminWasteManagement/>} />
<Route path="membershipplans" element={<AdminMembershipPlans/>} />
<Route path="membershiprequests" element={<AdminMembershipRequests/>} />
<Route path="green-investment" element={<AdminGreenInvestment/>} />
<Route path="geopolitical-risk" element={<AdminGeopoliticalRisk/>} />
<Route path="energy-transition" element={<AdminEnergyTransition/>} />
<Route path="regulatory-reform" element={<AdminRegulatoryReform/>} />
<Route path="poverty-management" element={<AdminPovertyManagement/>} />
<Route path="women-empowerment" element={<AdminWomenEmpowerment/>} />






</Route>

    </Routes>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  )
}
