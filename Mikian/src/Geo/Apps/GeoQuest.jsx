import { useContext, useState, useEffect } from 'react'
import { GeoContext, useFeatureList } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

function GeoQuest() {
    const { geoData } = useContext(GeoContext)
    const [chosenItem, setChosenItem] = useState("")

    const featureList = useFeatureList(geoData)

    useEffect(() => {
        if (featureList.length > 0) {
            randomChosenItem()
        }
    }, [featureList]);

    function randomChosenItem() {
        setChosenItem(featureList[Math.floor(Math.random() * featureList.length)]);
    }

    const GeoEngineProps = {
        onClick: (e, d) => {
            console.log('Clicked on: ' + d.properties.ADMIN)
                if (d.properties.ADMIN == chosenItem) {
                console.log('Correct!')
                randomChosenItem()
            } 
        },
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
