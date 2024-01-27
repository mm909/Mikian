

import SideNavItem from "./SideNavItem";

import { useState } from 'react';

function SideNav({sideNavOpen, setSideNavOpen}) {

  // Track the active item
  const [active, setActive] = useState(0)

  return (
    <>
      <div className={`
        transition-all
        duration-350
        ${sideNavOpen ? 'max-w-[500px]' : 'overflow-x-hidden max-w-[50px]'}
      `}>
        <div className="
          h-full
          flex
          flex-col
          justify-center
          space-y-[10px]
          border-r-[5px]
          border-secondary
        ">
          <div className="
            text-2xl
            font-mono
            text-center
          ">
            Oddish Geo (1/5)
          </div>
          <div className="
            h-[2.5px]
            bg-secondary
            !m-[0px]
          " />
          <SideNavItem item="From Who?" sideNavOpen={sideNavOpen} active={active === 0} setActive={() => setActive(0)}/>
          <SideNavItem item="Longer Name Game" sideNavOpen={sideNavOpen} active={active === 1} setActive={() => setActive(1)}/>
          <SideNavItem item="Geo Game?" sideNavOpen={sideNavOpen} active={active === 2} setActive={() => setActive(2)}/>
          <SideNavItem item="Short?" sideNavOpen={sideNavOpen} active={active === 3} setActive={() => setActive(3)}/>
          <div className="
            h-[2.5px]
            bg-secondary
          " />
          <SideNavItem item="Short?" sideNavOpen={sideNavOpen} active={active === 4} setActive={() => setActive(4)}/>

        </div>
        
      </div>
    </>
  );
}

export default SideNav;