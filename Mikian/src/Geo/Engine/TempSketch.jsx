

import { useContext, useEffect, useState, useMemo, useRef } from 'react'

import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid'

import * as topojson from 'topojson-client'

import { GeoContext } from '@/Geo/Engine/GeoContext.jsx'
import EmptyMap from '@/Geo/Engine/EmptyMap.jsx'

import { hideAll, showLevel } from './GeoEngineUtils'

const TempSketch = () => {
    const { geoData }  = useContext(GeoContext)

    const [geoEngineId, setGeoEngineId] = useState('geoEngine-' + uuidv4());

    const projection = useMemo(() => d3.geoEquirectangular(), []); // geoEquirectangular geoOrthographic
    const geoGenerator = useMemo(() => d3.geoPath().projection(projection), [projection]);

    const [selected, setSelected] = useState("IRN");

    const prevGeoData = useRef();

    useEffect(() => {
        if (geoData === null) return;

        if (prevGeoData.current !== geoData) {
            d3.select(`#${geoEngineId} g.map`).selectAll('*').remove();

            Object.keys(geoData.objects).forEach((key, index) => {
                console.log()
                d3.select(`#${geoEngineId} g.map`)
                    .selectAll(`path.${key}`)
                    .data(topojson.feature(geoData, geoData.objects[key]).features.filter(
                        feature => feature.properties.ISO === "IRN"
                    ))

                    .join('path')

                    .attr('id', (d, i) => `object-${d.properties.id}`)
                    .attr('class', (d, i) => `object-${d.properties.id}`)
                    .attr('d', geoGenerator)
                    .attr('fill', 'transparent')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', .1);
            });

            Object.keys(geoData.objects).forEach((key, index) => {
                d3.select(`#${geoEngineId} g.map`)
                    .selectAll(`path.${key}`)
                    .data(
                        topojson.feature(geoData, geoData.objects[key]).features.filter(
                            feature => feature.properties.ISO === "IRN"
                        )
                    )
                    .join(
                        enter => enter.append('path')
                            .attr('id', (d, i) => `object-${d.properties.id}`)
                            .attr('class', (d, i) => `object-${d.properties.id}`)
                            .attr('d', geoGenerator)
                            .attr('fill', 'transparent')
                            .attr('stroke', '#fff')
                            .attr('stroke-width', .1)
                            .call(enter => enter.transition() // Start a transition
                                .duration(10000) // For one second
                                .attr('fill', 'red')), // Change the fill color to red
                        update => update
                            .call(update => update.transition() // Start a transition
                                .duration(10000) // For one second
                                .attr('fill', 'blue')), // Change the fill color to blue
                        exit => exit
                            .call(exit => exit.transition() // Start a transition
                                .duration(10000) // For one second
                                .attr('fill', 'transparent') // Change the fill color to transparent
                                .remove()) // Remove the element
                    );
            });

            const zoom = d3.zoom()
                .on('zoom', (e) => {
                    d3.select(`#${geoEngineId} svg g`).attr('transform', e.transform);
                });

            d3.select(`#${geoEngineId} svg`)
                .call(zoom);
        }

        prevGeoData.current = geoData;

    }, [geoData, geoGenerator]);



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

export default TempSketch
