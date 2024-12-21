import { auth } from '@/firebase/fb_init'
import { loginSchema } from '@/lib/validation'
import { useAuthState } from '@/stores/auth.store'
import { useUserState } from '@/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiAlertLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import Loader from '../shared/loader'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
//
//
export default function Login() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const { setAuth } = useAuthState()
	const { user, setUser } = useUserState()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	useEffect(() => {
		if (user) {
			navigate('/dashboard')
		}
	}, [user, navigate])

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, password } = values
		setLoading(true)
		try {
			const res = await signInWithEmailAndPassword(auth, email, password)
			setUser(res.user)
			navigate('/dashboard')
		} catch (err) {
			const errMsg = err as Error
			setError(errMsg.message)
		} finally {
			setLoading(false)
		}
	}

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
			{loading && <Loader />}
			{error && (
				<Alert variant='destructive'>
					<RiAlertLine className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>Your session has expired. Please log in again.</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>Email</FormLabel>
								<FormControl>
									<Input placeholder='example@gmail.com' disabled={loading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>Password</FormLabel>
								<FormControl>
									<Input type='password' placeholder='*****' disabled={loading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full mt-3' type='submit' disabled={loading}>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}
