
import { useContext, useState, useEffect, useMemo } from 'react'
import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

function GeoQuest() {
    const { geoJsonData, onlyShowCountry } = useContext(GeoContext)

    const items = useMemo(() => {
        return geoJsonData?.features.map((item, index) => item.properties.ADMIN) ?? [];
    }, [geoJsonData]);

    const [chosenItem, setChosenItem] = useState("")
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
        console.log('Chosen: ' + chosenItem)
            if (d.properties.ADMIN == chosenItem) {
            console.log('Correct!')
            randomChosenItem()
        } 
    }

    const GeoEngineProps = {
        onClick: onClick,
    }

    // useEffect(() => {
    //     onlyShowCountry(chosenItem);
    // }, [chosenItem]);

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
