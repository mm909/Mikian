import { createContext, useState, useEffect } from 'react';

import * as d3 from 'd3';

export const GeoContext = createContext();
export const GeoContextProvider = ({ children }) => {

    const [geoJsonFile, setGeoJsonFile] = useState('/countries.json');
    const [geoJsonData, setGeoJsonData] = useState(null);

    const defaultProperties = {
        display: true,
    };

    useEffect(() => {
        d3.json(geoJsonFile).then(geoJson => {
            // Add default properties to each feature
            geoJson.features.forEach(feature => {
                feature.properties = { ...defaultProperties, ...feature.properties };
            });
            // set display to false for all but 'Sudan'
            geoJson.features = geoJson.features.map(feature => {
                feature.properties.display = feature.properties.ADMIN === 'Sudan';
                return feature;
            }
            );
            console.log(geoJson)
            setGeoJsonData(geoJson);
        }).catch(error => console.error(error));
    }, [geoJsonFile]);

    function hideAllCountries() {
        setGeoJsonData({
            ...geoJsonData,
            features: geoJsonData.features.map(feature => {
                feature.properties.display = false;
                return feature;
            }),
        });
    }

    function onlyShowCountry(country) {
        setGeoJsonData({
            ...geoJsonData,
            features: geoJsonData.features.map(feature => {
                feature.properties.display = feature.properties.ADMIN === country;
                return feature;
            }),
        });
    }

    return (
        <GeoContext.Provider value={{ geoJsonFile, setGeoJsonFile, geoJsonData, onlyShowCountry }}>
            {children}
        </GeoContext.Provider>
    );
};
