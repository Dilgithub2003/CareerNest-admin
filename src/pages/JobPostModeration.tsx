import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
const jobPosts = [{
  id: 1,
  company: 'Software Engineering Intern',
  position: 'Tech Innovate',
  postDate: '2023-07-15',
  status: 'Pending',
  logo: 'https://via.placeholder.com/32'
}, {
  id: 2,
  company: 'Marketing Director',
  position: 'Brand Builders',
  postDate: '2023-07-14',
  status: 'Approved',
  logo: 'https://via.placeholder.com/32'
}, {
  id: 3,
  company: 'UX/UI Designer',
  position: 'Creative Solutions',
  postDate: '2023-07-12',
  status: 'Rejected',
  logo: 'https://via.placeholder.com/32'
}, {
  id: 4,
  company: 'Product Manager',
  position: 'Startup Vision',
  postDate: '2023-07-10',
  status: 'Approved',
  logo: 'https://via.placeholder.com/32'
}, {
  id: 5,
  company: 'Data Scientist',
  position: 'Data Insights Inc',
  postDate: '2023-07-09',
  status: 'Pending',
  logo: 'https://via.placeholder.com/32'
}, {
  id: 6,
  company: 'Frontend Developer',
  position: 'Web Masters',
  postDate: '2023-07-08',
  status: 'Approved',
  logo: 'https://via.placeholder.com/32'
}, {
  id: 7,
  company: 'Human Resources Manager',
  position: 'People First',
  postDate: '2023-07-07',
  status: 'Rejected',
  logo: 'https://via.placeholder.com/32'
}];
const jobStats = [{
  label: 'Total Job Posts',
  value: 7
}, {
  label: 'Pending Review',
  value: 2
}, {
  label: 'Approved Posts',
  value: 3
}, {
  label: 'Rejected Posts',
  value: 2
}];
const JobPostModeration = () => {
  const getStatusBadge = status => {
    switch (status) {
      case 'Approved':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Approved
          </span>;
      case 'Rejected':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Rejected
          </span>;
      case 'Pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Pending
          </span>;
      default:
        return null;
    }
  };
  return <div className="ml-64">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Job Post Moderation
        </h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700">
          + Add New Job Post
        </button>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        {jobStats.map((stat, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {stat.label}
            </h3>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>)}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search job posts..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div className="flex space-x-3">
              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center space-x-2 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <option>Date: Newest First</option>
                <option>Date: Oldest First</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post Date
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobPosts.map(job => <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={job.logo} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {job.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {job.position}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {job.postDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Approve
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1 to {jobPosts.length} of {jobPosts.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default JobPostModeration;