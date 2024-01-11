// DataContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const localData = localStorage.getItem('myData');
        console.log(JSON.parse(localData));
        return localData ? JSON.parse(localData) : {};
    });

    useEffect(() => {
        // Update localStorage when data changes
        console.log(data)
        localStorage.setItem('myData', JSON.stringify(data));

    }, [data]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
