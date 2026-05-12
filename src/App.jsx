import HomePage from "./pages/HomePage"
import ProfileDetailsPage from './pages/ProfileDetailsPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfil/:username" element={<ProfileDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
