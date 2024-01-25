
import { useEffect, useState } from 'react';
import * as d3 from 'd3';

import ScratchMap from '../Maps/ScratchMap.jsx'

function MapApp() {

    const handleMouseIn = (e, d) => {
        console.log('MouseIn')
        d3.select(e.currentTarget)
            .style('fill', '#999')
            .style('transition', 'fill 0.25s linear');
    }

    const handleMouseover = (e, d) => {
        console.log('Mouseover')
    }

    const handleMouseout = (e, d) => {
        console.log('Mouseout')
        d3.select(e.currentTarget)
            .style('fill', '#555');
    }

    const handleClick = (e, d) => {
        console.log('Click')
    }

    const handleZoom = (e) => {
        console.log('Zoom')
        d3.select('#map-container g.map')
            .attr('transform', e.transform);
    }

    const handlers = {
        handleMouseIn: handleMouseIn,
        handleMouseover: handleMouseover,
        handleMouseout: handleMouseout,
        handleClick: handleClick,
        handleZoom: handleZoom,
    }

    const [geoJsonData, setGeoJsonData] = useState(null);

    const geoJsonFile = '/Temp/countries.json'
    useEffect(() => {
        d3.json(geoJsonFile).then(geoJson => {
            setGeoJsonData(geoJson);
        });
    }, []);

    return (
        <>
            <div className='w-full h-screen flex flex-row items-center justify-center'>
                <div className='w-4/5 h-4/5 border-[1px] border-[#111]/20'>
                    <ScratchMap handlers={handlers} geoJsonData={geoJsonData}/>
                </div>
            </div>
        </>
    );
}
  
export default MapApp;