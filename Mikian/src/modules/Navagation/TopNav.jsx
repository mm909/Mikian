
import React from 'react';

import TopNavLeft from './TopNavLeft.jsx';
import TopNavMiddle from './TopNavMiddle.jsx';
import TopNavRight from './TopNavRight.jsx';

function TopNav() {
  return (
    <>
      <div className="
          flex
          flex-row
          //min-h-[50px]
          //border-b-[1px]
          //border-black
      ">
            <TopNavLeft />
            <TopNavMiddle />
            <TopNavRight />
      </div>
    </>
  );
}
  
export default TopNav;