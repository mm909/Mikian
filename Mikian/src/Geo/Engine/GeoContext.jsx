import { createContext, useState, useEffect } from 'react';

import * as d3 from 'd3';

export const GeoContext = createContext();
export const GeoContextProvider = ({ children }) => {

    const [geoJsonFile, setGeoJsonFile] = useState('/countries.json');
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        d3.json(geoJsonFile).then(geoJson => {
            setGeoJsonData(geoJson);
        }).catch(error => console.error(error));
    }, [geoJsonFile]);

    return (
        <GeoContext.Provider value={{ geoJsonFile, setGeoJsonFile, geoJsonData }}>
            {children}
        </GeoContext.Provider>
    );
};
