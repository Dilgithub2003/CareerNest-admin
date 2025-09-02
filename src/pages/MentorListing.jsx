import React, { useEffect, useState } from 'react';

import { Search, Filter, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const MentorListing = () => {

  const API_URL = import.meta.env.VITE_API_URL;


  const getAvailabilityBadge = availability => {
    switch (availability) {
      case 'Available':
        return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
          Available
        </span>;
      case 'Busy':
        return <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
          Busy
        </span>;
      default:
        return null;
    }

  };


  const [mentors, setMentors] = useState([]);

  const fetch_mentors = async () => {


    try {

      const response = await axios.get(`${API_URL}/getMentorsData`);
      if (response.status === 200 && response.data.success) {
        console.log(response.data.data);
        setMentors(response.data.data.mentors);

      } else {


        toast.error(response.data.message || "Something went wrong");
      }


    } catch (error) {
      console.error("Error fetching mentors:", error);
      toast.error("Failed to fetch mentors");
    }
  }

  useEffect(() => {

    fetch_mentors();
  }, []);

  const [searchKeyWord, setSearchKeyWord] = useState('');

  const search_mentors = async () => {

    if (searchKeyWord === '') {
      fetch_mentors();
      return;
    }

    setMentors((prevMentors) => prevMentors.filter((mentor) => mentor.username.toLowerCase().includes(searchKeyWord.toLowerCase())));
  }

  useEffect(()=>{
search_mentors();
  },[searchKeyWord])

  return <div className="ml-64">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Mentor Listing</h1>
      <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
        + Add New Mentor
      </button>
    </div>
    <div className="flex items-center justify-between mb-6">
      <div className="relative w-64">
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        <input onChange={(e) => setSearchKeyWord(e.target.value)} type="text" placeholder="Search mentors..." className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
      </div>
      <div className="flex space-x-3">
        <button className="flex items-center px-3 py-2 space-x-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <select className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          <option>All Categories</option>
          <option>Technology</option>
          <option>Marketing</option>
          <option>Design</option>
          <option>Business</option>
        </select>
        <select className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          <option>All Availability</option>
          <option>Available</option>
          <option>Busy</option>
        </select>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-6">
      {mentors?.map(mentor => <div key={mentor.id} className="overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className={`p-4 ${mentor.featured ? 'bg-purple-50 border-b border-purple-100' : 'border-b border-gray-100'}`}>
          {mentor?.featured && <span className="inline-flex items-center px-2 py-1 mb-2 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
            Featured
          </span>}
          <div className="flex items-center">
            <img className="w-16 h-16 rounded-full" src={mentor.avatar} alt={mentor.name} />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {mentor.username}
              </h3>
              <p className="text-sm text-gray-500">
               {mentor.email}
              </p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {mentor?.rating}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                {getAvailabilityBadge(mentor?.availability)}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          {/* <div className="mb-4">
            <p className="mb-2 text-sm text-gray-500">
              Experience: {mentor.experience}
            </p>
            <div className="flex flex-wrap gap-2">
              {mentor?.skills?.map((skill, index) => <span key={index} className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-md">
                {skill}
              </span>)}
            </div>
          </div> */}
          <div className="flex space-x-2">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
              View Profile
            </button>
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Contact
            </button>
          </div>
        </div>
      </div>)}
    </div>
    <div className="flex justify-center mt-8">
      <div className="flex space-x-2">
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50">
          Previous
        </button>
        <button className="px-3 py-1 text-sm text-white bg-purple-600 rounded-md">
          1
        </button>
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md">
          2
        </button>
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md">
          Next
        </button>
      </div>
    </div>
  </div>;
};
export default MentorListing;