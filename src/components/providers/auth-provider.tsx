import { auth } from '@/firebase/fb_init'
import { useUserState } from '@/stores/user.store'
import { ReactNode, useEffect } from 'react'
import Loader from '../shared/loader'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { isLoading, setUser } = useUserState()

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user)
		})
	}, [])

	return isLoading ? <Loader /> : <>{children}</>
}
export default AuthProvider
