import { useAuthState } from '@/stores/auth.store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

export default function Register() {
	const { setAuth } = useAuthState()
	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Register</h2>
			<p className='text-muted-foreground mb-3'>
				Already have account...{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('login')}
				>
					Sign in
				</span>
			</p>
			<Separator />
			<div className='mt-2'>
				<span>Email</span>
				<Input placeholder='example@gmail.com' />
			</div>
			<div className='mt-2 grid grid-cols-2 gap-3'>
				<div>
					<span>Password</span>
					<Input placeholder='*****' type='password' />
				</div>
				<div>
					<span>Confirm Password</span>
					<Input placeholder='*****' type='password' />
				</div>
			</div>
			<Button className='w-full h-12 mt-6 h-10'>Register</Button>
		</div>
	)
}
