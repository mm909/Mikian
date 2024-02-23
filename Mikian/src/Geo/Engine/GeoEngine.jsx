import { useContext, useEffect, useState, useMemo, useRef } from 'react'

import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid'

import * as topojson from 'topojson-client'

import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import EmptyMap from '@/Geo/Engine/EmptyMap.jsx'

import { hideAll, showLevel } from './GeoEngineUtils'

const GeoEngine = ({ 
    GeoEngineProps = {
      onClick: (e, d) => {
        console.log(d)
      },
      onMouseEnter: (e, d) => {
        console.log("Mouse entered: ", d.properties.id)
      },
      onMouseLeave: (e, d) => {
        console.log("Mouse left: ", d.properties.id)
      },
      onLoad: (e, d) => {
        hideAll()
      }
    } 
  }) => {
    const { geoData }  = useContext(GeoContext)

    const [geoEngineId, setGeoEngineId] = useState('geoEngine-' + uuidv4());

    const projection = useMemo(() => d3.geoOrthographic(), []); // geoEquirectangular geoOrthographic
    const geoGenerator = useMemo(() => d3.geoPath().projection(projection), [projection]);

    const {
        onClick,
        onMouseEnter,
        onMouseLeave,
        onLoad
    } = GeoEngineProps

    const prevGeoData = useRef();

    useEffect(() => {
        if (geoData === null) return;

        if (prevGeoData.current !== geoData) {
            d3.select(`#${geoEngineId} g.map`).selectAll('*').remove();

            Object.keys(geoData.objects).forEach((key, index) => {
                d3.select(`#${geoEngineId} g.map`)
                    .selectAll(`path.${key}`)
                    .data(topojson.feature(geoData, geoData.objects[key]).features)
                    .join('path')
                    .attr('id', (d, i) => `object-${d.properties.id}`)
                    .attr('class', (d, i) => `object-${d.properties.id}`)
                    .attr('d', geoGenerator)
                    .attr('fill', 'transparent')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', .1);
            });

            // onLoad();

            const zoom = d3.zoom()
                .on('zoom', (e) => {
                    d3.select(`#${geoEngineId} svg g`).attr('transform', e.transform);
                });

            d3.select(`#${geoEngineId} svg`)
                .call(zoom);
        }

        prevGeoData.current = geoData;

        const geo_listeners = d3.select(`#${geoEngineId} g.map`)
            .selectAll('path')
            .on('click', onClick)
            .on('mouseenter', onMouseEnter)
            .on('mouseleave', onMouseLeave);

        return () => {
            geo_listeners.on('click', null)
                .on('mouseenter', null)
                .on('mouseleave', null);
        };

    }, [geoData, GeoEngineProps, geoGenerator]);



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
