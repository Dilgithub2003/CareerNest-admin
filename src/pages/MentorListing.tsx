import React from 'react';

import { Search, Filter, Star } from 'lucide-react';
const mentors = [{
  id: 1,
  name: 'Dr. Anna Sharma',
  role: 'Senior Product Manager',
  company: 'Google',
  experience: '10+ years',
  rating: 4.8,
  availability: 'Available',
  avatar: 'https://via.placeholder.com/64',
  skills: ['Product Strategy', 'UX Design', 'Team Leadership'],
  featured: true
}, {
  id: 2,
  name: 'Benjamin Carter',
  role: 'Software Engineer',
  company: 'Microsoft',
  experience: '8 years',
  rating: 4.5,
  availability: 'Available',
  avatar: 'https://via.placeholder.com/64',
  skills: ['React', 'Node.js', 'Cloud Architecture'],
  featured: false
}, {
  id: 3,
  name: 'Olivia Lee',
  role: 'Marketing Director',
  company: 'Salesforce',
  experience: '12 years',
  rating: 4.9,
  availability: 'Busy',
  avatar: 'https://via.placeholder.com/64',
  skills: ['Brand Strategy', 'Digital Marketing', 'Analytics'],
  featured: true
}, {
  id: 4,
  name: 'David Kim',
  role: 'UX Designer',
  company: 'Apple',
  experience: '7 years',
  rating: 4.7,
  availability: 'Available',
  avatar: 'https://via.placeholder.com/64',
  skills: ['UI Design', 'Prototyping', 'User Research'],
  featured: false
}, {
  id: 5,
  name: 'Sarah Wilson',
  role: 'Data Scientist',
  company: 'Amazon',
  experience: '9 years',
  rating: 4.6,
  availability: 'Busy',
  avatar: 'https://via.placeholder.com/64',
  skills: ['Machine Learning', 'Python', 'Data Visualization'],
  featured: true
}, {
  id: 6,
  name: 'Michael Garcia',
  role: 'Frontend Developer',
  company: 'Netflix',
  experience: '6 years',
  rating: 4.4,
  availability: 'Available',
  avatar: 'https://via.placeholder.com/64',
  skills: ['JavaScript', 'CSS', 'React'],
  featured: false
}];
const MentorListing = () => {
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
          <input type="text" placeholder="Search mentors..." className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
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
        {mentors.map(mentor => <div key={mentor.id} className="overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className={`p-4 ${mentor.featured ? 'bg-purple-50 border-b border-purple-100' : 'border-b border-gray-100'}`}>
              {mentor.featured && <span className="inline-flex items-center px-2 py-1 mb-2 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
                  Featured
                </span>}
              <div className="flex items-center">
                <img className="w-16 h-16 rounded-full" src={mentor.avatar} alt={mentor.name} />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {mentor.role} at {mentor.company}
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {mentor.rating}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    {getAvailabilityBadge(mentor.availability)}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="mb-2 text-sm text-gray-500">
                  Experience: {mentor.experience}
                </p>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill, index) => <span key={index} className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-md">
                      {skill}
                    </span>)}
                </div>
              </div>
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