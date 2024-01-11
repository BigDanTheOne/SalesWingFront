import MainApp from './MainApp'
import React  from 'react';
import { DataProvider, useData } from './DataContext';



export default function App() {
    return (
        <DataProvider>
            <MainApp/>
        </DataProvider>
    );
}

