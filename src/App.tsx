import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import Map from './Components/Map';
import Sidebar from './Components/Sidebar';

export type Country = {
	name: string;
	lat: number;
	lng: number;
};

interface ContextProps {
	mapRef: any;
	currentCountry?: Country;
	setMapRef: Dispatch<SetStateAction<any>>;
	setCurrentCountry?: Dispatch<SetStateAction<Country>>;
}

export const AppContext = createContext<ContextProps | undefined>(undefined);

const lastVisitedCountry = localStorage.getItem('country');

const initialCountry: Country = lastVisitedCountry
	? JSON.parse(lastVisitedCountry)
	: { lat: 0, lng: 0, name: '' };

function App() {
	const [currentCountry, setCurrentCountry] = useState<Country>(initialCountry);

	const [mapRef, setMapRef] = useState({});

	return (
		<AppContext.Provider
			value={{
				mapRef,
				currentCountry,
				setMapRef,
				setCurrentCountry,
			}}
		>
			<Map />
			<Sidebar />
		</AppContext.Provider>
	);
}

export default App;
