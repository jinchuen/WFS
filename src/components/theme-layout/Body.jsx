/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/web'
import AppRoutes from './../../AppRoutes'
import SideNav from './SideNav'

const Body = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const mainSpring = useSpring({
		marginLeft: isDrawerOpen ? '16.6667%' : '0%',
		config: { duration: 200 }
	})

	return (
		<>
			<SideNav isOpenDrawer={isDrawerOpen} setIsOpenDrawer={setIsDrawerOpen} />

			{/* 🪄 Animated content shift */}
			<animated.div style={mainSpring}>
				<AppRoutes />
			</animated.div>
		</>
	)
}

export default Body
