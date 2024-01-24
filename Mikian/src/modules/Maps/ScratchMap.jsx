
import React from 'react';
import * as d3 from 'd3';

import { useEffect, useState } from 'react';

function ScratchMap() {

  const [geoJsonData, setGeoJsonData] = useState(null);
  var m0 = null, o0;

  let radius = 250;

  function trackballAngles(pt) {
    var r = projection.scale();
    var c = projection.translate();
    var x = pt[0] - c[0], y = - (pt[1] - c[1]), ss = x*x + y*y;
  
    var z = r*r > 2 * ss ? Math.sqrt(r*r - ss) : r*r / 2 / Math.sqrt(ss);  
  
    var lambda = Math.atan2(x, z) * 180 / Math.PI; 
    var phi = Math.atan2(y, z) * 180 / Math.PI
    return [lambda, phi];
  }
  
  function composedRotation(λ, ϕ, y, δλ, δϕ) {
    λ = Math.PI / 180 * λ;
    ϕ = Math.PI / 180 * ϕ;
    y = Math.PI / 180 * y;
    δλ = Math.PI / 180 * δλ;
    δϕ = Math.PI / 180 * δϕ;
    console.log(λ, ϕ, y, δλ, δϕ)
    
    var sλ = Math.sin(λ), sϕ = Math.sin(ϕ), sy = Math.sin(y), 
        sδλ = Math.sin(δλ), sδϕ = Math.sin(δϕ),
        cλ = Math.cos(λ), cϕ = Math.cos(ϕ), cy = Math.cos(y), 
        cδλ = Math.cos(δλ), cδϕ = Math.cos(δϕ);
  
    var m00 = -sδλ * sλ * cϕ + (sy * sλ * sϕ + cy * cλ) * cδλ,
            m01 = -sy * cδλ * cϕ - sδλ * sϕ,
                m02 = sδλ * cλ * cϕ - (sy * sϕ * cλ - sλ * cy) * cδλ,
        m10 = - sδϕ * sλ * cδλ * cϕ - (sy * sλ * sϕ + cy * cλ) * sδλ * sδϕ - (sλ * sϕ * cy - sy * cλ) * cδϕ,
            m11 = sδλ * sδϕ * sy * cϕ - sδϕ * sϕ * cδλ + cδϕ * cy * cϕ,
                 m12 = sδϕ * cδλ * cλ * cϕ + (sy * sϕ * cλ - sλ * cy) * sδλ * sδϕ + (sϕ * cy * cλ + sy * sλ) * cδϕ,
        m20 = - sλ * cδλ * cδϕ * cϕ - (sy * sλ * sϕ + cy * cλ) * sδλ * cδϕ + (sλ * sϕ * cy - sy * cλ) * sδϕ,
            m21 = sδλ * sy * cδϕ * cϕ - sδϕ * cy * cϕ - sϕ * cδλ * cδϕ,
                 m22 = cδλ * cδϕ * cλ * cϕ + (sy * sϕ * cλ - sλ * cy) * sδλ * cδϕ - (sϕ * cy * cλ + sy * sλ) * sδϕ;
                 
    if (m01 != 0 || m11 != 0) {
      console.log(m01, m11)
         y_ = Math.atan2(-m01, m11);
         console.log(y_)
         ϕ_ = Math.atan2(-m21, Math.sin(y_) == 0 ? m11 / Math.cos(y_) : - m01 / Math.sin(y_));
         λ_ = Math.atan2(-m20, m22);
    } else {
         y_ = Math.atan2(m10, m00) - m21 * λ;
         console.log(y_)
         ϕ_ = - m21 * Math.PI / 2;
         λ_ = λ;       
    }
    
         console.log(y_)
         return([λ_ * 180 / Math.PI, ϕ_ * 180 / Math.PI, y_ * 180 / Math.PI]);
  }
  
  function mousedown(svg) {  // remember where the mouse was pressed, in canvas coords
    console.log('mouse down')
    // get mouse pos
    var m = d3.pointer(svg.node());
    m0 = trackballAngles(m);
    o0 = projection.rotate();
  }
  
  function mousemove(svg) {
    console.log(svg)
    if (m0) {
      var m1 = trackballAngles(d3.pointer(svg.node()));
      console.log(m1)
      o1 = composedRotation(o0[0], o0[1], o0[2], m1[0] - m0[0], m1[1] - m0[1])
      projection.rotate(o1);
      svg.selectAll("path").attr("d", path); 
    }
  }
  
  function mouseup() {
    if (m0) {
      mousemove();
      m0 = null;
    }
  }

  function handleZoom(e) {
    console.log('test')
    d3.select('#content g.map')
      .attr('transform', e.transform);
  }
  
  let zoom = d3.zoom()
  .on('zoom', handleZoom);

  // geoOrthographic geoMercator
  let projection = d3.geoOrthographic()
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