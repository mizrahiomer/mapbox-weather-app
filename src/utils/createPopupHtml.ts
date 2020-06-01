export const createPopupHtml = (
	name: string,
	temp: number,
	feelsLike: number,
	minTemp: number,
	maxTemp: number,
	humidity: number
) => {
	return `
	<div class='popup__title'>
			${name}
	</div>
	<div class='popup__content'>
		<div class='popup__info'>Temp: ${temp}&deg;</div>
		<div class='popup__info'>Feels Like: ${feelsLike}&deg;</div>
		<div class='popup__info'>Min Temp: ${minTemp}&deg;</div>
		<div class='popup__info'>Max Temp: ${maxTemp}&deg;</div>
		<div class='popup__info'>Humidity: ${humidity}%</div>
	</div>`;
};
