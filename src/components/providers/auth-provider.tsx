import { auth } from '@/firebase/fb_init'
import { useUserState } from '@/stores/user.store'
import { ReactNode, useEffect, useState } from 'react'
import Loader from '../shared/loader'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setUser } = useUserState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user)
			setIsLoading(false)
		})
	}, [])

	return isLoading ? <Loader /> : <>{children}</>
}
export default AuthProvider
