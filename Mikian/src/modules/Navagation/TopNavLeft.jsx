

import React from 'react';

function TopNavLeft({sideNavOpen, setSideNavOpen}) {
    return (
        <>
        <div className='flex items-center justify-center pl-[10px]'>
            <div className='
                w-[25px]
                h-[25px]
                bg-primary
                rounded-[4px]
            '
            onClick={() => setSideNavOpen(!sideNavOpen)} 
            />
        </div>
        <div className="
            flex
            items-center
            justify-center
            font-mono
            text-2xl
            text-white
            pl-[10px]
        ">
            Oddish
          </div>
        </>
    );
}

export default TopNavLeft;