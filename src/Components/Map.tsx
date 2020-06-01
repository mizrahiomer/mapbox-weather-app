import React, { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import mapboxgl from 'mapbox-gl';
import { getCountryWeather } from '../utils/getCountryWeather';
import { createPopupHtml } from '../utils/createPopupHtml';

const Map = () => {
	const mapContainer = useRef<HTMLElement | null>(null);
	const { mapRef, setMapRef } = useContext(AppContext)!;

	useEffect(() => {
		//Init Map
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;
		const map = new mapboxgl.Map({
			container: mapContainer.current!,
			style: 'mapbox://styles/mapbox/navigation-guidance-night-v4',
			center: [34, 31],
			zoom: 4,
		});

		map.on('load', async function () {
			map.resize();

			const lastVisitedCountrey = JSON.parse(localStorage.getItem('country')!);

			//Check for last user choice in local storage
			if (lastVisitedCountrey) {
				const { lat, lng, name } = lastVisitedCountrey;

				//Fetch weather data
				const { temp, feels_like, temp_min, temp_max, humidity } = await getCountryWeather(
					lat,
					lng
				);

				//Create Html String for mapbox popup
				const popupHtml = createPopupHtml(name, temp, feels_like, temp_min, temp_max, humidity);

				new mapboxgl.Popup({ closeButton: false })
					.setLngLat([lng, lat])
					.setHTML(popupHtml)
					.addTo(map);

				map.flyTo({ center: [lng, lat], zoom: 4 });
			}
		});
		setMapRef(map);
	}, [setMapRef]);

	return <div ref={el => (mapContainer.current = el)} id='map' />;
};

export default Map;
