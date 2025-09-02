import React, { useEffect, useState } from 'react';

import { Search, Filter, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserManagement = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);

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
      case true:
        return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
          Active
        </span>;
      case false:
        return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
          Inactive
        </span>;
      default:
        return null;
    }
  };


  const [generalMetrics, setGeneralMetrics] = useState({
    totalusers: 0,
    activeUsers: 0,
    pendingApproval: 0,
    inactiveUsers: 0

  });



  const fetchUsersInfo = async () => {

    const response = await axios.get(`${API_URL}/getUserStatistics`);
    console.log(response.data);
    if (response.status === 200 && response.data.success) {
      console.log(response.data.data.mentors.total);
      let result = response.data.data;

      let mentors = result.mentors;
      let students = result.students;
      let recruiters = result.recruiters;

      setGeneralMetrics({
        totalusers: mentors.total + students.total + recruiters.total,
    activeUsers: mentors.active + students.active + recruiters.active,
    pendingApproval: 0,
    inactiveUsers: mentors.inactive + recruiters.inactive
      });

    } else {


      toast.error(response.data.message || "Something went wrong");
    }

  }




  const fetch_users = async () => {
    try {

      let response = await axios.get(`${API_URL}/getStudentData`);

      if (usersFilterType === 'students') {

        response = await axios.get(`${API_URL}/getStudentData`);
        if (response.status == 200 && response.data.success) {
          console.log(response.data.data.students);

          setUsers(response.data.data.students);


        } else {


          toast.error(response.data.message || "Something went wrong");
        }


      }


      if (usersFilterType === 'mentors') {

        response = await axios.get(`${API_URL}/getMentorsData`);
        if (response.status == 200 && response.data.success) {

          setUsers(response.data.data.mentors);


        } else {


          toast.error(response.data.message || "Something went wrong");
        }

      }


      if (usersFilterType === 'recruiters') {

        response = await axios.get(`${API_URL}/getRecruitersData`);
        if (response.status == 200 && response.data.success) {

          setUsers(response.data.data.recruiters);


        } else {


          toast.error(response.data.message || "Something went wrong");
        }

      }



    } catch (error) {


      toast.error("Something went wrong");
    }


  } 


  const [usersFilterType, setUsersFilterType] = useState('students');




  useEffect(() => {
    fetch_users();
     fetchUsersInfo();
  }, [usersFilterType]);



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
      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Total Users
        </h3>
        <p className="text-2xl font-semibold">{
          generalMetrics.totalusers}</p>
      </div>

      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Active Users
        </h3>
        <p className="text-2xl font-semibold">{
          generalMetrics.activeUsers}</p>
      </div>


      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Pending Approval
        </h3>
        <p className="text-2xl font-semibold">
          {
            generalMetrics.pendingApproval
          }
        </p>
      </div>


      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Inactive Users
        </h3>
        <p className="text-2xl font-semibold">

          {

            generalMetrics.inactiveUsers
          }
        </p>
      </div>
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
            <select onChange={(e) => { setUsersFilterType(e.target.value) }} className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">

              <option value={"students"}>Students</option>
              <option value={"mentors"}>Mentors</option>
              <option value={"recruiters"}>Recruiters</option>
            </select>
            {/* <select className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select> */}
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
                    {user.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user.username}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {
                  usersFilterType === "students" && "Student"

                }

                {
                  usersFilterType === "mentors" && "Mentor"

                }

                {
                  usersFilterType === "recruiters" && "Recruiter"

                }
              </td>
              <td className="px-6 py-4 text-sm">
                {getStatusBadge(user.isActive)}
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