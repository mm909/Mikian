import { useContext, useEffect, useState } from 'react'

import * as d3 from 'd3'

import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import EmptyMap from '@/Geo/Engine/EmptyMap.jsx'

function GeoEngine({GeoEngineProps}) {
    const { geoData, geoProperties }  = useContext(GeoContext)

    const projection = d3.geoEquirectangular() // geoEquirectangular geoOrthographic
    const geoGenerator = d3.geoPath().projection(projection);

    const {
        onClick,
    } = GeoEngineProps

    useEffect(() => {
        d3.select('#GeoEngine g.map')
            .selectAll('path')
            .on('click', onClick)
    }, [GeoEngineProps]);

    useEffect(() => {
        if (!geoData) return;

        d3.select('#GeoEngine g.map')
            .selectAll('path')
            .data(geoData.features)
            .join('path')
            .attr('d', geoGenerator)

        const zoom = d3.zoom()
            .on('zoom', (e) => {
                d3.select('svg g').attr('transform', e.transform);
            });

        d3.select('svg')
            .call(zoom);
    }, [geoData]);

    useEffect(() => {
        if (!geoProperties) return;
        d3.select('#GeoEngine g.map')
            .selectAll('path')
            .attr('fill', d => {
                const country = d.properties.ADMIN;
                return geoProperties[country]?.display ? geoProperties[country].fill : 'transparent';
            })
            .attr('stroke', d => {
                return geoProperties[d.properties.ADMIN]?.display ? '' : 'transparent';
            });
    }, [geoProperties]);

    return (
        <>
            <div id="GeoEngine" className='w-full h-full'>
                {
                    geoData == null ? <EmptyMap /> :
                    <svg viewBox={`0 0 250 250`} className='' height="100%" width='100%'>
                        <g className="map" transform=""></g>
                    </svg>
                }
            </div>
        </>
    )
}

export default GeoEngine
