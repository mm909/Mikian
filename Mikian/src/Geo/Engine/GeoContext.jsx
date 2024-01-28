import React, { createContext, useState } from 'react';

export const GeoContext = createContext();

export const GeoContextProvider = ({ children }) => {
  const [value, setValue] = useState('Initial value');

  return (
    <GeoContext.Provider value={{ value, setValue }}>
      {children}
    </GeoContext.Provider>
  );
};