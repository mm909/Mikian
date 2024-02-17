import { createContext, useState, useEffect, useMemo } from 'react';

import * as d3 from 'd3';

export const GeoContext = createContext();

export const GeoContextProvider = ({ children }) => {

    const [geoFileName, setGeoFileName] = useState('/adm01.json');
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        if (!geoFileName) return;

        console.time(`Loaded TopoJSON`); 
        d3.json(geoFileName).then(geoData => {

            geoData.objects.layer.geometries.forEach((d, i) => {

                let ids = Object.keys(d.properties)
                    .filter(key => key.startsWith('ID_') && d.properties[key])
                    .map(key => d.properties[key]);
                let id_string = ids.join('-');

                d.properties.id = id_string;
                d.properties.level = ids.length;
            });
            
            // geoData.objects.layer.geometries = geoData.objects.layer.geometries.filter(d => d.properties.ID_0 && !d.properties.ID_1);
            
            setGeoData(geoData);
        }).catch(error => console.error(error));
        console.timeEnd(`Loaded TopoJSON`);

    }, [geoFileName]);

    return (
        <GeoContext.Provider value={{ geoData }}>
            {children}
        </GeoContext.Provider>
    );
};
