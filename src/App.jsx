import React, { } from 'react'
import './App.css'
import TechTree from './components/TechTree'

//TODO: Review this: https://www.npmjs.com/package/react-xarrows
function App() {
	return (
		<div className="App">
			<h1>Civilization 1 Tech Tree</h1>
			<div className="tech-container">
				<TechTree/>
			</div>
		</div>
	)
}

export default App
