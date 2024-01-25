import { Routes, Route } from 'react-router-dom'

import './App.css'

import Navagation from './modules/Navagation/Navagation.jsx'
import NotFound from './modules/NotFound/NotFound.jsx'
import ScratchMap from './modules/Maps/ScratchMap.jsx'
import MapApp from './modules/apps/MapApp.jsx'

function App() {
  return (
    <>  
      <div className='bg-bg min-h-[100vh]'>
        <Routes>
            <Route path="/" element={<Navagation />}>
              <Route path="/" element={<MapApp />} />
              {/* <Route path="MatchHistory" element={<MatchHistory />} /> */}
              <Route path="*" element={<NotFound />} /> 
            </Route>
          </Routes>
      </div>
    </>
  )
}

export default App
