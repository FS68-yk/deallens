import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout/Layout';
import { Loader2 } from 'lucide-react';
import './App.css';

// Lazy-load all pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Upload = lazy(() => import('./pages/Upload'));
const MarketIntelligence = lazy(() => import('./pages/MarketIntelligence'));
const DealFlow = lazy(() => import('./pages/DealFlow'));
const Projects = lazy(() => import('./pages/Projects'));
const DocumentRepository = lazy(() => import('./pages/DocumentRepository'));
const SmartInbox = lazy(() => import('./pages/SmartInbox'));
const EmailCollection = lazy(() => import('./pages/EmailCollection'));
const CompanyResearch = lazy(() => import('./pages/CompanyResearch'));
const WebData = lazy(() => import('./pages/WebData'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Team = lazy(() => import('./pages/Team'));
const Collaboration = lazy(() => import('./pages/Collaboration'));
const Network = lazy(() => import('./pages/Network'));
const Tags = lazy(() => import('./pages/Tags'));
const Performance = lazy(() => import('./pages/Performance'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ComparisonMatrix = lazy(() => import('./pages/ComparisonMatrix'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen w-full bg-gray-50">
    <div className="flex flex-col items-center">
      <Loader2 size={40} className="animate-spin text-primary-600 mb-4" />
      <p className="text-primary-600 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/intelligence" element={<MarketIntelligence />} />
                <Route path="/dealflow" element={<DealFlow />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/documents" element={<DocumentRepository />} />
                <Route path="/inbox" element={<SmartInbox />} />
                <Route path="/email" element={<EmailCollection />} />
                <Route path="/research" element={<CompanyResearch />} />
                <Route path="/webdata" element={<WebData />} />
                <Route path="/pipeline" element={<Pipeline />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/comparison" element={<ComparisonMatrix />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/team" element={<Team />} />
                <Route path="/collaboration" element={<Collaboration />} />
                <Route path="/network" element={<Network />} />
                <Route path="/tags" element={<Tags />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;