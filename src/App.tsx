import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import { Toaster } from './components/ui/sonner'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import Home from './pages/home'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Auth />} />
				<Route path='/home' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
			<Toaster />
		</>
	)
}

export default App
