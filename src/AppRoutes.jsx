/* eslint-disable import/no-unresolved */
// AppRoutes.jsx
import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"

import Template from "./components/template/template"
import Category from "./components/sku/category"


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Template />} />
      <Route path="/sku" children={
        <>
          <Route path="/sku/category" element={<Category />} />
        </>
      } />
    </Routes>
  )
}

export default AppRoutes