/* eslint-disable import/no-unresolved */
// AppRoutes.jsx
import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"

import Template from "./components/template/template"
import Category from "./components/sku/Category"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Template />} />
      
      {/* Analytics Routes */}
      <Route path="/analytics" element={<Template />} />
      <Route path="/analytics/insights" element={<Template />} />
      
      {/* SKU Routes */}
      <Route path="/sku" element={<Template />} />
      <Route path="/sku/category" element={<Category />} />
      
      {/* Content Routes */}
      <Route path="/content" element={<Template />} />
      <Route path="/content/documents" element={<Template />} />
      <Route path="/content/media" element={<Template />} />
      
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
    </Routes>
  )
}

export default AppRoutes