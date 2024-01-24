
import React from 'react';
import * as d3 from 'd3';

import { useEffect, useState } from 'react';

function ScratchMap() {

  const [geoJsonData, setGeoJsonData] = useState(null);
  let radius = 250;

  function handleZoom(e) {
    console.log('test')
    d3.select('#content g.map')
      .attr('transform', e.transform);
  }
  
  let zoom = d3.zoom()
  .on('zoom', handleZoom);

  // geoOrthographic geoMercator
  let projection = d3.geoMercator()
    .scale(radius)
    .translate([radius, radius])
    .clipAngle(90)
    .center([0, 0])

  let geoGenerator = d3.geoPath()
    .projection(projection);
  
    useEffect(() => {
      d3.json('/countries.geojson').then(geoJson => {
        setGeoJsonData(geoJson);
      });
    }, []);
    
    useEffect(() => {
      if (geoJsonData) {
        let svg = d3.select('#content g.map')
          .selectAll('path')
          .data(geoJsonData.features)
          .join('path')
          .attr('d', geoGenerator);
        console.log(svg)

        let svg2 = d3.select('#content g.map')

        d3.select('svg')
        .on("mousedown", function() { mousedown(svg2); })
        .on("mousemove", function() { mousemove(svg2); })
        .on("mouseup", function() { mouseup(); })
          .call(zoom);

    }
    }, [geoJsonData]);

  return (
    <>
        <div className='flex flex-row justify-center items-center w-full h-screen'>
          <div id="content" className='w-[500px] h-[500px] border-[1px] border-black'>
            {
              geoJsonData == null ? <></> :
              <svg viewBox='-200 -200 2000 2000 '>
                <g className="map" transform=""></g>
              </svg>
            }
          </div>
        </div>
    </>
  );
}
  
export default ScratchMap;