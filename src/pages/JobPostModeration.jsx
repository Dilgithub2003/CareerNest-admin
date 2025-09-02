import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
const JobPostModeration = () => {

  const API_URL = import.meta.env.VITE_API_URL;

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


  const [jobs, setJobs] = useState([]);
  const [jobMetrics, setJobMetrics] = useState({
    totalJobPosts: 0,
    pendingReview: 0,
    approvedPosts: 0,
    rejectedPosts: 0,
  });

  const fetch_jobs = async () => {

    try {

      const response = await axios.get(`${API_URL}/getAllJobs`);
      if (response.status == 200 && response.data.success) {
        console.log(response.data.data);

        setJobs(response.data.data.students);
      } else {


        toast.error(response.data.message || "Something went wrong");
      }


    } catch (error) {
      toast.error("Job fetching failed");
    }


  }




  useEffect(() => {

    fetch_jobs();
  }, []);


  const approve_job = async (id) => {

    try {

      const response = await axios.put(`${API_URL}/approvedJob`, { jobId: id });
      if (response.status === 200 && response.data.success) {

        toast.success("Job approved successfully");
        fetch_jobs();

      } else {

        toast.error(response.data.message || "Something went wrong");
      }

    } catch (error) {
      console.error("Error approving job:", error);

      toast.error("Failed to approve job");
    }


  }


  const reject_job = async (id) => {

    try {

      const response = await axios.put(`${API_URL}/rejectJob`, { jobId: id });
      console.log(response);
      if (response.status === 200 && response.data.success) {
        toast.success("Job rejected successfully");
        fetch_jobs();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }

    } catch (error) {
      console.error("Error rejecting job:", error);

      toast.error("Failed to reject job");
    }


  }


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
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Total Job Posts
        </h3>
        <p className="text-2xl font-semibold">
          {jobs.length}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Pending Review
        </h3>
        <p className="text-2xl font-semibold">
          {
            jobs?.filter(job => job.isValidate === false).length
          }
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Approved Posts
        </h3>
        <p className="text-2xl font-semibold">
          {
            jobs?.filter(job => job.isValidate === true).length
          }
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Rejected Posts
        </h3>
        <p className="text-2xl font-semibold">
          {2}
        </p>
      </div>
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
                Skills
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience level
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.map(job => <tr key={job.id} className="hover:bg-gray-50">
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
                      {job.job_title}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {job.company}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {job.skills.map(skill => skill).join(', ')}
              </td>
              <td className="px-6 py-4 text-sm">
                {
                  job.experience_level
                }              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-2">
                  {/* <button className="text-indigo-600 hover:text-indigo-900">
                    View
                  </button> */}
                  <button onClick={() => { approve_job(job.id) }} className={`${((job.isValidate) && 'hidden')} "text-green-600 hover:text-green-900"`} disabled={job.isValidate}>
                    Approve
                  </button>
                  <button onClick={() => { reject_job(job.id) }} className={`${!(job.isValidate) && 'hidden'} text-red-600 hover:text-red-900`} disabled={!job.isValidate}>
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
          Showing 1 to {jobs.length} of {jobs.length} entries
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