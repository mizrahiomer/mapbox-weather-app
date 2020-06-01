import React, { FC } from 'react';
import ListItem from './ListItem';
import countries from '../../countries.json';

type ListProps = { searchQuery: string };

const List: FC<ListProps> = ({ searchQuery }) => {
	const renderList = () => {
		const displayedCountries = countries.filter(country =>
			country.name.toLowerCase().includes(searchQuery)
		);

		return displayedCountries.length > 0 ? (
			displayedCountries.map(country => (
				<ListItem
					key={country.name}
					name={country.name}
					lat={country.latlng[0]}
					lng={country.latlng[1]}
					flag={country.flag}
				/>
			))
		) : (
			<div className='list__error'>No country found</div>
		);
	};
	return <div className='list'>{renderList()}</div>;
};

export default List;
