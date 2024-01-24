import React from 'react';
import { Outlet } from 'react-router-dom';

import TopNav from './TopNav.jsx';
import SideNav from './SideNav.jsx';

function Navagation() {

  return (
    <>
      <TopNav />
      <div className='flex flex-row'> 
        <SideNav />
        <div className='flex-grow'>

          <Outlet />
        </div>
      </div>
    </>
  );
}
  
export default Navagation;