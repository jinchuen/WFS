import React from 'react'
import { MenuIcon } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/web'

const ComponentName = () => {
	return (
<></>
	);
};

const SideNav = ({ isOpenDrawer, setIsOpenDrawer }) => {
	const drawerSpring = useSpring({
		transform: isOpenDrawer ? 'translateX(0%)' : 'translateX(-100%)',
		config: { tension: 300, friction: 30 } // fast but smooth
	})

	const handleOpenDrawer = () => setIsOpenDrawer(!isOpenDrawer)

	return (
		<>
			{/* Hamburger Button (always visible) */}
			<div className="fixed top-5 left-5 z-50">
				{!isOpenDrawer && (
					<button
						onClick={handleOpenDrawer}
						className="btn btn-md btn-circle bg-[#c2bcbc] hover:bg-[#c2bcbc]/80 shadow-md shadow-indigo-500/50"
					>
						<MenuIcon className="w-5 h-5 text-black" />
					</button>
				)}
			</div>

			{/* Sliding Drawer */}
			<animated.div
				style={drawerSpring}
				className="fixed top-0 left-0 h-full w-1/6 bg-white z-40 shadow-lg"
			>
				<div className="p-4">
					<h1 className="text-lg font-bold">SideNav</h1>
					<button onClick={handleOpenDrawer} className="mt-4 btn btn-sm bg-red-500 text-white">
						Close
					</button>
				</div>
			</animated.div>

			{isOpenDrawer && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black/50 z-30"
					onClick={handleOpenDrawer}
				/>
			)}
		</>
	)
}

export default SideNav
