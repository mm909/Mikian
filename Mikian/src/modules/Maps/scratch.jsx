
import React from 'react';
import * as d3 from 'd3';

import { useEffect } from 'react';
import { useState } from 'react';

// import geoJsonData from './countries.geojson';

function ScratchMap() {

  let projection = d3.geoGnomonic()
    .scale(400)
    .translate([200, 280])
    .center([0, 5]);

  let geoGenerator = d3.geoPath()
    .projection(projection);
  
  const [geoJsonData, setGeoJsonData] = useState(null);
  useEffect(() => {
    d3.json('/countries.geojson').then(geoJson => {
      setGeoJsonData(geoJson);
      update(geoJsonData)
    });
  }, []);

  if (geoJsonData == null) return <></>;
  // let u = d3.select('#content g.map')
  // .selectAll('path')
  // .data(geoJsonData.features)
  // .join('path')
  // .attr('d', geoGenerator);


  function handleMouseover(e, d) {
    console.log(d.properties)
    console.log(d.properties.ADMIN)
    let pixelArea = geoGenerator.area(d);
    let bounds = geoGenerator.bounds(d);
    let centroid = geoGenerator.centroid(d);
    let measure = geoGenerator.measure(d);
  
    d3.select('#content .info')
      .text(d.properties.ADMIN + ' (path.area = ' + pixelArea.toFixed(1) + ' path.measure = ' + measure.toFixed(1) + ')');
  
    d3.select('#content .bounding-box rect')
      .attr('x', bounds[0][0])
      .attr('y', bounds[0][1])
      .attr('width', bounds[1][0] - bounds[0][0])
      .attr('height', bounds[1][1] - bounds[0][1]);
  
    d3.select('#content .centroid')
      .style('display', 'inline')
      .attr('transform', 'translate(' + centroid + ')');
  }
  
  function update(geojson) {
    let u = d3.select('#content g.map')
      .selectAll('path')
      .data(geojson.features);
  
    u.enter()
      .append('path')
      .attr('d', geoGenerator)
      .on('mouseover', handleMouseover);
  }

  d3.selectAll('path')
  .on('click', function(e, d) {
    d3.select(this)
      .style('fill', 'orange');
  });
  

  return (
    <>
      <div id="content">
        <div className="info">Hover over a country</div>
        <svg width="1400px" height="1400px" >
          <g className="map"></g>
          <g className="bounding-box"><rect></rect></g>
          <g className="centroid"><circle r="4"></circle></g>
        </svg>
      </div>
    </>
  );
}
  
export default ScratchMap;




import React from 'react';
import * as d3 from 'd3';

import { useEffect, useState } from 'react';

function ScratchMap() {

  let projection = d3.geoMercator()

  let geoGenerator = d3.geoPath()
    .projection(projection);
  
  const [geoJsonData, setGeoJsonData] = useState(null);
  useEffect(() => {
    d3.json('/countries.geojson').then(geoJson => {
      setGeoJsonData(geoJson);
    });
  }, []);

  if (geoJsonData == null) return <></>;

    let u = d3.select('#content g.map')
  .selectAll('path')
  .data(geoJsonData.features)
  .join('path')
  .attr('d', geoGenerator);
  let transform = d3.zoomIdentity
  function zoomed(e) {
    const t = e.transform
    t.x = Math.min(500 / 2, Math.max(t.x, 500 / 2 - 500 * t.k))
    t.y = Math.min(500 / 2, Math.max(t.y, 500 / 2 - 500 * t.k))
    transform = t
    if (e.sourceEvent) $mousePos = {x: e.sourceEvent.clientX, y: e.sourceEvent.clientY}
}
  // zoom.scaleBy(d3Svg.transition().duration(200), 1.8)
  let zoom = d3.zoom().scaleExtent([1, 50]).on('zoom', zoomed).clickDistance(10)
  return (
    <>
    <div className='w-full h-full' onClick={()=> {
      console.log('click')
      zoom.scaleBy(d3.transition().duration(200), 1.8)
    }}>
    <div id="content">
        <svg viewBox=''>
          <g className="map" transform="translate(-100,100) scale(1)"></g>
        </svg>
      </div>
    </div>

    </>
  );
}
  
export default ScratchMap;

let zoom = d3.zoom()
  .on('zoom', handleZoom);

function handleZoom(e) {
  d3.select('svg g')
    .attr('transform', e.transform);
}

function initZoom() {
  d3.select('svg')
    .call(zoom);
}

function update() {
  d3.select('svg g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 3);
}

initZoom();
update();