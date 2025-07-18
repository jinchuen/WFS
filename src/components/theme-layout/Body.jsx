/* eslint-disable import/no-unresolved */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/web'
import AppRoutes from '../../AppRoutes'
import SideNav from './SideNav'
import { useSidenav } from './useSidenav'

const Body = () => {
	const { isOpenDrawer } = useSidenav()

	const mainSpring = useSpring({
		marginLeft: isOpenDrawer ? '16.6667%' : '5%', // Fixed: 0% when closed, 16.6667% when open
		marginTop: '1.5%',
		config: { duration: 200 }
	})

	return (
		<>
			<SideNav />
			
			{/* 🪄 Animated content shift */}
			<animated.div style={mainSpring}>
				<AppRoutes />
			</animated.div>
		</>
	)
}

export default Body
