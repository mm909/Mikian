import { useContext, useState, useEffect, useMemo } from 'react'
import { MousePositionContext } from '@/Utilities/MousePositionContext';
import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import GeoEngine from '@/Geo/Engine/GeoEngine.jsx'

import { highlightGeometry, unhighlightGeometry, showLevel } from '@/Geo/Engine/GeoEngineUtils.jsx'

function GeoQuest() {

    const GeoEngineProps = useMemo(() => ({
        onClick: (e, d) => {
            console.log(d)
        },
        onMouseEnter: (e, d) => {
            highlightGeometry(d)
        },
        onMouseLeave: (e, d) => {
            unhighlightGeometry(d)
        },
        onLoad: (e, d) => {
        }
    }), []);

    return (
        <>
            <div className='flex flex-row'>
                <div className='flex-grow max-h-screen shadow-2xl'>
                    <GeoEngine GeoEngineProps = { GeoEngineProps } />
                </div>
            </div>
        </>
    )
}

export default GeoQuest
