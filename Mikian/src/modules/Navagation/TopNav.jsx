
import React from 'react';

import TopNavLeft from './TopNavLeft.jsx';
import TopNavMiddle from './TopNavMiddle.jsx';
import TopNavRight from './TopNavRight.jsx';

function TopNav({sideNavOpen, setSideNavOpen}) {
  return (
    <>
      <div className="
          flex
          flex-row
          min-h-[50px]
          bg-secondary
      ">
            <TopNavLeft sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
            <TopNavMiddle />
            <TopNavRight />
      </div>
    </>
  );
}
  
export default TopNav;