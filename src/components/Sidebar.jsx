import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, UserCheck, Settings, HelpCircle } from 'lucide-react';
const Sidebar = () => {
  return <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img src="/Group.png" alt="CareerNest Logo" className="h-6 mr-2" />
          <h1 className="text-xl font-semibold text-purple-900">CareerNest</h1>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <NavLink to="/" className={({
            isActive
          }) => `flex items-center px-4 py-2.5 text-sm rounded-md ${isActive ? 'bg-purple-100 text-purple-900' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-management" className={({
            isActive
          }) => `flex items-center px-4 py-2.5 text-sm rounded-md ${isActive ? 'bg-purple-100 text-purple-900' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Users className="w-5 h-5 mr-3" />
              User Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/job-post-moderation" className={({
            isActive
          }) => `flex items-center px-4 py-2.5 text-sm rounded-md ${isActive ? 'bg-purple-100 text-purple-900' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Briefcase className="w-5 h-5 mr-3" />
              Job Post Moderation
            </NavLink>
          </li>
          <li>
            <NavLink to="/mentor-listing" className={({
            isActive
          }) => `flex items-center px-4 py-2.5 text-sm rounded-md ${isActive ? 'bg-purple-100 text-purple-900' : 'text-gray-600 hover:bg-gray-100'}`}>
              <UserCheck className="w-5 h-5 mr-3" />
              Mentor Listing
            </NavLink>
          </li>
        </ul>
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Settings
          </h3>
          <ul className="mt-2 space-y-1">
            <li>
              <a href="#" className="flex items-center px-4 py-2.5 text-sm rounded-md text-gray-600 hover:bg-gray-100">
                <Settings className="w-5 h-5 mr-3" />
                Account Settings
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2.5 text-sm rounded-md text-gray-600 hover:bg-gray-100">
                <HelpCircle className="w-5 h-5 mr-3" />
                Help & Support
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>;
};
export default Sidebar;