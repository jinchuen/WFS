// AppRoutes.jsx
import { Routes, Route } from "react-router-dom"
import Sku from "./components/sku/sku"
import CallbackComparisonDemo from "./components/sku/UserList"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sku" element={<Sku />} />
      <Route path="/about" element={<CallbackComparisonDemo />} />
    </Routes>
  )
}

export default AppRoutes
