
import { useContext } from 'react'
import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

function GeoQuest() {
    const { geoJsonData } = useContext(GeoContext)

    const items = geoJsonData?.features.map((item, index) => item.properties.ADMIN) ?? [];
    const chosen_item = items[Math.floor(Math.random() * items.length)];

    // const onClick = () => {
    //     d3.select(this).style('fill', 'Yellow');
    // }

    return (
        <>  
            <GeoEngine />
        </>
    )
}

export default GeoQuest
