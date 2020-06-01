import React, { FC, useState } from 'react';
import List from './subComponents/List';

const Sidebar: FC = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const onChangeHandler = (e: any) => {
		setSearchQuery(e.target.value.toLowerCase());
	};

	return (
		<div className='sidebar'>
			<input
				className='sidebar__input'
				value={searchQuery}
				placeholder='Enter country name'
				type='text'
				onChange={e => onChangeHandler(e)}
			/>
			<List searchQuery={searchQuery} />
		</div>
	);
};

export default Sidebar;
