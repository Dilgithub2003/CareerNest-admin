import React, { useEffect, useState } from 'react';

import { Users, Briefcase, FileCheck, Calendar } from 'lucide-react';
import StatCard from '../components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';
import { toast } from 'react-toastify';
const userGrowthData = [{
  name: 'Jan',
  users: 40
}, {
  name: 'Feb',
  users: 60
}, {
  name: 'Mar',
  users: 90
}, {
  name: 'Apr',
  users: 120
}, {
  name: 'May',
  users: 160
}, {
  name: 'Jun',
  users: 220
}, {
  name: 'Jul',
  users: 270
}];
const jobPostsData = [{
  name: 'Engineering',
  count: 120
}, {
  name: 'Design',
  count: 80
}, {
  name: 'Marketing',
  count: 60
}, {
  name: 'Product',
  count: 40
}, {
  name: 'Sales',
  count: 30
}, {
  name: 'Other',
  count: 20
}];

const recentUserActivity = [{
  user: 'John Doe',
  action: 'Created a new account',
  time: '2 mins ago'
}, {
  user: 'Jane Smith',
  action: 'Updated profile picture',
  time: '15 mins ago'
}, {
  user: 'Robert Johnson',
  action: 'Applied for Software Engineer at TechCorp',
  time: '30 mins ago'
}, {
  user: 'Lisa Anderson',
  action: 'Updated resume',
  time: '1 hour ago'
}, {
  user: 'James Wilson',
  action: 'Completed profile onboarding',
  time: '2 hours ago'
}, {
  user: 'Emily Thomas',
  action: 'Connected with John Smith',
  time: '3 hours ago'
}];
const recentSubmissions = [{
  user: 'Sarah Johnson',
  action: 'Marketing Director at Brand House',
  time: '5 mins ago'
}, {
  user: 'Michael Brown',
  action: 'UX Designer at Creative Studio',
  time: '1 hour ago'
}, {
  user: 'Jennifer Williams',
  action: 'Software Developer at Tech Solutions',
  time: '2 hours ago'
}, {
  user: 'David Miller',
  action: 'Product Manager at StartupCo',
  time: '5 hours ago'
}, {
  user: 'Amanda Clark',
  action: 'Frontend Developer at WebDev Inc',
  time: '1 day ago'
}];
const recentRecruiterActivity = [{
  user: 'Julia Parker',
  action: 'Posted Front-End Dev Role',
  time: '3 hours ago'
}, {
  user: 'Thomas Rodriguez',
  action: 'Viewed 3 applications',
  time: '5 hours ago'
}, {
  user: 'Samantha Parker',
  action: 'Updated Senior Analytics Position',
  time: '1 day ago'
}, {
  user: 'Michael Wong',
  action: 'Connected with 5 candidates',
  time: '2 days ago'
}, {
  user: 'Rachel Simmons',
  action: 'Posted 3 internships',
  time: '2 days ago'
}];




const Dashboard = () => {


  const API_URL = import.meta.env.VITE_API_URL;

  const [dataMetrics, setDataMetrics] = useState({
    totalUsers: 0,
    totalActiveJobPosts: 2,
    applications: 0,
    interviewsSheduled: 0,
  });





  const fetchUsersInfo = async () => {

    const response = await axios.get(`${API_URL}/getUserCount`);
    console.log(response.data);
    if (response.status === 200 && response.data.success) {
      setDataMetrics({
        totalUsers: response.data.data.totalUsers,
        totalActiveJobPosts: 2,
        applications: 0,
        interviewsSheduled: 0,
      });

    } else {


      toast.error(response.data.message || "Something went wrong");
    }

  }

  useEffect(() => {

    fetchUsersInfo();
  }, []);

  return <div className="ml-64">
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>
    </div>
    <div className="grid grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Users" value={dataMetrics.totalUsers} change="+12% from last month" icon={<Users className="w-5 h-5 text-white" />} iconColor="bg-blue-500" />
      <StatCard title="Active Job Posts" value={dataMetrics.totalActiveJobPosts} change="+5% from last week" icon={<Briefcase className="w-5 h-5 text-white" />} iconColor="bg-purple-500" />
      <StatCard title="Applications" value={dataMetrics.applications} change="-3% from yesterday" icon={<FileCheck className="w-5 h-5 text-white" />} iconColor="bg-green-500" />
      <StatCard title="Interviews Scheduled" value={dataMetrics.interviewsSheduled} change="+8% from last week" icon={<Calendar className="w-5 h-5 text-white" />} iconColor="bg-orange-500" />
    </div>
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            New User Growth (Past Year)
          </h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Recent User Activity
          </h2>
        </div>
        <div className="h-64 overflow-y-auto">
          <table className="w-full">
            <tbody>
              {recentUserActivity.map((item, index) => <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 text-sm">{item.user}</td>
                <td className="py-3 text-sm text-gray-600">
                  {item.action}
                </td>
                <td className="py-3 text-sm text-right text-gray-500">
                  {item.time}
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Recent Job Submissions
          </h2>
        </div>
        <div className="h-64 overflow-y-auto">
          <table className="w-full">
            <tbody>
              {recentSubmissions.map((item, index) => <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 text-sm">{item.user}</td>
                <td className="py-3 text-sm text-gray-600">
                  {item.action}
                </td>
                <td className="py-3 text-sm text-right text-gray-500">
                  {item.time}
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Job Posts by Category
          </h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={jobPostsData}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-6">
      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Recent Recruiter Activity
          </h2>
        </div>
        <div className="overflow-y-auto">
          <table className="w-full">
            <tbody>
              {recentRecruiterActivity.map((item, index) => <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 text-sm">{item.user}</td>
                <td className="py-3 text-sm text-gray-600">
                  {item.action}
                </td>
                <td className="py-3 text-sm text-right text-gray-500">
                  {item.time}
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>;
};
export default Dashboard;