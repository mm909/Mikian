import React from 'react';
import { Outlet } from 'react-router-dom';

import TopNav from './TopNav.jsx';
import SideNav from './SideNav.jsx';

function Navagation() {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <TopNav />
        <div className='flex flex-row flex-grow'> 
          <SideNav />
          <div className='flex-grow'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
  
export default Navagation;