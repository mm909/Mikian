import { useContext, useState, useEffect, useMemo } from 'react'
import { MousePositionContext } from '@/Utilities/MousePositionContext';
import { GeoContext, useFeatureList } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

function GeoQuest() {
    const { geoData, setGeoProperties} = useContext(GeoContext)
    const [chosenFeature, setChosenFeature] = useState("")
    const [hoveredFeature, setHoveredFeature] = useState("")

    const mousePosition = useContext(MousePositionContext);
    const featureList = useFeatureList(geoData)

    useEffect(() => {
        if (featureList.length > 0) {
            randomChosenItem()
        }
    }, [featureList]);

    function randomChosenItem() {
        setChosenFeature(featureList[Math.floor(Math.random() * featureList.length)]);
    }

    const GeoEngineProps = useMemo(() => ({
        onClick: (e, d) => {
            console.log('Clicked on: ' + d.properties.ADMIN)
            if (d.properties.ADMIN === chosenFeature) {
                console.log('Correct!')
                randomChosenItem()
            } 
        },
        onMouseEnter: (e, d) => {
            setGeoProperties(prevState => ({
                ...prevState,
                [d.properties.ADMIN]: {
                    ...prevState[d.properties.ADMIN],
                    fill: '#fff',
                    priorfill: prevState[d.properties.ADMIN]?.fill,
                    strokeWidth: 0.05,
                },
            }));
            setHoveredFeature(d.properties.ADMIN)
        },
        onMouseLeave: (e, d) => {
            setGeoProperties(prevState => ({
                ...prevState,
                [d.properties.ADMIN]: {
                    ...prevState[d.properties.ADMIN],
                    fill: prevState[d.properties.ADMIN]?.priorfill,
                    strokeWidth: 0.00,
                },
            }));
            setHoveredFeature("")
        },
    }), [chosenFeature]);

    return (
        <>
            <div className='absolute text-3xl text-red-500'>
                {chosenFeature}
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                }}
                className='text-red-500 pointer-events-none'
            >
                {hoveredFeature}
            </div>
            <div className='h-screen w-screen'>
                <GeoEngine GeoEngineProps = { GeoEngineProps } />
            </div>
        </>
    )
}

export default GeoQuest
