import { useContext, useEffect, useState } from 'react'

import * as d3 from 'd3'

import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import EmptyMap from '@/Geo/Engine/EmptyMap.jsx'

function GeoEngine() {
    const { geoJsonData }  = useContext(GeoContext)

    const projection = d3.geoEquirectangular()
    const geoGenerator = d3.geoPath().projection(projection);
  
    useEffect(() => {
      if (geoJsonData) {
        d3.select('#GeoEngine g.map')
          .selectAll('path')
          .data(geoJsonData.features)
          .join('path')
          .attr('d', geoGenerator)
      }
    }, [geoJsonData]);

    return (
        <>
            <div id="GeoEngine" className='w-full h-full'>
                {
                    geoJsonData == null ? <EmptyMap /> :
                    <svg viewBox={`0 0 500 500`} height="100%" width='100%'>
                        <g className="map" transform=""></g>
                    </svg>
                }
            </div>
        </>
    )
}

export default GeoEngine