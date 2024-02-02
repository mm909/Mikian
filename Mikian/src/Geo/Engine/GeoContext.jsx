import { createContext, useState, useEffect, useMemo } from 'react';

import * as d3 from 'd3';

export function useFeatureList(geoData) {
    return useMemo(() => {
        return geoData?.features.map((item, index) => item.properties.ADMIN) ?? [];
    }, [geoData]);
}

export const GeoContext = createContext();

export const GeoContextProvider = ({ children }) => {

    // const [geoFileName, setGeoFileName] = useState('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const [geoFileName, setGeoFileName] = useState('/countries.json');
    const [geoData, setGeoData] = useState(null);
    const [geoProperties, setGeoProperties] = useState({});

    useEffect(() => {
        if (!geoFileName) return;
        d3.json(geoFileName).then(geoData => {
            setGeoData(geoData);
        }).catch(error => console.error(error));
    }, [geoFileName]);

    const customColors = ['#FABD2F', '#FB4934', '#B8BB26', '#83A598'];
    const defaultProperties = {
        display: true,
        fill: '#222222',
        stroke: '#fff',
        strokeWidth: 0.00,
    };

    useEffect(() => {
        if (!geoData) return;
        setGeoProperties(
            geoData.features.reduce((acc, feature, index) => {
                const country = feature.properties.ADMIN;
                acc[country] = {
                    ...defaultProperties,
                    fill: customColors[index % customColors.length],
                };
                return acc;
            }, {})
        );
    }, [geoData]);

    return (
        <GeoContext.Provider value={{ geoData, geoProperties, setGeoProperties }}>
            {children}
        </GeoContext.Provider>
    );
};
