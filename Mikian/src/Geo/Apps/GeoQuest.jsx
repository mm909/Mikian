
import { useContext } from 'react'
import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

function GeoQuest() {
    const { value, setValue } = useContext(GeoContext)
    console.log(value)

    return (
        <>  
            <GeoEngine />
        </>
    )
}

export default GeoQuest
