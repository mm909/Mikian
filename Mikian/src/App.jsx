import { Routes, Route } from 'react-router-dom'

import './App.css'

import { GeoContextProvider } from '@/Geo/Engine/GeoContext.jsx'
import { MousePositionProvider } from '@/Utilities/MousePositionContext.jsx'

import Navagation from '@/Navagation/Navagation.jsx'
import GeoQuest from '@/Geo/Apps/GeoQuest.jsx'
import SketchBox from '@/Geo/Apps/SketchBox.jsx'
import BlankApp from '@/Utilities/BlankApp.jsx'

function App() {
  return (
    <>  
      <MousePositionProvider>
        <GeoContextProvider>
            <Routes>
              <Route path="/" element={<Navagation />}>
                  {/* <Route path="/GeoQuest" element={<GeoQuest />} />
                  <Route path="/SketchBox" element={<SketchBox />} /> */}
                  <Route path="Blank" element={<BlankApp />} /> 
                  {/* <Route path="*" element={<NotFound />} />  */}
              </Route>
            </Routes>
          </GeoContextProvider>
      </MousePositionProvider>
    </>
  )
}

export default App
