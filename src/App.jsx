import "./App.css"
import SmokeBackground from "./background/SmokeBackground/SmokeBackground"
import SideNav from "./components/theme-layout/side-nav"

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <SmokeBackground />

      {/* Overlay SideNav on top of background */}
      <div className="absolute top-0 left-0 z-10 p-6">
        <SideNav />
      </div>
    </div>
  )
}

export default App
