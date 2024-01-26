
import { useState } from 'react';

function SideNavItem({item, active, setActive}) {

    return (
      <>
        <div className={`
            flex
            items-center
            space-x-[10px]
            p-[10px]
            font-mono
            ${active ? 'bg-secondary' : 'bg-primary'}
            transition-all
        `}
        onClick={() => setActive()}
        >
            <div className={`
                w-[25px]
                h-[25px]
                rounded-[4px]
                transition-all
                border-[1px]
                ${active ? 'bg-primary' : 'bg-secondary'}
                ${active ? ' border-secondary' : 'border-transparent'}
            `}/>
            <div className={`
            select-none
            transition-all
            ${active ? 'text-white' : 'text-black'}
            `}>
                {item}
            </div>
        </div>
      </>
    );
  }
  
  export default SideNavItem;