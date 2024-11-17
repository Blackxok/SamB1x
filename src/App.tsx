import Navbar from '@/components/shared/navbar'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Home from './pages/home'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</>
	)
}

export default App
