/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTrail, animated } from '@react-spring/web'

// Converts "my-page" => "My Page"
const formatSegment = (segment) =>
	segment
		.replace(/-/g, ' ')
		.replace(/\b\w/g, char => char.toUpperCase())

const Breadcrumbs = () => {
	const location = useLocation()
	const [breadcrumbs, setBreadcrumbs] = useState([])

	useEffect(() => {
		const pathSegments = location.pathname.split('/').filter(Boolean)
		const breadcrumbPaths = pathSegments.map((segment, index) => ({
			label: formatSegment(segment),
			path: '/' + pathSegments.slice(0, index + 1).join('/')
		}))
		setBreadcrumbs(breadcrumbPaths)
	}, [location.pathname])

	const trail = useTrail(breadcrumbs.length, {
		from: { opacity: 0, transform: 'translateX(-10px)' },
		to: { opacity: 1, transform: 'translateX(0px)' },
		config: { tension: 170, friction: 20 },
	})

	return (
		<div className="flex items-center gap-2 text-sm text-base-content/60 w-[100%]">
			{trail.map((style, index) => {
				const breadcrumb = breadcrumbs[index]
				return (
					<animated.div key={breadcrumb.path} style={style} className="flex items-center gap-1">
						{index !== 0 && <span className="text-base-content/40">{'>'}</span>}
						<span className="hover:text-base-content cursor-default">
							{breadcrumb.label}
						</span>
					</animated.div>
				)
			})}
		</div>
	)
}

export default Breadcrumbs
