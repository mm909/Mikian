import { useContext, useEffect, useState } from 'react'

import * as d3 from 'd3'

import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import EmptyMap from '@/Geo/Engine/EmptyMap.jsx'

function GeoEngine({GeoEngineProps}) {
    const { geoJsonData }  = useContext(GeoContext)

    const {
        onClick,
    } = GeoEngineProps

    const projection = d3.geoEquirectangular()
    const geoGenerator = d3.geoPath().projection(projection);
  
    const zoom = d3.zoom().on('zoom', (e) => {
        d3.select('svg g').attr('transform', e.transform);
    });

    useEffect(() => {
        d3.select('#GeoEngine g.map')
            .selectAll('path')
            .on('click', onClick)
    }, [GeoEngineProps]);

    useEffect(() => {
        if (!geoJsonData) return;
        let startTime = Date.now();
        d3.select('#GeoEngine g.map')
            .selectAll('path')
            .data(geoJsonData.features)
            .join('path')
            .attr('d', geoGenerator)
            // .attr('fill', 'none')

            d3.select('svg')
            .style('background-color', 'transparent')
            .call(zoom);
        console.log('GeoEngine loaded in ' + (Date.now() - startTime) + 'ms');
    }, [geoJsonData]);

    return (
        <>
            <div id="GeoEngine" className='w-full h-full shadow-2xl bg-transparent'>
                {
                    geoJsonData == null ? <EmptyMap /> :
                    <svg viewBox={`0 0 250 250`} className='shadow-2xl' height="100%" width='100%'>
                        <g className="map" transform=""></g>
                    </svg>
                }
            </div>
        </>
    )
}

export default GeoEngine
