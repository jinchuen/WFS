/* eslint-disable import/no-unresolved */
// AppRoutes.jsx
import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"

import Template from "./components/template/template"
import Category from "./components/sku/Category"
import Sku from "./components/sku/sku"
import InStock from "./components/inventory/in-stock"

import Login from "./components/auth/login"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Template />} />
      
      {/* Analytics Routes */}
      <Route path="/analytics" element={<Template />} />
      <Route path="/analytics/insights" element={<Template />} />
      
      {/* SKU Routes */}
      <Route path="/sku" element={<Sku />} />
      <Route path="/sku/category" element={<Category />} />
      
      {/* Content Routes */}
      <Route path="/inventory" element={<Navigate to="/inventory/inventory-in-stock" replace />} />
      <Route path="/inventory/inventory-in-stock" element={<InStock />} />
      <Route path="/inventory/media" element={<Template />} />
      
      {/* Users Routes */}
      <Route path="/users" element={<Template />} />
      <Route path="/users/manage" element={<Template />} />
      <Route path="/users/roles" element={<Template />} />
      
      {/* Communication Routes */}
      <Route path="/communication" element={<Template />} />
      <Route path="/communication/messages" element={<Template />} />
      <Route path="/communication/notifications" element={<Template />} />
      
      {/* Settings Routes */}
      <Route path="/settings" element={<Template />} />
      <Route path="/settings/profile" element={<Template />} />
      <Route path="/settings/security" element={<Template />} />
      <Route path="/settings/preferences" element={<Template />} />
      
      {/* Help Route */}
      <Route path="/help" element={<Template />} />

      {/* Login */}
      <Route path="/authorization/login" element={<Login/>}/>
    </Routes>
  )
}

export default AppRoutes