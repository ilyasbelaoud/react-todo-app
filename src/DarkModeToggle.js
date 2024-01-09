import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

const getUserTheme = () => {
	const theme = localStorage.getItem('theme') || 'dark';
	return theme === 'dark';
};

const DarkModeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(getUserTheme());

	useEffect(() => {
		document.documentElement.className = `${isDarkMode && 'dark'}`;
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
	}, [isDarkMode])

	return (
		<div className='toggle-btn'>
			<label htmlFor="toggle">
				<input type="checkbox" id="toggle" checked={ isDarkMode } onChange={ (e) => setIsDarkMode(e.target.checked) } />
			</label>
		</div>
	)
}

export default DarkModeToggle