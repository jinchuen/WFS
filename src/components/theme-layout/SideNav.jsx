import React from 'react'
import { useState, useEffect } from 'react'

const ButtonClick = () => {
	const [isOpen, setIsOpen] = useState(false)
	
	function isOpen () { 
		setIsOpen(!isOpen)
	}

	return (
		<>
			<button onClick={isOpen}>Click</button>
		</>
	)
}

const SideNav = () => {
	return (
		<>
			<div>SideNav</div>
			<ButtonClick />
		</>
	)
}

export default SideNav