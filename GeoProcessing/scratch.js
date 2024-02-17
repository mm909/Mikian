var mapshaper = require('mapshaper');

function process_shp_files(input_folder) {

    // input_files = input_folder + "/*.shp"
    // input_options = "combine-files snap "

    // mapshaper.runCommands('-i combine-files snap ' + input_folder + '*.shp -merge-layers force -simplify 1% -split ISO -o format=geojson zip precision=0.001 fix-geometry ' + input_folder, function(err) {
    // mapshaper.runCommands('-i combine-files snap ' + input_folder + '*0.shp ' + input_folder + '*1.shp ' + input_folder + '*2.shp -merge-layers force -simplify 1%  -o format=topojson zip precision=0.001 fix-geometry ' + input_folder, function(err) {
    mapshaper.runCommands('-i combine-files snap ' + input_folder + '*0.shp ' + input_folder + '*1.shp -merge-layers force -simplify 1%  -o format=topojson zip precision=0.001 fix-geometry ' + input_folder, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('File converted');
        }
    });

}

let shape_file_path = "C:/Users/Butter/Documents/GitHub/GeoData/Processed/shape_files/"
process_shp_files(shape_file_path)