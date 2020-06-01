import axios from 'axios';

export const getCountryWeather = async (lat: number, lon: number) => {
	const res = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
	);
	return res.data.main;
};
