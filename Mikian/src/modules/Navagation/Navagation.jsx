import React from 'react';
import { Outlet } from 'react-router-dom';

import TopNav from './TopNav.jsx';
import SideNav from './SideNav.jsx';

function Navagation() {

  const [sideNavOpen, setSideNavOpen] = React.useState(false);

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <TopNav sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
        <div className='flex flex-row flex-grow'> 
          <SideNav sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
          <div className='flex-grow'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
  
export default Navagation;