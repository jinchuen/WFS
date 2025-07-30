import { 
  Home, 
  BarChart3, 
  FileText, 
  Settings, 
  User, 
  Shield, 
  HelpCircle,
  Folder,
  Users,
  Calendar,
  Mail,
  Bell,
  Search,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  Star,
  QrCode,
} from 'lucide-react'

export const sidenavData = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    children: []
  },
  {
    id: 1,
    title: 'SKU Management',
    icon: QrCode,
    path: '/sku',
    children: [
      {
        id: 2,
        title: 'Category',
        icon: BarChart3,
        path: '/sku/category',
        children: []
      },
      {
        id: 3,
        title: 'SKU',
        icon: Eye,
        path: '/sku',
        children: []
      }
    ]
  },
  {
    id: 'content',
    title: 'Content',
    icon: Folder,
    path: '/content',
    children: [
      {
        id: 'documents',
        title: 'Documents',
        icon: FileText,
        path: '/content/documents',
        children: []
      },
      {
        id: 'media',
        title: 'Media',
        icon: Download,
        path: '/content/media',
        children: []
      }
    ]
  },
  {
    id: 'users',
    title: 'Users',
    icon: Users,
    path: '/users',
    children: [
      {
        id: 'manage',
        title: 'Manage Users',
        icon: User,
        path: '/users/manage',
        children: []
      },
      {
        id: 'roles',
        title: 'Roles & Permissions',
        icon: Shield,
        path: '/users/roles',
        children: []
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    icon: Mail,
    path: '/communication',
    children: [
      {
        id: 'messages',
        title: 'Messages',
        icon: Mail,
        path: '/communication/messages',
        children: []
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: Bell,
        path: '/communication/notifications',
        children: []
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    path: '/settings',
    children: [
      {
        id: 'profile',
        title: 'Profile',
        icon: User,
        path: '/settings/profile',
        children: []
      },
      {
        id: 'security',
        title: 'Security',
        icon: Shield,
        path: '/settings/security',
        children: []
      },
      {
        id: 'preferences',
        title: 'Preferences',
        icon: Settings,
        path: '/settings/preferences',
        children: []
      }
    ]
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    path: '/help',
    children: []
  }
]

// Utility function to find item by path
export const findItemByPath = (path) => {
  const searchInItems = (items, targetPath) => {
    for (const item of items) {
      if (item.path === targetPath) return item
      if (item.children && item.children.length > 0) {
        const found = searchInItems(item.children, targetPath)
        if (found) return found
      }
    }
    return null
  }
  return searchInItems(sidenavData, path)
}

// Utility function to get breadcrumb path
export const getBreadcrumbPath = (path) => {
  const breadcrumbs = []
  const searchInItems = (items, targetPath, currentBreadcrumbs = []) => {
    for (const item of items) {
      const newBreadcrumbs = [...currentBreadcrumbs, item]
      if (item.path === targetPath) {
        breadcrumbs.push(...newBreadcrumbs)
        return true
      }
      if (item.children && item.children.length > 0) {
        if (searchInItems(item.children, targetPath, newBreadcrumbs)) {
          return true
        }
      }
    }
    return false
  }
  searchInItems(sidenavData, path)
  return breadcrumbs
} 