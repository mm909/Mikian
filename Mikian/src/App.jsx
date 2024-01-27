import { Routes, Route } from 'react-router-dom'

import './App.css'

import Navagation from './modules/Navagation/Navagation.jsx'
import NotFound from './modules/NotFound/NotFound.jsx'
import FromWho from './modules/apps/FromWho.jsx'
import MapApp from './modules/apps/MapApp.jsx'

function App() {
  return (
    <>  
      <div className='bg-bg min-h-[100vh]  bg-primary'>
        <Routes>
            <Route path="/" element={<Navagation />}>
              {/* <Route path="/" element={<TestApp />} /> */}
              <Route path="/fromwho" element={<FromWho />} />
              <Route path="/map" element={<MapApp />} />
              {/* <Route path="MatchHistory" element={<MatchHistory />} /> */}
              <Route path="*" element={<NotFound />} /> 
            </Route>
          </Routes>
      </div>
    </>
  )
}

export default App
