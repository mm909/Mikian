import Hamburger from './Hamburger.jsx'
import { useState } from 'react'
import SideNav from './SideNav.jsx'

function TopNav() {

    const [sideNavOpen, setSideNavOpen] = useState(false)

    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen)
    }

    return (
        <>  
            <div className="
                border-b-[1px]
                border-[rgba(0,0,0,0.3)]
                h-[56px]
            ">
                <div className='
                    mx-[20px]
                    h-full
                '>
                    <div className='
                        flex
                        justify-between
                        items-center
                        h-full
                    '>
                        <Hamburger onClick={toggleSideNav} />
                    </div>
                    <SideNav />
                </div>
            </div>
        </>
    )
}

export default TopNav