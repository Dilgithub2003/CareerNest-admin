import React from 'react';
import { Bell, Search } from 'lucide-react';
const Header = () => {
  return <header className="bg-white border-b border-gray-200 p-4 pl-6 pr-6 ml-64">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
              TK
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;