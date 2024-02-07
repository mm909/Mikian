import { useContext, useEffect, useState, useMemo } from 'react'

import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid'

import * as topojson from 'topojson-client'

import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import EmptyMap from '@/Geo/Engine/EmptyMap.jsx'

const GeoEngine = ({ 
    GeoEngineProps = {
      onClick: (e, d) => {},
      onMouseEnter: (e, d) => {
        console.log('Hovered over: ')
        console.log(d)
      },
      onMouseLeave: (e, d) => {}
    } 
  }) => {
    const { geoData }  = useContext(GeoContext)

    const [geoEngineId, setGeoEngineId] = useState('geoEngine-' + uuidv4());

    const projection = useMemo(() => d3.geoEquirectangular(), []); // geoEquirectangular geoOrthographic
    const geoGenerator = useMemo(() => d3.geoPath().projection(projection), [projection]);

    const {
        onClick,
        onMouseEnter,
        onMouseLeave
    } = GeoEngineProps

    useEffect(() => {
        console.log('Test')
        d3.select(`#${geoEngineId} g.map`)
            .selectAll('path')
            .on('click', onClick)
            .on('mouseenter', onMouseEnter)
            .on('mouseleave', onMouseLeave);
    }, [GeoEngineProps]);

    useEffect(() => {
        if (geoData === null) return;

        d3.select(`#${geoEngineId} g.map`)
            .selectAll('path')
            .data(topojson.feature(geoData, geoData.objects.countries).features)
            .join('path')
            .attr('d', geoGenerator)
            .attr('fill', 'transparent')
            .attr('stroke', '#fff')
            .attr('stroke-width', .01)

        const zoom = d3.zoom()
            .on('zoom', (e) => {
                d3.select(`#${geoEngineId} svg g`).attr('transform', e.transform);
            });

        d3.select(`#${geoEngineId} svg`)
            .call(zoom);
    }, [geoData]);

    // useEffect(() => {
    //     if (Object.keys(geoProperties).length === 0) return;
    //     d3.select(`#${geoEngineId} g.map`)
    //         .selectAll('path')
    //         .attr('fill', d => {
    //             const country = d.properties.ADMIN;
    //             return geoProperties[country]?.display ? geoProperties[country].fill : 'transparent';
    //         })
    //         .attr('stroke', d => {
    //             const country = d.properties.ADMIN;
    //             return geoProperties[country]?.display ? geoProperties[country].stroke : 'transparent';
    //         })
    //         .attr('stroke-width', d => {
    //             const country = d.properties.ADMIN;
    //             return geoProperties[country]?.display ? geoProperties[country].strokeWidth : 0;
    //         })
    // }, [geoProperties]);

    return (
        <>
            <div id={geoEngineId} className='w-full h-full'>
                {
                    geoData === null ? <EmptyMap /> :
                    <svg viewBox={`0 0 250 250`} className='' height="100%" width='100%' >
                        <g className="map" transform=""></g>
                    </svg>
                }
            </div>
        </>
    )
}

export default GeoEngine
