import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import JobPostModeration from './pages/JobPostModeration';
import MentorListing from './pages/MentorListing';
export function App() {
  return <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/job-post-moderation" element={<JobPostModeration />} />
          <Route path="/mentor-listing" element={<MentorListing />} />
        </Routes>
      </Layout>
    </Router>;
}