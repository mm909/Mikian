import { Routes, Route } from 'react-router-dom'

import './App.css'

import { GeoContextProvider } from '@/Geo/Engine/GeoContext.jsx'

import Navagation from '@/Navagation/Navagation.jsx'
import GeoQuest from '@/Geo/Apps/GeoQuest.jsx'

function App() {
  return (
    <>  
      <GeoContextProvider>
        <Routes>
          <Route path="/" element={<Navagation />}>
              <Route path="/GeoQuest" element={<GeoQuest />} />
              {/* <Route path="*" element={<NotFound />} />  */}
          </Route>
        </Routes>
      </GeoContextProvider>
    </>
  )
}

export default App
