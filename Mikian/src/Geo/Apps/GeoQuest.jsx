
import { useContext } from 'react'
import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

function GeoQuest() {
    const { geoJsonData } = useContext(GeoContext)

    return (
        <>  
            <GeoEngine />
        </>
    )
}

export default GeoQuest
