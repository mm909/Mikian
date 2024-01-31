
import { useEffect } from 'react';
import * as d3 from 'd3';

function ScratchMap({ handlers, geoJsonData}){

  const {
    handleMouseIn,
    handleMouseover,
    handleMouseout,
    handleClick,
    handleZoom,
  } = handlers;

  const projection = d3.geoOrthographic()
  const geoGenerator = d3.geoPath().projection(projection);
    
  const zoom = d3.zoom().on('zoom', handleZoom);

  useEffect(() => {
    if (geoJsonData) {
      d3.select('#map-container g.map')
        .selectAll('path')
        .data(geoJsonData.features)
        .join('path')
        .attr('d', geoGenerator)
        .on('mouseenter', handleMouseIn)
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout)
        .on('click', handleClick)

      d3.select('svg').call(zoom);


  }, [geoJsonData]);

  return (
    <>
      <div id="map-container" className='w-full h-full'>
        {
          geoJsonData == null ? <></> :
          <svg viewBox={`0 0 500 500`} height="100%" width='100%'>
            <g className="map" transform=""></g>
          </svg>
        }
      </div>
    </>
  );
}
  
export default ScratchMap;

// set bounds on zoom and pan
// Need to be able to say 'zoom to this feature'
// need a way to color/hide things -> change stroke and fill
// need a good 'show one country' function

// This might be app based
// Need to know what country mouse is over
// need a popup function or something to support pop up info ie. flag, name, etc.

