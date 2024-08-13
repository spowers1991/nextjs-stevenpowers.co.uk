import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children, initialSettings }) => {
  const [globalSettings, setGlobalSettings] = useState(initialSettings);

  return (
    <SettingsContext.Provider value={{ globalSettings, setGlobalSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
