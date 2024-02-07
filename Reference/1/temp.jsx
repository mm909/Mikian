useEffect(() => {
    d3.select('#GeoEngine g.map')
        .selectAll('path')
        .on('click', onClick)
        // on mouse enter, bounce up and down
        .on('mouseenter', (e, d) => {
            // translate up
            d3.select(e.target).transition().duration(100).attr('transform', 'translate(0, -5)');
        })
        .on('mouseleave', (e, d) => {
            d3.select(e.target).transition().duration(100).attr('transform', 'scale(1)');
        });
}, [GeoEngineProps]);


// Change color/stroke/width of a country
setGeoProperties({
    ...geoProperties,
    [d.properties.ADMIN]: {
        ...geoProperties[d.properties.ADMIN],
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0,
    }
})


// Div to show pop up on country hover
           {/* <div className='absolute text-3xl text-red-500'>
                {chosenFeature}
            </div> */}
            {/* <div
                style={{
                    position: 'absolute',
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                }}
                className='text-red-500 pointer-events-none'
            >
                {hoveredFeature}
            </div> */}