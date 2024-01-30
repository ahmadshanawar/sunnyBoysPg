import React, { useState } from 'react';
import TopAppBar from "./common/top-app-bar";
import SideBar from "./common/sidebar";
const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleMenuIconClick = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <div>
      <TopAppBar onMenuIconClick={handleMenuIconClick} isSidebarOpen={isSidebarOpen} />
      <div>
        <SideBar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        <div style={{ marginLeft: isSidebarOpen ? '250px' : '0px', transition: 'margin 0.26s', marginTop: '30px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
export default Layout