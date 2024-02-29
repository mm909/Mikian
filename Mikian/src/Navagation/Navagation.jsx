import { Outlet } from 'react-router-dom'
import TopNav from './TopNav.jsx'

function Navagation() {
    return (
        <>  
            <TopNav />
            {/* <SideNav /> */}
            <Outlet />
        </>
    )
}

export default Navagation