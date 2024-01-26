

import SideNavItem from "./SideNavItem";

import { useState } from 'react';

function SideNav() {

  // Track the active item
  const [active, setActive] = useState(0)

  return (
    <>
      <div className="
        min-w-[50px]
      ">
        <div className="
          h-full
          flex
          flex-col
          justify-center
          space-y-[10px]
          border-r-[5px]
          border-secondary
        ">
          <SideNavItem item="From Who?" active={active === 0} setActive={() => setActive(0)}/>
          <SideNavItem item="Longer Name Game" active={active === 1} setActive={() => setActive(1)}/>
          <SideNavItem item="Geo Game?" active={active === 2} setActive={() => setActive(2)}/>
          <SideNavItem item="Short?" active={active === 3} setActive={() => setActive(3)}/>
          <div className="
            h-[2.5px]
            bg-secondary
          " />
          <SideNavItem item="Short?" active={active === 4} setActive={() => setActive(4)}/>

        </div>
        
      </div>
    </>
  );
}

export default SideNav;