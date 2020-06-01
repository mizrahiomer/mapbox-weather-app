import React, { FC, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { AppContext, Country } from '../../App';
import { getCountryWeather } from '../../utils/getCountryWeather';
import { createPopupHtml } from '../../utils/createPopupHtml';
import '../../App.scss';

type ListItemProps = {
	name: string;
	lat: number;
	lng: number;
	flag: string;
};

const ListItem: FC<ListItemProps> = ({ name, lat, lng, flag }) => {
	const { mapRef, currentCountry, setCurrentCountry } = useContext(AppContext)!;

	const flyTo = async () => {
		//Fetch weather data
		const { temp, feels_like, temp_min, temp_max, humidity } = await getCountryWeather(lat, lng);

		//Create Html String for mapbox popup
		const popupHtml = createPopupHtml(name, temp, feels_like, temp_min, temp_max, humidity);

		//Check if there is already a popup on the map a
		var popUps = document.getElementsByClassName('mapboxgl-popup');
		if (popUps[0]) popUps[0].remove();

		new mapboxgl.Popup({ closeButton: false })
			.setLngLat([lng, lat])
			.setHTML(popupHtml)
			.addTo(mapRef);

		mapRef.flyTo({ center: [lng, lat], zoom: 4 });

		const country: Country = { lat, lng, name };

		setCurrentCountry!(country);
		localStorage.setItem('country', JSON.stringify(country));
	};

	const isCurrent = currentCountry!.name === name ? 'current' : '';

	return (
		<div key={name} onClick={flyTo} className={`list__item ${isCurrent}`}>
			<img className='list__item__img' alt={name} src={flag} />
			<div className='list__item__name'>{name}</div>
			<div className='list__item__coords'>
				[<span>{lng.toFixed(2)}</span> , <span>{lat.toFixed(2)}</span>]
			</div>
		</div>
	);
};

export default ListItem;
