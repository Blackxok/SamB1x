import { useAuthState } from '@/stores/auth.store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

export default function Login() {
	const { setAuth } = useAuthState()
	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Login</h2>
			<p className='text-muted-foreground mb-3'>
				Don't have an account?!{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('register')}
				>
					Sign up
				</span>
			</p>
			<Separator />
			<div className='mt-2'>
				<span>Email</span>
				<Input placeholder='example@gmail.com' />
			</div>
			<div className='mt-2'>
				<span>Password</span>
				<Input placeholder='*****' type='password' />
			</div>
			<Button className='w-full h-12 mt-6 h-10' variant={'submit'}>
				Login
			</Button>
		</div>
	)
}
