import React, { useState } from 'react';

import { Search, Filter, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
const users = [{
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'User',
  status: 'Active'
}, {
  id: 2,
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'Admin',
  status: 'Active'
}, {
  id: 3,
  name: 'Robert Johnson',
  email: 'robert.johnson@example.com',
  role: 'Recruiter',
  status: 'Inactive'
}, {
  id: 4,
  name: 'Lisa Anderson',
  email: 'lisa.anderson@example.com',
  role: 'User',
  status: 'Active'
}, {
  id: 5,
  name: 'Michael Brown',
  email: 'michael.brown@example.com',
  role: 'User',
  status: 'Pending'
}, {
  id: 6,
  name: 'Emily Davis',
  email: 'emily.davis@example.com',
  role: 'Recruiter',
  status: 'Active'
}, {
  id: 7,
  name: 'William Wilson',
  email: 'william.wilson@example.com',
  role: 'User',
  status: 'Active'
}, {
  id: 8,
  name: 'Olivia Moore',
  email: 'olivia.moore@example.com',
  role: 'Admin',
  status: 'Active'
}, {
  id: 9,
  name: 'James Taylor',
  email: 'james.taylor@example.com',
  role: 'User',
  status: 'Inactive'
}, {
  id: 10,
  name: 'Sophia Thomas',
  email: 'sophia.thomas@example.com',
  role: 'Recruiter',
  status: 'Active'
}, {
  id: 11,
  name: 'Daniel Clark',
  email: 'daniel.clark@example.com',
  role: 'User',
  status: 'Pending'
}];
const userStats = [{
  label: 'Total Users',
  value: 16
}, {
  label: 'Active Users',
  value: 11
}, {
  label: 'Pending Approval',
  value: 3
}, {
  label: 'Inactive Users',
  value: 2
}];
const UserManagement = () => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const handleSort = field => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const getSortIcon = field => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };
  const sortedUsers = [...users].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });
  const getStatusBadge = status => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
            Active
          </span>;
      case 'Inactive':
        return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
            Inactive
          </span>;
      case 'Pending':
        return <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
            Pending
          </span>;
      default:
        return null;
    }
  };
  return <div className="ml-64">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
          + Add New User
        </button>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => <div key={index} className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h3 className="mb-2 text-sm font-medium text-gray-500">
              {stat.label}
            </h3>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>)}
      </div>
      <div className="mb-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search users..." className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-3 py-2 space-x-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <option>All Roles</option>
                <option>User</option>
                <option>Admin</option>
                <option>Recruiter</option>
              </select>
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  <input type="checkbox" className="text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer" onClick={() => handleSort('email')}>
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    {getSortIcon('email')}
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer" onClick={() => handleSort('role')}>
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    {getSortIcon('role')}
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer" onClick={() => handleSort('status')}>
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedUsers.map(user => <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-600 bg-gray-200 rounded-full">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1 to {users.length} of {users.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm text-white bg-purple-600 rounded-md">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default UserManagement;