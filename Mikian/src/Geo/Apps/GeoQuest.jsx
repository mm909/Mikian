import { useContext, useState, useEffect, useMemo } from 'react'
import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

function GeoQuest() {
    const { geoData, geoProperties, setGeoProperties } = useContext(GeoContext)
    const [chosenItem, setChosenItem] = useState("")

    const items = useMemo(() => {
        return geoData?.features.map((item, index) => item.properties.ADMIN) ?? [];
    }, [geoData]);

    useEffect(() => {
        if (items.length > 0) {
            setChosenItem(items[Math.floor(Math.random() * items.length)]);
        }
    }, [items]);

    function randomChosenItem() {
        setChosenItem(items[Math.floor(Math.random() * items.length)]);
    }

    const onClick = (e, d) => {
        console.log('Clicked on: ' + d.properties.ADMIN)
            if (d.properties.ADMIN == chosenItem) {
            console.log('Correct!')
            randomChosenItem()
        } 
    }

    const GeoEngineProps = {
        onClick: onClick,
    }

    return (
        <>
            <div className='absolute text-3xl text-red-500'>
                {chosenItem}
            </div>
            <GeoEngine GeoEngineProps = { GeoEngineProps } />
        </>
    )
}

export default GeoQuest
