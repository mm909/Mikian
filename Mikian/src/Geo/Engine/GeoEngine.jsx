
import { useContext } from 'react'
import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'

function GeoEngine() {
    const { value, setValue } = useContext(GeoContext)
    console.log(value)

    return (
        <>  

        </>
    )
}

export default GeoEngine
