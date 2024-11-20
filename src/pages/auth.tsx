import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import SocialMedia from '@/components/auth/socialMedia'
import { Card } from '@/components/ui/card'
import { useAuthState } from '@/stores/auth.store'

export default function Auth() {
	const { authState } = useAuthState()
	return (
		<>
			<div className=' w-full h-screen flex items-center justify-center border-[5px]'>
				<Card className='p-5 w-1/3 relative'>
					{authState === 'login' && <Login />}
					{authState === 'register' && <Register />}
					<SocialMedia />
				</Card>
			</div>
		</>
	)
}
