import { useContext, useEffect, useState } from 'react'

import * as d3 from 'd3'

import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import EmptyMap from '@/Geo/Engine/EmptyMap.jsx'

function GeoEngine({GeoEngineProps}) {
    const { geoJsonData }  = useContext(GeoContext)

    const {
        onClick,
    } = GeoEngineProps

    // geoEquirectangular geoOrthographic
    const projection = d3.geoEquirectangular()
    const geoGenerator = d3.geoPath().projection(projection);

    const width = 750;
    const height = 500;

    const zoom = d3.zoom()
        // .scaleExtent([.25, 10]) 
        // .translateExtent([[-width, -height], [width+width, height+height]]) 
        .on('zoom', (e) => {
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

        const customColors = ['#222222', '#212121', '#202020', '#1f1f1f'];
        const colorScale = d3.scaleOrdinal(customColors);

        d3.select('#GeoEngine g.map')
            .selectAll('path')
            .data(geoJsonData.features)
            .join('path')
            .attr('d', geoGenerator)
            .attr('fill', d => {
                return colorScale(d.properties.ADMIN);
            });

        d3.select('svg')
            .style('background-color', 'transparent')
            .call(zoom);

        // set the line color and fill to transparent if display is false
        d3.select('#GeoEngine g.map')
            .selectAll('path')
            .attr('stroke', d => {
                return d.properties.display ? '' : '#333';
            })
            .attr('fill', d => {
                return d.properties.display ? colorScale(d.properties.ADMIN) : 'transparent';
            });

        console.log('GeoEngine loaded in ' + (Date.now() - startTime) + 'ms');
    }, [geoJsonData]);

    return (
        <>
            <div id="GeoEngine" className='w-full h-full'>
                {
                    geoJsonData == null ? <EmptyMap /> :
                    <svg viewBox={`0 0 250 250`} className='' height="100%" width='100%'>
                        <g className="map" transform=""></g>
                    </svg>
                }
            </div>
        </>
    )
}

export default GeoEngine
