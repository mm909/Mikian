import { Routes, Route } from 'react-router-dom'

import './App.css'

import Navagation from './modules/Navagation/Navagation.jsx'
import NotFound from './modules/NotFound/NotFound.jsx'
import ScratchMap from './modules/Maps/ScratchMap.jsx'

function App() {
  return (
    <>  
      <div className='bg-bg min-h-[100vh]'>
        <Routes>
            <Route path="/" element={<Navagation />}>
              <Route path="/" element={<ScratchMap />} />
              {/* <Route path="MatchHistory" element={<MatchHistory />} /> */}
              <Route path="*" element={<NotFound />} /> 
            </Route>
          </Routes>
      </div>
    </>
  )
}

export default App
