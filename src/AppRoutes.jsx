/* eslint-disable import/no-unresolved */
// AppRoutes.jsx
import { Routes, Route } from "react-router-dom"
import Template from "./components/template/template"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />} />
    </Routes>
  )
}

export default AppRoutes