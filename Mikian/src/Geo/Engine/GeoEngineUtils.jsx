import * as d3 from 'd3';

export function highlightGeometry(d, current_level = 1) {

    let root_id = d.properties.id
    let max_levels = root_id.split('-').length;
    let current_id = d.properties.id.split('-').slice(0, max_levels + 1 - current_level).join('-');

    let current_stroke_width = .01 + current_level * .025;
    
    d3.select(`#object-${current_id}`)
        .attr('fill', '#ffffff10')
        .attr('stroke-width', current_stroke_width);

    if (current_level < max_levels) {
        highlightGeometry(d, current_level + 1);
    }

}

export function unhighlightGeometry(d, current_level = 1) {
    let root_id = d.properties.id
    let max_levels = root_id.split('-').length;
    let current_id = d.properties.id.split('-').slice(0, max_levels + 1 - current_level).join('-');

    d3.select(`#object-${current_id}`)
        .attr('fill', 'transparent')
        .attr('stroke-width', .01);

    if (current_level < max_levels) {
        unhighlightGeometry(d, current_level + 1);
    }
}

export function hideAll() {
    d3.selectAll('path')
        .attr('fill', 'transparent')
        .attr('stroke-width', 0);
}

export function showLevel(level) {
    console.log('showLevel', level)
    // d3.selectAll('path')
    //     .filter(d => d.properties.level === level)
    //     .attr('fill', 'transparent')
    //     .attr('stroke-width', .01);
}