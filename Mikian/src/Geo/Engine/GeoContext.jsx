import { createContext, useState, useEffect, useMemo } from 'react';

import * as d3 from 'd3';

export const GeoContext = createContext();

export const GeoContextProvider = ({ children }) => {

    const [geoFileName, setGeoFileName] = useState('/topoCountries.json');
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        if (!geoFileName) return;
        d3.json(geoFileName).then(geoData => {
            console.log(geoData)
            geoData.objects.countries.geometries = geoData.objects.countries.geometries.filter(d => d.properties.name !== 'Maldives');
            setGeoData(geoData);
        }).catch(error => console.error(error));
    }, [geoFileName]);

    return (
        <GeoContext.Provider value={{ geoData }}>
            {children}
        </GeoContext.Provider>
    );
};
