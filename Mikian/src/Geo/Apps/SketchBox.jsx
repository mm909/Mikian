import { useContext, useState, useEffect, useMemo } from 'react'

import TempSketch from '@/Geo/Engine/TempSketch.jsx'

function SketchBox() {

    return (
        <>
            <div className='flex flex-row'>
                <div className='flex-grow max-h-screen'>
                    <TempSketch />
                </div>
            </div>
        </>
    )
}

export default SketchBox
