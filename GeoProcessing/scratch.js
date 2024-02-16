
var mapshaper = require('mapshaper');
var file_path = "C:/Users/Butter/Documents/GitHub/GeoData/Testing/temp/";
mapshaper.runCommands('-i combine-files snap ' + file_path + '*.shp -merge-layers force -simplify 1% -split ISO -o format=geojson zip precision=0.001 fix-geometry ' + file_path, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('File converted');
    }
});

// "C:\Users\Butter\Documents\GitHub\GeoData\ABW_adm.zip"