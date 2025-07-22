/* eslint-disable import/no-unresolved */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/web'
import AppRoutes from '../../AppRoutes'
import SideNav from './SideNav'
import { useSidenav } from './useSidenav'
import Breadcrumbs from './breadcrumbs'
import AlterComponents from '../../helper-components/alter/AlterComponents'
import { AlterProvider } from '../../helper-components/alter/AlterContext'

const Body = () => {
	const { isOpenDrawer } = useSidenav()

	const mainSpring = useSpring({
		marginLeft: isOpenDrawer ? '16.6667%' : '0', // Fixed: 0% when closed, 16.6667% when open
		marginTop: '1.5%',
		config: { duration: 200 }
	})

	const mainSpringBreadcrumbs = useSpring({
		marginLeft: isOpenDrawer ? '2%' : '5%', // Fixed: 0% when closed, 16.6667% when open
		marginTop: '3px',
		config: { duration: 200 }
	})

  const hrSpring = useSpring({
    from: { width: '0%', opacity: 0 },
    to: { width: '100%', opacity: 1 },
    delay: 300,
    config: { tension: 170, friction: 26 },
  })

	return (
		<>
			<AlterProvider>
				<AlterComponents />
				<SideNav />
				{/* 🪄 Animated content shift */}
				<animated.div style={mainSpring}>
					<animated.div style={mainSpringBreadcrumbs} >
						<Breadcrumbs />
					</animated.div>
					<animated.hr style={hrSpring} className="w-full mt-5 mb-2" />
					<AppRoutes />
				</animated.div>
			</AlterProvider>
		</>
	)
}

export default Body
