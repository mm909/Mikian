
import { useState } from 'react';

function SideNavItem({item, active, setActive, sideNavOpen}) {

    return (
      <>
        <div className={`
            flex
            items-center
            space-x-[10px]
            rounded-[5px]
            p-[5px]
            mx-[5px]
            font-mono
            ${active ? 'bg-secondary' : 'bg-primary'}
            transition-all
        `}
        onClick={() => setActive()}
        >
            <div className={`
                min-w-[25px]
                min-h-[25px]
                rounded-[4px]
                transition-all
                border-[1px]
                ${active ? 'bg-primary' : 'bg-secondary'}
                ${active ? ' border-secondary' : 'border-transparent'}
            `} />
            <div className='
              flex
              flex-row
              leading-none
              overflow-hidden
              space-x-[10px]
              pr-[5px]

            '>
              <div className={`
              select-none
              transition-all
              ${active ? 'text-white' : 'text-black'}
              ${sideNavOpen ? '' : '!text-transparent'}
               whitespace-nowrap
               min-w-[150px]
              `}>
                  {item}
              </div>
              <div className={`
              select-none
              transition-all
              ${active ? 'text-white' : 'text-black'}
              `}>
                  15:24
              </div>
            </div>

        </div>
      </>
    );
  }
  
  export default SideNavItem;