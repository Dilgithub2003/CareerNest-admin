import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
const Layout = ({
  children
}) => {
  return <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>;
};
export default Layout;