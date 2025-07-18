# Dynamic Sidenav System

A memory-efficient, dynamic sidenav system built with React, DaisyUI, and React Spring.

## Features

✅ **Memory Efficient**: Uses React.memo, useMemo, and useCallback for optimal performance  
✅ **Dynamic Navigation**: Configurable menu structure with parent-child relationships  
✅ **Context-Based**: Global state management with React Context  
✅ **Smooth Animations**: React Spring integration for fluid transitions  
✅ **Responsive Design**: DaisyUI components with mobile-first approach  
✅ **Accessible**: ARIA labels and keyboard navigation support  
✅ **Auto-Expand**: Smart expansion of parent items based on current path  
✅ **Type Safe**: Proper prop validation and error handling  

## File Structure

```
src/components/theme-layout/
├── SidenavContext.jsx      # Context provider and reducer
├── useSidenav.js          # Custom hooks for sidenav functionality
├── sidenavData.js         # Dynamic navigation data and utilities
├── SidenavItemList.jsx    # Main navigation component
├── SideNav.jsx           # Sidebar container with animations
└── AppWithSidenav.jsx    # Example integration
```

## Quick Start

### 1. Wrap your app with the provider

```jsx
import { SidenavProvider } from './components/theme-layout/SidenavContext'

function App() {
  return (
    <SidenavProvider>
      <YourAppContent />
    </SidenavProvider>
  )
}
```

### 2. Add the sidenav component

```jsx
import SideNav from './components/theme-layout/SideNav'

function YourAppContent() {
  return (
    <div className="relative">
      <SideNav />
      <main>
        {/* Your app content */}
      </main>
    </div>
  )
}
```

### 3. Use the navigation hook

```jsx
import { useSidenavNavigation } from './components/theme-layout/useSidenav'

function SomeComponent() {
  const { navigate } = useSidenavNavigation()
  
  const handleClick = () => {
    navigate('/analytics/reports')
  }
  
  return <button onClick={handleClick}>Go to Reports</button>
}
```

## Configuration

### Adding New Navigation Items

Edit `sidenavData.js` to add new menu items:

```jsx
export const sidenavData = [
  {
    id: 'new-section',
    title: 'New Section',
    icon: SomeIcon,
    path: '/new-section',
    children: [
      {
        id: 'sub-item',
        title: 'Sub Item',
        icon: SubIcon,
        path: '/new-section/sub-item',
        children: []
      }
    ]
  }
]
```

### Customizing Icons

Import icons from Lucide React:

```jsx
import { Home, Settings, User } from 'lucide-react'

// Use in sidenavData
{
  id: 'dashboard',
  title: 'Dashboard',
  icon: Home,  // Pass the icon component directly
  path: '/dashboard',
  children: []
}
```

## Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders of menu items
- **useMemo**: Memoizes expensive calculations and component trees
- **useCallback**: Prevents function recreation on every render
- **Context Optimization**: Memoized context value to prevent provider re-renders
- **Lazy Loading**: Components are only rendered when needed

## Memory Usage

The system is designed to minimize memory usage:

- Uses `Set` for expanded items (O(1) lookup)
- Memoized components prevent unnecessary DOM updates
- Efficient state management with useReducer
- Minimal re-renders through proper dependency arrays

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure
- Color contrast compliance (DaisyUI)

## Browser Support

- Modern browsers with ES6+ support
- React 16.8+ (for hooks)
- Tailwind CSS 3.0+
- DaisyUI 5.0+

## Customization

### Styling

The system uses DaisyUI classes and can be customized with Tailwind CSS:

```jsx
// Custom styling in SidenavItemList.jsx
const itemClasses = useMemo(() => {
  const baseClasses = [
    'flex items-center justify-between w-full px-3 py-2',
    'hover:bg-base-300 rounded-lg transition-all duration-200'
  ]
  // Add your custom classes here
  return baseClasses.join(' ')
}, [])
```

### Animation

Customize animations in `SideNav.jsx`:

```jsx
const drawerSpring = useSpring({
  transform: isOpenDrawer ? 'translateX(0%)' : 'translateX(-100%)',
  opacity: isOpenDrawer ? 1 : 0,
  config: config.gentle  // Change animation config
})
```

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure all files are in the same directory
2. **Context errors**: Make sure your app is wrapped with `SidenavProvider`
3. **Performance issues**: Check that you're using the memoized components correctly

### Debug Mode

Add debug logging to the context:

```jsx
// In SidenavContext.jsx
const contextValue = useMemo(() => {
  console.log('Sidenav context updated:', state)
  return { ...state, ...actions }
}, [state, actions])
```

## License

This sidenav system is part of your project and follows the same license terms. 